export interface TranslationDict {
  appName: string;
  appSubtitle: string;
  lightVision: string;
  darkVision: string;
  guest: string;
  points: string;
  logOut: string;
  signInTab: string;
  createAccountTab: string;
  welcomeBack: string;
  welcomeSubtitle: string;
  newAccountTitle: string;
  newAccountSubtitle: string;
  usernameLabel: string;
  passwordLabel: string;
  chooseUsernameLabel: string;
  choosePasswordLabel: string;
  signInBtn: string;
  registerBtn: string;
  usernameRequired: string;
  usernameMinLen: string;
  usernameTaken: string;
  loginFailed: string;
  reportIssueTab: string;
  dashboardTab: string;
  reportBannerTitle: string;
  reportBannerText: string;
  selectPhoto: string;
  dragDropText: string;
  changePhoto: string;
  photoUploaded: string;
  selectCategory: string;
  catGarbage: string;
  catPotholes: string;
  catStreetlight: string;
  catWaterlogging: string;
  catStrayAnimals: string;
  catOthers: string;
  addDetailsLabel: string;
  detailsPlaceholder: string;
  locationLabel: string;
  coordinateDetected: string;
  coordinatePinpointed: string;
  noLocationDetected: string;
  detectingLocation: string;
  dispatchBtn: string;
  statsYourPoints: string;
  statsYourPointsSub: string;
  statsTotalIssues: string;
  statsTotalIssuesSub: string;
  statsResolved: string;
  statsResolvedSub: string;
  filterAll: string;
  filterReported: string;
  filterVerified: string;
  filterResolved: string;
  reportedBy: string;
  systemUser: string;
  statusReported: string;
  statusVerified: string;
  statusResolved: string;
  votesProgress: string;
  verifyIssueBtn: string;
  alreadyVerified: string;
  resetDatabase: string;
  resetConfirmMessage: string;
  successTitle: string;
  successSubtitle: string;
  trackingIdLabel: string;
  successPointsEarned: string;
  closeBtn: string;
  noIssuesFound: string;
  issueReportTitle: string;
  issueReportText: string;
}

export type LanguageCode = 'en' | 'hinglish' | 'hi';

