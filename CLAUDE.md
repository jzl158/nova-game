# The N.O.V.A. Challenge

**A Game of Collective Creativity & Vision**

## Project Overview

The N.O.V.A. Challenge is a web-based interactive card game designed to foster business creativity and vision development. Players draw cards from four themed decks to build and refine business ideas collaboratively.

## Game Mechanics

### Four Core Zones

1. **🌱 Seed Zone** - Draw initial business ideas
2. **🌿 Nurture Zone** - Add context and backstory to develop the concept
3. **⚡ Optimize Zone** - Enhance and streamline the idea for impact
4. **🎨 Visualize Zone** - Create tangible representations and marketing concepts

### Gameplay Flow

1. Players click on each zone's deck to draw cards sequentially
2. Each drawn card provides prompts or concepts for that phase
3. Once all four cards are drawn, the **Amplify Zone** appears
4. Players synthesize their cards into a cohesive business vision
5. Submit the vision to see a summary of the complete concept

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Tailwind CSS via CDN
- **Fonts**: Inter (body), Playfair Display (headings)
- **Architecture**: Single-page application with modal interactions

## Key Features

- **Card Flip Animations**: 3D CSS transforms for realistic card interactions
- **Responsive Design**: Grid layout adapts from mobile to desktop
- **Dark Theme**: Professional dark color scheme with cyan accents
- **Interactive Elements**: Hover effects, scaling, and visual feedback
- **Randomized Content**: Each deck contains 40+ unique prompts
- **Refresh Mechanism**: Players can redraw cards if unsatisfied
- **Vision Synthesis**: Final modal displays complete business concept

## Development Commands

Since this is a static HTML file, you can:

- **Run locally**: Open `Nova.md` directly in a web browser
- **Serve via HTTP**: Use any static file server (e.g., `python -m http.server`)
- **Deploy**: Upload to any static hosting service

## File Structure

```
NOVAGame/
├── Nova.md          # Main game file (HTML)
└── CLAUDE.md        # This documentation file
```

## Game Content

The game includes extensive content across four categories:

- **Seed Cards**: 45 diverse business ideas (AI assistants, eco-friendly products, community projects)
- **Nurture Cards**: 45 context-building prompts (cultural connections, personal stories, community impact)
- **Optimize Cards**: 45 enhancement strategies (AI automation, sustainability, scaling approaches)
- **Visualize Cards**: 45 creative exercises (slogans, mockups, marketing concepts)

## Customization Notes

- Card content is stored in JavaScript arrays for easy modification
- CSS custom properties enable quick theme adjustments
- Modular JavaScript functions allow feature extensions
- Responsive breakpoints accommodate various screen sizes