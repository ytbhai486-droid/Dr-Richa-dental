import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client lazily / safely
  let aiClient: GoogleGenAI | null = null;
  const getAiClient = () => {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        aiClient = new GoogleGenAI({ apiKey });
      }
    }
    return aiClient;
  };

  // API Route for Dental AI Assistant
  app.post('/api/dental-ai', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const client = getAiClient();
      if (!client) {
        // Safe intelligent fallback if no Gemini key is set in preview
        return res.json({
          reply: `Thank you for asking! Dr. Richa's Dental Clinic offers gentle, painless treatments including Teeth Cleaning, Whitening, Dental Implants, Root Canals, and Clear Aligners. You can book an appointment using our online form or call +1 (800) 555-SMILE.`
        });
      }

      const systemInstruction = `You are "SmileBot", a helpful, empathetic, and knowledgeable AI Dental Assistant for Dr. Richa Dental Clinic.
Dr. Richa is a BDS senior dental surgeon specializing in painless aesthetic, restorative, and implant dentistry with 10+ years of experience.
Clinic services include: Teeth Cleaning, Teeth Whitening, Dental Implants, Root Canal Treatment, Braces & Clear Aligners, Tooth Extraction, Smile Makeovers, Pediatric Dentistry, Crowns & Bridges, Emergency Dental Care.
Always provide reassuring, professional, short dental advice. Emphasize that Dr. Richa uses gentle, painless techniques and advanced 3D technology. Remind patients that they can book an appointment directly through the website form.`;

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I am glad to help! Please feel free to book an appointment with Dr. Richa or call our clinic hotline.";
      res.json({ reply: replyText });
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      res.json({
        reply: `Dr. Richa's team is here to help! For specific diagnosis, treatment pricing, or immediate care, please book an online appointment or call +1 (800) 555-SMILE.`
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', clinic: 'Dr. Richa Dental Clinic' });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dr. Richa Dental Clinic server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
