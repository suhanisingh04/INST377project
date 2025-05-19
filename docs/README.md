Healthcare Metrics Dashboard

Project Title

Healthcare Metrics Dashboard: Visualizing CMS Performance Data

📡 Live Site

Visit the Deployed App Here:👉 https://inst377project-suhani-singhs-projects-651c0451.vercel.app/

Description

This project is a web-based interactive dashboard that visualizes national healthcare performance metrics using real-time public data from the Centers for Medicare & Medicaid Services (CMS). The application focuses on three critical categories: Emergency Department metrics, Healthcare Personnel Vaccination rates, and Sepsis Care outcomes. It allows users to explore healthcare performance trends and submit anonymous comments to provide feedback.

The dashboard is built using HTML, CSS Grid/Flexbox, JavaScript, Chart.js, and Supabase for real-time backend functionality. It also uses the Pixabay API to enhance user experience with dynamic healthcare-related imagery.

Target Browsers

This application is fully responsive and tested to work on the following:

✅ Google Chrome (desktop & mobile)

✅ Safari (iOS)

✅ Firefox

✅ Microsoft Edge

# Developer Manual

Project Setup

Note: This project fulfills the Node.js backend requirement through Vercel's built-in serverless API routes, which allow us to run server-side JavaScript in a Node environment without setting up a manual Express.js server.

1. Install the Project and Dependencies

You must have Node.js and npm installed.

# Clone the repository
git clone https://github.com/YOUR_USERNAME/inst377-healthcare-dashboard.git
cd inst377-healthcare-dashboard

# Install Supabase client dependency
npm install

2. Add Environment Variables

Note: A local .env file was not used during development, as all API keys were securely configured in Vercel’s Environment Variables panel.

SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-anon-key
PIXABAY_API_KEY=your-pixabay-api-key

3. File Structure Overview

project-root/
├── index.html
├── about.html
├── dashboard.html
├── styleProject.css
├── package.json
├── .env
├── /api
│   ├── comments.js       # GET comments
│   ├── submit.js         # POST new comment
│   └── pixabay.js        # GET image from Pixabay
└── /docs
    └── README.md         # This file

Running the Application

You can deploy the app using Vercel or test it locally using any static file server for the frontend.

Deploy on Vercel

Import the GitHub repo to Vercel

Set environment variables under Project > Settings > Environment Variables

Vercel auto-detects and deploys API routes from the /api folder

Local Testing (Frontend only)

npx serve .
# Then visit http://localhost:5000 in your browser

API Reference

/api/submit (POST)

Description: Submit a new anonymous comment

Request Body:

{
  "text": "Your comment here"
}

Response:

201 Created on success

400 Bad Request for invalid input

500 Internal Server Error if insert fails

/api/comments (GET)

Description: Retrieve recent comments sorted by timestamp

Response:

[
  { "id": 1, "text": "Great site!", "timestamp": "..." },
  ...
]

/api/pixabay (GET)

Description: Fetch a random healthcare-related image from Pixabay
Response: JSON payload of image hits

Known Bugs & Limitations

Anonymous comment submission does not include moderation/spam filtering

No authentication system (all access is public)

Relies on Supabase's free tier — may have usage limits

Future Development Roadmap

Add filtering or search for metrics

Improve accessibility (ARIA roles, keyboard nav)

Add user login system for authenticated feedback

Integrate more granular state-level CMS data

Contributors

Suhani Singh (Frontend, API integration, Supabase backend)
