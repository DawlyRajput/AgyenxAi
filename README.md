# AgenyxAI

AgenyxAI is a multi-agent AI assistant built with React, Node.js, Express, and LangGraph.

Instead of sending every request to a single AI model, AgenyxAI uses a router-based workflow to identify the type of request and route it to the appropriate specialized agent.

## Features

- Multi-agent AI architecture using LangGraph
- Intelligent request routing
- General-purpose AI chat
- Web search
- Coding assistance
- PDF-related tasks
- PowerPoint generation
- Vision-based queries
- Conversation and message history
- User authentication
- Redis-based conversation memory
- React-based chat interface
- Redux state management

## Architecture

The application follows a router-based agent architecture:

```text
User
  |
  v
React Frontend
  |
  v
Express API
  |
  v
Agent Controller
  |
  v
LangGraph Router
  |
  +--------+--------+--------+--------+--------+
  |        |        |        |        |        |
  v        v        v        v        v        v
 Chat    Search   Coding    PDF      PPT    Vision
 Agent    Agent    Agent    Agent    Agent    Agent
  |
  v
AI Response
  |
  v
React Frontend
MultiAiAgent/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   │   ├── userSlice.js
│   │   │   ├── conversationSlice.js
│   │   │   └── messageSlice.js
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── graph/
│   │   ├── graph.js
│   │   ├── router.js
│   │   ├── chat.js
│   │   ├── search.js
│   │   ├── coding.js
│   │   ├── pdf.js
│   │   ├── ppt.js
│   │   └── vision.js
│   ├── models/
│   └── package.json
│
└── README.md
