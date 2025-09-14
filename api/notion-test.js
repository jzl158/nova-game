// Test endpoint to debug Notion connection issues
const { Client } = require('@notionhq/client');

module.exports = async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const diagnostics = {
            timestamp: new Date().toISOString(),
            environment_variables: {
                notion_token_present: !!process.env.NOTION_TOKEN,
                notion_token_format: process.env.NOTION_TOKEN ? 
                    (process.env.NOTION_TOKEN.startsWith('secret_') ? 'correct_format' : 'incorrect_format') : 
                    'missing',
                notion_database_id_present: !!process.env.NOTION_DATABASE_ID,
                notion_database_id_length: process.env.NOTION_DATABASE_ID ? 
                    process.env.NOTION_DATABASE_ID.length : 0,
                notion_database_id_format: process.env.NOTION_DATABASE_ID ? 
                    (process.env.NOTION_DATABASE_ID.length === 32 ? 'correct_length' : 'incorrect_length') : 
                    'missing'
            },
            notion_client_test: null,
            database_access_test: null,
            error_details: null
        };

        // Test 1: Check if we can create Notion client
        if (!process.env.NOTION_TOKEN) {
            diagnostics.error_details = 'NOTION_TOKEN environment variable is missing';
            return res.status(200).json(diagnostics);
        }

        if (!process.env.NOTION_DATABASE_ID) {
            diagnostics.error_details = 'NOTION_DATABASE_ID environment variable is missing';
            return res.status(200).json(diagnostics);
        }

        // Test 2: Initialize Notion client
        const notion = new Client({
            auth: process.env.NOTION_TOKEN,
        });
        diagnostics.notion_client_test = 'initialized_successfully';

        // Test 3: Try to retrieve database info
        try {
            const database = await notion.databases.retrieve({
                database_id: process.env.NOTION_DATABASE_ID
            });
            
            diagnostics.database_access_test = {
                status: 'success',
                database_title: database.title[0]?.plain_text || 'No title',
                properties: Object.keys(database.properties),
                created_time: database.created_time,
                last_edited_time: database.last_edited_time
            };
        } catch (dbError) {
            console.error('Database access error:', dbError);
            diagnostics.database_access_test = {
                status: 'failed',
                error_code: dbError.code || 'unknown',
                error_message: dbError.message || 'Unknown error',
                error_status: dbError.status || 'no_status',
                raw_error: dbError.toString(),
                error_body: dbError.body || 'no_body'
            };
            diagnostics.error_details = `Database access failed: ${dbError.message || dbError.toString()}`;
        }

        // Test 4: Try a simple page creation (if database access worked)
        if (diagnostics.database_access_test.status === 'success') {
            try {
                const testPage = await notion.pages.create({
                    parent: {
                        database_id: process.env.NOTION_DATABASE_ID,
                    },
                    properties: {
                        'Title': {
                            title: [
                                {
                                    text: {
                                        content: `Test Connection - ${new Date().toLocaleString()}`
                                    }
                                }
                            ]
                        },
                        'Email': {
                            email: 'test@example.com'
                        },
                        'Vision': {
                            rich_text: [
                                {
                                    text: {
                                        content: 'This is a test vision to verify Notion integration is working properly.'
                                    }
                                }
                            ]
                        },
                        'Seed Card': {
                            rich_text: [
                                {
                                    text: {
                                        content: 'Test seed card'
                                    }
                                }
                            ]
                        },
                        'Nurture Card': {
                            rich_text: [
                                {
                                    text: {
                                        content: 'Test nurture card'
                                    }
                                }
                            ]
                        },
                        'Optimize Card': {
                            rich_text: [
                                {
                                    text: {
                                        content: 'Test optimize card'
                                    }
                                }
                            ]
                        },
                        'Visualize Card': {
                            rich_text: [
                                {
                                    text: {
                                        content: 'Test visualize card'
                                    }
                                }
                            ]
                        },
                        'Timestamp': {
                            date: {
                                start: new Date().toISOString()
                            }
                        },
                        'IP Address': {
                            rich_text: [
                                {
                                    text: {
                                        content: 'test-ip'
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

                diagnostics.page_creation_test = {
                    status: 'success',
                    page_id: testPage.id,
                    message: 'Successfully created test page in Notion database!'
                };
            } catch (pageError) {
                diagnostics.page_creation_test = {
                    status: 'failed',
                    error_code: pageError.code,
                    error_message: pageError.message,
                    error_status: pageError.status,
                    detailed_error: pageError
                };
                diagnostics.error_details = `Page creation failed: ${pageError.message}`;
            }
        }

        res.status(200).json(diagnostics);

    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Notion test failed',
            details: error.message,
            stack: error.stack
        });
    }
};