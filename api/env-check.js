// Simple environment variable check
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
        const envCheck = {
            timestamp: new Date().toISOString(),
            notion_token: {
                present: !!process.env.NOTION_TOKEN,
                starts_with_secret: process.env.NOTION_TOKEN ? process.env.NOTION_TOKEN.startsWith('secret_') : false,
                length: process.env.NOTION_TOKEN ? process.env.NOTION_TOKEN.length : 0,
                preview: process.env.NOTION_TOKEN ? process.env.NOTION_TOKEN.substring(0, 10) + '...' : 'not_found'
            },
            notion_database_id: {
                present: !!process.env.NOTION_DATABASE_ID,
                length: process.env.NOTION_DATABASE_ID ? process.env.NOTION_DATABASE_ID.length : 0,
                format_valid: process.env.NOTION_DATABASE_ID ? process.env.NOTION_DATABASE_ID.length === 32 : false,
                preview: process.env.NOTION_DATABASE_ID ? process.env.NOTION_DATABASE_ID.substring(0, 8) + '...' : 'not_found'
            },
            all_env_vars: Object.keys(process.env).filter(key => key.includes('NOTION')),
            vercel_env: !!process.env.VERCEL,
            node_env: process.env.NODE_ENV
        };

        res.status(200).json({
            success: true,
            environment_check: envCheck
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Environment check failed',
            details: error.message
        });
    }
};