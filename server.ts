import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'SautiFarm Kenya Agricultural Engine',
      timestamp: new Date().toISOString(),
    });
  });

  // Chat endpoint
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { message, history = [], language = 'sw', imageUrl, county = 'Kenya', farmSize = '2 acres' } = req.body;

      if (!message && !imageUrl) {
        return res.status(400).json({ error: 'Message or image is required' });
      }

      const langMap: Record<string, string> = {
        sw: 'Kiswahili (Kenyan standard Swahili used by agricultural extension officers / Bwana Shamba)',
        en: 'English (Clear, practical Kenyan agricultural English)',
        ki: 'Gĩkũyũ (Kikuyu dialect suitable for Central Kenya farmers in Kiambu, Nyeri, Muranga, Kirinyaga, Nyandarua)',
        luo: 'Dholuo (Luo dialect suitable for Lake Victoria basin farmers in Kisumu, Siaya, Homa Bay, Migori)',
        luh: 'Oluluhya (Luhya dialect suitable for Western Kenya farmers in Kakamega, Bungoma, Vihiga, Busia)',
        kal: 'Kalenjin (Kalenjin dialect suitable for Rift Valley grain & dairy farmers in Uasin Gishu, Nandi, Kericho, Bomet)',
        kam: 'Kĩkamba (Kamba dialect suitable for Eastern Kenya farmers in Machakos, Makueni, Kitui)',
        som: 'Af-Soomaali (Somali language suitable for pastoralist and arid agriculture in Garissa, Wajir, Mandera, Isiolo)',
      };

      const languageInstruction = langMap[language] || langMap.sw;

      const systemInstruction = `You are "Bwana Shamba AI" on SautiFarm, an expert Kenyan Agricultural Extension Officer and agronomist.
Your goal is to provide trustworthy, actionable, and culturally relevant advice to smallholder and commercial Kenyan farmers.

Key Rules:
1. Primary Language: Respond primarily in ${languageInstruction}. Maintain natural Kenyan terminology (e.g. "shamba", "jembe", "mbolea ya kupandia DAP/YaraMila", "CAN ya kukuzia", "sukuma wiki", "mahindi", "waru/viazi", "debe", "gunia la kilo 90", "knapsack pump").
2. Context Awareness: The farmer is based in County: "${county}", farming approximately ${farmSize}. Adapt advice to the local rainfall pattern, soil type, and elevation of that county.
3. Scientific Grounding: Align with Kenya Agricultural and Livestock Research Organization (KALRO), KEPHIS, and Pest Control Products Board (PCPB) guidelines.
4. Actionable & Cost-Conscious: Include both organic/cultural remedies (wood ash, neem extract, crop rotation, push-pull) and registered certified agro-inputs with estimated prices in Kenyan Shillings (KES).
5. Formatting: Use structured, easy-to-read bullet points. Keep it clear on low-end mobile devices.
6. Tone: Warm, respectful, encouraging ("Hongera mkulima", "Pole kwa changamoto hii"), and authoritative on crop and livestock matters.`;

      let contents: any[] = [];

      // Add conversation context if provided
      if (Array.isArray(history) && history.length > 0) {
        // Take last 4 messages for context
        const recentHistory = history.slice(-4);
        recentHistory.forEach((msg: any) => {
          if (msg.sender === 'user') {
            contents.push({ role: 'user', parts: [{ text: msg.text }] });
          } else if (msg.sender === 'assistant') {
            contents.push({ role: 'model', parts: [{ text: msg.text }] });
          }
        });
      }

      // Prepare current message parts
      const currentParts: any[] = [];

      if (imageUrl && imageUrl.startsWith('data:')) {
        const matches = imageUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
        if (matches) {
          currentParts.push({
            inlineData: {
              mimeType: matches[1],
              data: matches[2],
            },
          });
        }
      }

      currentParts.push({
        text: message || 'Tafadhali kagua picha hii ya mmea na unipe ushauri wa kilimo.',
      });

      contents.push({
        role: 'user',
        parts: currentParts,
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'Samahani mkulima, sijapata jibu kwa sasa. Tafadhali jaribu tena.';

      res.json({
        reply: replyText,
        language,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error('Error in /api/chat:', error);
      res.status(500).json({
        error: 'Failed to generate agricultural advice',
        details: error?.message || 'Server error',
      });
    }
  });

  // Multimodal Disease Detection endpoint
  app.post('/api/disease-detect', async (req: Request, res: Response) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg', plantType = 'Crop', language = 'sw' } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ error: 'Image base64 data is required' });
      }

      // Clean base64 string
      const cleanData = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

      const systemInstruction = `You are an expert plant pathologist and agronomist at KALRO (Kenya Agricultural and Livestock Research Organization).
Analyze the provided crop/plant leaf image carefully to diagnose diseases, pests, fungal infections, or nutrient deficiencies common in Kenyan agriculture (e.g. Maize Lethal Necrosis, Fall Armyworm, Tomato Late/Early Blight, Bean Rust, Potato Bacterial Wilt, Coffee Berry Disease, Cassava Mosaic Virus, Citrus Greening).

Output strictly a valid JSON object matching the requested schema. Provide clear, realistic Kenyan solutions with KES prices and registered brands.`;

      const promptText = `Diagnose this plant image (${plantType}) for any diseases, pests, or nutrient deficiencies.
Respond with thorough details in language code "${language}".`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: cleanData,
              },
            },
            {
              text: promptText,
            },
          ],
        },
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              plantName: { type: Type.STRING, description: 'Common plant name in English and Swahili' },
              diseaseName: { type: Type.STRING, description: 'Primary diagnosed disease or pest name' },
              localName: { type: Type.STRING, description: 'Local Kenyan name (e.g. Funza wa Mahindi, Mnyauko, Ukungu)' },
              scientificName: { type: Type.STRING, description: 'Latin scientific name' },
              confidence: { type: Type.NUMBER, description: 'Confidence score percentage from 70 to 99' },
              severity: { type: Type.STRING, description: 'Severity: low, moderate, high, or critical' },
              symptoms: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Key visible symptoms observed on the leaf/plant',
              },
              causes: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Environmental or biological causes in Kenya',
              },
              organicTreatment: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Natural, organic or cultural control practices (wood ash, neem, pruning, crop rotation)',
              },
              chemicalTreatment: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'PCPB-registered fungicides or insecticides available in Kenyan agrovets',
              },
              preventiveMeasures: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Steps to prevent recurrence in subsequent seasons',
              },
              estimatedYieldLoss: { type: Type.STRING, description: 'Estimated potential yield loss if untreated' },
              urgencyDays: { type: Type.NUMBER, description: 'Days within which action must be taken' },
              recommendedProducts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: 'Product trade name (e.g. Ridomil Gold, Twiga Thunder)' },
                    category: { type: Type.STRING, description: 'Fungicide, Insecticide, Foliar fertilizer, or Bio-pesticide' },
                    dosage: { type: Type.STRING, description: 'Dosage per 20L knapsack sprayer' },
                    priceKES: { type: Type.NUMBER, description: 'Approximate retail price in Kenyan Shillings' },
                  },
                  required: ['name', 'category', 'dosage', 'priceKES'],
                },
              },
            },
            required: [
              'plantName',
              'diseaseName',
              'confidence',
              'severity',
              'symptoms',
              'organicTreatment',
              'chemicalTreatment',
              'preventiveMeasures',
              'recommendedProducts',
            ],
          },
        },
      });

      const jsonString = response.text || '{}';
      const diagnosis = JSON.parse(jsonString);

      res.json({
        success: true,
        diagnosis: {
          id: `diag-${Date.now()}`,
          ...diagnosis,
        },
      });
    } catch (error: any) {
      console.error('Error in /api/disease-detect:', error);
      res.status(500).json({
        error: 'Disease diagnosis failed',
        details: error?.message || 'Server error',
      });
    }
  });

  // Simulated OTP Auth for Kenyan Farmers
  app.post('/api/auth/otp', (req: Request, res: Response) => {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Always generate a predictable test OTP for easy testing
    const otp = '2541';
    res.json({
      success: true,
      message: `Verification OTP sent via SMS to ${phone}`,
      mockOtp: otp, // Returned for effortless demo testing in preview
    });
  });

  app.post('/api/auth/verify', (req: Request, res: Response) => {
    const { phone, otp, name = 'Mkulima Bora', county = 'Uasin Gishu', farmSize = 3 } = req.body;

    if (otp !== '2541' && otp !== '1234') {
      return res.status(400).json({ error: 'Invalid OTP code. Please use 2541.' });
    }

    const token = `sautifarm_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    res.json({
      success: true,
      token,
      profile: {
        phone,
        name: name || 'Mkulima Bora',
        county: county || 'Uasin Gishu (Eldoret)',
        farmSizeAcres: farmSize || 3,
        primaryCrops: ['Maize', 'Beans', 'Vegetables'],
        livestock: ['Dairy Cow', 'Kienyeji Chicken'],
        preferredLanguage: 'sw',
        isAuthenticated: true,
      },
    });
  });

  // Simulated M-Pesa STK Push Checkout
  app.post('/api/mpesa/stkpush', (req: Request, res: Response) => {
    const { phone, amount, items } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ error: 'Phone and amount are required' });
    }

    const receiptNumber = `SFL${Math.floor(100000 + Math.random() * 900000)}KES`;

    // Simulate instant STK push confirmation
    setTimeout(() => {
      // In a real Safaricom Daraja API, webhook triggers callback
    }, 1500);

    res.json({
      success: true,
      checkoutRequestId: `ws_CO_${Date.now()}`,
      receiptNumber,
      amount,
      phone,
      message: `M-Pesa STK push prompt sent to ${phone}. Enter PIN to pay KES ${amount.toLocaleString()}.`,
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌾 SautiFarm Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start SautiFarm server:', err);
});
