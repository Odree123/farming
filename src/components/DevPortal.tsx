'use client';

import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Terminal,
  Key,
  Server,
  ExternalLink,
  Layers,
  Activity,
  FileCode,
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Play
} from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

export const DevPortal: React.FC = () => {
  const { openAuthModal } = useAuth();
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [activeTab, setActiveCodeTab] = useState<'curl' | 'vision' | 'python' | 'nodejs'>('curl');
  
  // Interactive Sandbox state
  const [testPrompt, setTestPrompt] = useState('When should I plant maize in Nakuru County?');
  const [sandboxLoading, setSandboxLoading] = useState(false);
  const [sandboxOutput, setSandboxOutput] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  const runSandboxTest = () => {
    setSandboxLoading(true);
    setSandboxOutput(null);
    setTimeout(() => {
      setSandboxLoading(false);
      setSandboxOutput(JSON.stringify({
        id: "chatcmpl-" + Math.random().toString(36).substring(2, 11),
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model: "sautifarm-agent",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: `For Nakuru County (Central Rift Valley), the optimal planting window for maize is during the Long Rains onset, typically between March 15th and April 10th. Recommended certified seed varieties include H6213 or DK777 based on altitude (1,800m - 2,200m). Ensure basal DAP/NPK application at 50kg/acre.`
            },
            finish_reason: "stop"
          }
        ],
        usage: {
          prompt_tokens: 14,
          completion_tokens: 68,
          total_tokens: 82
        }
      }, null, 2));
    }, 900);
  };

  const curlStandardSnippet = `curl -X POST https://engine.sautifarm.co/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: sf_your_key_here" \\
  -d '{
    "model": "sautifarm-agent",
    "messages": [
      {"role": "user", "content": "When should I plant maize in Kenya?"}
    ]
  }'`;

  const curlVisionSnippet = `curl -X POST https://engine.sautifarm.co/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: sf_your_key_here" \\
  -d '{
    "model": "sautifarm-agent",
    "messages": [
      {
        "role": "user",
        "content": [
          {"type": "text", "text": "What disease is affecting this leaf?"},
          {"type": "image_url", "image_url": {"url": "https://example.com/leaf_photo.jpg"}}
        ]
      }
    ]
  }'`;

  const pythonSnippet = `from openai import OpenAI

client = OpenAI(
    base_url="https://engine.sautifarm.co/v1",
    api_key="sf_your_key_here"
)

response = client.chat.completions.create(
    model="sautifarm-agent",
    messages=[{"role": "user", "content": "What is the market price of maize in Eldoret?"}]
)
print(response.choices[0].message.content)`;

  const nodejsSnippet = `const response = await fetch("https://engine.sautifarm.co/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "sf_your_key_here"
  },
  body: JSON.stringify({
    model: "sautifarm-agent",
    messages: [{ role: "user", content: "Mambo! Hali gani?" }]
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);`;

  return (
    <div className="min-h-screen text-stone-900 bg-stone-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="border-b border-stone-800/80 pb-8 space-y-4">
          <div className="flex items-center space-x-2 text-saf-800 text-xs font-mono uppercase tracking-widest">
            <Terminal className="w-4 h-4" />
            <span>Developer Platform &amp; API</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif tracking-tight text-stone-900 font-normal">
            API Documentation Reference
          </h1>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans max-w-3xl">
            Build agricultural applications with SautiFarm AI models using standardized OpenAI-compatible SDKs or raw HTTPS clients.
          </p>
        </div>

        {/* 1. BASE ENGINE ENDPOINT */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Base Engine Endpoint
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            All API requests must be routed to your SautiFarm engine instance. It functions as a complete drop-in replacement for OpenAI endpoints.
          </p>

          <div className="relative group bg-white border border-stone-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <code className="text-saf-800 font-mono text-sm sm:text-base selection:bg-saf-200 font-semibold tracking-wide overflow-x-auto py-1">
              https://engine.sautifarm.co/v1
            </code>
            <button
              onClick={() => copyToClipboard("https://engine.sautifarm.co/v1", "base-url")}
              className="ml-3 p-2 rounded-xl bg-white border border-stone-200 text-stone-500 hover:text-saf-800 hover:border-saf-500/40 transition shrink-0"
              title="Copy endpoint"
            >
              {copiedSnippet === 'base-url' ? <Check className="w-4 h-4 text-saf-800" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <p className="text-stone-500 text-xs sm:text-sm">
            Works out of the box with any official OpenAI SDK. Simply modify the <code className="bg-stone-900 px-1.5 py-0.5 rounded text-stone-600 font-mono text-xs">base_url</code> parameter.
          </p>
        </section>

        {/* 2. API TOKEN AUTHENTICATION */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            API Token Authentication
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Requests must authenticate by passing your SautiFarm API key in the custom <code className="bg-saf-50 text-saf-800 border border-saf-200/80 px-2 py-0.5 rounded text-xs sm:text-sm font-mono font-bold">X-API-Key</code> request header.
          </p>
          <p className="text-stone-600 text-sm sm:text-base">
            Generate and manage workspace keys on the{' '}
            <button
              onClick={() => {
                openAuthModal();
              }}
              className="text-saf-800 hover:text-saf-700 underline font-semibold transition inline-flex items-center space-x-1"
            >
              <span>API Keys Dashboard Page</span>
            </button>.
          </p>
        </section>

        <div className="border-t border-stone-800/80 my-8"></div>

        {/* 3. POST /v1/chat/completions */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-saf-50 border border-saf-200 text-saf-800 text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              POST
            </span>
            <code className="text-lg sm:text-xl font-mono text-white font-semibold">
              /v1/chat/completions
            </code>
          </div>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Dispatch queries to the high-fidelity multimodal SautiFarm Agent. Supports streaming, speech translation context, vision disease inputs, and long-turn conversational history.
          </p>

          {/* REQUEST BODY PARAMETERS */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-stone-600">
              REQUEST BODY PARAMETERS
            </h3>

            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-stone-800/80 bg-white/40 text-stone-500 font-mono text-xs uppercase tracking-wider">
                      <th className="py-3 px-4 font-semibold">PARAMETER</th>
                      <th className="py-3 px-4 font-semibold">TYPE</th>
                      <th className="py-3 px-4 font-semibold">REQUIRED</th>
                      <th className="py-3 px-4 font-semibold">DESCRIPTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/70 text-stone-600">
                    <tr className="hover:bg-stone-100/30 transition">
                      <td className="py-3 px-4 font-mono text-saf-800 font-bold">model</td>
                      <td className="py-3 px-4 font-mono text-stone-500">string</td>
                      <td className="py-3 px-4 text-saf-800 font-semibold">Yes</td>
                      <td className="py-3 px-4 text-stone-600">"sautifarm-agent" (or any designated string)</td>
                    </tr>
                    <tr className="hover:bg-stone-100/30 transition">
                      <td className="py-3 px-4 font-mono text-saf-800 font-bold">messages</td>
                      <td className="py-3 px-4 font-mono text-stone-500">array</td>
                      <td className="py-3 px-4 text-saf-800 font-semibold">Yes</td>
                      <td className="py-3 px-4 text-stone-600">List of conversational &#123;role, content&#125; objects</td>
                    </tr>
                    <tr className="hover:bg-stone-100/30 transition">
                      <td className="py-3 px-4 font-mono text-saf-800 font-bold">stream</td>
                      <td className="py-3 px-4 font-mono text-stone-500">boolean</td>
                      <td className="py-3 px-4 text-stone-500 font-medium">No</td>
                      <td className="py-3 px-4 text-stone-600">Activate Server-Sent Events (SSE) stream outputs</td>
                    </tr>
                    <tr className="hover:bg-stone-100/30 transition">
                      <td className="py-3 px-4 font-mono text-saf-800 font-bold">user</td>
                      <td className="py-3 px-4 font-mono text-stone-500">string</td>
                      <td className="py-3 px-4 text-stone-500 font-medium">No</td>
                      <td className="py-3 px-4 text-stone-600">A unique developer-defined identifier for your end-user</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* MESSAGES FORMAT SCHEMA */}
          <div className="space-y-3 pt-4">
            <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-stone-600">
              MESSAGES FORMAT SCHEMA
            </h3>

            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-stone-800/80 bg-white/40 text-stone-500 font-mono text-xs uppercase tracking-wider">
                      <th className="py-3 px-4 font-semibold">ROLE</th>
                      <th className="py-3 px-4 font-semibold">CONTENT</th>
                      <th className="py-3 px-4 font-semibold">PURPOSE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/70 text-stone-600">
                    <tr className="hover:bg-stone-100/30 transition">
                      <td className="py-3 px-4 font-mono text-saf-800 font-bold">system</td>
                      <td className="py-3 px-4 font-mono text-stone-500">string</td>
                      <td className="py-3 px-4 text-stone-600">Configure custom behavior or inject specific agronomy constraints.</td>
                    </tr>
                    <tr className="hover:bg-stone-100/30 transition">
                      <td className="py-3 px-4 font-mono text-saf-800 font-bold">user</td>
                      <td className="py-3 px-4 font-mono text-stone-500">string | array</td>
                      <td className="py-3 px-4 text-stone-600">The farmer prompt. Array structure supports image URL payloads for multimodal disease recognition.</td>
                    </tr>
                    <tr className="hover:bg-stone-100/30 transition">
                      <td className="py-3 px-4 font-mono text-saf-800 font-bold">assistant</td>
                      <td className="py-3 px-4 font-mono text-stone-500">string</td>
                      <td className="py-3 px-4 text-stone-600">Previous model response content to build multi-turn conversational memory.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* SAMPLE REQUESTS */}
          <div className="space-y-6 pt-6">
            <h3 className="text-xl sm:text-2xl font-serif text-stone-900 font-normal">
              SAMPLE REQUESTS
            </h3>

            {/* 1. Standard Shell Request (cURL) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-bold text-stone-200">
                  1. Standard Shell Request (cURL)
                </h4>
                <button
                  onClick={() => copyToClipboard(curlStandardSnippet, 'curl-std')}
                  className="flex items-center space-x-1.5 text-xs text-stone-500 hover:text-saf-800 transition bg-stone-100/60 px-3 py-1.5 rounded-lg border border-stone-200"
                >
                  {copiedSnippet === 'curl-std' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-saf-800" />
                      <span className="text-saf-800">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-white border border-stone-200 rounded-2xl p-5 font-mono text-xs sm:text-sm text-saf-800 overflow-x-auto leading-relaxed shadow-sm">
                <code>{curlStandardSnippet}</code>
              </pre>
            </div>

            {/* 2. Visual Multimodal Analysis (Disease Identification) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-bold text-stone-200">
                  2. Visual Multimodal Analysis (Disease Identification)
                </h4>
                <button
                  onClick={() => copyToClipboard(curlVisionSnippet, 'curl-vision')}
                  className="flex items-center space-x-1.5 text-xs text-stone-500 hover:text-saf-800 transition bg-stone-100/60 px-3 py-1.5 rounded-lg border border-stone-200"
                >
                  {copiedSnippet === 'curl-vision' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-saf-800" />
                      <span className="text-saf-800">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-white border border-stone-200 rounded-2xl p-5 font-mono text-xs sm:text-sm text-saf-800 overflow-x-auto leading-relaxed shadow-sm">
                <code>{curlVisionSnippet}</code>
              </pre>
            </div>

            {/* 3. Python Integration (OpenAI SDK) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-bold text-stone-200">
                  3. Python Integration (OpenAI SDK)
                </h4>
                <button
                  onClick={() => copyToClipboard(pythonSnippet, 'python-sdk')}
                  className="flex items-center space-x-1.5 text-xs text-stone-500 hover:text-saf-800 transition bg-stone-100/60 px-3 py-1.5 rounded-lg border border-stone-200"
                >
                  {copiedSnippet === 'python-sdk' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-saf-800" />
                      <span className="text-saf-800">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-white border border-stone-200 rounded-2xl p-5 font-mono text-xs sm:text-sm text-saf-800 overflow-x-auto leading-relaxed shadow-sm">
                <code>{pythonSnippet}</code>
              </pre>
            </div>

            {/* 4. Node.js Integration (Standard Fetch API) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-bold text-stone-200">
                  4. Node.js Integration (Standard Fetch API)
                </h4>
                <button
                  onClick={() => copyToClipboard(nodejsSnippet, 'nodejs-sdk')}
                  className="flex items-center space-x-1.5 text-xs text-stone-500 hover:text-saf-800 transition bg-stone-100/60 px-3 py-1.5 rounded-lg border border-stone-200"
                >
                  {copiedSnippet === 'nodejs-sdk' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-saf-800" />
                      <span className="text-saf-800">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-white border border-stone-200 rounded-2xl p-5 font-mono text-xs sm:text-sm text-saf-800 overflow-x-auto leading-relaxed shadow-sm">
                <code>{nodejsSnippet}</code>
              </pre>
            </div>
          </div>
        </section>

        <div className="border-t border-stone-800/80 my-8"></div>

        {/* 4. GET /health */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-saf-50 border border-saf-200 text-saf-800 text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              GET
            </span>
            <code className="text-lg sm:text-xl font-mono text-white font-semibold">
              /health
            </code>
          </div>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Retrieve current engine uptime metrics and microservice statuses. No authentication headers required.
          </p>
        </section>

        <div className="border-t border-stone-800/80 my-8"></div>

        {/* 5. QUICK START CHECKLIST */}
        <section className="space-y-6 pb-12">
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
            Quick Start Checklist
          </h2>

          <div className="bg-white border border-stone-200 rounded-2xl p-7 space-y-4 shadow-sm">
            <ol className="space-y-3.5 text-sm sm:text-base text-stone-600 list-decimal list-inside leading-relaxed">
              <li className="pl-1">
                Create a free developer account on the{' '}
                <button
                  onClick={() => {
                    openAuthModal();
                  }}
                  className="text-saf-800 hover:text-saf-700 font-semibold underline transition"
                >
                  Registration Page
                </button>.
              </li>
              <li className="pl-1">
                Generate an active API Key on the{' '}
                <button
                  onClick={() => {
                    openAuthModal();
                  }}
                  className="text-saf-800 hover:text-saf-700 font-semibold underline transition"
                >
                  Workspace API Keys Dashboard
                </button>.
              </li>
              <li className="pl-1">
                Test and sandbox your integration on the{' '}
                <a
                  href="#sandbox-section"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('sandbox-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-saf-800 hover:text-saf-700 font-semibold underline transition"
                >
                  Interactive API Playground
                </a>.
              </li>
              <li className="pl-1">
                Modify your software's API clients to point to SautiFarm base engine endpoints.
              </li>
            </ol>
          </div>
        </section>

        {/* 6. INTERACTIVE PLAYGROUND SANDBOX */}
        <section id="sandbox-section" className="space-y-6 pt-2 pb-12 scroll-mt-28">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
                Interactive API Playground
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Test requests live against the SautiFarm inference engine simulator.
              </p>
            </div>
            <span className="bg-saf-50 border border-saf-200 text-saf-800 text-xs px-3 py-1 rounded-full font-mono font-medium hidden sm:inline-block">
              Status: Live &amp; Ready
            </span>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
            <div className="space-y-2">
              <label htmlFor="test-prompt" className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-600">
                User Query Payload
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  id="test-prompt"
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  placeholder="e.g. When should I plant maize in Nakuru?"
                  className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-saf-500 font-mono"
                />
                <button
                  onClick={runSandboxTest}
                  disabled={sandboxLoading || !testPrompt.trim()}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-xl text-sm transition flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50"
                >
                  <Play className="w-4 h-4 fill-stone-950" />
                  <span>{sandboxLoading ? 'Executing...' : 'Run Query'}</span>
                </button>
              </div>
            </div>

            {sandboxOutput && (
              <div className="space-y-2 pt-2 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                  <span>RESPONSE (200 OK)</span>
                  <button
                    onClick={() => copyToClipboard(sandboxOutput, 'sandbox-res')}
                    className="hover:text-saf-800 transition"
                  >
                    {copiedSnippet === 'sandbox-res' ? 'Copied!' : 'Copy JSON'}
                  </button>
                </div>
                <pre className="bg-white border border-stone-200 rounded-xl p-4 font-mono text-xs text-saf-800 overflow-x-auto leading-relaxed">
                  <code>{sandboxOutput}</code>
                </pre>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};
