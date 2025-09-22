## AI-Driven Smart Study Preparation (Prototype)

A minimal, aesthetic, and modern prototype (no frameworks) showcasing an AI-guided study experience: landing page, dashboard, smart test flow, and progress tracking.

### Features
- **Modern UI**: clean, dashboard-like layout with Inter/Poppins typography
- **Light/Dark mode**: smooth transitions and persistent preference
- **SPA-like navigation**: fetch + History API (no full page reloads)
- **Mock data**: stats, MCQs, results, and charts
- **Charts**: Chart.js via CDN
- **Zero build**: plain HTML, CSS, and JavaScript

### Color Palette
- **Primary**: `#5A67D8` (Indigo Blue)
- **Secondary**: `#38B2AC` (Teal)
- **Accent**: `#F6AD55` (Warm Orange)
- **Background Light**: `#F7FAFC`
- **Background Dark**: `#1A202C`
- **Text Light**: `#2D3748`
- **Text Dark**: `#EDF2F7`

### Pages
- **Landing** (`index.html`): Hero, feature highlights, CTA
- **Dashboard** (`dashboard.html`): Sidebar, quick stats, suggested test, weekly chart
- **Smart Test** (`test.html`): Start test, MCQs, scoring, recommendations
- **Progress** (`progress.html`): Accuracy/Practice charts, strong/weak areas
- **About** (`about.html`): NEP, UNESCO alignment, EdTech value

### Tech Stack
- **HTML5**, **CSS3**, **Vanilla JavaScript**
- **Chart.js** (CDN)
- **Google Fonts**: Inter, Poppins

### Project Structure
```
Achal/
├─ index.html        # Landing page
├─ dashboard.html    # Dashboard
├─ test.html         # Smart Test
├─ progress.html     # Progress
├─ about.html        # About & references
├─ style.css         # Shared styles (light/dark themes)
├─ script.js         # SPA routing, theme, charts, mock test logic
└─ README.md         # This file
```

### Getting Started
You can open `index.html` directly. For best results (SPA routing uses fetch), run a local server.

- **Python (3.x)**:
```powershell
python -m http.server 5500
```
- **Node (npx)**:
```powershell
npx http-server -p 5500
```
Then open `http://localhost:5500/`.

### Notes
- **Mocked data** only; for demonstration.
- Theme preference stored in `localStorage`.
- Charts render with theme-aware colors at initialization.

### Customization
- **Theme/colors**: update CSS variables in `style.css` (`:root` and `:root.dark`).
- **Content/MCQs**: edit HTML copy and `mockQuestions` in `script.js`.
- **Charts**: adjust datasets/options in `script.js`.

### License
For demo and educational use. Customize and extend as needed.