export const translations: Record<LanguageCode, TranslationDict> = {
  en: {
    appName: "SnapFix",
    appSubtitle: "Be the voice of your community",
    lightVision: "Light Mode",
    darkVision: "Dark Mode",
    guest: "Guest",
    points: "Points",
    logOut: "Log Out",
    signInTab: "Sign In",
    createAccountTab: "Sign Up",
    welcomeBack: "Welcome Back!",
    welcomeSubtitle: "Identify local issues & earn points.",
    newAccountTitle: "Create Account",
    newAccountSubtitle: "Be a civic hero.",
    usernameLabel: "Username",
    passwordLabel: "Password",
    chooseUsernameLabel: "Choose Username",
    choosePasswordLabel: "Choose Password",
    signInBtn: "Sign In",
    registerBtn: "Register & Login",
    usernameRequired: "Username & Password are required fields.",
    usernameMinLen: "Username must be at least 3 letters long.",
    usernameTaken: "Username already exists. Try another.",
    loginFailed: "Wrong Username or Password.",
    reportIssueTab: "Report Issue",
    dashboardTab: "Dashboard",
    reportBannerTitle: "Civic Fix",
    reportBannerText: "Identify local issues & receive status updates directly from Municipal Corp.",
    selectPhoto: "Select Issue Photo",
    dragDropText: "Drag & drop photos or click to browse",
    changePhoto: "Change Selected Photo",
    photoUploaded: "Photo uploaded & optimized successfully!",
    selectCategory: "Select Issue Category",
    catGarbage: "Garbage Dump Yard",
    catPotholes: "Potholes & Damaged Roads",
    catStreetlight: "Streetlight Malfunction",
    catWaterlogging: "Sewerage Water Log",
    catStrayAnimals: "Stray Animal Menace",
    catOthers: "Other General Civil Issues",
    addDetailsLabel: "Additional Details",
    detailsPlaceholder: "Describe the situation to guide city engineers...",
    locationLabel: "Locate Current Coordinates",
    coordinateDetected: "Live location detected",
    coordinatePinpointed: "Coordinates pinpointed automatically",
    noLocationDetected: "Click to fetch current coordinates automatically",
    detectingLocation: "Detecting city coordinate systems...",
    dispatchBtn: "Dispatch Citizen Fix Alert (+10 Points)",
    statsYourPoints: "My Award Point",
    statsYourPointsSub: "Community Leaderboard scale",
    statsTotalIssues: "Total Issues",
    statsTotalIssuesSub: "National database count",
    statsResolved: "Resolved Fixes",
    statsResolvedSub: "Completed in last 30 days",
    filterAll: "All Updates",
    filterReported: "Reported",
    filterVerified: "Verified",
    filterResolved: "Resolved",
    reportedBy: "Reported by",
    systemUser: "System Generated",
    statusReported: "Reported",
    statusVerified: "Verified Fix",
    statusResolved: "Fully Resolved",
    votesProgress: "Verification Votes",
    verifyIssueBtn: "Verify Local Fix (+5 points)",
    alreadyVerified: "You Verified",
    resetDatabase: "Reset App Database",
    resetConfirmMessage: "Are you sure you want to reset the SnapFix database to clean default mock data?",
    successTitle: "Civic Bug Report Dispatched!",
    successSubtitle: "Municipal Corp Alerted.",
    trackingIdLabel: "Citizen Resolution Code",
    successPointsEarned: "You earned 10 hero points! Track updates dynamically below.",
    closeBtn: "Done, Go Back",
    noIssuesFound: "No issues reported in this state.",
    issueReportTitle: "Quick Issue Fixes 100% Works",
    issueReportText: "Snap & report public damage instantly. Earn point rewards & authority support."
  },
  hinglish: {
    appName: "SnapFix",
    appSubtitle: "Apni community ki awaaz bano",
    lightVision: "Light Vision",
    darkVision: "Dark Vision",
    guest: "Guest",
    points: "Points",
    logOut: "Log Out",
    signInTab: "Sign In",
    createAccountTab: "New Account",
    welcomeBack: "Welcome Back! Swagat Hai",
    welcomeSubtitle: "Sign in to report community challenges & earn Hero Points.",
    newAccountTitle: "New Account Banayein",
    newAccountSubtitle: "Civic action heroes ka group join karein.",
    usernameLabel: "Username",
    passwordLabel: "Password",
    chooseUsernameLabel: "Choose Username",
    choosePasswordLabel: "Choose Password",
    signInBtn: "Sign In",
    registerBtn: "Register & Login",
    usernameRequired: "Login credentials require username & password.",
    usernameMinLen: "Username kam se kam 3 letters ka hona chahiye.",
    usernameTaken: "Yeh username pehle se hi taken hai! Try another.",
    loginFailed: "Galat username ya password! Please check guidelines.",
    reportIssueTab: "Report Issue",
    dashboardTab: "Dashboard",
    reportBannerTitle: "Quick civic fix reporting - 100% Verified actions",
    reportBannerText: "Public issues report karein aur authority action tracking alert receive karein.",
    selectPhoto: "Issue Ki Photo Select Karein",
    dragDropText: "Photo drag aur drop karein ya browse par click karein",
    changePhoto: "Photo ko badlein",
    photoUploaded: "Photo uploaded & optimized successfully!",
    selectCategory: "Issue Ka Category Select Karein",
    catGarbage: "Kachra / Garbage Dump Yard",
    catPotholes: "Pothole / Tooti Sadak",
    catStreetlight: "Streetlight Malfunction",
    catWaterlogging: "Sewerage Water Log / Jal Bharav",
    catStrayAnimals: "Stray Animal Menace / आवारा जानवर",
    catOthers: "Other General Civil Issues",
    addDetailsLabel: "Additional Details (Description)",
    detailsPlaceholder: "Yeh kahan hai aur kya pareshani ho rahi hai humein batayein...",
    locationLabel: "Locate Current Coordinates (Click to pin)",
    coordinateDetected: "Your live location detected",
    coordinatePinpointed: "Pin-pointed coordinate successfully!",
    noLocationDetected: "Location Coordinates identify karne ke liye click karein",
    detectingLocation: "Detecting current coordinates...",
    dispatchBtn: "Dispatch Citizen Fix Alert (+10 Points)",
    statsYourPoints: "My Award Point",
    statsYourPointsSub: "Hero Points balance",
    statsTotalIssues: "Total Issues",
    statsTotalIssuesSub: "Overall database count",
    statsResolved: "Resolved",
    statsResolvedSub: "Fixed in last 30 days",
    filterAll: "All Updates",
    filterReported: "Reported",
    filterVerified: "Verified",
    filterResolved: "Resolved",
    reportedBy: "Reported by",
    systemUser: "System",
    statusReported: "Reported",
    statusVerified: "Verified",
    statusResolved: "Resolved",
    votesProgress: "Verification Votes",
    verifyIssueBtn: "Verify Local Fix (+5 points)",
    alreadyVerified: "You verified",
    resetDatabase: "Reset App Database",
    resetConfirmMessage: "Kya aap SnapFix database ko reset karna chahte hain?",
    successTitle: "Hurray! Citizen Report Received Successfully",
    successSubtitle: "Municipal authority alert triggered.",
    trackingIdLabel: "Citizen Resolution Code",
    successPointsEarned: "Aapne successfully 10 hero points earn kiye! Track updates dynamically below.",
    closeBtn: "Done, Go Back",
    noIssuesFound: "Aisey koi reported issues nahi mile.",
    issueReportTitle: "Quick Issue Fixes 100% Works",
    issueReportText: "Problem spot karein, photo click karein updates paayein aur points earn karein."
  },
  hi: {
    appName: "SnapFix",
    appSubtitle: "अपनी कम्युनिटी की आवाज़ बनें",
    lightVision: "लाइट मोड",
    darkVision: "डार्क मोड",
    guest: "अतिथि",
    points: "अंक",
    logOut: "लॉग आउट",
    signInTab: "लॉग इन",
    createAccountTab: "खाता बनाएं",
    welcomeBack: "आपका स्वागत है!",
    welcomeSubtitle: "स्थानीय समस्याओं की रिपोर्ट करें और हीरो अंक अर्जित करें।",
    newAccountTitle: "नया खाता बनाएं",
    newAccountSubtitle: "नागरिक नायकों के समूह में शामिल हों।",
    usernameLabel: "यूज़रनेम",
    passwordLabel: "पासवर्ड",
    chooseUsernameLabel: "यूज़रनेम चुनें",
    choosePasswordLabel: "पासवर्ड चुनें",
    signInBtn: "लॉग इन करें",
    registerBtn: "रजिस्टर और लॉगिन करें",
    usernameRequired: "यूज़रनेम और पासवर्ड दोनों अनिवार्य हैं।",
    usernameMinLen: "यूज़रनेम कम से कम 3 अक्षरों का होना चाहिए।",
    usernameTaken: "यह यूज़रनेम पहले से मौजूद है! दूसरा प्रयास करें।",
    loginFailed: "गलत यूज़रनेम या पासवर्ड! फिर से प्रयास करें।",
    reportIssueTab: "समस्या रिपोर्ट करें",
    dashboardTab: "डैशबोर्ड",
    reportBannerTitle: "त्वरित नागरिक निवारण",
    reportBannerText: "सार्वजनिक समस्याओं की रिपोर्ट करें और नगर निगम से सीधा अपडेट प्राप्त करें।",
    selectPhoto: "समस्या की फोटो चुनें",
    dragDropText: "फोटो खींचकर यहाँ लाएँ या ब्राउज़ करने के लिए क्लिक करें",
    changePhoto: "फोटो बदलें",
    photoUploaded: "फोटो सफलतापूर्वक अपलोड और संपीड़ित हो गई!",
    selectCategory: "समस्या की श्रेणी चुनें",
    catGarbage: "कचरा डिपो / डस्टबिन कचरा",
    catPotholes: "गड्ढे और क्षतिग्रस्त सड़कें",
    catStreetlight: "स्ट्रीटलाइट का काम न करना",
    catWaterlogging: "सीवरेज पानी का जमाव/जलभराव",
    catStrayAnimals: "आवारा जानवरों का खतरा",
    catOthers: "अन्य सामान्य नागरिक समस्याएँ",
    addDetailsLabel: "अतिरिक्त विवरण",
    detailsPlaceholder: "नगर निगम इंजीनियरों के मार्गदर्शन के लिए स्थिति का वर्णन करें...",
    locationLabel: "वर्तमान निर्देशांक (क्लिक करें)",
    coordinateDetected: "लाइव स्थान का पता चला",
    coordinatePinpointed: "निर्देशांक स्वचालित रूप से पिन किए गए",
    noLocationDetected: "स्वचालित रूप से वर्तमान निर्देशांक प्राप्त करने के लिए क्लिक करें",
    detectingLocation: "शहर के निर्देशांक प्रणालियों का पता लगाया जा रहा है...",
    dispatchBtn: "नागरिक सुधार अलर्ट भेजें (+10 अंक)",
    statsYourPoints: "मेरे प्राप्त अंक",
    statsYourPointsSub: "कम्युनिटी लीडरबोर्ड स्तर",
    statsTotalIssues: "कुल समस्याएँ",
    statsTotalIssuesSub: "डेटाबेस कुल संख्या",
    statsResolved: "सुलझाई गई समस्याएँ",
    statsResolvedSub: "पिछले 30 दिनों में पूर्ण की गई",
    filterAll: "सभी समस्याएं",
    filterReported: "पंजीकृत",
    filterVerified: "सत्यापित",
    filterResolved: "सुलझा हुआ",
    reportedBy: "द्वारा रिपोर्ट की गई",
    systemUser: "सिस्टम द्वारा",
    statusReported: "पंजीकृत",
    statusVerified: "सत्यापित सुधार",
    statusResolved: "पूरी तरह सुलझा हुआ",
    votesProgress: "सत्यापन वोट",
    verifyIssueBtn: "स्थानीय समस्या सत्यापित करें (+5 अंक)",
    alreadyVerified: "सत्यापित किया गया",
    resetDatabase: "डेटाबेस रीसेट करें",
    resetConfirmMessage: "क्या आप निश्चित रूप से SnapFix डेटाबेस को पुनः आरंभ करना चाहते हैं?",
    successTitle: "नागरिक रिपोर्ट सफलतापूर्वक भेजी गई!",
    successSubtitle: "नगर निगम को सतर्क कर दिया गया है।",
    trackingIdLabel: "नागरिक समाधान कोड",
    successPointsEarned: "आपने सफलतापूर्वक 10 हीरो अंक अर्जित किए! नीचे अपडेट ट्रैक करें।",
    closeBtn: "सम्पन्न, वापस जाएं",
    noIssuesFound: "इस स्थिति में कोई पायी गयी समस्या नहीं है।",
    issueReportTitle: "त्वरित समस्या निवारण 100% कार्य करेगा",
    issueReportText: "कहीं भी सार्वजनिक परेशानी दिखे, फोटो खींचकर भेजें। अंक प्राप्त करें और प्रशासन का सहयोग पाए।"
  }
};
