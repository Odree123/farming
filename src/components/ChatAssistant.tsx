import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  Square, 
  Image as ImageIcon, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Trash2, 
  Copy, 
  Check, 
  Loader2, 
  Camera, 
  X, 
  Bot, 
  User, 
  AlertCircle,
  ShoppingBag,
  TrendingUp,
  Leaf
} from 'lucide-react';
import { ChatMessage, LanguageCode, FarmerProfile } from '../types';
import { getTranslation } from '../data/translations';

interface ChatAssistantProps {
  currentLanguage: LanguageCode;
  farmer: FarmerProfile;
  setActiveTab: (tab: string) => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  currentLanguage,
  farmer,
  setActiveTab,
}) => {
  const t = getTranslation(currentLanguage);
  
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('sautifarm_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: 'welcome-msg',
        sender: 'assistant',
        text: `Habari ${farmer.name || 'Mkulima'}! Mimi ni Bwana Shamba AI wa SautiFarm. 🌾\n\nNiko hapa kukusaidia kwa maswali yote ya kilimo, ukaguzi wa magonjwa ya majani, mbolea bora za kupandia, na bei za mazao masokoni nchini Kenya.\n\nUnaweza kuandika swali, kupakia picha ya mmea, au kubofya kipaza sauti kuongea.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioPlayingId, setAudioPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    localStorage.setItem('sautifarm_chat_history', JSON.stringify(messages));
  }, [messages]);

  // Handle voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // Simulating transcription for the voice note
        const voicePrompts: Record<LanguageCode, string> = {
          sw: 'Ni mbolea gani inafaa kupanda mahindi wakati huu wa mvua za masika?',
          en: 'What is the best planting fertilizer for highland maize?',
          ki: 'Thumu ũrĩkũ mwega wa kũhanda mbembe?',
          luo: 'Yadh lowo mane maber ne komo oduma?',
          luh: 'Ishumu shina shilahi okhuhanda amavindi?',
          kal: 'Yabosiet ano ne kararan eng bandek?',
          kam: 'Mbolea yĩva yĩseo ya kũvanda mbembe?',
          som: 'Bacrimintee ayaa ugu fiican beerashada galleyda?',
        };
        const transcript = voicePrompts[currentLanguage] || voicePrompts.sw;
        setInputPrompt(transcript);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.warn('Microphone access not available:', err);
      alert('Tafadhali ruhusu kipaza sauti (microphone) kwenye kivinjari chako.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Handle image attachment
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || inputPrompt.trim();
    if (!messageText && !selectedImage) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: messageText,
      imageUrl: selectedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: currentLanguage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt('');
    const sentImage = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: messages,
          language: currentLanguage,
          imageUrl: sentImage,
          county: farmer.county || 'Uasin Gishu',
          farmSize: `${farmer.farmSizeAcres || 2} acres`,
        }),
      });

      if (!response.ok) {
        throw new Error('Chat API response failed');
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.reply || 'Samahani mkulima, sijapata jibu kwa sasa.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: currentLanguage,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error fetching chat response:', err);
      // Fallback helpful offline response in case of API hiccup
      const fallbackReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: `Asante kwa swali lako kuhusu kilimo. Miongozo ya KALRO inapendekeza:\n\n1. **Kupanda Mahindi:** Tumia mbolea ya DAP au YaraMila Cereal (kilo 50 kwa ekari moja) na mbegu zilizoidhinishwa na KEPHIS (mf. DK777 au H614D).\n2. **Kudhibiti Funza wa Mahindi:** Piga dawa ya Belt 480SC (5ml kwa lita 20) au weka majivu safi ya mti kwenye koni ya jani.\n3. **Ushauri wa Mvua:** Fuatilia utabiri wa kaunti yako kabla ya kunyunyizia madawa.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  // Text to Speech
  const toggleSpeak = (id: string, text: string) => {
    if (audioPlayingId === id) {
      window.speechSynthesis?.cancel();
      setAudioPlayingId(null);
      return;
    }

    window.speechSynthesis?.cancel();

    if ('speechSynthesis' in window) {
      const cleanText = text.replace(/[*_#]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = currentLanguage === 'en' ? 'en-KE' : 'sw-KE';
      utterance.rate = 0.95;

      utterance.onend = () => setAudioPlayingId(null);
      utterance.onerror = () => setAudioPlayingId(null);

      setAudioPlayingId(id);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Kifaa chako hakitumii Text-to-Speech moja kwa moja.');
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    if (window.confirm('Je, una uhakika unataka kufuta mazungumzo haya?')) {
      const resetMsg: ChatMessage = {
        id: 'welcome-reset',
        sender: 'assistant',
        text: 'Mazungumzo yamefutwa. Ninawezaje kukusaidia leo shambani?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([resetMsg]);
      localStorage.removeItem('sautifarm_chat_history');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-h-[850px] bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
      {/* Chat Top Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white px-4 py-3 flex items-center justify-between border-b border-emerald-700/80">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold shadow">
              <Bot className="w-6 h-6 text-emerald-950" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-emerald-900 rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold tracking-tight">{t.chat.title}</h2>
              <span className="text-[10px] bg-emerald-700 text-amber-300 px-1.5 py-0.2 rounded font-semibold">
                Online
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/90">
              Ushauri wa Kilimo • Kaunti: {farmer.county || 'Kenya'} • Ekari {farmer.farmSizeAcres || 2}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={clearChat}
            className="p-1.5 text-emerald-300 hover:text-white hover:bg-emerald-800 rounded-lg transition"
            title="Futa Mazungumzo / Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="bg-stone-50 border-b border-stone-200 px-4 py-2 flex items-center space-x-2 overflow-x-auto no-scrollbar text-xs">
        <span className="text-[11px] font-semibold text-stone-500 shrink-0 flex items-center">
          <Sparkles className="w-3 h-3 mr-1 text-amber-500" /> Uliza:
        </span>
        {t.chat.suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="shrink-0 bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-400 text-stone-700 hover:text-emerald-900 px-2.5 py-1 rounded-full text-[11px] font-medium transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${
                  isUser
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-emerald-800 text-amber-300'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Body */}
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-1`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isUser
                      ? 'bg-emerald-800 text-white rounded-tr-none'
                      : 'bg-white text-stone-800 border border-stone-200/90 rounded-tl-none'
                  }`}
                >
                  {/* Attached Image if any */}
                  {msg.imageUrl && (
                    <div className="mb-2.5 rounded-lg overflow-hidden border border-stone-200 max-w-xs">
                      <img
                        src={msg.imageUrl}
                        alt="Crop Attachment"
                        className="w-full h-auto max-h-48 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Formatted Text */}
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>

                {/* Footer Micro-bar (Timestamp, Audio TTS, Copy) */}
                <div className={`flex items-center space-x-2 text-[10px] text-stone-400 px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <>
                      <span>•</span>
                      <button
                        onClick={() => toggleSpeak(msg.id, msg.text)}
                        className="hover:text-emerald-700 font-medium flex items-center space-x-1"
                        title={audioPlayingId === msg.id ? t.chat.stopAudio : t.chat.speakResponse}
                      >
                        {audioPlayingId === msg.id ? (
                          <>
                            <VolumeX className="w-3 h-3 text-rose-600 animate-pulse" />
                            <span className="text-rose-600">Simamisha</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-stone-500" />
                            <span>Sikiliza</span>
                          </>
                        )}
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => copyToClipboard(msg.id, msg.text)}
                        className="hover:text-emerald-700"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-stone-200/90 rounded-2xl rounded-tl-none p-3.5 shadow-sm text-xs text-stone-600 flex items-center space-x-2">
              <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>Bwana Shamba anatafakari ushauri wa kitaalamu...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Selected Image Preview before sending */}
      {selectedImage && (
        <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={selectedImage}
              alt="Leaf Preview"
              className="w-10 h-10 object-cover rounded-lg border border-emerald-300"
            />
            <span className="text-xs text-emerald-900 font-medium">
              Picha ya jani la mmea imeambatanishwa
            </span>
          </div>
          <button
            onClick={() => setSelectedImage(null)}
            className="p-1 hover:bg-emerald-200 rounded text-emerald-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input Bar */}
      <div className="p-3 bg-white border-t border-stone-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />

          {/* Camera / Image Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
            title={t.chat.uploadImagePrompt}
          >
            <Camera className="w-5 h-5" />
          </button>

          {/* Voice Note Button */}
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-2.5 rounded-xl transition ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
            title={isRecording ? 'Bonyeza kumaliza kurekodi' : 'Ongea ujumbe wa sauti'}
          >
            {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5 text-emerald-700" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            id="chat-input-text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={isRecording ? t.chat.recordingVoice : t.chat.placeholder}
            disabled={isLoading}
            className="flex-1 bg-stone-50 border border-stone-300 focus:border-emerald-600 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 outline-none transition"
          />

          {/* Send Button */}
          <button
            type="submit"
            id="chat-send-btn"
            disabled={(!inputPrompt.trim() && !selectedImage) || isLoading}
            className={`p-2.5 rounded-xl font-medium transition flex items-center justify-center ${
              (!inputPrompt.trim() && !selectedImage) || isLoading
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-emerald-800 hover:bg-emerald-700 text-white shadow-md'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        <div className="text-[10px] text-center text-stone-400 mt-1.5">
          {t.chat.disclaimer}
        </div>
      </div>
    </div>
  );
};
