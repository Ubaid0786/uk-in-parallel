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
- Deployment: Vercel

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
5. Open [http://localhost:3002](http://localhost:3002) in your browser

## Deployment to Vercel

This project is configured for easy deployment to Vercel.

### Automatic Deployment

1. Push your code to a GitHub repository
2. Import the project in Vercel dashboard
3. Vercel will automatically detect the configuration and deploy the project

### Manual Deployment

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```
2. Login to Vercel:
   ```
   vercel login
   ```
3. Deploy the project:
   ```
   vercel
   ```

## Environment Variables

The following environment variables need to be set in Vercel:

- `HUGGINGFACE_API_TOKEN`: API token for Hugging Face (for AI assistant)

## Project Structure

- `/public`: Static files and HTML
- `/src/frontend`: Frontend JavaScript and CSS
- `/src/backend`: Express server and API routes
- `/api`: Vercel serverless functions

## License

This project is a parody and is meant for educational and entertainment purposes only. 