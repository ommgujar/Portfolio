Om Gujar | Developer Portfolio

A responsive, single-page developer portfolio built with vanilla HTML, CSS, and JavaScript. Showcases full-stack MERN projects, a LeetCode/DSA problem-solving showcase, tech stack, and a contact section — with a light/dark theme toggle and no framework dependencies.

✨ Features
Light / Dark theme toggle with saved preference across visits
Responsive design — clean layout from desktop down to mobile
LeetCode / DSA showcase with expandable solution code blocks
Project case-study modals for detailed architecture breakdowns
One-click email copy in the contact section
Smooth scroll navigation with a collapsible mobile menu
Custom profile photo support with automatic fallback to a default avatar if no photo is provided
🛠️ Built With
HTML5 — semantic structure
CSS3 — custom properties (CSS variables), Grid & Flexbox, no framework
Vanilla JavaScript — no build tools or dependencies
Font Awesome — icons
Google Fonts — Outfit, Plus Jakarta Sans, Fira Code
📁 Project Structure
mern-portfolio/
├── index.html      # Page markup and content
├── styles.css       # All styling, theming, and responsive rules
├── script.js         # Theme toggle, modals, form, and interactivity
└── profile.jpg       # Your profile photo (optional — falls back to an avatar icon)
🚀 Getting Started
Clone the repository
bash
   git clone https://github.com/omgujar/mern-portfolio.git
   cd mern-portfolio
Add your photo (optional) Place a photo named profile.jpg in the project root. If it's missing, a default avatar icon is shown automatically.
Open the site Simply open index.html in your browser, or serve it locally with any static server, e.g.:
bash
   npx live-server

No build step, no dependencies to install — it just runs.

🎨 Customization
Colors & theme tokens — edit the CSS variables at the top of styles.css (:root and [data-theme="light"])
Content — update text, links, and project details directly in index.html
LeetCode problems — add cards inside the .leetcode-grid container in index.html (a commented template is included in the file)
Projects — duplicate a .project-card block in the Projects section and update its content
Case study modal content — edit the caseStudies object in script.js

