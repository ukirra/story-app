# Story App

## <a name="introduction"></a> Introduction
Story App is a platform for writing, managing, and reading stories. This application allows users to create new stories, edit information, add chapters, and view story details easily. Built using the **MERN stack** (MongoDB, ExpressJS, ReactJS, NodeJS), it focuses on providing a smooth and intuitive user experience.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Libraries](#libraries)
- [Project Structure](#project-structure)
- [Deployment URL](#deployment-url)
- [Backend Repository](#backend-repo)

## <a name="features"></a> Features

- **Story List** — Display all created stories in a clean table view
- **Add Story** — Create a new story with title, author, synopsis, category, tags, cover image, and status (Publish/Draft)
- **Story Detail** — View full story information including metadata and list of chapters
- **Edit Story** — Update story fields: title, author, synopsis, category, tags, cover image, and status
- **Add Chapter** — Add a new chapter with title and content to a story
- **List Chapters** — View and manage all chapters under a story, with options to edit or delete

## <a name="libraries"></a> Libraries

### Backend
- ExpressJS
- MongoDB + Mongoose
- CORS
- dotenv
- body-parser

### Frontend
- ReactJS
- React Router DOM
- TailwindCSS
- React Icons

## <a name="project-structure"></a> Project Structure

```bash
story-app/
├── client/                        # Frontend React + Vite + Tailwind
│   ├── public/
│   ├── src/
│   │   ├── assets/         
│   │   ├── data/           
│   │   ├── pages/                 # Main pages
│   │   │   ├── AddChapter.jsx
│   │   │   ├── AddStory.jsx
│   │   │   ├── EditStory.jsx
│   │   │   ├── StoryDetail.jsx
│   │   │   └── StoryList.jsx
│   │   ├── App.jsx                # Root application components
│   │   ├── main.jsx               # Entry point React
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                        # Backend (Node.js + Express)
│   ├── data/
│   │   └── stories.json           # Data dummy 
│   ├── models/
│   │   └── Story.js               # Model 
│   ├── routes/
│   │   └── stories.js             # Routing endpoint 
│   ├── index.js                   # Entry point backend
│   └── .env
│
├── index.html                     # Vite HTML template
├── tailwind.config.js             # Tailwind configuration
└── vite.config.js                 # Vite configuration
```

**Note:** The backend of this project is located in a separate repository and handles the REST API for story management.

## <a name="deployment-url"></a> Deployment URL

Frontend deployed via Vercel:
- [Live Application](https://story-app-psi.vercel.app)

## <a name="backend-repo"></a> Backend Repository and Deployment URL

Access the backend repository here:
- [Backend Repository](https://github.com/ukirra/story-app-backend)
- [Live Backend API](https://story-app-backend-production-7ff6.up.railway.app/)

---
