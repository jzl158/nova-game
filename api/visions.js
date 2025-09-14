// Get visions summary endpoint (for demo purposes)
// In production, this should be secured and connect to a real database

// Mock data for demo (in production, fetch from database)
const mockVisions = [
    {
        id: '1',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        email: 'co***@example.com',
        visionPreview: 'I envision Barbuda as a self-sustaining island where renewable energy powers every home and local agriculture feeds every family...'
    },
    {
        id: '2', 
        timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        email: 'vi***@barbuda.ag',
        visionPreview: 'Community-owned eco-lodges that showcase our culture while ensuring tourism dollars stay within our island economy...'
    },
    {
        id: '3',
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        email: 'yo***@gmail.com', 
        visionPreview: 'Young Barbudans leading innovation labs that blend traditional knowledge with modern technology for climate resilience...'
    }
];

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed. Use GET.' 
        });
    }

    try {
        // In production, fetch from database and mask emails properly
        res.status(200).json({ 
            success: true, 
            visions: mockVisions,
            total: mockVisions.length,
            message: 'Community visions summary (demo data)'
        });
    } catch (error) {
        console.error('Error fetching visions:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to load visions' 
        });
    }
}