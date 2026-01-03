require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const { generateResponse, SUPPORTED_IMAGE_TYPES } = require('./responseGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (SUPPORTED_IMAGE_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file type'), false);
        }
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Process text and generate speech
app.post('/process', async (req, res) => {
    try {
        const { text } = req.body;

        // Generate speech using OpenAI TTS
        const audioResponse = await axios({
            method: 'post',
            url: 'https://api.openai.com/v1/audio/speech',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            data: {
                model: 'tts-1',
                input: `You said: ${text}. How can I help you?`,
                voice: 'alloy',
                speed: 1.0
            },
            responseType: 'arraybuffer'
        });

        const audioBase64 = Buffer.from(audioResponse.data).toString('base64');

        res.json({
            text: `You said: ${text}`,
            audio: audioBase64
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ 
            error: "Error processing request",
            details: error.message 
        });
    }
});

// Handle file upload and process image
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                error: 'No file uploaded or unsupported file type' 
            });
        }

        // Convert image to base64
        const imageBase64 = req.file.buffer.toString('base64');
        
        // Process the image
        const result = await generateResponse({
            image: {
                data: imageBase64,
                contentType: req.file.mimetype
            }
        });

        if (result.success) {
            res.json({ 
                success: true, 
                response: result.response 
            });
        } else {
            res.status(500).json({ 
                success: false, 
                error: result.error,
                details: result.details
            });
        }
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Error processing image',
            details: error.message
        });
    }
});

// Generate AI response
app.post('/generate-response', async (req, res) => {
    try {
        // Ensure the request has a body
        if (!req.body) {
            return res.status(400).json({ 
                success: false, 
                error: 'Request body is required' 
            });
        }

        // Support both { message: 'text' } and { text: 'text' } formats
        const message = req.body.message || req.body.text || req.body;
        
        if (!message) {
            return res.status(400).json({ 
                success: false, 
                error: 'Message is required in the request body' 
            });
        }

        console.log('Received request with message:', message);
        const result = await generateResponse(message);
        
        if (result.success) {
            res.json({ 
                success: true, 
                response: result.response 
            });
        } else {
            res.status(500).json({ 
                success: false, 
                error: result.error,
                details: result.details
            });
        }
    } catch (error) {
        console.error('Error in /generate-response:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal server error',
            details: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Available endpoints:`);
    console.log(`- POST /process (TTS)`);
    console.log(`- POST /generate-response (AI Chat)`);
});