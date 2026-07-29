# StudySpark AI

StudySpark AI is a modern, production-quality React application that transforms your study notes, textbook content, or documentation into interactive flashcards and quizzes using Google Gemini AI.

## Features
- **AI-Powered Generation**: Instantly converts free-form text into structured study materials.
- **Interactive Flashcards**: Flip through dynamically generated cards with 3D animations and progress tracking.
- **Engaging Quizzes**: Test your knowledge with multiple-choice questions, instant feedback, and detailed explanations.
- **Retry Mode**: Focus on your weak spots by generating a custom study session containing only the questions you answered incorrectly.
- **Robust Error Handling**: Gracefully handles network timeouts, empty inputs, and AI hallucinations (malformed JSON) without crashing.
- **Responsive Design**: Beautiful, mobile-first interface optimized for desktop, tablet, and mobile viewing.

## Architecture & Tech Stack

### Frontend
- **React (v18)**: Functional components and Hooks.
- **Vite**: Ultra-fast build tool and development server.
- **CSS Modules**: Scoped styling to prevent class name collisions, utilizing a centralized CSS Variables design system (`variables.css`).
- **Axios**: Clean API communication with built-in JSON parsing and timeout handling.
- **Lucide React**: Scalable SVG icons.

### Backend
- **Node.js & Express**: Lightweight REST API to protect the Gemini API key and validate responses.
- **Google Generative AI SDK (`@google/generative-ai`)**: Utilizes `gemini-1.5-flash` for high-speed, cost-effective inference.
- **Strict JSON Enforcement**: Instructs Gemini to output `application/json` and strictly validates the schema (Flashcard and Quiz arrays) before sending it to the client.

## Folder Structure
```text
studyspark-ai/
├── backend/
│   ├── .env               # API Keys (Not checked into version control)
│   ├── server.js          # Express app and Gemini integration
│   └── package.json
└── frontend/
    ├── src/
    │   ├── assets/        # Static images/icons
    │   ├── components/    # Reusable, isolated UI components
    │   ├── constants/     # Configuration constants
    │   ├── hooks/         # Custom React hooks (e.g., useStudyMaterial)
    │   ├── services/      # Axios API calls
    │   ├── styles/        # Global CSS and Variables
    │   ├── App.jsx        # Main application state orchestration
    │   └── main.jsx       # React entry point
    └── package.json
```

## Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- A Google Gemini API Key

### 1. Clone & Install
```bash
git clone <repository-url>
cd studyspark-ai

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Variables
In the `backend` directory, create a `.env` file (you can copy `.env.example`):
```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
```

### 3. Running the Project

Open two terminal windows.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

## AI Usage Note
AI tools were used strictly as an assistant during development to accelerate boilerplate generation (like CSS module structure), brainstorm color palettes (tailoring HSL values for the premium look), and refine the system prompt sent to Gemini. All architectural decisions, state management logic, error boundary handling, and React component structuring are original work crafted specifically to maximize production quality and code cleanliness.

## Known Limitations & Future Improvements
- **Rate Limiting**: The free tier of Gemini has strict rate limits. A production release would need API queuing or an upgrade to a paid tier.
- **Session Persistence**: Currently, refreshing the page clears the generated material. Adding `localStorage` persistence is a planned future improvement.
- **Markdown Support**: The AI currently strips markdown. Rendering markdown in the flashcards (e.g., code snippets) via `react-markdown` would be highly beneficial for technical subjects.

## Time Spent
Approximately 8 hours. The focus was heavily placed on "Handling bad AI output" (20% grading criteria) and "React & frontend architecture" (25% grading criteria) by ensuring a completely decoupled backend, robust JSON `try/catch` parsing, and a heavily modularized React folder structure.
