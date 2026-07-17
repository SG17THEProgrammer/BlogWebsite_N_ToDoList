# BlogWebsite and ToDoList 📝

This project is a full-stack web application that combines a **Blog Website** built with the MERN stack (MongoDB, Express.js, React, Node.js) and a **To-Do List** application implemented using plain HTML, CSS, and JavaScript.

## 🚀 Project Overview

The repository contains two distinct projects:

1.  **Blog Website:** A dynamic blog platform featuring user authentication, post creation, commenting, liking, rating, bookmarking, and AI-powered content optimization. It leverages React for the frontend and Node.js with Express for the backend, with MongoDB as the database.
2.  **To-Do List:** A simple, client-side To-Do List application demonstrating fundamental web development concepts using HTML, CSS, and JavaScript, with local storage for data persistence.

## 🌟 Features

### Blog Website Features:

*   **User Authentication:** Secure registration and login system.
*   **Blog Post Management:** Create, edit, delete, and pin blog posts.
*   **User Profiles:** View and manage user profiles with social media links.
*   **Interactions:** Like, comment, and rate blog posts.
*   **Bookmarking:** Save blog posts for later.
*   **AI Content Optimization:** Rewrite blog posts using AI for better SEO and engagement.
*   **Scraping:** Scrapes articles from provided URLs for AI optimization.
*   **Pricing Tiers:** Subscription plans (Free, Basic, Standard, Premium) with differential access to content.
*   **Admin Dashboard:** Manage users and posts, view site statistics.
*   **Search & Filtering:** Search blogs by title, category, and tags.
*   **Contact Form:** Submit inquiries via a dedicated contact form.

### To-Do List Features:

*   **Add Tasks:** Add new tasks to the list.
*   **Mark as Done:** Toggle task completion status.
*   **Priority Adjustment:** Move tasks up or down in priority.
*   **Delete Tasks:** Remove tasks from the list.
*   **Local Storage Persistence:** Tasks are saved in the browser's local storage.

## 🛠️ Tech Stack

*   **Frontend:**
    *   React
    *   Vite
    *   JavaScript
    *   HTML
    *   CSS
    *   Material-UI (@mui/material)
    *   React Icons
    *   React Router DOM
    *   React Toastify
    *   Axios
    *   Chart.js
    *   Marked (for Markdown rendering)
    *   Rehype Raw
    *   Remark GFM
    *   Lodash
    *   Zod (for validation)
    *   Emotion
    *   Styled-components
    *   Bootstrap
*   **Backend:**
    *   Node.js
    *   Express.js
    *   MongoDB
    *   Mongoose
    *   Bcrypt (for password hashing)
    *   JSON Web Tokens (JWT)
    *   Stripe (for payment processing)
    *   Dotenv (for environment variables)
    *   CORS
    *   Body-parser
    *   Validator
    *   Google Generative AI (`@google/generative-ai`)
    *   Groq SDK (`groq-sdk`)
    *   OpenAI (`openai`)
    *   Axios
    *   Nodemon
    *   Playwright (for scraping)
    *   Flask (for scraping backend)
    *   Beautiful Soup 4 (for scraping)
*   **Development Tools:**
    *   ESLint
    *   Vite
*   **AI Integration:**
    *   Google Gemini API
    *   Groq API

## ⚙️ Installation

### For the Blog Website (MERN Stack):

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SG17THEProgrammer/BlogWebsite_N_ToDoList.git
    cd BlogWebsite_N_ToDoList
    ```

2.  **Backend Setup:**
    *   Navigate to the backend directory:
        ```bash
        cd Task_2/backend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in the root of the `backend` directory and add your environment variables, including:
        ```
        PORT=5000
        MONG0_URL=your_mongodb_connection_string
        SECRET_KEY=your_jwt_secret_key
        GEMINI_API_KEY=your_gemini_api_key
        GROQ_API_KEY=your_groq_api_key
        SERPAPI_KEY=your_serpapi_api_key
        STRIPE_SECRET_KEY=your_stripe_secret_key
        Frontend_URL=http://localhost:5173
        ```
    *   Start the backend server:
        ```bash
        npm start
        ```
        (or `nodemon index.js` for development with auto-restarts)

