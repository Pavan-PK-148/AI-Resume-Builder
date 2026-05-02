import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { 
    enhanceJobDescription, 
    enhanceProfessionalSummary, 
    uploadResume,
    checkATSScore, // Added this import
    checkATSInstant,
    optimizeResume
} from "../controllers/aiController.js";
import upload from "../configs/multer.js";

const aiRouter = express.Router();

// AI Text Enhancement Routes
aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary);
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription);

// AI Resume Import Route
// Note: 'resumeFile' must match the key used in your Frontend FormData
aiRouter.post('/upload-resume', protect, upload.single('resumeFile'), uploadResume);

// ATS Checker Route
// This compares a saved resume against a user-provided job description
aiRouter.post('/ats-check', protect, checkATSScore);

aiRouter.post('/ats-check-instant', upload.single('resume'), checkATSInstant);

// server/routes/aiRoutes.js
aiRouter.post('/optimize-resume', optimizeResume);

export default aiRouter;