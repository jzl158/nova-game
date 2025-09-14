// Vercel serverless function for saving community visions
// NOTE: Vercel serverless functions are stateless - each request is independent
// In production, you'd want to use a database like Vercel KV, PlanetScale, or Supabase
// For now, we'll just acknowledge the submission without persistent storage

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

        // Create new vision entry
        const newVision = {
            id: Date.now().toString(),
            email,
            vision,
            cards: cards || {},
            timestamp,
            ip: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
        };

        // Log the submission (Vercel functions are stateless, so no persistent storage here)
        console.log(`Vision received from ${email} at ${timestamp}`);
        console.log(`Vision preview: ${vision.substring(0, 100)}...`);

        // In production, you would save to a database here
        // Example options:
        // - Vercel KV: await kv.lpush('visions', JSON.stringify(newVision));  
        // - Supabase: await supabase.from('visions').insert(newVision);
        // - PlanetScale: await db.execute('INSERT INTO visions...');

        res.status(200).json({ 
            success: true, 
            message: 'Vision received successfully! (Demo mode - use a database for production)',
            id: newVision.id,
            timestamp: timestamp,
            note: 'This demo acknowledges submissions but does not persist data. Connect a database for production use.'
        });

    } catch (error) {
        console.error('Error saving vision:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to save vision. Please try again.' 
        });
    }
}