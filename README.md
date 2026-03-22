# 🤖 AI Resume Builder - MERN Stack

An intelligent, full-stack resume builder that leverages OpenAI to help users create, enhance, and manage professional resumes in minutes.



---

## 🚀 Live Demo
**Frontend:** [https://ai-resume-builder148.netlify.app/](https://ai-resume-builder148.netlify.app/)  
**Backend:** [https://ai-resume-builder148.onrender.com](https://ai-resume-builder148.onrender.com)

---

## ✨ Features

- **AI-Powered Content:** Automatically enhance job descriptions and summaries using OpenAI GPT models.
- **Real-time Editing:** See changes instantly in a premium, responsive UI.
- **Secure Authentication:** JWT-based login and signup system.
- **Image Integration:** Profile picture uploads powered by ImageKit.io.
- **Resume Management:** Create, update, and delete multiple resumes with MongoDB.
- **Public Sharing:** Share your professional profile via a unique public link.



---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Axios (with Interceptors for Auth)
- Lucide React (Icons)

**Backend:**
- Node.js & Express
- MongoDB (Mongoose)
- OpenAI API
- ImageKit SDK

**Deployment:**
- Frontend: **Netlify**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## 📸 Screenshots

### 1.Home Page
<img width="1512" height="907" alt="Screenshot 2026-03-22 at 6 25 29 PM" src="https://github.com/user-attachments/assets/a31694af-b615-42e5-8270-643ddf1cebbf" />


### 2. AI Enhancement Tool
<img width="1512" height="909" alt="Screenshot 2026-03-22 at 6 26 16 PM" src="https://github.com/user-attachments/assets/e93def5e-6aed-4d80-81c1-def4e4930808" />

### 3. Interactive Dashboard
<img width="1512" height="904" alt="Screenshot 2026-03-22 at 6 26 45 PM" src="https://github.com/user-attachments/assets/44a770f7-21be-4165-92c8-45055adc0ec1" />


---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Pavan-PK-148/AI-Resume-Builder.git](https://github.com/Pavan-PK-148/AI-Resume-Builder.git)
Backend Setup:

Navigate to /server

Run npm install

Create a .env file with: MONGODB_URI, JWT_SECRET, OPENAI_API_KEY, IMAGEKIT_PRIVATE_KEY

Run npm start

Frontend Setup:

Navigate to /client

Run npm install

Create a .env file with: VITE_API_URL=http://localhost:3000

Run npm run dev

🗺️ Roadmap (Version 2.0)
[ ] Direct PDF/Word Document Upload & Data Parsing.

[ ] Export to PDF feature.

[ ] ATS Keyword Optimization.

[ ] Dark Mode support.

🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

Developed by Pavan Kalyan Srinivas Robba
