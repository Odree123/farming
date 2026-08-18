import React, { useState, useRef, useEffect } from 'react';
import { 
  ScanLine, 
  UploadCloud, 
  Camera, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  ShoppingBag, 
  RefreshCw, 
  Leaf, 
  ArrowRight,
  Info,
  HelpCircle,
  TrendingDown
} from 'lucide-react';
import { LanguageCode, DiseaseDiagnosis, ProductItem } from '../types';
import { getTranslation } from '../data/translations';
import { SAMPLE_CROP_DISEASES, MARKETPLACE_PRODUCTS } from '../data/mockData';

interface DiseaseDetectionProps {
  currentLanguage: LanguageCode;
  setActiveTab: (tab: string) => void;
}

export const DiseaseDetection: React.FC<DiseaseDetectionProps> = ({
  currentLanguage,
  setActiveTab,
}) => {
  const t = getTranslation(currentLanguage);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [plantType, setPlantType] = useState<string>('Maize / Mahindi');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiseaseDiagnosis | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        analyzeImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      cameraStreamRef.current = stream;
      setShowCamera(true);
    } catch (err) {
      console.warn('Camera access unavailable, falling back to file picker:', err);
      cameraInputRef.current?.click();
    }
  };

  useEffect(() => {
    if (showCamera && cameraStreamRef.current && videoRef.current) {
      videoRef.current.srcObject = cameraStreamRef.current;
      videoRef.current
        .play()
        .catch((err) => console.warn('Video play failed:', err));
    }
  }, [showCamera]);

  const stopCamera = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    if (video.videoWidth === 0) {
      await new Promise((resolve) => {
        video.addEventListener('loadedmetadata', resolve, { once: true });
        setTimeout(resolve, 3000);
      });
    }

    if (video.videoWidth === 0 || video.videoHeight === 0) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL('image/jpeg', 0.9);
    stopCamera();
    setSelectedImage(base64);
    analyzeImage(base64);
  };

  useEffect(() => {
    return () => {
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => track.stop());
        cameraStreamRef.current = null;
      }
    };
  }, []);

  const handleSampleClick = (sample: DiseaseDiagnosis) => {
    setSelectedImage(null);
    setPlantType(sample.plantName);
    setDiagnosis(sample);
  };

  const analyzeImage = async (base64Data: string) => {
    setIsAnalyzing(true);
    setDiagnosis(null);

    try {
      const response = await fetch('/api/disease-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Data,
          plantType,
          language: currentLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('Diagnosis failed');
      }

      const data = await response.json();
      if (data.diagnosis) {
        setDiagnosis(data.diagnosis);
      } else {
        setDiagnosis(SAMPLE_CROP_DISEASES[0]);
      }
    } catch (err) {
      console.warn('Backend vision failed, fallback to local agronomy database:', err);
      const matched = SAMPLE_CROP_DISEASES.find(d => plantType.toLowerCase().includes(d.plantName.toLowerCase())) || SAMPLE_CROP_DISEASES[0];
      setDiagnosis(matched);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <span className="bg-rose-100 text-rose-800 border border-rose-200 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">Hatari Kubwa (Critical)</span>;
      case 'high':
        return <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">Hatari ya Wastani (High)</span>;
      case 'moderate':
        return <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">Wastani (Moderate)</span>;
      default:
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">Chini (Low)</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-saf-100 text-saf-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <ScanLine className="w-3.5 h-3.5" />
            <span>KALRO & Gemini AI Vision Pathology</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            {t.disease.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            {t.disease.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={plantType}
            onChange={(e) => setPlantType(e.target.value)}
            className="text-xs bg-stone-100 border border-stone-300 rounded-xl px-3 py-2 text-stone-800 font-semibold focus:ring-2 focus:ring-saf-600 outline-none"
          >
            <option value="Maize / Mahindi">Mahindi (Maize)</option>
            <option value="Tomato / Nyanya">Nyanya (Tomato)</option>
            <option value="Potato / Viazi Mviringo">Viazi Mviringo (Irish Potato)</option>
            <option value="Coffee / Kahawa">Kahawa (Coffee)</option>
            <option value="Beans / Maharagwe">Maharagwe (Beans)</option>
            <option value="Cabbage / Sukuma">Kabeji / Sukuma Wiki</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="text-sm font-bold text-stone-900 flex items-center justify-between">
            <span>{t.disease.uploadPrompt}</span>
            {selectedImage && (
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setDiagnosis(null);
                }}
                className="text-xs text-rose-600 hover:underline flex items-center"
              >
                <RefreshCw className="w-3 h-3 mr-1" /> Weka Upya (Clear)
              </button>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          <input
            type="file"
            ref={cameraInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            capture="environment"
            className="hidden"
          />

          {!selectedImage ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-saf-300 hover:border-saf-500 bg-saf-50/40 hover:bg-saf-50/80 rounded-2xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-saf-100 text-saf-700 flex items-center justify-center shadow-sm">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-stone-800">{t.disease.dragDrop}</p>
                <p className="text-xs text-stone-500 mt-0.5">Inasaidia picha za JPG, PNG kutoka kwa simu au kompyuta</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  startCamera();
                }}
                className="inline-flex items-center gap-2 bg-saf-800 hover:bg-saf-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow"
              >
                <Camera className="w-4 h-4 text-amber-300" />
                <span>{t.disease.takePhoto}</span>
              </button>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-saf-300 max-h-72 bg-stone-950 flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Selected Plant Leaf"
                className="w-full h-full max-h-72 object-contain"
                referrerPolicy="no-referrer"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-3">
                  <div className="w-12 h-12 rounded-full border-4 border-saf-400 border-t-transparent animate-spin"></div>
                  <p className="text-xs font-bold text-saf-300">{t.disease.analyzing}</p>
                </div>
              )}
            </div>
          )}

          <div>
            <div className="text-xs font-bold text-stone-700 mb-2">
              {t.disease.sampleImages} (Bonyeza kupima bila picha):
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SAMPLE_CROP_DISEASES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleClick(sample)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    diagnosis?.id === sample.id
                      ? 'bg-saf-800 text-white border-saf-900 shadow-sm'
                      : 'bg-stone-50 hover:bg-saf-50/60 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="text-[11px] font-bold truncate">{sample.diseaseName.split('(')[0]}</div>
                  <div className={`text-[10px] mt-0.5 truncate ${diagnosis?.id === sample.id ? 'text-saf-200' : 'text-stone-500'}`}>
                    {sample.plantName}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          {diagnosis ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-saf-700">
                    {diagnosis.plantName}
                  </span>
                  <h2 className="text-lg font-black text-stone-900 leading-snug">
                    {diagnosis.diseaseName}
                  </h2>
                  {diagnosis.localName && (
                    <p className="text-xs font-medium text-stone-500">
                      Jina la Kienyeji: <span className="text-stone-800">{diagnosis.localName}</span>
                    </p>
                  )}
                </div>
                {getSeverityBadge(diagnosis.severity)}
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                  <span>{t.disease.confidence}</span>
                  <span className="text-saf-700">{diagnosis.confidence}%</span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-saf-500 to-saf-600 rounded-full transition-all duration-500"
                    style={{ width: `${diagnosis.confidence}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-500 mt-1">
                  <span>Uamuzi wa Haraka: Siku {diagnosis.urgencyDays || 3}</span>
                  <span>Hasara Inayokadiriwa: {diagnosis.estimatedYieldLoss || '30% - 60%'}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5 flex items-center">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-600" />
                  {t.disease.symptoms}
                </h3>
                <ul className="text-xs text-stone-600 space-y-1 list-disc list-inside">
                  {diagnosis.symptoms.slice(0, 3).map((sym, idx) => (
                    <li key={idx} className="leading-relaxed">{sym}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-saf-50/70 p-3 rounded-xl border border-saf-200/80">
                <h3 className="text-xs font-bold text-saf-900 uppercase tracking-wider mb-1 flex items-center">
                  <Leaf className="w-3.5 h-3.5 mr-1 text-saf-700" />
                  {t.disease.organicCure}
                </h3>
                <ul className="text-xs text-saf-800 space-y-1 list-disc list-inside">
                  {diagnosis.organicTreatment.slice(0, 2).map((cure, idx) => (
                    <li key={idx} className="leading-relaxed">{cure}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-sky-50/70 p-3 rounded-xl border border-sky-200/80">
                <h3 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-1 flex items-center">
                  <ShieldAlert className="w-3.5 h-3.5 mr-1 text-sky-700" />
                  {t.disease.chemicalCure}
                </h3>
                <ul className="text-xs text-sky-800 space-y-1 list-disc list-inside">
                  {diagnosis.chemicalTreatment.slice(0, 2).map((cure, idx) => (
                    <li key={idx} className="leading-relaxed">{cure}</li>
                  ))}
                </ul>
              </div>

              {diagnosis.recommendedProducts && diagnosis.recommendedProducts.length > 0 && (
                <div className="pt-2">
                  <div className="text-xs font-bold text-stone-800 mb-2">
                    Dawa Zilizoidhinishwa Dukani:
                  </div>
                  <div className="space-y-2">
                    {diagnosis.recommendedProducts.map((prod, idx) => {
                      const matchedProduct = MARKETPLACE_PRODUCTS.find(p => p.name.toLowerCase().includes(prod.name.toLowerCase())) || MARKETPLACE_PRODUCTS[4];
                      return (
                        <div
                          key={idx}
                          className="bg-stone-50 border border-stone-200 rounded-xl p-2.5 flex items-center justify-between"
                        >
                          <div>
                            <div className="text-xs font-bold text-stone-900">{prod.name}</div>
                            <div className="text-[10px] text-stone-500">{prod.dosage}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-saf-800 font-mono">
                              KES {prod.priceKES.toLocaleString()}
                            </span>
                            <button
                              onClick={() => setActiveTab('marketplace')}
                              className="bg-saf-800 hover:bg-saf-700 text-white px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1 shadow-sm"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>{t.marketplace.allCategories}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-400 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400">
                <ScanLine className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-600">Hakuna picha iliyochaguliwa</p>
                <p className="text-[11px] text-stone-400 mt-1 max-w-xs">
                  Pakia picha ya jani la mmea kushoto au chagua mojawapo ya sampuli za kupima.
                </p>
              </div>
            </div>
          )}
      </div>
    </div>

    {showCamera && (
      <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-lg aspect-video">
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className="w-full h-full rounded-xl object-cover bg-black"
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>
        <div className="flex items-center gap-6 mt-6">
          <button
            type="button"
            onClick={stopCamera}
            className="px-4 py-2 text-stone-300 hover:text-white text-sm font-medium"
          >
            Ghairi
          </button>
          <button
            type="button"
            onClick={capturePhoto}
            className="w-16 h-16 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-900 shadow-lg flex items-center justify-center"
          >
            <Camera className="w-7 h-7" />
          </button>
        </div>
      </div>
    )}
  </div>
);
};
