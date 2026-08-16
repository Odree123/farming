# 🌾 SautiFarm — Kenyan Agricultural AI Assistant

SautiFarm ("Voice of the Farm") is a mobile-first web app that gives Kenyan smallholder and commercial farmers trustworthy, culturally relevant agricultural advice. Powered by Google's Gemini AI, it speaks the farmer's language — literally — with support for Kiswahili, English, and major Kenyan dialects, plus on-device-friendly tools for disease diagnosis, market prices, and agro-input shopping.

## Features

- **AI Chat Assistant ("Bwana Shamba AI")** — Ask farming questions in natural language and get advice grounded in KALRO, KEPHIS, and PCPB guidelines, with KES pricing and both organic and registered chemical remedies.
- **Multimodal Disease Detection** — Upload a photo of a crop leaf and receive a structured diagnosis (disease, severity, symptoms, organic & chemical treatments, recommended products with prices) powered by Gemini vision.
- **Multi-language Support** — Kiswahili, English, Gĩkũyũ, Dholuo, Oluluhya, Kalenjin, Kĩkamba, and Af-Soomaali, with county-aware context.
- **Live Market Prices & Arbitrage** — Track crop prices across counties and surface arbitrage opportunities.
- **Marketplace & M-Pesa Checkout** — Browse agro-inputs and complete a simulated Safaricom M-Pesa STK push payment.
- **USSD Simulator** — Experience the feature-phone-friendly USSD flow (e.g. `*123#`) for low-connectivity access.
- **OTP Auth** — Lightweight phone-based sign-in (mock OTP for demo).

## Tech Stack

- **Frontend:** React 19, Vite 6, Tailwind CSS v4, TypeScript, `lucide-react`, `recharts`, `motion`, `canvas-confetti`
- **Backend:** Express server (`server.ts`) running as Vite middleware in dev
- **AI:** `@google/genai` (Gemini `gemini-3.7-flash`) for chat and image-based disease diagnosis
- **Runtime:** Node.js with `tsx` for development

## Prerequisites

- Node.js 18+ (or a compatible runtime)
- A Google Gemini API key

## Installation

```bash
# From the project root
cd farming

# Install dependencies
npm install
# (or: bun install if bun is available)
```

## Configuration

Copy the example environment file and add your Gemini API key:

```bash
cp .env.example .env
```

Edit `.env`:

```ini
GEMINI_API_KEY="your-gemini-api-key"
APP_URL="http://localhost:3000"
```

> The `GEMINI_API_KEY` is required for the chat and disease-detection endpoints.

## Running Locally

```bash
# Start the dev server (Express + Vite middleware) on port 3000
npm run dev
```

Open http://localhost:3000.

## Building for Production

```bash
npm run build   # vite build + esbuild bundle of server.ts -> dist/server.cjs
npm run start   # serve the production build
```

Other scripts:

```bash
npm run lint    # type-check with tsc --noEmit
npm run clean   # remove build artifacts
```

## API Endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| `GET`  | `/api/health` | Health check |
| `POST` | `/api/chat` | Conversational farming advice (text + optional image) |
| `POST` | `/api/disease-detect` | Image-based plant disease diagnosis (JSON response) |
| `POST` | `/api/auth/otp` | Request a (mock) OTP — returns `2541` for testing |
| `POST` | `/api/auth/verify` | Verify OTP (`2541` or `1234`) and get a session token |
| `POST` | `/api/mpesa/stkpush` | Simulate an M-Pesa STK push checkout |

## Notes

- Disease detection and chat rely on the Gemini API and require a valid `GEMINI_API_KEY`.
- Auth and M-Pesa flows are **simulated** for demo purposes and not connected to real Safaricom Daraja or SMS gateways.
- The default language is Kiswahili (`sw`); the choice is persisted in `localStorage`.

## License

This project is provided as-is for educational and demonstration purposes.
