import imagekit from "../configs/imagekit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// controller for creating new resume
// POST: /api/resumes/create

export const createResume = async (req,res) => {
    try {
        const userId = req.userId;
        const {title} = req.body;

        // create new resume
        const newResume = await Resume.create({userId, title})

        // return success message
        return res.status(201).json({message: "Resume created successfully", resume: newResume})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for deleting a resume
// DELETE: /api/resumes/delete

export const deleteResume = async (req, res) => {
    try {
        const { id } = req.params; // Ensure this matches /delete/:id
        const resume = await Resume.findByIdAndDelete(id);
        
        if (!resume) {
            return res.status(404).json({ success: false, message: "Resume not found" });
        }
        
        res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// get user resume by id
// GET: /api/resumes/get

export const getResumeById = async (req,res) => {
    try {
        const userId = req.userId;
        const {resumeId} = req.params;

        // get resume by id
        const resume = await Resume.findOne({userId, _id: resumeId})

        if(!resume){
            return res.status(404).json({message: "Resume not found"})
        }
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({resume})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// get resume by id public
// GET: /api/resume/public

export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({ success: false, message: "Resume not found" });
        }

        if (!resume.public) {
            return res.status(403).json({ success: false, message: "This resume is private" });
        }

        res.status(200).json({ success: true, resume }); // Must include 'resume' key
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// controller for updating a resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from URL
        
        // We take everything sent from the frontend and update the document
        const updatedResume = await Resume.findByIdAndUpdate(
            id, 
            { ...req.body }, 
            { new: true }
        );

        if (!updatedResume) {
            return res.status(404).json({ success: false, message: "Resume not found" });
        }

        res.json({ success: true, resume: updatedResume });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const handleSave = async () => {
    const formData = new FormData();
    // Wrap current resume state into a JSON string as expected by controller
    formData.append('resumeData', JSON.stringify(resumeData)); 
    formData.append('resumeId', resumeId);
    
    if (newImageFile) {
        formData.append('image', newImageFile);
    }

    try {
        await api.put('/api/resumes/update', formData, {
            headers: { 
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}` 
            }
        });
        toast.success("Progress saved!");
    } catch (error) {
        toast.error("Save failed");
    }
};

// controller for getting all user resumes
// GET: /api/resumes/list
export const listResumes = async (req, res) => {
    try {
        const userId = req.userId; // Provided by your protect middleware

        // Find all resumes where userId matches
        const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });

        return res.status(200).json({ 
            success: true, 
            resumes 
        });
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
}