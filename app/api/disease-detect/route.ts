import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageBase64, mimeType = 'image/jpeg', plantType = 'Crop', language = 'sw' } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: 'Image base64 data is required' }, { status: 400 });
    }

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

    return NextResponse.json({
      success: true,
      diagnosis: {
        id: `diag-${Date.now()}`,
        ...diagnosis,
      },
    });
  } catch (error: any) {
    console.error('Error in /api/disease-detect:', error);
    return NextResponse.json(
      {
        error: 'Disease diagnosis failed',
        details: error?.message || 'Server error',
      },
      { status: 500 }
    );
  }
}
