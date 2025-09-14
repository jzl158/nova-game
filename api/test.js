// Minimal test endpoint for debugging Vercel issues
module.exports = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Test endpoint working!",
            method: req.method,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack
        });
    }
};