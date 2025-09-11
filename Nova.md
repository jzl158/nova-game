\<\!DOCTYPE html\>  
\<html lang\="en"\>  
\<head\>  
   \<meta charset\="UTF-8"\>  
   \<meta name\="viewport" content\="width=device-width, initial-scale=1.0"\>  
   \<title\>The N.O.V.A. Challenge\</title\>  
   \<script src\="https://cdn.tailwindcss.com"\>\</script\>  
   \<link href\="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700\&family=Playfair+Display:wght@700\&display=swap" rel\="stylesheet"\>  
   \<style\>  
       body {  
           font-family: 'Inter', sans-serif;  
           background-color: \#1a1a1a;  
           color: \#f0f0f0;  
       }  
       .card {  
           background-color: \#2c2c2c;  
           border: 1px solid \#444;  
           transition: transform 0.3s, box-shadow 0.3s;  
           cursor: pointer;  
           min-height: 240px;  
           display: flex;  
           flex-direction: column;  
           justify-content: space-between;  
       }  
       .card:hover {  
           transform: translateY(\-10px) rotate(2deg);  
           box-shadow: 0 15px 30px rgba(0, 255, 255, 0.2);  
       }  
       .card-deck {  
           perspective: 1000px;  
           position: relative;  
           height: 240px;  
           width: 180px;  
       }  
       .card-deck .card {  
           position: absolute;  
           width: 100%;  
           height: 100%;  
           backface-visibility: hidden;  
           transition: transform 0.6s;  
           transform-style: preserve-3d;  
       }  
       .card-deck .card-back {  
            transform: rotateY(0deg);  
       }  
       .card-deck.flipped .card-back {  
           transform: rotateY(\-180deg);  
       }  
       .card-deck.flipped .card-front {  
           transform: rotateY(0deg);  
       }  
       .card-front {  
            transform: rotateY(180deg);  
       }  
       .card-title {  
           font-family: 'Playfair Display', serif;  
       }  
       .card-icon {  
           font-size: 3rem;  
           line-height: 1;  
       }  
       .playmat-zone {  
           background-color: rgba(255, 255, 255, 0.05);  
           border: 2px dashed \#444;  
           min-height: 280px;  
       }  
       .selected-card {  
           transform: scale(1.05);  
           box-shadow: 0 0 25px rgba(0, 255,255, 0.3);  
           border-color: \#00ffff;  
       }  
       .btn-primary {  
           background-color: \#00ffff;  
           color: \#1a1a1a;  
           transition: background-color 0.3s, transform 0.3s;  
       }  
       .btn-primary:hover {  
           background-color: \#00d0d0;  
           transform: scale(1.05);  
       }  
       .modal {  
           background-color: rgba(0,0,0,0.8);  
       }  
   \</style\>  
