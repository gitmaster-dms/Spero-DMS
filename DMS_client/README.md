# 🛡️ DMS_client – Disaster Management System Frontend

This is the **frontend** for the Disaster Management System (**DMS**) built using **Vite + React**. It provides a fast and responsive user interface that connects with the backend powered by Django REST Framework and FastAPI.

---

## 🔧 Tech Stack

- ⚡ [Vite](https://vitejs.dev/) – Fast dev server & build tool
- ⚛️ [React](https://reactjs.org/) – UI component library
- 🎨 [Material UI](https://mui.com/) – For responsive and clean UI (if used)
- 🔗 Backend Integration: Django REST API + FastAPI (with WebSocket support)

---

## 📁 Project Structure

Here is the initial folder structure of the **DMS_client**:

```bash
DMS_client/
├── public/                       # Static files (index.html, favicon, etc.)
├── src/                          # Main source folder
│   ├── assets/                   # Images, icons, fonts, etc.
│   ├── components/               # Reusable UI components (Buttons, Inputs, etc.)
│   ├── pages/                    # Main page components (Home, Dashboard, etc.)
│   ├── services/                 # API calls, network requests, etc.
│   ├── utils/                    # Helper functions
│   ├── App.jsx                   # Root component
│   └── main.jsx                  # Entry point (react-dom render)
├── index.html                    # Main HTML template
├── package.json                  # Project dependencies and scripts
└── vite.config.js                # Vite configuration file
