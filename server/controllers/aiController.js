import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";
import pdf from 'pdf-parse-fork';

// 1. Enhance Professional Summary
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const userContent = req.body.userContent || req.body.summary;
        if (!userContent) return res.status(400).json({ message: "Summary is required" });

        const response = await ai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are a resume expert. Enhance this summary into 2 professional sentences. Return only the enhanced text." },
                { role: "user", content: userContent }
            ],
        });

        return res.status(200).json({ enhancedContent: response.choices[0].message.content });
    } catch (error) {
        console.error("🚀 AI Summary Error:", error.message);
        return res.status(500).json({ message: error.message });
    }
};

// 2. Enhance Job Description
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) return res.status(400).json({ message: "Content is required" });

        const response = await ai.chat.completions.create({
            model: "llama-3.3-70b-versatile", 
            messages: [
                { role: "system", content: "You are a resume expert. Enhance this job description using action verbs. Return ONLY the enhanced text." },
                { role: "user", content: userContent },
            ],
        });

        return res.status(200).json({ enhancedContent: response.choices[0].message.content });
    } catch (error) {
        console.error("🚀 AI Job Desc Error:", error.message);
        return res.status(500).json({ message: error.message });
    }
};

// 3. Upload and Extract Resume Data
export const uploadResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Please upload a PDF file" });
        }

        const pdfData = await pdf(req.file.buffer);
        const resumeText = pdfData.text;

        if (!resumeText || resumeText.trim().length === 0) {
            throw new Error("Could not extract text from the PDF.");
        }

        console.log("✅ Text extracted! Length:", resumeText.length);

        const systemPrompt = "You are an expert AI Agent. Extract resume data into structured JSON. Return ONLY valid JSON.";
        const userPrompt = `Extract data from this text: ${resumeText} 
        Format:
        {
          "professional_summary": "",
          "skills": [],
          "personal_info": { "full_name": "", "profession": "", "email": "", "phone": "", "location": "", "linkedin": "", "website": "" },
          "experience": [{ "company": "", "position": "", "start_date": "", "end_date": "", "description": "", "is_current": false }],
          "projects": [{ "name": "", "type": "", "description": "" }],
          "education": [{ "institution": "", "degree": "", "field": "", "graduation_date": "", "gpa": "" }]
        }`;

        const response = await ai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            // Groq supports JSON mode for this model
            response_format: { type: "json_object" },
            temperature: 0.1, 
        });

        const extractedData = JSON.parse(response.choices[0].message.content);
        
        const newResume = await Resume.create({
            userId,
            title: title || "Imported Resume",
            ...extractedData
        });

        res.status(201).json({ success: true, resumeId: newResume._id });

    } catch (error) {
        console.error("❌ AI Upload Error:", error.message);
        if (error.status === 429) {
            return res.status(429).json({ message: "Groq rate limit reached. Please wait a minute." });
        }
        return res.status(500).json({ message: error.message });
    }
};

// 4. ATS Score Check
export const checkATSScore = async (req, res) => {
    try {
        const { resumeId, jobDescription } = req.body;

        if (!resumeId || !jobDescription) {
            return res.status(400).json({ message: "Missing resume ID or job description" });
        }

        const resume = await Resume.findById(resumeId);
        if (!resume) return res.status(404).json({ message: "Resume not found" });

        const systemPrompt = "You are an expert ATS optimizer. Return strictly valid JSON.";
        const userPrompt = `
            Compare the Resume to the Job Description.
            Resume Data: ${JSON.stringify(resume)}
            Job Description: ${jobDescription}

            JSON Format:
            {
              "score": number,
              "matching_keywords": [],
              "missing_keywords": [],
              "analysis": "string",
              "suggestions": []
            }
        `;

        const response = await ai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
            temperature: 0.5
        });

        const analysis = JSON.parse(response.choices[0].message.content);
        res.status(200).json(analysis);

    } catch (error) {
        console.error("❌ ATS Error Details:", error.message);
        if (error.status === 429) {
            return res.status(429).json({ message: "AI limit reached. Try again in 1 minute." });
        }
        res.status(500).json({ message: "AI Analysis failed." });
    }
};

//Checking ATS score for resume in folder
//POST /api/ai/optimize-resume

export const checkATSInstant = async (req, res) => {
    try {
        const { jobDescription } = req.body;
        if (!req.file) return res.status(400).json({ message: "Please upload a resume file" });
        if (!jobDescription) return res.status(400).json({ message: "Job description is required" });

        // 1. Extract text from the uploaded buffer
        const pdfData = await pdf(req.file.buffer);
        const resumeText = pdfData.text;

        // 2. Call Groq
        const systemPrompt = "You are an expert ATS optimizer. Compare the resume text to the job description. Return strictly valid JSON.";
        const userPrompt = `
            Resume Text: ${resumeText}
            Job Description: ${jobDescription}

            JSON Format:
            {
              "score": number,
              "matching_keywords": [],
              "missing_keywords": [],
              "analysis": "string",
              "suggestions": []
            }
        `;

        const response = await ai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
            temperature: 0.5
        });

        const analysis = JSON.parse(response.choices[0].message.content);
        res.status(200).json(analysis);

    } catch (error) {
        console.error("❌ Instant ATS Error:", error.message);
        res.status(500).json({ message: "Analysis failed." });
    }
};

// Optimization Engine for skill and experience comparision


export const optimizeResume = async (req, res) => {
    try {
        const { jobDescription, resumeText } = req.body;

        if (!jobDescription || !resumeText) {
            return res.status(400).json({ message: "Missing resume content or job description" });
        }

        const systemPrompt = `
            You are an expert Resume Writer and ATS Specialist. 
            Your goal is to rewrite the provided resume to perfectly match the job description.
            
            RULES:
            1. DO NOT fabricate experience, degrees, or job titles.
            2. DO naturally integrate missing keywords from the Job Description into the professional summary and bullet points.
            3. Use strong action verbs (e.g., "Spearheaded", "Architected", "Optimized").
            4. Quantify achievements where possible (e.g., "Increased efficiency by 20%").
            5. Return strictly valid JSON.
        `;

        const userPrompt = `
            JOB DESCRIPTION:
            ${jobDescription}

            CURRENT RESUME:
            ${resumeText}

            Generate an optimized version of this resume. 
            Provide the output in this JSON format:
            {
                "optimizedText": "Full rewritten resume content here...",
                "keyChanges": [
                    { "before": "original phrase", "after": "improved phrase", "reason": "why this helps" }
                ],
                "projectedScore": number (0-100),
                "improvementSummary": "A brief explanation of how these changes maximize the ATS match."
            }
        `;

        const response = await ai.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            response_format: { type: "json_object" },
            temperature: 0.6
        });

        const result = JSON.parse(response.choices[0].message.content);
        res.status(200).json(result);

    } catch (error) {
        console.error("❌ Optimization Error:", error);
        res.status(500).json({ message: "Failed to optimize resume." });
    }
};