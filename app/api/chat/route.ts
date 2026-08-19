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
    const { message, history = [], language = 'sw', imageUrl, county = 'Kenya', farmSize = '2 acres' } = body;

    if (!message && !imageUrl) {
      return NextResponse.json({ error: 'Message or image is required' }, { status: 400 });
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

    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-4);
      recentHistory.forEach((msg: any) => {
        if (msg.sender === 'user') {
          contents.push({ role: 'user', parts: [{ text: msg.text }] });
        } else if (msg.sender === 'assistant') {
          contents.push({ role: 'model', parts: [{ text: msg.text }] });
        }
      });
    }

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

    return NextResponse.json({
      reply: replyText,
      language,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate agricultural advice',
        details: error?.message || 'Server error',
      },
      { status: 500 }
    );
  }
}
