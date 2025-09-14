const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'visions.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Ensure data file exists
async function ensureDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        // File doesn't exist, create it with empty array
        await fs.writeFile(DATA_FILE, '[]', 'utf8');
    }
}

// Save vision endpoint
app.post('/api/save-vision', async (req, res) => {
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

        // Read existing data
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const visions = JSON.parse(data);

        // Add new vision
        const newVision = {
            id: Date.now().toString(),
            email,
            vision,
            cards: cards || {},
            timestamp,
            ip: req.ip
        };

        visions.push(newVision);

        // Save back to file
        await fs.writeFile(DATA_FILE, JSON.stringify(visions, null, 2), 'utf8');

        console.log(`New vision saved from ${email} at ${timestamp}`);

        res.json({ 
            success: true, 
            message: 'Vision saved successfully!',
            id: newVision.id
        });

    } catch (error) {
        console.error('Error saving vision:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to save vision. Please try again.' 
        });
    }
});

// Get visions endpoint (optional - for admin viewing)
app.get('/api/visions', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const visions = JSON.parse(data);
        
        // Return only basic info, not full details for privacy
        const summary = visions.map(v => ({
            id: v.id,
            timestamp: v.timestamp,
            email: v.email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Mask email
            visionPreview: v.vision.substring(0, 100) + '...'
        }));

        res.json({ success: true, visions: summary, total: visions.length });
    } catch (error) {
        console.error('Error reading visions:', error);
        res.status(500).json({ success: false, error: 'Failed to load visions' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
    await ensureDataFile();
    app.listen(PORT, () => {
        console.log(`\n🌱 Barbuda Rising Server running on port ${PORT}`);
        console.log(`📧 Vision submissions will be saved to: ${DATA_FILE}`);
        console.log(`🌐 Access the game at: http://localhost:${PORT}/Nova-Gamified.html\n`);
    });
}

startServer().catch(console.error);