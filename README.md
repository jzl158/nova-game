# Barbuda Rising: Community Visioning Challenge

A gamified community engagement tool designed to capture visions for Barbuda's resilient and self-reliant future.

## Features

### 🎮 Game Mechanics
- **4 Themed Card Zones**: Seed, Nurture, Optimize, and Visualize
- **52 Cards per Zone**: Community-focused prompts and questions
- **Gamification**: Points, XP, achievements, daily challenges, streaks
- **Progressive Levels**: Unlock achievements as you contribute more visions

### 📧 Backend Data Collection
- **Email Capture**: Collect contact information for community updates
- **Vision Storage**: Save all community visions to JSON database
- **Validation**: Email format and required field validation
- **Privacy**: Masked emails in admin endpoints

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Access the Game
Visit: `http://localhost:3001/Nova-Gamified.html`

## Game Structure

### 🌱 Seed Zone
- **Purpose**: Spark initial ideas, concerns, or visions
- **Examples**: "What does self-reliance mean to you?", "If Barbuda could teach the world one lesson, what would it be?"

### 🌿 Nurture Zone  
- **Purpose**: Build through reflection, dialogue, and collaboration
- **Examples**: "Tell a story of when the community came together", "What could make tourism feel like ownership?"

### ⚙️ Optimize Zone
- **Purpose**: Turn ideas into actionable strategies
- **Examples**: "Rank what matters most: Jobs, Land, Environment, Education, Tourism", "How can we ensure development serves Barbudans first?"

### 🎨 Visualize Zone
- **Purpose**: Celebrate and anchor outcomes in shared identity  
- **Examples**: "Take a picture that symbolizes resilience", "Design a slogan mixing pride + sustainability"

## API Endpoints

### POST `/api/save-vision`
Save a community vision with email
```json
{
  "email": "user@example.com",
  "vision": "Community vision text...",
  "cards": {
    "seed": "Card text",
    "nurture": "Card text", 
    "optimize": "Card text",
    "visualize": "Card text"
  }
}
```

### GET `/api/visions`
Get summary of all visions (admin)

### GET `/api/health`
Health check endpoint

## Data Storage

Visions are stored in `visions.json` with:
- Unique ID and timestamp
- Email and vision content
- All 4 drawn cards
- IP address (for analytics)

## Development

### Run in Development Mode
```bash
npm run dev
```

Uses nodemon for auto-restart on file changes.

### File Structure
```
/
├── Nova-Gamified.html    # Main game interface
├── server.js             # Express server
├── package.json          # Dependencies
├── visions.json          # Data storage (created automatically)
└── README.md            # This file
```

## Deployment

The app can be deployed to any Node.js hosting service:

1. **Heroku**: `git push heroku main`
2. **Railway**: Connect GitHub repo
3. **DigitalOcean App Platform**: Deploy from GitHub
4. **AWS/Azure/GCP**: Use their Node.js hosting services

Set environment variable `PORT` for production.

## Security Notes

- Email validation on both client and server
- Input sanitization for vision text
- Rate limiting recommended for production
- Consider adding CAPTCHA for spam prevention
- Use HTTPS in production

## Community Impact

This tool helps Barbuda:
- 🏘️ Capture collective community wisdom
- 🌱 Engage residents in visioning exercises  
- 📊 Gather data on community priorities
- 🤝 Build consensus around development approaches
- 📧 Create contact list for ongoing community engagement

---

**Built for Barbuda's resilient future** 🇦🇬