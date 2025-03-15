# Kashmir University Parody Website

A humorous parody website with a sarcastic AI assistant. This project is meant for entertainment purposes only.

## Project Structure

```
kashmir-university-parody/
├── public/               # Static files
│   └── index.html        # Main HTML file
├── src/
│   ├── backend/          # Server-side code
│   │   ├── controllers/  # API controllers
│   │   │   └── aiController.js
│   │   ├── middleware/   # Express middleware
│   │   │   └── cors.js
│   │   ├── routes/       # API routes
│   │   │   └── api.js
│   │   ├── utils/        # Utility functions
│   │   │   └── env.js    # Environment variable handler
│   │   └── server.js     # Main server entry point
│   ├── frontend/         # Client-side code
│   │   ├── assets/       # Images and media files
│   │   ├── css/          # Stylesheets
│   │   │   └── styles.css
│   │   └── js/           # JavaScript files
│   │       ├── script.js # Main application script
│   │       └── ai-assistant.js # AI assistant functionality
│   └── docs/             # Documentation
│       └── API-SETUP.md  # API setup instructions
├── .env                  # Environment variables (not in version control)
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kashmir-university-parody.git
cd kashmir-university-parody
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Hugging Face API token (see `src/docs/API-SETUP.md` for instructions).

### Running the Application

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

The application will be available at http://localhost:3000

## Features

- Parody university website with humorous content
- AI-powered assistant that gives sarcastic and often incorrect responses
- Fallback responses when AI service is unavailable
- Interactive UI elements

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **AI Integration**: Hugging Face API (Mistral-7B-Instruct)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 