3.  **Frontend Setup:**
    *   Navigate to the frontend directory:
        ```bash
        cd ../frontend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Ensure your `.env` file is configured correctly with the backend API URL (e.g., `VITE_BACKEND_API=http://localhost:5000`).
    *   Start the frontend development server:
        ```bash
        npm run dev
        ```

### For the To-Do List (HTML, CSS, JS):

*   No installation is required for the To-Do List. Simply open the `Task_1/ToDoList.html` file in your web browser.

## 💡 Usage

### Blog Website:

*   **Access the application:** Open your web browser and navigate to `http://localhost:5173` (or the port specified in your frontend setup).
*   **User Actions:**
    *   **Register/Login:** Use the `/login` route to access the authentication forms.
    *   **Create Posts:** Navigate to `/createPost` to write and publish new blog articles.
    *   **View Posts:** Browse all posts via `/allPosts` or your personal posts via `/yourPosts`.
    *   **Interact:** Like, comment, and rate posts on individual post pages (`/completePost/:id`).
    *   **Bookmark:** Save interesting posts for later access via `/bookmarks`.
    *   **AI Optimization:** Use the "Re-write Post" button on a blog post to leverage AI for content improvement.
    *   **Admin Dashboard:** If you are an admin, access `/dashboard` to manage users and posts.
    *   **Contact:** Use the `/contact` page to send messages.
    *   **Pricing:** Explore subscription plans at `/pricing`.

### To-Do List:

*   **Open `Task_1/ToDoList.html`:**
    *   Type a task in the input field and click "Add" or press Enter.
    *   Click on a task to mark it as done (visually indicated).
    *   Use the "❎" icon to delete a task.
    *   Use the "⬆️" and "⬇️" icons to change task priority.
*   Tasks are persisted in the browser's local storage, so they will remain available even after closing and reopening the browser.

## 📂 Project Structure

```
BlogWebsite_N_ToDoList/
├── Task_1/
│   ├── index.js
│   ├── ToDoList.html
│   └── styles.css
│   └── images/
├── Task_2/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── db/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── Routes/
│   │   │   ├── services/
│   │   │   └── validators/
│   │   ├── scraper/
│   │   ├── .env
│   │   ├── index.js
│   │   └── package.json
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── context/
│   │   │   ├── css/
│   │   │   ├── pages/
│   │   │   └── utility/
│   │   ├── .env
│   │   ├── index.html
│   │   ├── main.jsx
│   │   ├── vite.config.js
│   │   └── package.json
│   ├── BlogWebsite.sampleBlog.json
│   └── Task_2 Description
└── README.md
```

## 🔗 API Reference

This project exposes several API endpoints handled by the Express backend. Key routes include:

*   `/register` (POST): User registration.
*   `/login` (POST): User login.
*   `/user` (GET): Get authenticated user details.
*   `/createPost` (POST): Create a new blog post.
*   `/getAllBlogs` (GET): Fetch all blog posts.
*   `/yourPosts` (POST): Fetch posts for the logged-in user.
*   `/completePost/:id` (GET): Fetch a single blog post by ID.
*   `/editPost` (PUT/PATCH): Update an existing blog post.
*   `/delPost` (POST): Delete a blog post.
*   `/like` (POST): Like/Unlike a blog post.
*   `/comment` (POST): Add a comment to a blog post.
*   `/getScrapedBlog/:id` (GET): Fetch AI-optimized blog content.
*   `/contact` (POST): Submit contact form data.
*   `/getAllPlans` (GET): Fetch available subscription plans.
*   `/createSession` (POST): Create a Stripe checkout session.
*   `/getPlan` (POST): Get the user's current subscription plan.

Refer to `Task_2/backend/src/Routes/route.js` for a complete list of routes and their corresponding controllers.
