import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createResume, deleteResume, getPublicResumeById, getResumeById, listResumes, updateResume } from "../controllers/resumeController.js";
import upload from "../configs/multer.js";
import { uploadResume } from "../controllers/aiController.js";

const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createResume);
resumeRouter.put('/update/:id', protect, updateResume);
resumeRouter.post('/upload', upload.single('resumeFile'), protect, uploadResume);
resumeRouter.delete('/delete/:id', protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getResumeById);
resumeRouter.get('/public/:resumeId', getPublicResumeById);
resumeRouter.get('/list', protect, listResumes);

export default resumeRouter