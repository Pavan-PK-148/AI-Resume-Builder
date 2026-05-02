import multer from "multer";

// This MUST be memoryStorage, NOT diskStorage
const storage = multer.memoryStorage(); 

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Optional: limit to 5MB
});

export default upload;