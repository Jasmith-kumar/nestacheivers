<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:** Node.js

1. **Install dependencies** (from project root):  
   `npm install`  
   This installs frontend and server dependencies (server is installed automatically).

2. **Run everything:**  
   `npm run dev`  
   This starts **both** the frontend and the server:
   - **Frontend** at http://localhost:3000
   - **Server** at http://localhost:5000

3. **Dashboard:** Go to **/dashboard**, sign in with **admin** / **admin123** to view contact form submissions.

**Optional:**
- **MongoDB:** To keep submissions across server restarts, create `server/.env` and set `MONGO_URI` to your MongoDB connection string. Without it, submissions are stored in memory (reset when the server restarts).
- **Dashboard login:** Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `server/.env` to change the dashboard credentials.
- **Chatbot:** Set `GEMINI_API_KEY` in `.env` or `.env.local` for the chatbot.
