# Nebs-IT - Assessment

## 🔗 Live Demo

-   **Frontend:** [https://nebs-it-alpha.vercel.app](https://nebs-it-alpha.vercel.app)
-   **Backend API:** [https://nebs-it.onrender.com](https://nebs-it.onrender.com)

---

## 📋 Project Overview

A full-stack developed using React, Node.js. The application allows users to create, view, and manage notices with publish/unpublish functionality.

## 🛠️ Tech Stack

| Layer    | Technologies                                                             |
| -------- | ------------------------------------------------------------------------ |
| Backend  | TypeScript, Node.js, Express, MongoDB, Mongoose                          |
| Frontend | TypeScript, React, TailwindCSS, Shadcn UI, TanStack Router & React Query |

---

## 📡 API Endpoints

| Method | Endpoint                            | Description          |
| ------ | ----------------------------------- | -------------------- |
| POST   | `/api/v1/notices`                   | Create a new notice  |
| GET    | `/api/v1/notices`                   | Get all notices      |
| GET    | `/api/v1/notices/:id`               | Get single notice    |
| PATCH  | `/api/v1/notices/:id/toggle-status` | Update notice status |

---

## ⚙️ Installation Steps

### Prerequisites

-   Node.js (LTS)
-   MongoDB connection string

### Backend Setup

```bash
cd backend
npm install
# Create .env file (see ENV section)
npm run dev      # Development
npm run build    # Build
npm start        # Production
```

### Frontend Setup

```bash
cd frontend
npm install
# Create .env file (see ENV section)
npm run dev      # Development
npm run build    # Build
npm run preview  # Preview build
```

---

## 🔐 ENV Variable Instructions

### Backend `.env`

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://mdpahlovi_db_user:K3DVuH1SFP7zpT5X@nebs-it.j37kv4g.mongodb.net/nebs-it?appName=Nebs-IT
CORS_ORIGIN=https://nebs-it-alpha.vercel.app
```

### Frontend `.env`

```env
VITE_SERVER_URL=https://nebs-it.onrender.com
```

---

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── features/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── routers.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── routes/
│   │   └── main.tsx
│   └── package.json
└── README.md
```
