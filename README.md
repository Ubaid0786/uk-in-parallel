# Kashmir University Parody Website

A humorous parody website of a university results portal with intentionally chaotic design and functionality.

## Features

- Fake results checking system
- AI assistant that gives questionable answers
- Random conspiracy theory generator
- Fake virus alerts
- University circulars generator
- And many more absurd features!

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- AI Integration: Hugging Face API (Mistral-7B-Instruct)
- Deployment: Render

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Run the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3002](http://localhost:3002) in your browser (or the port shown in the console)

## Deployment to Render

This project is configured for easy deployment to Render.

### Automatic Deployment

1. Push your code to a GitHub repository
2. Log in to [Render](https://render.com)
3. Click "New" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - Name: `kashmir-university-parody` (or any name you prefer)
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node src/backend/server.js`
   - Add the following environment variables:
     - `NODE_ENV`: `production`
     - `PORT`: `10000`
     - `HUGGINGFACE_API_TOKEN`: Your Hugging Face API token

6. Click "Create Web Service"

### Testing the API

To check if the Hugging Face API is working correctly:

```
npm run check-api
```

This will make a test request to the Hugging Face API and display the response.

## Environment Variables

The following environment variables need to be set in Render:

- `HUGGINGFACE_API_TOKEN`: API token for Hugging Face (for AI assistant)
- `NODE_ENV`: Set to `production` for deployment
- `PORT`: Set to `10000` for Render

## Project Structure

- `/public`: Static files and HTML
- `/src/frontend`: Frontend JavaScript and CSS
- `/src/backend`: Express server and API routes
- `/scripts`: Utility scripts for development and deployment

## License

This project is a parody and is meant for educational and entertainment purposes only. 