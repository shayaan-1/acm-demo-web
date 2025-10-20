# 📝 Full Stack Todo App

## 🚀 Quick Start Guide (5-Minute Setup)

### 🧩 Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud via MongoDB Atlas)

---

## 🖥️ Backend Setup

```bash
# 1. Create and enter backend folder
mkdir todo-backend && cd todo-backend

# 2. Initialize npm
npm init -y

# 3. Install dependencies
npm install express mongoose cors dotenv
npm install --save-dev nodemon

# 4. Create all files (listed below)
# Copy files from "Backend File Structure" section

# 5. Create .env file with:
MONGODB_URI=mongodb://localhost:27017/todo-app
PORT=5000
NODE_ENV=development

# 6. Start backend
npm run dev
# You should see: "Server running on http://localhost:5000"
