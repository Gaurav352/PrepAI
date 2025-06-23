
# PrepAI
![PrepAI](frontend/public/preview.png)

PrepAI is a full-stack web application designed to help users prepare for technical interviews through personalized question sets.

## 🚀 Features
- AI-generated technical questions
- A robust authentication system using JWT
- Session history & progress analysis
- Clean, responsive UI with intuitive navigation
- Extra Explanation for all questions
- Utilised Gemini API for questions, reduced api calls with zustand
- Pin question Functionality
- Cloudinary-multer based file upload

## 🛠️ Tech Stack
- Frontend : React, Tailwind CSS, Zustand, Axios
- Backend : Node, MongoDB, Express
- Integration : Gemini API, Cloudinary


## ⚙️Installation
#### Clone the repository
```
git clone https://github.com/Gaurav352/prepAI.git
cd prepAI
```
Configure the environment variables
```
PORT=
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GEMINI_API_KEY=
NODE_ENV=development
```

#### Backend
```
cd backend
npm install
npm run dev
```
#### Frontend
```
cd frontend
npm install
npm run dev
```