\</head\>  
\<body class\="min-h-screen p-4 sm:p-8"\>  
   \<div class\="container mx-auto"\>

       \<header class\="text-center mb-12"\>  
           \<h1 class\="text-4xl sm:text-5xl font-bold text-cyan-300 tracking-wider" style\="font-family: 'Playfair Display', serif;"\>The N.O.V.A. Challenge\</h1\>  
           \<p class\="text-lg text-gray-400 mt-2"\>A Game of Collective Creativity & Vision\</p\>  
       \</header\>

       \<\!-- Playmat / Vision Board \--\>  
       \<div id\="playmat" class\="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"\>  
           \<\!-- Seed Zone \--\>  
           \<div class\="playmat-zone rounded-lg p-6 flex flex-col items-center justify-center text-center"\>  
               \<h2 class\="text-2xl font-bold mb-4 text-green-300 card-title"\>🌱 Seed Zone\</h2\>  
               \<p class\="text-gray-400 mb-4"\>Pick a business idea to begin.\</p\>  
               \<div id\="seed-deck-container" class\="card-deck mb-2" onclick\="drawCard('seed')"\>  
                   \<div class\="card card-back rounded-lg p-4 flex flex-col items-center justify-center text-center"\>  
                       \<div class\="card-icon"\>🌱\</div\>  
                       \<h3 class\="font-bold text-xl card-title"\>SEED\</h3\>  
                       \<p class\="text-sm text-gray-400"\>Click to draw\</p\>  
                   \</div\>  
                   \<div id\="seed-card" class\="card card-front rounded-lg p-4 flex flex-col items-center justify-center text-center"\>\</div\>  
               \</div\>  
               \<button id\="refresh-seed" onclick\="redrawCard('seed')" class\="hidden btn-primary text-sm py-1 px-4 rounded-full mt-2 bg-gray-600 text-white hover:bg-gray-500"\>Refresh\</button\>  
           \</div\>

           \<\!-- Nurture Zone \--\>  
           \<div class\="playmat-zone rounded-lg p-6 flex flex-col items-center justify-center text-center"\>  
               \<h2 class\="text-2xl font-bold mb-4 text-yellow-300 card-title"\>🌿 Nurture Zone\</h2\>  
               \<p class\="text-gray-400 mb-4"\>Grow the idea with context.\</p\>  
               \<div id\="nurture-deck-container" class\="card-deck mb-2" onclick\="drawCard('nurture')"\>  
                    \<div class\="card card-back rounded-lg p-4 flex flex-col items-center justify-center text-center"\>  
                       \<div class\="card-icon"\>🌿\</div\>  
                       \<h3 class\="font-bold text-xl card-title"\>NURTURE\</h3\>  
                       \<p class\="text-sm text-gray-400"\>Click to draw\</p\>  
                   \</div\>  
                   \<div id\="nurture-card" class\="card card-front rounded-lg p-4 flex flex-col items-center justify-center text-center"\>\</div\>  
               \</div\>  
               \<button id\="refresh-nurture" onclick\="redrawCard('nurture')" class\="hidden btn-primary text-sm py-1 px-4 rounded-full mt-2 bg-gray-600 text-white hover:bg-gray-500"\>Refresh\</button\>  
           \</div\>

           \<\!-- Optimize Zone \--\>  
           \<div class\="playmat-zone rounded-lg p-6 flex flex-col items-center justify-center text-center"\>  
               \<h2 class\="text-2xl font-bold mb-4 text-blue-300 card-title"\>⚡ Optimize Zone\</h2\>  
               \<p class\="text-gray-400 mb-4"\>Sharpen the idea for impact.\</p\>  
               \<div id\="optimize-deck-container" class\="card-deck mb-2" onclick\="drawCard('optimize')"\>  
                    \<div class\="card card-back rounded-lg p-4 flex flex-col items-center justify-center text-center"\>  
                       \<div class\="card-icon"\>⚡\</div\>  
                       \<h3 class\="font-bold text-xl card-title"\>OPTIMIZE\</h3\>  
                       \<p class\="text-sm text-gray-400"\>Click to draw\</p\>  
                   \</div\>  
                   \<div id\="optimize-card" class\="card card-front rounded-lg p-4 flex flex-col items-center justify-center text-center"\>\</div\>  
               \</div\>  
               \<button id\="refresh-optimize" onclick\="redrawCard('optimize')" class\="hidden btn-primary text-sm py-1 px-4 rounded-full mt-2 bg-gray-600 text-white hover:bg-gray-500"\>Refresh\</button\>  
           \</div\>

           \<\!-- Visualize Zone \--\>  
           \<div class\="playmat-zone rounded-lg p-6 flex flex-col items-center justify-center text-center"\>  
               \<h2 class\="text-2xl font-bold mb-4 text-purple-300 card-title"\>🎨 Visualize Zone\</h2\>  
               \<p class\="text-gray-400 mb-4"\>Make the idea tangible.\</p\>  
               \<div id\="visualize-deck-container" class\="card-deck mb-2" onclick\="drawCard('visualize')"\>  
                    \<div class\="card card-back rounded-lg p-4 flex flex-col items-center justify-center text-center"\>  
                       \<div class\="card-icon"\>🎨\</div\>  
                       \<h3 class\="font-bold text-xl card-title"\>VISUALIZE\</h3\>  
                       \<p class\="text-sm text-gray-400"\>Click to draw\</p\>  
                   \</div\>  
                   \<div id\="visualize-card" class\="card card-front rounded-lg p-4 flex flex-col items-center justify-center text-center"\>\</div\>  
               \</div\>  
               \<button id\="refresh-visualize" onclick\="redrawCard('visualize')" class\="hidden btn-primary text-sm py-1 px-4 rounded-full mt-2 bg-gray-600 text-white hover:bg-gray-500"\>Refresh\</button\>  
           \</div\>  
       \</div\>

       \<\!-- Amplify Zone \--\>  
       \<div id\="amplify-zone" class\="bg-gray-800 rounded-lg p-8 text-center hidden"\>  
           \<h2 class\="text-3xl font-bold mb-4 text-red-300 card-title"\>📢 Amplify Zone\</h2\>  
           \<p class\="text-gray-400 mb-6"\>How can all this happen? Synthesize the cards and share your vision.\</p\>  
           \<textarea id\="vision-input" class\="w-full h-40 bg-gray-900 text-white p-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder\="Type your answer here..."\>\</textarea\>  
           \<button id\="submit-vision" class\="btn-primary font-bold py-3 px-8 rounded-full mt-6"\>Submit Vision\</button\>  
       \</div\>

   \</div\>

   \<\!-- Modal for showing result \--\>  
   \<div id\="result-modal" class\="modal fixed inset-0 z-50 hidden items-center justify-center p-4"\>  
       \<div class\="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-2xl w-full text-center"\>  
            \<h2 class\="text-3xl font-bold mb-4 text-cyan-300 card-title"\>🎉 Vision Amplified\! 🎉\</h2\>  
            \<p class\="text-gray-300 mb-6"\>You've successfully combined the elements to create a unique business concept. Here's your vision:\</p\>  
            \<div id\="modal-content" class\="text-left bg-gray-900 p-6 rounded-lg mb-6"\>  
               \<p\>\<strong class\="text-green-300"\>Seed:\</strong\> \<span id\="modal-seed"\>\</span\>\</p\>  
               \<p\>\<strong class\="text-yellow-300"\>Nurture:\</strong\> \<span id\="modal-nurture"\>\</span\>\</p\>  
               \<p\>\<strong class\="text-blue-300"\>Optimize:\</strong\> \<span id\="modal-optimize"\>\</span\>\</p\>  
               \<p\>\<strong class\="text-purple-300"\>Visualize:\</strong\> \<span id\="modal-visualize"\>\</span\>\</p\>  
               \<hr class\="my-4 border-gray-600"\>  
               \<p\>\<strong class\="text-red-300"\>Your Vision:\</strong\> \<span id\="modal-vision" class\="block mt-2 text-gray-200"\>\</span\>\</p\>  
            \</div\>  
            \<button id\="restart-game" class\="btn-primary font-bold py-3 px-8 rounded-full"\>Play Again\</button\>  
       \</div\>  
   \</div\>

   \<\!-- Alert Modal \--\>  
   \<div id\="alert-modal" class\="modal fixed inset-0 z-50 hidden items-center justify-center p-4"\>  
       \<div class\="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-sm w-full text-center"\>  
            \<h2 id\="alert-title" class\="text-2xl font-bold mb-4 text-yellow-300 card-title"\>Alert\</h2\>  
            \<p id\="alert-message" class\="text-gray-300 mb-6"\>\</p\>  
            \<button id\="alert-ok" class\="btn-primary font-bold py-2 px-6 rounded-full"\>OK\</button\>  
       \</div\>  
   \</div\>

   \<script\>  
       const decks \= {  
           seed: \[  
               "A new sneaker brand", "A neighborhood park", "Hemp-based product", "A podcast about dreams",  
               "Community mural", "Eco-friendly food truck", "AI personal assistant for teens", "A rooftop garden",  
               "Pop-up bookstore", "Recycled fashion line", "Local farmers’ co-op", "Interactive art festival",  
               "Smart bike helmet", "A mobile meditation booth", "Esports café", "Self-sustaining tiny home",  
               "Music mentorship program", "Solar-powered streetlights", "Dog park with AI toys", "Upcycled furniture brand",  
               "Kids coding camp", "AR city walking tour", "Blockchain-based charity fund", "Immersive theater show",  
               "Zero-waste grocery store", "Floating community center", "Plant-based skincare line", "Drone-powered delivery for seniors",  
               "Wellness retreat in the city", "Onchain scavenger hunt", "Musical instrument rental service", "Virtual classroom for elders",  
               "Streetwear NFT brand", "Smart vending machines", "Podcasting van", "Community kitchen hub",  
               "Skate park with solar panels", "Language learning game", "Mobile repair co-op", "Festival powered by bikes",  
               "Wearable health tracker jewelry", "Gamified fitness challenge", "Eco-conscious nightclub", "Podcast for kids",  
               "Floating garden barge", "Crypto-funded art residency", "Outdoor VR arena"  
           \],  
           nurture: \[  
               "Add a backstory about why it matters", "Name one resource it would need", "Connect it to a global issue",  
               "Add a personal memory", "Name a group it could empower", "Tell how it reduces stress",  
               "Link it to education", "Add a cultural influence", "Make it connect to nature", "Add a family-friendly angle",  
               "Tie it to history", "Make it seasonal", "Show how it helps a city", "Add a wellness benefit",  
               "Connect it to music", "Add a sports connection", "Make it youth-focused", "Tie it to local traditions",  
               "Add a mentor role", "Give it a hero story", "Connect it to art", "Show how it heals or repairs",  
               "Add a tech angle", "Tie it to community pride", "Make it mobile", "Add a festival vibe",  
               "Connect it to health", "Add a sustainability story", "Tie it to water or air", "Make it intergenerational",  
               "Add a storytelling angle", "Link it to fashion", "Connect it to science", "Tie it to spirituality",  
               "Add a food element", "Connect it to local businesses", "Make it global", "Make it neighborhood-focused",  
               "Add a play or game aspect", "Show how it creates jobs", "Tie it to joy and fun", "Make it activist-driven",  
               "Add a volunteer angle", "Connect it to digital culture", "Show how it saves time", "Add a personal testimony",  
               "Make it ritualistic"  
           \],  
           optimize: \[  
               "Add AI automation", "Cut costs by half", "Make it solar-powered", "Add blockchain for trust",  
               "Scale it globally", "Make it subscription-based", "Add gamification", "Optimize supply chain",  
               "Partner with schools", "Reduce waste", "Add open-source collaboration", "Create a digital twin",  
               "Add predictive analytics", "Localize it for different cultures", "Add real-time feedback", "Cut steps from process",  
               "Add AR/VR", "Add personalization", "Build loyalty rewards", "Make it crowdfundable",  
               "Add self-service", "Make it voice-activated", "Add community voting", "Use recycled materials",  
               "Automate marketing", "Add referral program", "Streamline with QR codes", "Add delivery or pickup options",  
               "Tie to existing platforms", "Reduce energy consumption", "Add sponsorship model", "Create modular design",  
               "Add smart contracts", "Optimize for accessibility", "Add data insights dashboard", "Create tiers of engagement",  
               "Add live streaming", "Reduce carbon footprint", "Add mobile-first experience", "Create an API for others",  
               "Make it hackathon-friendly", "Add plug-and-play features", "Build a marketplace layer", "Simplify sign-up process",  
               "Add AI agents", "Connect to wearable tech", "Add hybrid virtual/in-person model"  
           \],  
           visualize: \[  
               "Write a 5-word slogan", "Draw or describe a logo", "Pitch it like a startup",  
               "Make a quick jingle/chant", "Sketch the first customer", "Name the flagship product",  
               "Write a 30-second ad script", "Act out a user interaction", "Design a collectible version",  
               "Create a social media post", "Write the first press headline", "Create a meme for it",  
               "Draw the physical space", "Write its theme song title", "Roleplay the first customer review",  
               "Create a mascot", "Write a tweet thread starter", "Make a TikTok challenge idea",  
               "Imagine its first billboard", "Draft a press release title", "Create its mobile app splash screen",  
               "Name the launch event", "Create a fictional testimonial", "Draw the packaging",  
               "Describe its website homepage", "Write a short brand manifesto", "Create a character that uses it",  
               "Imagine the first news clip", "Write a product haiku", "Design a futuristic prototype sketch",  
               "Draft a loyalty program idea", "Name the first sponsor/partner", "Write an elevator pitch",  
               "Create its first AR filter", "Make up a commercial tagline", "Design its uniforms or merch",  
               "Write its first 1-star review", "Roleplay the founder speech", "Create the crowdfunding pitch title",  
               "Design a limited-edition version", "Write the opening scene of its movie", "Create a meme reaction for it",  
               "Draw its app icon", "Write the first podcast ad read", "Name its community hub",  
               "Create the launch party invite", "Make the first billboard slogan"  
           \]  
       };

       const icons \= {  
           seed: '🌱',  
           nurture: '🌿',  
           optimize: '⚡',  
           visualize: '🎨'  
       };

       const colors \= {  
           seed: 'green',  
           nurture: 'yellow',  
           optimize: 'blue',  
           visualize: 'purple'  
       };

       let drawnCards \= {  
           seed: null,  
           nurture: null,  
           optimize: null,  
           visualize: null  
       };  
        
       let remainingDecks \= {...decks};

       function drawCard(deckName) {  
           if (drawnCards\[deckName\]) return; // Card already drawn from this deck

           if (remainingDecks\[deckName\] && remainingDecks\[deckName\].length \> 0) {  
               const cardIndex \= Math.floor(Math.random() \* remainingDecks\[deckName\].length);  
               const cardText \= remainingDecks\[deckName\]\[cardIndex\];  
                
               // Remove the card from the deck to prevent re-drawing  
               remainingDecks\[deckName\].splice(cardIndex, 1);

               drawnCards\[deckName\] \= cardText;  
               const cardElement \= document.getElementById(\`${deckName}\-card\`);  
                
               cardElement.innerHTML \= \`  
                   \<div class="card-icon"\>${icons\[deckName\]}\</div\>  
                   \<p class="font-semibold text-lg"\>${cardText}\</p\>  
               \`;  
                
               const deckContainer \= document.getElementById(\`${deckName}\-deck-container\`);  
               deckContainer.classList.add('flipped');  
                
               document.getElementById(\`refresh-${deckName}\`).classList.remove('hidden');

               // Check if all cards are drawn  
               if (Object.values(drawnCards).every(card \=\> card \!== null)) {  
                   document.getElementById('amplify-zone').classList.remove('hidden');  
               }  
           }  
       }

       function redrawCard(deckName) {  
           const currentCardText \= drawnCards\[deckName\];

           if (currentCardText) {  
               // Put the card back in the deck  
               remainingDecks\[deckName\].push(currentCardText);  
               drawnCards\[deckName\] \= null;

               // Flip the card back  
               const deckContainer \= document.getElementById(\`${deckName}\-deck-container\`);  
               deckContainer.classList.remove('flipped');  
                
               // Hide the refresh button  
               document.getElementById(\`refresh-${deckName}\`).classList.add('hidden');

               // Hide the amplify zone as the set is now incomplete  
               document.getElementById('amplify-zone').classList.add('hidden');

               // Optional: clear the content after the flip animation starts  
               setTimeout(() \=\> {  
                   const cardElement \= document.getElementById(\`${deckName}\-card\`);  
                   cardElement.innerHTML \= '';  
               }, 300); // half of the transition duration  
           }  
       }

       function showAlert(message, title \= 'Alert') {  
           document.getElementById('alert-title').textContent \= title;  
           document.getElementById('alert-message').textContent \= message;  
           document.getElementById('alert-modal').style.display \= 'flex';  
       }  
        
       document.getElementById('alert-ok').addEventListener('click', () \=\> {  
           document.getElementById('alert-modal').style.display \= 'none';  
       });

       document.getElementById('submit-vision').addEventListener('click', () \=\> {  
           const visionText \= document.getElementById('vision-input').value;  
           if (visionText.trim() \=== '') {  
               // simple validation  
               showAlert('Please share your vision before submitting.');  
               return;  
           }

           document.getElementById('modal-seed').textContent \= drawnCards.seed;  
           document.getElementById('modal-nurture').textContent \= drawnCards.nurture;  
           document.getElementById('modal-optimize').textContent \= drawnCards.optimize;  
           document.getElementById('modal-visualize').textContent \= drawnCards.visualize;  
           document.getElementById('modal-vision').textContent \= visionText;

           document.getElementById('result-modal').style.display \= 'flex';  
       });

       document.getElementById('restart-game').addEventListener('click', () \=\> {  
           // Reset game state  
           drawnCards \= { seed: null, nurture: null, optimize: null, visualize: null };  
           remainingDecks \= JSON.parse(JSON.stringify(decks)); // Deep copy to restore decks

           // Reset UI  
           document.getElementById('result-modal').style.display \= 'hidden';  
           \['seed', 'nurture', 'optimize', 'visualize'\].forEach(deckName \=\> {  
               const deckContainer \= document.getElementById(\`${deckName}\-deck-container\`);  
               deckContainer.classList.remove('flipped');  
               const cardElement \= document.getElementById(\`${deckName}\-card\`);  
               cardElement.innerHTML \= ''; // Clear card content  
               document.getElementById(\`refresh-${deckName}\`).classList.add('hidden');  
           });

           document.getElementById('amplify-zone').classList.add('hidden');  
           document.getElementById('vision-input').value \= '';  
           document.getElementById('result-modal').style.display \= 'none';  
       });

   \</script\>  
\</body\>  
\</html\>

