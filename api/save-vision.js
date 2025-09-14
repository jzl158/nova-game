// Vercel serverless function for saving community visions to Notion
const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

module.exports = async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed. Use POST.' 
        });
    }

    try {
        const { email, vision, cards, timestamp = new Date().toISOString() } = req.body;
        
        // Validate required fields
        if (!email || !vision) {
            return res.status(400).json({ 
                success: false, 
                error: 'Email and vision are required' 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Please enter a valid email address' 
            });
        }

        // Check if Notion is configured
        if (!process.env.NOTION_TOKEN || !NOTION_DATABASE_ID) {
            console.log('Notion not configured, logging submission locally');
            console.log(`Vision received from ${email} at ${timestamp}`);
            console.log(`Vision preview: ${vision.substring(0, 100)}...`);
            
            return res.status(200).json({ 
                success: true, 
                message: 'Vision received! (Notion database not configured - check environment variables)',
                timestamp: timestamp,
                note: 'Add NOTION_TOKEN and NOTION_DATABASE_ID to environment variables for persistent storage.'
            });
        }

        // Create vision title from first 50 characters
        const visionTitle = vision.length > 50 
            ? vision.substring(0, 50) + '...' 
            : vision;

        // Save to Notion database
        const notionResponse = await notion.pages.create({
            parent: {
                database_id: NOTION_DATABASE_ID,
            },
            properties: {
                'Title': {
                    title: [
                        {
                            text: {
                                content: `Vision from ${email.split('@')[0]} - ${new Date(timestamp).toLocaleDateString()}`
                            }
                        }
                    ]
                },
                'Email': {
                    email: email
                },
                'Vision': {
                    rich_text: [
                        {
                            text: {
                                content: vision
                            }
                        }
                    ]
                },
                'Seed Card': {
                    rich_text: [
                        {
                            text: {
                                content: cards?.seed || 'Not provided'
                            }
                        }
                    ]
                },
                'Nurture Card': {
                    rich_text: [
                        {
                            text: {
                                content: cards?.nurture || 'Not provided'
                            }
                        }
                    ]
                },
                'Optimize Card': {
                    rich_text: [
                        {
                            text: {
                                content: cards?.optimize || 'Not provided'
                            }
                        }
                    ]
                },
                'Visualize Card': {
                    rich_text: [
                        {
                            text: {
                                content: cards?.visualize || 'Not provided'
                            }
                        }
                    ]
                },
                'Timestamp': {
                    date: {
                        start: timestamp
                    }
                },
                'IP Address': {
                    rich_text: [
                        {
                            text: {
                                content: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
                            }
                        }
                    ]
                },
                'Status': {
                    select: {
                        name: 'New'
                    }
                }
            }
        });

        console.log(`Vision saved to Notion from ${email} at ${timestamp}`);
        console.log(`Notion page ID: ${notionResponse.id}`);

        res.status(200).json({ 
            success: true, 
            message: 'Vision saved successfully to Barbuda Rising database!',
            id: notionResponse.id,
            timestamp: timestamp,
            note: 'Your vision has been recorded and will be reviewed by the community development team.'
        });

    } catch (error) {
        console.error('Error saving vision to Notion:', error);
        
        // Provide helpful error messages
        if (error.code === 'unauthorized') {
            return res.status(500).json({ 
                success: false, 
                error: 'Database connection error. Please contact support.',
                details: 'Notion integration not properly configured.'
            });
        }
        
        if (error.code === 'object_not_found') {
            return res.status(500).json({ 
                success: false, 
                error: 'Database configuration error. Please contact support.',
                details: 'Notion database not found or not shared with integration.'
            });
        }

        res.status(500).json({ 
            success: false, 
            error: 'Failed to save vision. Please try again or contact support if the problem persists.',
            details: error.message
        });
    }
}