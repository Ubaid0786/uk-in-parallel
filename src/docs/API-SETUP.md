# Secure API Setup Instructions

This project uses a Hugging Face API for AI responses. To protect the API key, we've implemented a server-side approach.

## Setup Instructions

1. **Get a Hugging Face API Token**
   - Create an account at [Hugging Face](https://huggingface.co/join)
   - Generate a token at [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

2. **Configure Environment Variables**
   - Copy the `.env.example` file to create a new file called `.env`
   ```
   cp .env.example .env
   ```
   - Edit the `.env` file and replace `your_api_token_here` with your actual Hugging Face API token

3. **Install Dependencies**
   ```
   npm install
   ```

4. **Start the Server**
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

5. **Access the Website**
   - You can access the website in one of two ways:
     - Through the Express server: `http://localhost:3000`
     - Through a separate development server (like VS Code Live Server): `http://localhost:5500` or `http://127.0.0.1:5500`

## Development Server Configuration

If you're using a separate development server (like VS Code's Live Server) to serve the HTML/CSS/JS files:

1. Make sure your API server is running on port 3000: `npm start`
2. In the client-side code (script.js), the API URL is set to `http://localhost:3000/api/ai-assistant`
3. CORS is configured to allow requests from:
   - `http://localhost:5500`
   - `http://127.0.0.1:5500`
   - `http://localhost:3000`

If you need to use a different port for your development server, add it to the CORS configuration in `server.js`.

## Security Notes

- The API key is now stored securely in the `.env` file and used only on the server side
- Never commit your `.env` file to version control (it's included in `.gitignore`)
- The client-side JavaScript no longer contains the API key
- All API requests are proxied through the server, keeping the API key secure

## Troubleshooting

If you encounter issues with the AI responses:

1. Check that your Hugging Face API token is valid
2. Ensure the `.env` file is properly configured
3. Check the server console for any error messages
4. If you see a "Method Not Allowed" error, make sure:
   - The API server is running on port 3000
   - The client is correctly pointing to `http://localhost:3000/api/ai-assistant`
   - Your development server's origin is included in the CORS configuration
5. If needed, the system will automatically fall back to pre-defined responses 