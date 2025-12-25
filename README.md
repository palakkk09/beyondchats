# BeyondChats Automation Project

This repository contains a **monolithic project** for BeyondChats, including:

- **Laravel Backend**: Stores and manages articles in MySQL and exposes CRUD APIs.  
- **NodeJS Worker**: Automates fetching the latest article, searches Google for related content, scrapes reference articles, rewrites content using an LLM, and updates the backend.  
- **React Frontend**: Displays both original and updated articles with a clean UI.  

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Architecture & Data Flow](#architecture--data-flow)  
3. [Local Setup Instructions](#local-setup-instructions)  
4. [Folder Structure](#folder-structure)  
5. [Deployment](#deployment)  
6. [Live Demo](#live-demo)  
7. [Credits](#credits)  

---

## Project Overview

This project demonstrates an automated content rewriting system:

1. **Backend**: Laravel handles storing articles, exposing REST APIs (`/api/articles`, `/api/articles/latest`).  
2. **NodeJS Worker**: Automatically fetches the latest article, finds reference articles via Google, scrapes content, rewrites using OpenAI LLM, and updates Laravel.  
3. **Frontend**: React app that fetches articles via API and shows both original and updated content to users.

---

## Architecture & Data Flow

# BeyondChats Automation Project

This repository contains a **monolithic project** for BeyondChats, including:

- **Laravel Backend**: Stores and manages articles in MySQL and exposes CRUD APIs.  
- **NodeJS Worker**: Automates fetching the latest article, searches Google for related content, scrapes reference articles, rewrites content using an LLM, and updates the backend.  
- **React Frontend**: Displays both original and updated articles with a clean UI.  

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Architecture & Data Flow](#architecture--data-flow)  
3. [Local Setup Instructions](#local-setup-instructions)  
4. [Folder Structure](#folder-structure)  
5. [Deployment](#deployment)  
6. [Live Demo](#live-demo)  
7. [Credits](#credits)  

---

## Project Overview

This project demonstrates an automated content rewriting system:

1. **Backend**: Laravel handles storing articles, exposing REST APIs (`/api/articles`, `/api/articles/latest`).  
2. **NodeJS Worker**: Automatically fetches the latest article, finds reference articles via Google, scrapes content, rewrites using OpenAI LLM, and updates Laravel.  
3. **Frontend**: React app that fetches articles via API and shows both original and updated content to users.

---

## Architecture & Data Flow

| Laravel Backend | <------ | NodeJS Worker | ------> | LLM API (OpenAI) |
| (MySQL DB) | | (Automation) | | |
| | | | | |
+-----------------+ +-------------------+ +------------------+
^
| REST API
|
+------------------+
| |
| React Frontend |
| |


**Flow Explanation**:

1. **Initial Data**: Laravel stores initial articles in MySQL.  
2. **Automation Phase**: NodeJS worker:
   - Fetches the latest article (`/api/articles/latest`)  
   - Searches Google for reference articles  
   - Scrapes content of top references  
   - Rewrites article using OpenAI API  
   - Updates Laravel via `/api/articles` POST request  
3. **Frontend**: Displays original and updated articles in React UI.

---

## Local Setup Instructions

### Prerequisites

- **PHP >= 8.0**  
- **Composer**  
- **NodeJS >= 18**  
- **npm / yarn**  
- **MySQL**  

---

### Backend Setup (Laravel)

```bash
# Go to backend folder
cd backend-laravel

# Install dependencies
composer install

# Copy .env.example to .env and configure your MySQL credentials
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Start server
php artisan serve

Laravel backend will run at http://127.0.0.1:8000.

NodeJS Worker Setup
# Go to NodeJS worker folder
cd worker-node

# Install dependencies
npm install

# Create .env file with the following:
OPENAI_API_KEY=<your_openai_api_key>
API_BASE_URL=http://127.0.0.1:8000/api

# Run the worker
node index.js

The worker will automatically fetch, rewrite, and publish updated articles.

FRONTEND SETUP-REACT
# Go to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file with:
REACT_APP_API_BASE=http://127.0.0.1:8000/api

# Start frontend
npm start

React app will run at http://localhost:3000.

FOLDER STRUCTURE
backend-laravel/   # Laravel backend
  ├─ app/           # Controllers, Models, Providers
  ├─ database/      # Migrations & seeds
  ├─ routes/api.php # API routes
  └─ .env           # Environment variables

worker-node/       # NodeJS automation worker
  ├─ index.js      # Orchestrator script
  ├─ services/     # Article, scraper, rewriter, publisher, Google search
  └─ .env          # OpenAI key & API base URL

frontend/          # React frontend
  ├─ src/          # Components, services, pages
  ├─ public/       # Static files
  └─ .env          # API base URL





Credits

Built by: Palak Makwana

Tools & Libraries: Laravel, NodeJS, ReactJS, TailwindCSS, OpenAI API

Architecture inspired by modern automation pipelines for content rewriting.