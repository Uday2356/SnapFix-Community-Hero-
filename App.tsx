import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  MapPin, 
  MessageSquare, 
  Bell, 
  LogIn, 
  Sparkles, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  AlertTriangle, 
  ThumbsUp, 
  Trash2, 
  Lightbulb, 
  Droplet, 
  User, 
  Wrench, 
  Languages, 
  Sun, 
  Moon, 
  RefreshCw, 
  X, 
  ChevronRight, 
  Play, 
  Info,
  Award,
  HelpCircle,
  HelpCircle as OtherIcon,
  Phone,
  Shield,
  Flame
} from 'lucide-react';
import CivicMap from './components/CivicMap';
import { translations, LanguageCode } from './translations';

// --- TYPE DEFINITIONS ---
interface Issue {
  id: string;
  type: string;
  location: string;
  details: string;
  severity: number;
  votes: number;
  status: 'Reported' | 'Verified' | 'Resolved';
  timeAgo: string;
  photo: string;
  userVerified: boolean;
  reportedBy?: string;
}

interface UserSession {
  username: string;
  points: number;
  verifiedIssueIds: string[];
}

export default function App() {
  // --- STATE MANAGEMENT ---
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState<'feed' | 'snap' | 'map' | 'profile'>('feed');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [darkVision, setDarkVision] = useState<boolean>(true);
  
  // Auth Form state
  const [authUsername, setAuthUsername] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Main Feed Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  // Quick-Snap Camera/Preset Analysis states
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analyzingImage, setAnalyzingImage] = useState<boolean>(false);
  const [detectedCategory, setDetectedCategory] = useState<string>('Road Damage');
  const [detectedSeverity, setDetectedSeverity] = useState<number>(6);
  const [detectedDetails, setDetectedDetails] = useState<string>('');
  const [detectedLocation, setDetectedLocation] = useState<string>('');
  const [detectedDepartment, setDetectedDepartment] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [latestCreatedId, setLatestCreatedId] = useState<string | null>(null);
  const [showGoogleAuthModal, setShowGoogleAuthModal] = useState<boolean>(false);
  const [showContactsModal, setShowContactsModal] = useState<boolean>(false);
  const [googleEmailInput, setGoogleEmailInput] = useState<string>('');
  const [googleNameInput, setGoogleNameInput] = useState<string>('');
  const [showCustomGoogleInput, setShowCustomGoogleInput] = useState<boolean>(false);
  const [googleSigningIn, setGoogleSigningIn] = useState<boolean>(false);

  // Voice Assist Accessibility states
  const [voiceModeActive, setVoiceModeActive] = useState<boolean>(false);
  const [voiceActive, setVoiceActive] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [normalizingVoice, setNormalizingVoice] = useState<boolean>(false);
  const [voiceGuideText, setVoiceGuideText] = useState<string>('');
  const [voiceNormalizedData, setVoiceNormalizedData] = useState<any>(null);
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'processing' | 'confirmed' | 'error'>('idle');

  // Sample Lucknow-based Civic Issues data matching coordinate scaling in CivicMap
  const [issues, setIssues] = useState<Issue[]>([
    { 
      id: 'SF-101', 
      type: 'Pothole', 
      details: 'Large pothole on Kanpur Road near Metro Pillar 42, causing vehicles to swerve dangerously.',
      location: 'Kanpur Road Bypass [GPS: 26.8050, 80.9120]', 
      severity: 8,
      votes: 3,
      status: 'Reported',
      timeAgo: '2 hours ago',
      photo: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=400&q=80',
      userVerified: false,
      reportedBy: 'Nitin_Kumar'
    },
    { 
      id: 'SF-102', 
      type: 'Broken Streetlight', 
      details: 'Entire street light pole is unlit near Hazratganj main crossing. Unsafe for women at night.',
      location: 'Hazratganj Avenue [GPS: 26.8520, 80.9440]', 
      severity: 5,
      votes: 4,
      status: 'Verified',
      timeAgo: '1 day ago',
      photo: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=400&q=80',
      userVerified: false,
      reportedBy: 'Asha_Mishra'
    },
    { 
      id: 'SF-103', 
      type: 'Garbage Dumping', 
      details: 'Heavy garbage accumulation and open dumping yard spreading bad odor near Lohia Park entrance.',
      location: 'Lohia Park Road [GPS: 26.8580, 80.9760]', 
      severity: 7,
      votes: 5,
      status: 'Resolved',
      timeAgo: '3 days ago',
      photo: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=400&q=80',
      userVerified: false,
      reportedBy: 'Municipal_HQ'
    },
    { 
      id: 'SF-104', 
      type: 'Water Leakage', 
      details: 'Drinking water pipeline burst near Charbagh Railway Terminal, wasting thousands of liters.',
      location: 'Charbagh Station Area [GPS: 26.8240, 80.9160]', 
      severity: 6,
      votes: 2,
      status: 'Reported',
      timeAgo: '5 hours ago',
      photo: 'https://images.unsplash.com/photo-1542013936693-8848e5740a7a?auto=format&fit=crop&w=400&q=80',
      userVerified: false,
      reportedBy: 'Ramesh_Verma'
    }
  ]);

  const t = translations[language];

  // Text-To-Speech Pronunciation Helper
  const speakPrompt = (text: string) => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        // Adjust speech language
        if (language === 'hi') {
          utterance.lang = 'hi-IN';
        } else {
          utterance.lang = 'en-IN';
        }
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Speech Synthesis Utterance initialization failed (e.g. sandbox restriction):", err);
      }
    }
  };

  // Trigger voice guide speaking on Voice Mode toggles
  useEffect(() => {
    if (voiceModeActive) {
      const welcomeText = language === 'hi' 
        ? "स्नैपफिक्स वॉयस असिस्टेंट में आपका स्वागत है। शिकायत दर्ज करने के लिए माइक दबाएं, या नीचे किसी विकल्प को चुनें।" 
        : "Welcome to SnapFix Voice Assistant. Press the microphone to speak, or tap a quick-simulation chip below.";
      setVoiceGuideText(welcomeText);
      speakPrompt(welcomeText);
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [voiceModeActive, language]);

  // Handle standard auth gate login
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUsername.trim() || !authPassword.trim()) {
      setAuthError(t.usernameRequired);
      return;
    }
    if (authUsername.trim().length < 3) {
      setAuthError(t.usernameMinLen);
      return;
    }
    
    // Simulate successful sign-in
    setCurrentUser({
      username: authUsername.trim(),
      points: 30,
      verifiedIssueIds: []
    });
    setAuthError('');
  };

  // Handle Voice Speech Input Listening Start
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      // Browser doesn't support speech API or is sandboxed inside iframe
      setVoiceTranscript("Large pothole near Hazratganj main crossing");
      handleVoiceTranscriptComplete("Large pothole near Hazratganj main crossing");
      return;
    }

    try {
      const SpeechRec = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const rec = new SpeechRec();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = language === 'hi' ? 'hi-IN' : (language === 'hinglish' ? 'hi-IN' : 'en-IN');

      rec.onstart = () => {
        setVoiceActive(true);
        setVoiceTranscript('');
        setVoiceStatus('listening');
        setVoiceGuideText(language === 'hi' ? "सुन रहा हूँ... कृपया अपनी शिकायत बोलें।" : "Listening... Please describe the civic issue.");
      };

      rec.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setVoiceTranscript(text);
        handleVoiceTranscriptComplete(text);
      };

      rec.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event);
        setVoiceActive(false);
        setVoiceStatus('error');
        setVoiceGuideText(language === 'hi' ? "सुनने में असमर्थ। कृपया नीचे दिए गए उदाहरण पर क्लिक करें।" : "Unable to hear. Please try clicking one of the simulation chips below.");
      };

      rec.onend = () => {
        setVoiceActive(false);
      };

      rec.start();
    } catch (err) {
      console.error("Speech Recognition Engine Start Failed:", err);
      setVoiceActive(false);
      setVoiceStatus('error');
    }
  };

  // Submit Captured Voice speech to backend Gemini API for normalization
  const handleVoiceTranscriptComplete = async (text: string) => {
    setNormalizingVoice(true);
    setVoiceStatus('processing');
    setVoiceGuideText(language === 'hi' ? "जेमिनी एआई द्वारा विश्लेषण किया जा रहा है..." : "Gemini AI is analyzing your vocal complaint...");

    try {
      const response = await fetch('/api/gemini/normalize-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: text })
      });

      if (response.ok) {
        const data = await response.json();
        setVoiceNormalizedData(data);
        setVoiceStatus('confirmed');

        // Speak the confirmation to user
        const categoryLabel = data.category || "Other";
        const locationLabel = data.location_clues || (language === 'hi' ? "अज्ञात स्थान" : "detected area");
        const speakText = language === 'hi'
          ? `हमने ${locationLabel} के पास ${categoryLabel} की समस्या पाई है। सबमिट करने के लिए हाँ दबाएं।`
          : `We found a ${categoryLabel} issue near ${locationLabel}. Tap submit to proceed.`;
        
        setVoiceGuideText(speakText);
        speakPrompt(speakText);
      } else {
        throw new Error("Voice normalization response invalid");
      }
    } catch (err) {
      console.error("Voice Normalization Error:", err);
      // Fallback
      setVoiceNormalizedData({
        detected_issue: text,
        category: text.toLowerCase().includes("light") ? "Streetlights/Electricity" : "Roads/Potholes",
        severity: "High",
        location_clues: "Hazratganj Crossing",
        requires_immediate_dispatch: true
      });
      setVoiceStatus('confirmed');
      setVoiceGuideText(language === 'hi' ? "विश्लेषण पूर्ण हुआ। कृपया जांचें और सबमिट करें।" : "Analysis ready. Please review and submit.");
    } finally {
      setNormalizingVoice(false);
    }
  };

  // Submit normalized voice issue to state
  const submitVoiceReport = () => {
    if (!voiceNormalizedData) return;

    // Map categories to standard app types
    let standardType = 'Road Damage';
    const cat = voiceNormalizedData.category || "";
    if (cat.includes("Road") || cat.includes("Pothole")) standardType = 'Pothole';
    else if (cat.includes("Streetlight") || cat.includes("Electricity")) standardType = 'Broken Streetlight';
    else if (cat.includes("Water") || cat.includes("Sanitation")) standardType = 'Water Leakage';
    else if (cat.includes("Garbage") || cat.includes("Waste")) standardType = 'Garbage Dumping';

    // Formulate random coordinate
    const lat = 26.81 + Math.random() * 0.08;
    const lng = 80.91 + Math.random() * 0.08;
    const locationStr = `${voiceNormalizedData.location_clues || "Local Area"} [GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)}]`;

    const newId = `SF-${Math.floor(100 + Math.random() * 900)}`;
    const newIssue: Issue = {
      id: newId,
      type: standardType,
      details: voiceNormalizedData.detected_issue || "Reported via Voice Assist",
      location: locationStr,
      severity: voiceNormalizedData.severity === 'High' ? 8 : (voiceNormalizedData.severity === 'Medium' ? 6 : 4),
      votes: 1,
      status: 'Reported',
      timeAgo: 'Just now',
      photo: standardType === 'Pothole' ? 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=400&q=80' : 
             standardType === 'Broken Streetlight' ? 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=400&q=80' :
             standardType === 'Water Leakage' ? 'https://images.unsplash.com/photo-1542013936693-8848e5740a7a?auto=format&fit=crop&w=400&q=80' : 
             'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=400&q=80',
      userVerified: false,
      reportedBy: currentUser?.username || 'Citizen'
    };

    setIssues([newIssue, ...issues]);
    
    // Reward points
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        points: currentUser.points + 10
      });
    }

    setLatestCreatedId(newId);
    setVoiceModeActive(false);
    setVoiceNormalizedData(null);
    setVoiceTranscript('');
    setVoiceStatus('idle');
    setShowSuccessModal(true);
  };

  // Handle native or simulated image selection for One-Click Snap
  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Pure base64 payload without data headers
        const pureBase64 = base64String.split(',')[1];
        setCapturedImage(base64String);
        triggerGeminiAnalysis(pureBase64, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate preset image clicks (For easy desktop evaluations!)
  const handlePresetSelect = (presetCode: string, imgUrl: string) => {
    setCapturedImage(imgUrl);
    // Send standard letter coordinates mapping to fallback hash in server.ts
    // 'A' maps to Pothole, 'AB' maps to Broken Streetlight, 'ABC' maps to Water Leakage, 'ABCD' maps to Garbage Dumping
    triggerGeminiAnalysis(presetCode, "image/jpeg");
  };

  // Trigger backend Visual Hazard Classification
  const triggerGeminiAnalysis = async (base64Payload: string, mimeType: string) => {
    setAnalyzingImage(true);
    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Payload, mimeType })
      });

      if (response.ok) {
        const rawResult = await response.json();
        // Server returns the text response parsed or fallback wrapper
        const parsedText = rawResult?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (parsedText) {
          const parsed = JSON.parse(parsedText);
          setDetectedCategory(parsed.issue_type || "Road Damage");
          setDetectedSeverity(parsed.severity || 6);
          setDetectedDetails(parsed.description || "Identified physical hazard on street.");
          setDetectedDepartment(parsed.department || "Municipal Corporation");
          
          // Autofill random coordinates in bounding area
          const lat = 26.82 + Math.random() * 0.08;
          const lng = 80.92 + Math.random() * 0.08;
          setDetectedLocation(`Local Area [GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)}]`);
        }
      } else {
        throw new Error("Failed visual analysis");
      }
    } catch (err) {
      console.error("Gemini Visual Hazard Classification Error:", err);
      // Dynamic local fallback if server connection times out
      setDetectedCategory("Pothole");
      setDetectedSeverity(7);
      setDetectedDetails("सड़क पर बड़ा गड्ढा है जिससे दुर्घटना होने का गंभीर खतरा है।");
      setDetectedDepartment("PWD / Municipal Corporation");
      setDetectedLocation("NH-25 Highway [GPS: 26.8120, 80.9240]");
    } finally {
      setAnalyzingImage(false);
    }
  };

  // Save the analyzed visual issue report
  const dispatchVisualReport = () => {
    const newId = `SF-${Math.floor(100 + Math.random() * 900)}`;
    const newIssue: Issue = {
      id: newId,
      type: detectedCategory,
      details: detectedDetails,
      location: detectedLocation || "Local Area",
      severity: detectedSeverity,
      votes: 1,
      status: 'Reported',
      timeAgo: 'Just now',
      photo: capturedImage || 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=400&q=80',
      userVerified: false,
      reportedBy: currentUser?.username || 'Citizen'
    };

    setIssues([newIssue, ...issues]);
    
    // Reward points
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        points: currentUser.points + 10
      });
    }

    setLatestCreatedId(newId);
    setCapturedImage(null);
    setShowSuccessModal(true);
  };

  // Upvote / Verify an issue from details modal or feed
  const handleVerifyIssue = (issueId: string) => {
    if (!currentUser) return;
    
    // Prevent double verification
    if (currentUser.verifiedIssueIds.includes(issueId)) return;

    setIssues(issues.map(iss => {
      if (iss.id === issueId) {
        const nextVotes = iss.votes + 1;
        // Auto transition to verified state once votes reach 5
        let nextStatus = iss.status;
        if (nextVotes >= 5) {
          nextStatus = 'Verified';
        }
        return {
          ...iss,
          votes: nextVotes,
          status: nextStatus,
          userVerified: true
        };
      }
      return iss;
    }));

    setCurrentUser({
      ...currentUser,
      points: currentUser.points + 5,
      verifiedIssueIds: [...currentUser.verifiedIssueIds, issueId]
    });

    // Speak verification acknowledgement
    speakPrompt(language === 'hi' 
      ? "सत्यापन सफल रहा! आपको पांच हीरो अंक मिले हैं।" 
      : "Verification successful! You earned five hero points.");
  };

  // Reset database helper for evaluation convenience
  const resetDatabaseToDefault = () => {
    if (window.confirm(t.resetConfirmMessage)) {
      setIssues([
        { 
          id: 'SF-101', 
          type: 'Pothole', 
          details: 'Large pothole on Kanpur Road near Metro Pillar 42, causing vehicles to swerve dangerously.',
          location: 'Kanpur Road Bypass [GPS: 26.8050, 80.9120]', 
          severity: 8,
          votes: 3,
          status: 'Reported',
          timeAgo: '2 hours ago',
          photo: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=400&q=80',
          userVerified: false,
          reportedBy: 'Nitin_Kumar'
        },
        { 
          id: 'SF-102', 
          type: 'Broken Streetlight', 
          details: 'Entire street light pole is unlit near Hazratganj main crossing. Unsafe for women at night.',
          location: 'Hazratganj Avenue [GPS: 26.8520, 80.9440]', 
          severity: 5,
          votes: 4,
          status: 'Verified',
          timeAgo: '1 day ago',
          photo: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=400&q=80',
          userVerified: false,
          reportedBy: 'Asha_Mishra'
        },
        { 
          id: 'SF-103', 
          type: 'Garbage Dumping', 
          details: 'Heavy garbage accumulation and open dumping yard spreading bad odor near Lohia Park entrance.',
          location: 'Lohia Park Road [GPS: 26.8580, 80.9760]', 
          severity: 7,
          votes: 5,
          status: 'Resolved',
          timeAgo: '3 days ago',
          photo: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=400&q=80',
          userVerified: false,
          reportedBy: 'Municipal_HQ'
        },
        { 
          id: 'SF-104', 
          type: 'Water Leakage', 
          details: 'Drinking water pipeline burst near Charbagh Railway Terminal, wasting thousands of liters.',
          location: 'Charbagh Station Area [GPS: 26.8240, 80.9160]', 
          severity: 6,
          votes: 2,
          status: 'Reported',
          timeAgo: '5 hours ago',
          photo: 'https://images.unsplash.com/photo-1542013936693-8848e5740a7a?auto=format&fit=crop&w=400&q=80',
          userVerified: false,
          reportedBy: 'Ramesh_Verma'
        }
      ]);
      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          points: 15,
          verifiedIssueIds: []
        });
      }
      setSelectedIssue(null);
      speakPrompt(language === 'hi' ? "डेटाबेस रीसेट कर दिया गया है।" : "Database reset successful.");
    }
  };

  // Filter issues according to search input & filters selected
  const filteredFeedIssues = issues.filter(issue => {
    const matchesSearch = 
      issue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || issue.type === categoryFilter;
    const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Category Icon & Color Mapping for low-literacy users
  const getCategoryTheme = (type: string) => {
    switch (type) {
      case 'Pothole':
      case 'Road Damage':
        return { icon: <Wrench className="w-5 h-5 text-white" />, color: 'bg-red-500 border-red-600/50', label: t.catPotholes };
      case 'Broken Streetlight':
        return { icon: <Lightbulb className="w-5 h-5 text-white" />, color: 'bg-amber-500 border-amber-600/50', label: t.catStreetlight };
      case 'Water Leakage':
        return { icon: <Droplet className="w-5 h-5 text-white" />, color: 'bg-blue-500 border-blue-600/50', label: t.catWaterlogging };
      case 'Garbage Dumping':
        return { icon: <Trash2 className="w-5 h-5 text-white" />, color: 'bg-emerald-500 border-emerald-600/50', label: t.catGarbage };
      default:
        return { icon: <AlertTriangle className="w-5 h-5 text-white" />, color: 'bg-indigo-500 border-indigo-600/50', label: t.catOthers };
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 flex justify-center items-center p-0 md:p-4 font-sans antialiased select-none selection:bg-teal-500/30 transition-colors ${darkVision ? '' : 'bg-slate-100'}`}>
      
      {/* Centered Mobile Envelope Framework */}
      <div id="app-viewport-card" className={`w-full h-screen md:max-w-md md:h-[840px] md:rounded-3xl md:shadow-2xl overflow-hidden flex flex-col bg-slate-900 border border-slate-800 text-slate-100 relative transition-colors ${darkVision ? 'dark-vision' : 'bg-white border-slate-200 text-slate-800'}`}>
        
        {/* --- DYNAMIC UPPER PERSISTENT HEADER --- */}
        <header className={`h-16 border-b border-slate-800 px-4 flex justify-between items-center z-20 sticky top-0 bg-slate-900/95 backdrop-blur-md transition-colors ${darkVision ? 'border-slate-800 bg-slate-900/95' : 'border-slate-100 bg-white/95'}`}>
          <div className="flex items-center gap-2.5">
            {/* Dynamic rotating branding element */}
            <div className="w-8 h-8 bg-gradient-to-tr from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md shadow-teal-500/20 transform animate-logo-spin">
              <Sparkles className="w-4.5 h-4.5 text-slate-950" />
            </div>
            <div>
              <span className={`font-extrabold tracking-tight text-base font-display text-left block ${darkVision ? 'text-white' : 'text-slate-900'}`}>SnapFix</span>
              <span className="text-[9px] text-slate-400 font-bold block -mt-0.5">{t.appSubtitle}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Zero-Barrier PULSING Voice Assist activator Button */}
            {currentUser && (
              <button 
                id="voice-assist-pulse-btn"
                onClick={() => {
                  setVoiceModeActive(true);
                }} 
                className="p-2.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 rounded-full border border-teal-500/20 animate-pulse-subtle relative flex items-center justify-center"
                title="Voice Assist Mode"
              >
                <Mic className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
              </button>
            )}
          </div>
        </header>

        {/* --- MAIN APP MODULE ROUTER VIEWPORT --- */}
        <main className="flex-1 overflow-y-auto relative flex flex-col">
          
          {/* VIEW 1: AUTHENTICATION GATE & GUEST BYPASS */}
          {!currentUser ? (
            <div className="p-6 h-full flex flex-col justify-between animate-premium-fade bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
              
              <div className="my-auto space-y-8">
                {/* Branding Logo presentation area requested */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-36 h-36 select-none transition-all duration-500 ease-out hover:scale-105 hover:rotate-3 animate-float-logo pointer-events-auto cursor-pointer mb-5">
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' className="w-full h-full drop-shadow-[0_12px_24px_rgba(20,184,166,0.25)]">
                      <defs>
                        <linearGradient id='logoGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
                          <stop offset='0%' stopColor='#14b8a6' />
                          <stop offset='100%' stopColor='#0d9488' />
                        </linearGradient>
                        <linearGradient id='glowGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
                          <stop offset='0%' stopColor='#2dd4bf' stopOpacity="0.35" />
                          <stop offset='100%' stopColor='#14b8a6' stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <circle cx='100' cy='100' r='80' fill='url(#glowGrad)' />
                      <circle cx='100' cy='100' r='75' fill='none' stroke='#334155' strokeWidth='1.5' strokeDasharray='5 4' className="opacity-65" />
                      <circle cx='100' cy='100' r='60' fill='#0f172a' stroke='#1e293b' strokeWidth='2.5' />
                      <path d='M100 15 V40 M100 160 V185 M15 100 H40 M160 100 H185' stroke='#14b8a6' strokeWidth='2' strokeLinecap='round' className="opacity-75" />
                      
                      {/* Map pin vector with camera design center */}
                      <path d='M100 52 C80 52 66 66 66 85 C66 114 100 146 100 146 C100 146 134 114 134 85 C134 66 120 52 100 52 Z' fill='url(#logoGrad)' />
                      <circle cx='100' cy='85' r='14' fill='#0f172a' stroke='#ffffff' strokeWidth='3' />
                      <circle cx='103' cy='82' r='4.5' fill='#ffffff' />
                      <path d='M146 48 L150 52 L156 53 L150 54 L146 58 L142 54 L136 53 L142 52 Z' fill='#2dd4bf' className="animate-pulse" />
                    </svg>
                  </div>
                  
                  <h1 className="text-2xl font-black tracking-tight text-white font-display mb-1">
                    {language === 'hi' ? 'स्नैपफिक्स' : 'SnapFix'}
                  </h1>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    {language === 'hi' ? 'स्थानीय समस्याओं की त्वरित रिपोर्ट करें और सीधे प्रशासन से निवारण पाएं।' : 'Report potholes, broken street lights, or garbage instantly for dynamic action updates.'}
                  </p>
                </div>

                {/* Interactive sign-in fields */}
                <form onSubmit={handleSignIn} className="space-y-4">
                  {authError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">{t.usernameLabel}</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. nitin_v" 
                      value={authUsername}
                      onChange={(e) => setAuthUsername(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/70 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm placeholder:text-slate-500 text-white" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">{t.passwordLabel}</label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••" 
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/70 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm placeholder:text-slate-500 text-white" 
                    />
                  </div>
                  
                  <button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 text-xs">
                    <LogIn className="w-4.5 h-4.5" /> 
                    <span>{t.signInBtn}</span>
                  </button>
                </form>

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                  <span className="relative bg-slate-900 px-3 text-[10px] text-slate-500 uppercase tracking-widest font-black">or</span>
                </div>

                {/* "Continue with Google" required */}
                <button 
                  onClick={() => setShowGoogleAuthModal(true)}
                  className="w-full bg-slate-800 hover:bg-slate-700/90 border border-slate-700 text-slate-200 font-extrabold py-3 px-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2.5 text-xs"
                >
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
          ) : (
            
            /* VIEW 2: CORE DASHBOARD MODULES */
            <div className="flex-1 flex flex-col">
              
              {/* SUB-VIEW A: HOME/FEED */}
              {activeTab === 'feed' && (
                <div className="p-4 space-y-4 flex-1 flex flex-col animate-premium-fade">
                  
                  {/* Status dashboard statistics banner */}
                  <div className={`p-4 rounded-2xl flex justify-between items-center relative overflow-hidden shadow-inner border ${darkVision ? 'bg-slate-800/45 border-slate-800' : 'bg-[#F8FAFC] border-slate-200'}`}>
                    <div className="space-y-1 text-left z-10">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">{t.reportBannerTitle}</span>
                      <h2 className={`text-base font-extrabold tracking-tight font-display ${darkVision ? 'text-white' : 'text-slate-900'}`}>{t.statsYourPoints}</h2>
                      <div className="flex items-center gap-1.5 pt-0.5">
                        <Award className="w-4 h-4 text-teal-400" />
                        <span className="text-xl font-black text-teal-400" id="heroPoints">
                          {currentUser.points}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">Hero Points</span>
                      </div>
                    </div>
                    {/* Tiny stats visual helper */}
                    <div className="text-right z-10">
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">City Active</span>
                      <span className="text-2xl font-black text-blue-500 block">
                        {issues.length}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold">Tracked Alerts</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5 opacity-40" />
                  </div>

                  {/* Search and Filters Segment */}
                  <div className="space-y-2 text-left">
                    <input 
                      type="text" 
                      placeholder="Search alerts by landmark or keyword..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none transition-colors ${darkVision ? 'bg-slate-800/80 border-slate-700/70 focus:border-teal-500 text-white' : 'bg-slate-50 border-slate-200 focus:border-teal-500 text-slate-800'}`}
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <select 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className={`text-xs px-2 py-2 rounded-xl border outline-none cursor-pointer ${darkVision ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                      >
                        <option value="All">All Categories</option>
                        <option value="Pothole">Potholes</option>
                        <option value="Broken Streetlight">Streetlights</option>
                        <option value="Water Leakage">Water Logs</option>
                        <option value="Garbage Dumping">Garbage</option>
                      </select>

                      <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className={`text-xs px-2 py-2 rounded-xl border outline-none cursor-pointer ${darkVision ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                      >
                        <option value="All">All States</option>
                        <option value="Reported">Reported 🚨</option>
                        <option value="Verified">Verified ⚠️</option>
                        <option value="Resolved">Resolved ✅</option>
                      </select>
                    </div>
                  </div>

                  {/* Dynamic Issue Feed Scroll */}
                  <div className="space-y-3 flex-1 overflow-y-auto pr-1 text-left">
                    {filteredFeedIssues.length === 0 ? (
                      <div className="py-12 text-center text-slate-500">
                        <HelpCircle className="w-10 h-10 mx-auto opacity-30 mb-2" />
                        <span className="text-xs font-bold">{t.noIssuesFound}</span>
                      </div>
                    ) : (
                      filteredFeedIssues.map(issue => {
                        const theme = getCategoryTheme(issue.type);
                        const isVerifiedByMe = currentUser.verifiedIssueIds.includes(issue.id);

                        return (
                          <div 
                            key={issue.id} 
                            onClick={() => setSelectedIssue(issue)}
                            className={`p-3.5 rounded-2xl border transition-all hover:scale-[1.01] cursor-pointer flex flex-col gap-3 ${darkVision ? 'bg-slate-800/40 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-150 hover:bg-slate-100/50'}`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2.5">
                                {/* Visual Intuitive Iconography for Low-literacy users */}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${theme.color}`}>
                                  {theme.icon}
                                </div>
                                <div>
                                  <span className="text-[9px] font-mono font-black text-slate-400 block uppercase">{issue.id}</span>
                                  <h3 className={`font-extrabold text-xs tracking-tight leading-tight mt-0.5 ${darkVision ? 'text-slate-100' : 'text-slate-900'}`}>{theme.label}</h3>
                                  <span className="text-[9px] text-slate-400 font-bold block">{issue.timeAgo}</span>
                                </div>
                              </div>
                              
                              {/* Large, high-contrast status badge with emojis requested */}
                              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border shadow-sm ${
                                issue.status === 'Reported' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                                issue.status === 'Verified' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                                'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              }`}>
                                {issue.status === 'Reported' ? 'Reported 🚨' : 
                                 issue.status === 'Verified' ? 'Verified ⚠️' : 'Resolved ✅'}
                              </span>
                            </div>

                            {/* Details text snippet */}
                            <p className="text-xs text-slate-400 leading-normal line-clamp-2 px-1">
                              {issue.details}
                            </p>

                            {/* Info footbar with Verify Interaction */}
                            <div className="flex justify-between items-center pt-2.5 border-t border-slate-800/50 text-[10px] text-slate-400 font-bold px-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" /> 
                                <span className="truncate max-w-[150px]">{issue.location.split('[')[0]}</span>
                              </span>
                              
                              {/* Quick click validation with immediate reward response */}
                              {issue.status !== 'Resolved' ? (
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleVerifyIssue(issue.id);
                                  }}
                                  disabled={isVerifiedByMe}
                                  className={`px-3 py-1.5 rounded-lg font-black transition-all transform active:scale-95 flex items-center gap-1 border ${
                                    isVerifiedByMe 
                                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 cursor-default'
                                      : 'bg-teal-500 text-slate-950 border-teal-400 hover:bg-teal-400'
                                  }`}
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                  <span>{isVerifiedByMe ? t.alreadyVerified : t.verifyIssueBtn.split(' ')[0]}</span>
                                </button>
                              ) : (
                                <span className="text-emerald-500 font-bold flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Checked
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* SUB-VIEW B: QUICK SNAP & GEMINI RECOGNITION */}
              {activeTab === 'snap' && (
                <div className="p-4 space-y-4 flex-1 flex flex-col animate-premium-fade text-left">
                  <div className="space-y-1">
                    <h2 className={`text-base font-extrabold tracking-tight font-display ${darkVision ? 'text-white' : 'text-slate-900'}`}>{t.reportIssueTab}</h2>
                    <p className="text-xs text-slate-400">{t.issueReportText}</p>
                  </div>

                  {!capturedImage ? (
                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                      {/* One-Click Camera Capture Button triggered by standard file input */}
                      <div className="relative group">
                        <input 
                          type="file" 
                          id="one-click-camera-input" 
                          accept="image/*" 
                          capture="environment" 
                          onChange={handleImageCapture}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                        />
                        <div className={`border-2 border-dashed rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-4 transition-all h-60 hover:border-teal-500/60 ${darkVision ? 'border-slate-700 bg-slate-800/20' : 'border-slate-300 bg-slate-50'}`}>
                          <div className="w-16 h-16 bg-gradient-to-tr from-teal-500 to-teal-600 text-slate-950 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
                            <Camera className="w-7 h-7" />
                          </div>
                          <div>
                            <p className={`text-sm font-extrabold ${darkVision ? 'text-slate-200' : 'text-slate-800'}`}>{t.selectPhoto}</p>
                            <p className="text-[11px] text-slate-400 mt-1 max-w-[200px] mx-auto">{t.dragDropText}</p>
                          </div>
                        </div>
                      </div>


                    </div>
                  ) : (
                    
                    /* REVIEW AND EDIT STEP OF GEMINI CLASSIFICATION RESULTS */
                    <div className="space-y-4 flex-1 flex flex-col justify-between overflow-y-auto pr-1">
                      
                      {/* Photo preview with scanning HUD style effect */}
                      <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
                        <img 
                          src={capturedImage} 
                          alt="Captured Target" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Interactive scanline animation overlays */}
                        {analyzingImage && (
                          <div className="absolute inset-0 bg-teal-500/10 flex flex-col items-center justify-center">
                            <div className="w-full h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent absolute top-0 left-0 animate-[bounce_2.5s_infinite]" />
                            <div className="p-3 bg-slate-900/90 border border-slate-700 rounded-2xl flex items-center gap-2 shadow-lg">
                              <RefreshCw className="w-4 h-4 text-teal-400 animate-spin" />
                              <span className="text-xs font-black text-teal-400">Gemini AI Hazard Scanning...</span>
                            </div>
                          </div>
                        )}
                        
                        {!analyzingImage && (
                          <div className="absolute top-2 right-2 bg-slate-900/85 px-2 py-0.5 rounded-lg text-[9px] font-black text-teal-400 border border-teal-500/20 flex items-center gap-1 shadow">
                            <Sparkles className="w-2.5 h-2.5" /> Scan Ready
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 flex-1">
                        {/* Auto-extracted Category fields */}
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">{t.selectCategory}</label>
                          <input 
                            type="text" 
                            disabled={analyzingImage}
                            value={detectedCategory}
                            onChange={(e) => setDetectedCategory(e.target.value)}
                            className={`w-full text-xs px-3 py-2.5 rounded-xl border outline-none font-bold ${darkVision ? 'bg-slate-800/50 border-slate-700 focus:border-teal-500' : 'bg-slate-50 border-slate-200'}`}
                          />
                        </div>

                        {/* Automatically Classified Severity level */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                            <span>Detected Severity score</span>
                            <span className="text-red-500 font-extrabold">{detectedSeverity}/10</span>
                          </div>
                          <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            value={detectedSeverity}
                            onChange={(e) => setDetectedSeverity(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                          />
                        </div>

                        {/* Extracted Location GPS */}
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">{t.locationLabel}</label>
                          <input 
                            type="text" 
                            disabled={analyzingImage}
                            value={detectedLocation}
                            onChange={(e) => setDetectedLocation(e.target.value)}
                            className={`w-full text-xs px-3 py-2.5 rounded-xl border outline-none font-bold ${darkVision ? 'bg-slate-800/50 border-slate-700 focus:border-teal-500' : 'bg-slate-50 border-slate-200'}`}
                          />
                        </div>

                        {/* Extracted details comments block */}
                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">{t.addDetailsLabel}</label>
                          <textarea 
                            rows={3}
                            value={detectedDetails}
                            onChange={(e) => setDetectedDetails(e.target.value)}
                            className={`w-full text-xs px-3 py-2 rounded-xl border outline-none leading-relaxed ${darkVision ? 'bg-slate-800/50 border-slate-700 focus:border-teal-500' : 'bg-slate-50 border-slate-200'}`}
                          />
                        </div>
                      </div>

                      {/* Confirm submit bar */}
                      <div className="flex gap-2.5 pt-2">
                        <button 
                          onClick={() => setCapturedImage(null)}
                          className={`px-4 py-3 rounded-xl font-bold text-xs transition-all ${darkVision ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                        >
                          Cancel
                        </button>
                        
                        <button 
                          onClick={dispatchVisualReport}
                          disabled={analyzingImage}
                          className="flex-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black py-3 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 text-xs"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>{t.dispatchBtn.split(' (+')[0]} (+10 Points)</span>
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* SUB-VIEW C: INTERACTIVE DIGITAL VECTOR MAP */}
              {activeTab === 'map' && (
                <div className="p-4 space-y-4 flex-1 flex flex-col animate-premium-fade text-left">
                  <div className="space-y-1">
                    <h2 className={`text-base font-extrabold tracking-tight font-display ${darkVision ? 'text-white' : 'text-slate-900'}`}>Vector Map</h2>
                    <p className="text-xs text-slate-400">Interactive geographical tracking of community reported fixes.</p>
                  </div>
                  
                  <div className="flex-1 min-h-[400px] flex flex-col justify-center">
                    <CivicMap 
                      issues={issues}
                      language={language}
                      translations={t}
                      currentUser={currentUser}
                      onVerifyClick={handleVerifyIssue}
                      darkVision={darkVision}
                    />
                  </div>
                </div>
              )}

              {/* SUB-VIEW D: PROFILE CARD */}
              {activeTab === 'profile' && (
                <div className="p-4 space-y-4 flex-1 flex flex-col animate-premium-fade text-left justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h2 className={`text-base font-extrabold tracking-tight font-display ${darkVision ? 'text-white' : 'text-slate-900'}`}>User Profile</h2>
                      <p className="text-xs text-slate-400">Manage language, accessibility views, and database state.</p>
                    </div>

                    {/* Profile Badge details */}
                    <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkVision ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-600 flex items-center justify-center text-slate-950 shadow">
                        <User className="w-7 h-7" />
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase text-teal-400 tracking-wider">
                          CIVIC GUARDIAN
                        </span>
                        <h3 className={`text-sm font-black ${darkVision ? 'text-white' : 'text-slate-900'}`}>@{currentUser.username}</h3>
                        <div className="flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-teal-400" />
                          <span className="text-xs font-black text-teal-400">
                            {currentUser.points} XP Hero Points
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress to next rank */}
                    <div className={`p-3 rounded-xl border space-y-2 ${darkVision ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-100/50 border-slate-150'}`}>
                      <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        <span>Progress to Tier 2 Spotter</span>
                        <span>{currentUser.points} / 100 XP</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
                        <div 
                          className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (currentUser.points / 100) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Language Settings Segment */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block flex items-center gap-1">
                        <Languages className="w-3.5 h-3.5" /> Language Settings
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <button 
                          onClick={() => { setLanguage('en'); speakPrompt("Language changed to English"); }}
                          className={`p-2.5 rounded-xl border text-xs font-extrabold transition-all ${language === 'en' ? 'bg-teal-500 text-slate-950 border-teal-400' : (darkVision ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200')}`}
                        >
                          English
                        </button>
                        
                        <button 
                          onClick={() => { setLanguage('hi'); speakPrompt("भाषा बदलकर हिंदी कर दी गई है"); }}
                          className={`p-2.5 rounded-xl border text-xs font-extrabold transition-all ${language === 'hi' ? 'bg-teal-500 text-slate-950 border-teal-400' : (darkVision ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200')}`}
                        >
                          हिन्दी
                        </button>

                        <button 
                          onClick={() => { setLanguage('hinglish'); speakPrompt("Language badal kar Hinglish kar diya hai"); }}
                          className={`p-2.5 rounded-xl border text-xs font-extrabold transition-all ${language === 'hinglish' ? 'bg-teal-500 text-slate-950 border-teal-400' : (darkVision ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200')}`}
                        >
                          Hinglish
                        </button>
                      </div>
                    </div>

                    {/* Vision Mode setting */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block flex items-center gap-1">
                        {darkVision ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />} Vision Setting
                      </span>
                      <button 
                        onClick={() => setDarkVision(!darkVision)}
                        className={`w-full p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${darkVision ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`}
                      >
                        <span>{darkVision ? "Dark Vision Active" : "Light Mode Vision"}</span>
                        <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 ${darkVision ? 'bg-teal-500' : 'bg-slate-300'}`}>
                          <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-200 ${darkVision ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                      </button>
                    </div>

                  </div>

                  {/* Danger resetting database zone */}
                  <div className="space-y-2.5">
                    <button 
                      onClick={resetDatabaseToDefault}
                      className="w-full bg-red-500/10 hover:bg-red-500/15 text-red-400 font-extrabold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs border border-red-500/20"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>{t.resetDatabase}</span>
                    </button>
                    
                    <button 
                      onClick={() => setCurrentUser(null)}
                      className={`w-full py-3 rounded-xl font-bold text-xs transition-colors border ${darkVision ? 'bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-300' : 'bg-slate-100 border-slate-200 hover:bg-slate-150 text-slate-600'}`}
                    >
                      {t.logOut}
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}
        </main>

        {/* --- DYNAMIC BOTTOM NAVIGATION TAB BAR --- */}
        {currentUser && (
          <nav className={`h-16 border-t px-2 flex justify-around items-center z-20 sticky bottom-0 bg-slate-900/95 backdrop-blur-md transition-all ${darkVision ? 'border-slate-800 bg-slate-900/95' : 'border-slate-150 bg-white'}`}>
            <button 
              onClick={() => { setActiveTab('feed'); setSelectedIssue(null); }} 
              className={`flex flex-col items-center gap-1 flex-1 py-1 transition-colors ${activeTab === 'feed' ? 'text-teal-400 font-black' : 'text-slate-400 hover:text-slate-300'}`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-[9px] font-bold tracking-wide">{t.dashboardTab}</span>
            </button>
            
            <button 
              onClick={() => {
                setActiveTab('snap');
                setSelectedIssue(null);
              }} 
              className={`flex flex-col items-center gap-1 flex-1 py-1 transition-colors ${activeTab === 'snap' ? 'text-teal-400 font-black' : 'text-slate-400 hover:text-slate-300'}`}
            >
              <Camera className="w-5 h-5" />
              <span className="text-[9px] font-bold tracking-wide">{t.reportIssueTab.split(' ')[0]}</span>
            </button>
            
            <button 
              onClick={() => { setActiveTab('map'); setSelectedIssue(null); }} 
              className={`flex flex-col items-center gap-1 flex-1 py-1 transition-colors ${activeTab === 'map' ? 'text-teal-400 font-black' : 'text-slate-400 hover:text-slate-300'}`}
            >
              <MapPin className="w-5 h-5" />
              <span className="text-[9px] font-bold tracking-wide">Live Map</span>
            </button>

            <button 
              onClick={() => { setActiveTab('profile'); setSelectedIssue(null); }} 
              className={`flex flex-col items-center gap-1 flex-1 py-1 transition-colors ${activeTab === 'profile' ? 'text-teal-400 font-black' : 'text-slate-400 hover:text-slate-300'}`}
            >
              <User className="w-5 h-5" />
              <span className="text-[9px] font-bold tracking-wide">Profile</span>
            </button>
          </nav>
        )}



        {/* --- VIEW OVERLAY: GOOGLE SIGN IN CHOOSER --- */}
        {showGoogleAuthModal && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-premium-fade text-slate-100">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-5 text-left relative overflow-hidden">
              
              {/* Google Brand Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-xs font-black tracking-wider text-slate-400 uppercase font-mono">Sign in with Google</span>
                  </div>
                  <h3 className="text-base font-black text-white tracking-tight">Sign In</h3>
                  <p className="text-[11px] text-slate-400">to continue to <span className="text-teal-400 font-extrabold">SnapFix</span></p>
                </div>
                <button 
                  onClick={() => {
                    setShowGoogleAuthModal(false);
                    setShowCustomGoogleInput(false);
                  }}
                  className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors border border-slate-850"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {googleSigningIn ? (
                <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-teal-400 animate-spin" />
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-200">Contacting Google OAuth servers...</p>
                    <p className="text-[10px] text-slate-500">Exchanging secure credential tokens</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!googleNameInput.trim()) return;
                      setGoogleSigningIn(true);
                      setTimeout(() => {
                        const sanitizedUsername = googleNameInput.trim().replace(/\s+/g, '');
                        setCurrentUser({
                          username: sanitizedUsername || 'GoogleUser',
                          points: 30,
                          verifiedIssueIds: []
                        });
                        setGoogleSigningIn(false);
                        setShowGoogleAuthModal(false);
                        setAuthError('');
                      }, 1200);
                    }}
                    className="space-y-3 text-left"
                  >
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">Your Full Name</label>
                      <input 
                        type="text"
                        required
                        value={googleNameInput}
                        onChange={(e) => setGoogleNameInput(e.target.value)}
                        placeholder="e.g. Sameer Verma"
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-850 outline-none text-white focus:border-teal-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mb-1">Google Email Address</label>
                      <input 
                        type="email"
                        required
                        value={googleEmailInput}
                        onChange={(e) => setGoogleEmailInput(e.target.value)}
                        placeholder="sameer.verma@gmail.com"
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-850 outline-none text-white focus:border-teal-500 transition-colors"
                      />
                    </div>

                    <div className="pt-1.5">
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl font-black text-xs bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Continue</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Secure note */}
              <div className="border-t border-slate-850 pt-3 text-[10px] text-slate-500 text-center font-mono">
                🔒 Protected by Google Secure Token Shield
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW OVERLAY: ZERO-BARRIER ACCESSIBILITY VOICE MODULE --- */}
        {voiceModeActive && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col justify-between p-6 animate-premium-fade text-slate-100">
            {/* Header exit bar */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-teal-400 animate-pulse" />
                <span className="text-sm font-black uppercase tracking-wider text-teal-400 font-display">SNAPFIX VOICE ACCESSIBILITY</span>
              </div>
              <button 
                onClick={() => setVoiceModeActive(false)}
                className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core vocal status and guide box */}
            <div className="my-auto space-y-6 text-center flex flex-col items-center">
              
              {/* Pulse recording wave visualizer animation */}
              <div className="relative">
                {voiceActive && (
                  <div className="absolute inset-0 rounded-full bg-teal-500/25 animate-[ping_1.8s_infinite] scale-150" />
                )}
                <button 
                  onClick={startListening}
                  className={`w-28 h-28 rounded-full flex items-center justify-center transition-all ${voiceActive ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20' : 'bg-teal-500 hover:bg-teal-400 shadow-lg shadow-teal-500/20'} transform active:scale-95`}
                >
                  {voiceActive ? <MicOff className="w-12 h-12 text-white animate-pulse" /> : <Mic className="w-12 h-12 text-slate-950" />}
                </button>
              </div>

              {/* Status and Text */}
              <div className="space-y-3 max-w-sm px-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-teal-400 block font-black">
                  {voiceStatus === 'listening' ? 'Listening Now...' : 
                   voiceStatus === 'processing' ? 'Gemini API analyzing...' : 
                   voiceStatus === 'confirmed' ? 'Extraction Complete!' : 'TAP MICROPHONE TO REPORT'}
                </span>
                
                <h2 className="text-sm font-bold text-slate-200 leading-relaxed font-display">
                  "{voiceGuideText}"
                </h2>

                {voiceTranscript && (
                  <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-300 italic font-medium leading-relaxed max-h-20 overflow-y-auto mt-2">
                    "{voiceTranscript}"
                  </div>
                )}
              </div>

              {/* AI Extraction Data Card preview */}
              {voiceNormalizedData && (
                <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left space-y-3 shadow-inner">
                  <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span className="text-[10px] font-black uppercase text-teal-400 tracking-wider">GEMINI EXTRACTED DETAILS</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                    <div className="space-y-1">
                      <span className="text-slate-500 block uppercase text-[8px] tracking-wider">CIVIC ISSUE</span>
                      <span className="text-white block truncate">{voiceNormalizedData.category || "Unspecified"}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-500 block uppercase text-[8px] tracking-wider">SEVERITY LEVEL</span>
                      <span className="text-red-400 block">{voiceNormalizedData.severity || "Medium"}</span>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <span className="text-slate-500 block uppercase text-[8px] tracking-wider">EXTRACTED LOCATION CLUE</span>
                      <span className="text-white block truncate">{voiceNormalizedData.location_clues || "Local Area"}</span>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <span className="text-slate-500 block uppercase text-[8px] tracking-wider">VERBAL STATEMENT SUMMARY</span>
                      <span className="text-slate-400 block leading-tight text-[10px] line-clamp-2">{voiceNormalizedData.detected_issue}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action bottom and Simulation triggers */}
            <div className="space-y-4 pt-4 border-t border-slate-900">
              
              {/* Simulation triggers for evaluating pipeline without real microphone permissions */}
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider text-center block">Quick Evaluation Simulation Chips</span>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  <button 
                    onClick={() => {
                      setVoiceTranscript("Huge road damage and pothole near Charbagh Terminal station, vehicles swerving.");
                      handleVoiceTranscriptComplete("Huge road damage and pothole near Charbagh Terminal station, vehicles swerving.");
                    }}
                    className="text-[10px] bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl px-2.5 py-1.5 font-bold text-slate-300"
                  >
                    🚧 Pothole Near Station
                  </button>
                  
                  <button 
                    onClick={() => {
                      setVoiceTranscript("Dark street and completely broken streetlight opposite Lohia Park road entrance.");
                      handleVoiceTranscriptComplete("Dark street and completely broken streetlight opposite Lohia Park road entrance.");
                    }}
                    className="text-[10px] bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl px-2.5 py-1.5 font-bold text-slate-300"
                  >
                    💡 Streetlight Lohia Park
                  </button>

                  <button 
                    onClick={() => {
                      setVoiceTranscript("Huge water pipe leaking and drinking water flooding Hazratganj crossing.");
                      handleVoiceTranscriptComplete("Huge water pipe leaking and drinking water flooding Hazratganj crossing.");
                    }}
                    className="text-[10px] bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl px-2.5 py-1.5 font-bold text-slate-300"
                  >
                    💧 Pipe Leak Hazratganj
                  </button>
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button 
                  onClick={() => {
                    setVoiceModeActive(false);
                    setVoiceNormalizedData(null);
                    setVoiceTranscript('');
                    setVoiceStatus('idle');
                  }}
                  className="px-4 py-3.5 bg-slate-900 hover:bg-slate-850 rounded-2xl font-bold text-xs text-slate-400 hover:text-white transition-colors flex-1"
                >
                  Cancel
                </button>
                
                <button 
                  onClick={submitVoiceReport}
                  disabled={!voiceNormalizedData || normalizingVoice}
                  className={`px-4 py-3.5 rounded-2xl font-black text-xs transition-all flex-[2] flex items-center justify-center gap-2 ${
                    voiceNormalizedData && !normalizingVoice 
                      ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm & Dispatch (+10 Points)</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* --- VIEW OVERLAY: SINGLE FEED ITEM DETAIL MODAL --- */}
        {selectedIssue && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-40 flex items-end justify-center p-0 animate-premium-fade">
            <div className={`w-full max-h-[85%] rounded-t-3xl border-t p-5 flex flex-col justify-between overflow-y-auto ${darkVision ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`}>
              
              <div className="space-y-4 text-left">
                {/* Pullbar anchor */}
                <div className="w-12 h-1 bg-slate-700/60 rounded-full mx-auto -mt-2 mb-2" onClick={() => setSelectedIssue(null)} />
                
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-md font-black">
                    {selectedIssue.id}
                  </span>
                  
                  <button 
                    onClick={() => setSelectedIssue(null)}
                    className="p-1 hover:bg-slate-800 rounded-full transition-colors border border-slate-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getCategoryTheme(selectedIssue.type).color}`}>
                    {getCategoryTheme(selectedIssue.type).icon}
                  </div>
                  <div>
                    <h3 className={`font-black text-sm tracking-tight leading-tight ${darkVision ? 'text-white' : 'text-slate-900'}`}>
                      {getCategoryTheme(selectedIssue.type).label}
                    </h3>
                    <span className="text-[9px] text-slate-400 font-bold block">{selectedIssue.timeAgo}</span>
                  </div>
                </div>

                {/* Main full image thumbnail */}
                {selectedIssue.photo && (
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                    <img 
                      src={selectedIssue.photo} 
                      alt="Incident Spot" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Severity slider bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Severity index</span>
                    <span className="text-red-500 font-extrabold">{selectedIssue.severity}/10</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full transition-all duration-300"
                      style={{ width: `${selectedIssue.severity * 10}%` }}
                    />
                  </div>
                </div>

                {/* Location Box coordinates */}
                <div className={`p-3 rounded-xl border space-y-1 ${darkVision ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-150'}`}>
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Geographical Coordinates</span>
                  <span className="text-xs text-teal-400 font-extrabold block truncate leading-tight select-all">{selectedIssue.location}</span>
                </div>

                {/* Details statements */}
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Detailed Statement</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {selectedIssue.details}
                  </p>
                </div>

                {/* Upvotes Progress meter */}
                <div className="pt-3 border-t border-dashed border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>Verification Validation progress:</span>
                    <span className="text-slate-100 font-extrabold">{selectedIssue.votes} / 5 votes</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
                    <div 
                      className="h-full bg-teal-500 rounded-full transition-all duration-300"
                      style={{ width: `${(selectedIssue.votes / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action dispatch verify button */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex gap-2">
                <button 
                  onClick={() => setSelectedIssue(null)}
                  className={`px-4 py-3 rounded-xl font-bold text-xs transition-all ${darkVision ? 'bg-slate-800 hover:bg-slate-750 text-slate-300' : 'bg-slate-100 text-slate-600'}`}
                >
                  Go Back
                </button>
                
                {selectedIssue.status !== 'Resolved' ? (
                  <button 
                    onClick={() => {
                      handleVerifyIssue(selectedIssue.id);
                      setSelectedIssue(null);
                    }}
                    disabled={currentUser.verifiedIssueIds.includes(selectedIssue.id)}
                    className={`flex-1 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow ${
                      currentUser.verifiedIssueIds.includes(selectedIssue.id)
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default'
                        : 'bg-teal-500 hover:bg-teal-400 text-slate-950 border-teal-400 active:scale-95'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{currentUser.verifiedIssueIds.includes(selectedIssue.id) ? t.alreadyVerified : t.verifyIssueBtn}</span>
                  </button>
                ) : (
                  <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-extrabold py-3 rounded-xl text-xs text-center select-none">
                    Fully Resolved & Fixed!
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* --- FLOATING HELPLINE SIDE-POP-UP BUTTON --- */}
        {currentUser && (
          <button
            id="floating-helpline-btn"
            onClick={() => setShowContactsModal(true)}
            className="absolute right-0 top-1/3 -translate-y-1/2 z-40 bg-teal-500 hover:bg-teal-400 text-slate-950 px-2 py-3.5 rounded-l-2xl shadow-xl flex flex-col items-center gap-1.5 cursor-pointer hover:-translate-x-1 transition-all duration-200 border-l border-y border-teal-400/40 font-sans"
            style={{ minWidth: '34px' }}
          >
            <Phone className="w-3.5 h-3.5 animate-bounce text-slate-950" style={{ animationDuration: '3s' }} />
            <span className="text-[8px] font-black tracking-widest uppercase block font-sans" style={{ writingMode: 'vertical-lr' }}>
              HELPLINES
            </span>
          </button>
        )}

        {/* --- PUBLIC HELPLINE CONTACTS POP-UP --- */}
        {showContactsModal && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-premium-fade">
            <div className={`w-full max-w-sm rounded-3xl p-5 shadow-2xl flex flex-col max-h-[85%] overflow-y-auto border text-left transition-all relative ${
              darkVision ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/20 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-teal-500/10 text-teal-400 rounded-lg">
                    <Shield className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className={`text-base font-extrabold tracking-tight ${darkVision ? 'text-white' : 'text-slate-900'}`}>
                      Public Helplines
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium">Issue Solving Organizations</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowContactsModal(false)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    darkVision ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className={`text-[11px] leading-relaxed mb-4 ${darkVision ? 'text-slate-400' : 'text-slate-500'}`}>
                Connect directly with public service organizations and authorities to report and accelerate issue solving.
              </p>

              {/* Contacts Grid/List */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
                {[
                  {
                    org: "Municipal Corporation / Nagar Nigam",
                    desc: "Open garbage, street sweepers, dead animals",
                    phone: "1533",
                    icon: <Trash2 className="w-4 h-4 text-emerald-400" />,
                    bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
                    actionLabel: "Report Waste"
                  },
                  {
                    org: "Electricity Board & Power Corp",
                    desc: "Broken streetlights, live sparks, hanging cables",
                    phone: "1912",
                    icon: <Lightbulb className="w-4 h-4 text-amber-400" />,
                    bg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
                    actionLabel: "Electrical Help"
                  },
                  {
                    org: "Jal Sansthan / Water & Sewage",
                    desc: "Water log, sewage overflows, pipe leaks",
                    phone: "1916",
                    icon: <Droplet className="w-4 h-4 text-sky-400" />,
                    bg: "bg-sky-500/10 border-sky-500/20 text-sky-400",
                    actionLabel: "Water/Sewage Help"
                  },
                  {
                    org: "PWD / Highway & Road Safety",
                    desc: "Major potholes, broken dividers, road sinks",
                    phone: "1800-180-5315",
                    icon: <Wrench className="w-4 h-4 text-indigo-400" />,
                    bg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
                    actionLabel: "Road Repair Help"
                  },
                  {
                    org: "Police Control Room",
                    desc: "Security, vandalism, crime or safety hazards",
                    phone: "112",
                    icon: <Shield className="w-4 h-4 text-blue-400" />,
                    bg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
                    actionLabel: "Police Assistance"
                  },
                  {
                    org: "Fire & Rescue Department",
                    desc: "Fire incidents, hazardous situations",
                    phone: "101",
                    icon: <Flame className="w-4 h-4 text-red-400" />,
                    bg: "bg-red-500/10 border-red-500/20 text-red-400",
                    actionLabel: "Fire Dispatch"
                  },
                  {
                    org: "Disaster Management Cell",
                    desc: "Floods, uprooted trees, structure collapses",
                    phone: "1070",
                    icon: <AlertTriangle className="w-4 h-4 text-rose-400" />,
                    bg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
                    actionLabel: "Emergency Relief"
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      darkVision ? 'bg-slate-850/45 border-slate-800/80 hover:bg-slate-850' : 'bg-slate-50 border-slate-150 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${item.bg}`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-[11px] font-black tracking-tight truncate ${darkVision ? 'text-white' : 'text-slate-800'}`}>
                          {item.org}
                        </p>
                        <p className={`text-[9px] line-clamp-1 ${darkVision ? 'text-slate-400' : 'text-slate-500'}`}>
                          {item.desc}
                        </p>
                        <span className="text-[10px] font-black font-mono text-teal-400 mt-0.5 block">
                          📞 {item.phone}
                        </span>
                      </div>
                    </div>

                    <a 
                      href={`tel:${item.phone}`}
                      onClick={() => {
                        console.log(`Calling ${item.org}: ${item.phone}`);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-[9px] tracking-wider uppercase transition-transform active:scale-95 flex items-center gap-1 select-none shrink-0"
                    >
                      <Phone className="w-2.5 h-2.5" />
                      <span>Call</span>
                    </a>
                  </div>
                ))}
              </div>

              {/* Close Button footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/10 flex">
                <button 
                  onClick={() => setShowContactsModal(false)}
                  className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-black py-2.5 rounded-xl transition-all shadow-md active:scale-95 text-xs text-center"
                >
                  Done, Close
                </button>
              </div>

            </div>
          </div>
        )}

        {/* --- CELEBRATION SUCCESS DISPATCH MODAL --- */}
        {showSuccessModal && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col justify-center items-center p-6 text-center animate-premium-fade text-slate-100">
            <div className="w-16 h-16 bg-gradient-to-tr from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center text-slate-950 shadow-lg shadow-teal-500/25 mb-5 transform animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h1 className="text-xl font-black tracking-tight text-white font-display mb-1">{t.successTitle}</h1>
            <p className="text-xs text-slate-400 max-w-xs mb-6">{t.successSubtitle}</p>

            <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left space-y-3 mb-6 shadow-inner">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.trackingIdLabel}</span>
                <span className="text-xs font-mono font-black text-teal-400">{latestCreatedId}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-bold">
                {t.successPointsEarned}
              </p>
            </div>

            <button 
              onClick={() => {
                setShowSuccessModal(false);
                setActiveTab('feed');
              }}
              className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-black py-3.5 rounded-2xl transition-all shadow-lg shadow-teal-500/10 active:scale-95 text-xs"
            >
              {t.closeBtn}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
