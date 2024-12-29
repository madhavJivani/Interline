# Interline - Code Editor Project

## Project Overview
**Interline** is a code editor built with React that provides an IDE-like interface for coding. It supports multiple languages, offers features such as code execution, syntax highlighting, auto-indentation, bracket highlighting, keybinding, find/replace functionality, and code wrapping similar to VS Code. Users can create, edit, and manage their code files, as well as interact with an AI chatbot for coding assistance.

## Tech Stack

### Frontend:
- **React (JS)**: A powerful and flexible JavaScript library for building user interfaces.
- **Vite**: A fast build tool that optimizes the development experience.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.
- **ShadCN**: A UI component library used for creating consistent and customizable user interfaces.
- **Monaco Editor**: A lightweight code editor that supports syntax highlighting, autocompletion, and more, used as the core editor for coding.
- **Piston API**: A simple API for compiling and executing code in multiple languages.

### Backend:
- **Appwrite**: A backend-as-a-service (BaaS) solution for handling user authentication, file storage, and databases.
  - Provides user authentication (including Google OAuth login).
  - Real-time database (Firestore equivalent) for storing user files and project data.
  - Self-hosted options for control and scalability.
  
### AI Chatbot:
- **OpenAI API**: An AI assistant that helps with code writing and debugging, integrated into the IDE for user assistance.

## Features
- **Multilanguage Support**: Ability to write and execute code in multiple programming languages.
- **Code Editor**:
  - Syntax highlighting, auto-indentation, and bracket highlighting.
  - Keybindings for a smoother coding experience.
  - Find/Replace functionality (Ctrl+F, Ctrl+H).
  - Code wrapping for better readability.
- **Terminal**:
  - Input section for both text and file-based inputs.
  - Output section to show code results or errors.
- **Authentication**:
  - Google sign-in and custom authentication methods.
  - Secure user management with Appwrite.
- **Code Management**:
  - Users can create, edit, delete, rename, and download their code files.
- **AI Chatbot**:
  - Integrated with OpenAI to help users write and debug code.
