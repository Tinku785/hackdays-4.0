import { useEffect, useRef, useState, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Calendar, Code, MapPin, Search, Star, MessageCircle, Map, User, ShoppingBag, Shirt, Wind, Award, Sticker, Terminal, Wifi, X, ExternalLink, Globe, Bug, Zap, AlertTriangle } from 'lucide-react';
import * as THREE from 'three';
import gsap from 'gsap';

// Lazy load heavy components
const InteractiveDotGrid = lazy(() => import('./components/InteractiveDotGrid'));
const BugHunter = lazy(() => import('./components/BugHunter'));
const StarkOSTerminal = lazy(() => import('./components/StarkOSTerminal'));
const SpidermanScroll = lazy(() => import('./components/SpidermanScroll'));
const FloatingComicObjects = lazy(() => import('./components/FloatingComicObjects'));
const SpeedLines = lazy(() => import('./components/SpeedLines'));
const TradingCard = lazy(() => import('./components/TradingCard'));
import StarSVG from './components/StarSVG';
import MobileAppNav from './components/MobileAppNav';
import { image } from 'framer-motion/client';

const creativeEvents = [
  {
    id: 1,
    title: 'TECHNICAL EVENTS',
    list: 'Hackathons, Code Gem,\nUI/UX Designing,\nTyping Competition, Tech Quiz',
    bg: '/tech_events.png',
    exclaim: 'PEW!',
    rotation: '-4deg',
    subEvents: [
      {
        id: 't1',
        title: 'Hackathons',
        image: '/comic_hackathon.png',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSfP8HRAS9gqe3SkfL8HVdsVAR3yDKErp5saBNstg40XzsyV8A/viewform?usp=header',
        prizes: 'Winner: ₹8,000 | Runner-up: ₹4,000',
        rules: 'Max team of 5. Must build project from scratch. Use of AI tools permitted.',
        process: '1 week Build -> Idea Pitch -> Mentoring -> Final Demo'
      },
      {
        id: 't2',
        title: 'Code Gem',
        image: '/tech_events.png',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSeQKVr1CQJrz-HfkN0OhwXL6q9ZKBxgTvNULC-6ARQpb9FkFA/viewform?usp=sharing&ouid=102858058196643049393',
        prizes: 'Winner: ₹4000 | Runner-up: ₹2000',
        rules: 'Individual participation. 3 coding problems. C/C++/Java/Python allowed.',
        process: 'Registration -> Online Round -> Rewards'
      },
      {
        id: 't3',
        title: 'UI/UX Designing',
        image: '/comic_uiux.png',
        link: 'https://forms.gle/oQeV28VeQmxcwKK97',
        prizes: 'Winner: ₹3000 | Runner-up: ₹1000',
        rules: 'Figma/AdobeXD only. Topic given on spot. 3 hours duration.',
        process: 'Briefing -> Wireframing -> Hi-Fi Design -> Presentation'
      },
      {
        id: 't4',
        title: 'Typing Competition',
        image: '/typing_event.png',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSeOZAfc0PzUPZ_pqRJ2Zv-yvhdgSYyVP0-WqC_bCH3d8d4_DQ/viewform?usp=sharing&ouid=102858058196643049393',
        prizes: '₹2,000',
        rules: 'Standard QWERTY layout. Highest WPM with 95%+ accuracy wins.',
        process: 'Round 1 (1 min) -> Round 2 (5 mins) -> Final Showdown'
      },
      {
        id: 't5',
        title: 'Tech Quiz',
        image: '/quiz_event.png',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSe1b3cFVmnGWyQjou_APB8GB0Q3UAOB_uEQ5R3h_OTvdhLpJg/viewform?usp=sharing&ouid=102858058196643049393',
        prizes: '₹2,000',
        rules: 'Teams of 2 or individual participant. Questions based on tech history, IT trends, and pop culture.',
        process: 'Rapid Fire Questions'
      },
      {
        id: 't6',
        title: 'Cypher',
        image: '/cypher_event.png',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSdrezvbhEyBIB47dMB06ZieOKR1BwkSkq74euBe7Wl7_5BxkA/viewform?usp=sharing&ouid=102858058196643049393',
        prizes: 'Winner:₹3,000',
        rules: 'CTF style challenges. No destructive attacks outside targets.',
        process: 'Access Provided -> Flag Hunting -> Verification -> Leaderboard'
      },
      {
        id: 't7',
        title: 'Bug Bounty',
        image: '/bug_bounty_event.png',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSceDt9A5-X2_5SZe9MGfvMhxFGphe0GxzxBaOiB80fD1Hx7-Q/viewform',
        prizes: 'Winner: ₹2,000 | Runner-up: ₹1,000',
        rules: 'Team Size: 1-3. Mode: Offline. Analyze provided codebases to either identify bugs or fix them.',
        process: 'Download Problem -> Analyze & Debug Locally -> Upload Solution'
      }
    ]
  },
  {
    id: 2,
    title: 'E-SPORTS EVENTS',
    list: 'Mobile Legends\nBGMI\n',
    bg: '/esports_events.png',
    exclaim: 'OHH!',
    rotation: '3deg',
    subEvents: [
      {
        id: 'e1',
        title: 'Mobile Legends',
        image: '/comic_gaming.png',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSdgSHl1tY3JVaFC6rK0akhe3_g-D9igxY17WUupoZC9_hBvvw/viewform?usp=header',
        prizes: '₹10,000 PRIZE POOL',
        rules: '5v5 draft pick mode. Emulators strictly prohibited.',
        process: 'Qualifiers -> Quarter Finals -> Semi Finals -> Grand Finals'
      },
      {
        id: 'e2',
        title: 'BGMI',
        image: '/comic_gaming.png',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSfZb-XSb5g1dk4ZrgbMbCqGV1I6TvfGHW2aSuyOsrVAQBXh2Q/viewform?usp=sharing&ouid=102858058196643049393',
        prizes: '₹10,000 PRIZE POOL',
        rules: 'Squad match. Official maps. No hacks/scripts.',
        process: 'Custom Rooms -> Points System -> Final Zone Showdown'
      },
    ]
  },
  {
    id: 3,
    title: 'LECTURE SERIES',
    list: 'Technical Sessions\nTech Workshops\nTechnical Seminars',
    bg: '/lecture_series.png',
    exclaim: 'HOW!',
    rotation: '-2deg',
    subEvents: [
      {
        id: 'l1',
        title: 'Technical Sessions',
        image: '/lecture_series.png',
        link: '#',
        prizes: 'KNOWLEDGE & CERTIFICATE',
        rules: 'Open for all attendees. Must register prior to seat filling.',
        process: 'Registration -> Attend Session -> Q&A -> Certificate'
      },
      {
        id: 'l2',
        title: 'Tech Workshops',
        image: '/lecture_series.png',
        link: '#',
        prizes: 'HANDS-ON EXPERIENCE',
        rules: 'Bring your own laptop. Prerequisites must be installed.',
        process: 'Introduction -> Live Coding -> Practical Tasks -> Showcase'
      },
      {
        id: 'l3',
        title: 'Technical Seminars',
        image: '/lecture_series.png',
        link: '#',
        prizes: 'INDUSTRY INSIGHTS',
        rules: 'Audience interaction encouraged. Formals preferred.',
        process: 'Guest Welcome -> Keynote Address -> Panel Discussion -> Networking'
      }
    ]
  },
  {
    id: 4,
    title: 'FUN EVENTS',
    list: "Chess Master 3x3,\nIPL Mock Auction",
    bg: '/fun_events.png',
    exclaim: 'AAAH!',
    rotation: '5deg',
    subEvents: [
      {
        id: 'f1',
        title: 'Chess Master 3x3',
        image: '/chess_event.png',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSdKYfphDq0N6aXjEw8Th42IBFiw__wTGedB57-iVuh1e2l7vQ/viewform?usp=header',
        prizes: 'Winner:₹1,500 | Runner-up:₹500',
        rules: 'Standard FIDE blitz rules apply. 3+2 time control.',
        process: 'Swiss Format -> Top 8 Knockout -> Grand Final'
      },
      {
        id: 'f2',
        title: 'IPL Mock Auction',
        image: '/ipl_event.png',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSeZy6aPcEEnNAOqOfzH2_08aQsQUrBHCaRh-EhGg4mmEBj0XQ/viewform?usp=sharing&ouid=104815312117715119166',
        prizes: 'Winner:₹4,000 | Runner-up:₹3,000',
        rules: 'Teams of up to 4. Virtual budget limit. Highest team ratings wins.',
        process: 'Player Bidding -> Roster Formation -> Stats Evaluation -> Winner'
      }
    ]
  },
  {
    id: 5,
    title: 'KALAKRITI',
    list: 'Short Film, Digital Art',
    bg: '/fun_events.png',
    exclaim: 'WOW!',
    rotation: '-3deg',
    subEvents: [
      {
        id: 'k1',
        title: 'Short Film,\nDigital Art',
        image: '/comic_uiux.png',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSeKC4e5HCxYHN9rmM3AhjkV4FLw3-27xZM1I9mOOhTUjoIBzw/viewform?usp=sharing&ouid=102858058196643049393',
        prizes: 'Winner:₹2,000 | Runner-up:₹1,000',
        rules: 'Duration: 3-10 mins. Theme: Cinematic Tech. Originals only.',
        process: 'Register -> Concept -> Submission -> Screening'
      },
      {
        id: 'k2',
        title: 'Digital Art',
        image: '/comic_uiux.png',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSdRtivMkleBqFeIxGa9SrEwjlt01iJQrziijnP46buaQKVt3g/viewform?usp=sharing&ouid=102858058196643049393',
        prizes: 'Winner:₹2,000 | Runner-up:₹1,000',
        rules: 'Theme: Cinematic Tech. Originals only.',
        process: 'Register -> Concept -> Submission -> Screening'
      }
    ]
  }
];

const committeeMembers = [
  {
    division: "COMMAND CENTER",
    role: "Event Leads",
    color: "red",
    members: [
      { name: "Kaushik Hazarika", github: "#", linkedin: "#", insta: "#", photo: "/committee_picture/kaushik_hazarika.jpg" },
      { name: "Gyan Ankur Das", github: "#", linkedin: "https://www.linkedin.com/in/gyan-ankur-das-aaa900230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", insta: "https://instagram.com/__.gyan_ankur_das.__", photo: "/committee_picture/IMG-20260329-WA0004 - Gyan Ankur Das.jpg" }
    ]
  },
  {
    division: "TACTICAL OPERATIONS",
    role: "Event Coordinator",
    color: "blue",
    members: [
      { name: "Priyam Basistha", github: "#", linkedin: "https://www.linkedin.com/in/priyambasistha", insta: "https://instagram.com/pr_ba_03", photo: "/committee_picture/IMG-20260329-WA0064 - Priyam Basistha.jpg" },
      { name: "Baidurjya Bharadwaz", github: "#", linkedin: "https://www.linkedin.com/in/baidurjya-bharadwaz-278240292", insta: "https://instagram.com/im_shershah", photo: "/committee_picture/IMG-20260329-WA0002 - Baidurjya Bharadwaz.jpg" },
      // { name: "Rishikul Borah", github: "#", linkedin: "https://www.linkedin.com/in/rishikul-borah-1706ab299?utm_source=share_via&utm_content=profile&utm_medium=member_android", insta: "https://www.instagram.com/rishi_kul_borah?igsh=ZnpqenJtNm92Z3B4", photo: "/committee_picture/IMG_20260112_163619481_HDR - Rishikul Borah.jpg" }
    ]
  },
  {
    division: "TECH FORCES",
    role: "Technology Team",
    color: "blue",
    members: [
      { name: "Tinku Moni Kaushik", github: "#", linkedin: "https://www.linkedin.com/in/tinku-kaushik", insta: "https://www.instagram.com/tinku.kaushik_?igsh=bTJhZGJzdWFyZHZ6", photo: "/committee_picture/tinku_moni_kaushik.jpg" },
      { name: "Aryan Mitra", github: "#", linkedin: "https://www.linkedin.com/in/aryan-mitra-472457295?utm_source=share_via&utm_content=profile&utm_medium=member_android", insta: "https://www.instagram.com/_absurd_28?utm_source=qr&igsh=MXgxcWl0dG5la2I3dQ==", photo: "/committee_picture/aryan_mitra.jpg" },
      { name: "Ricky Kashyap", github: "#", linkedin: "https://www.linkedin.com/in/ricky-kashyap-7b776723a/", insta: "https://instagram.com/PRINCELUCIFER9669", photo: "/committee_picture/IMG_20250212_172400205 - Ricky Kashyap.jpg" }
    ]
  },
  {
    division: "FINANCE DIVISION",
    role: "Budgeting & Finance",
    color: "yellow",
    members: [
      { name: "Jyotirmoy Das", github: "#", linkedin: "https://www.linkedin.com/in/jdas4/", insta: "https://instagram.com/jyotirmoy.d04", photo: "/committee_picture/oie_1bFSAUA0N3R6 - Jyotirmoy Das.png" },
      { name: "Waheed Asraf", github: "#", linkedin: "https://in.linkedin.com/in/waheed-asraf-97700128a", insta: "https://instagram.com/waheed.arc", photo: "/committee_picture/waheed_asraf.jpg" }
    ]
  },
  {
    division: "CREATIVE SQUAD",
    role: "Marketing & PR + Design",
    color: "red",
    members: [
      { name: "Anushuya Paul", github: "#", linkedin: "#", insta: "https://instagram.com/anushuyagghhh", photo: "/committee_picture/IMG-20250929-WA0068 - Anushuya Paul.jpg" },
      { name: "Anwesha Choudhury", github: "#", linkedin: "https://www.linkedin.com/in/anwesha-chaudhury-67a050292", insta: "https://instagram.com/___anwesha_is_ded___", photo: "/committee_picture/IMG-20250716-WA0001(1)~2 - Anwesha Chaudhury.jpg " },
      { name: "Abinash Sarmah", github: "#", linkedin: "https://www.linkedin.com/in/abinash-sarmah-46718124b?utm_source=share_via&utm_content=profile&utm_medium=member_android", insta: "https://instagram.com/abinashsarmah16", photo: "/committee_picture/IMG-20260329-WA0004 - Abinash Sarmah.jpg" }
    ]
  },
  {
    division: "ENGAGEMENT UNIT",
    role: "Attendee Engagement",
    color: "yellow",
    members: [
      { name: "Bedanta Sarma", github: "#", linkedin: "#", insta: "https://instagram.com/bedanta._xsr", photo: "/committee_picture/IMG-20260304-WA0208 - bedanta sarma.jpg" },
      { name: "Abhishek Kumar Prasad", github: "#", linkedin: "https://www.linkedin.com/in/abhishek-kumar-prasad-512568298?utm_source=share_via&utm_content=profile&utm_medium=member_ios", insta: "https://instagram.com/abhiissshhek_", photo: "/committee_picture/abhishek_kumar-prasad.jpg" },
      { name: "Manash Jyoti Thakuria", github: "#", linkedin: "https://www.linkedin.com/in/manash-thakuria-b8a29628b", insta: "https://instagram.com/__m_a_n_a_s_h____", photo: "/committee_picture/IMG_20260329_130513 - Manash Thakuria.jpg" }
    ]
  },
  {
    division: "LOGISTICS CENTER",
    role: "Fooding",
    color: "red",
    members: [
      { name: "Bitopan Sarmah", github: "#", linkedin: "#", insta: "#" },
      { name: "Rudra Upadhyaya", github: "#", linkedin: "https://www.linkedin.com/in/rudra-upadhyaya-235788217/", insta: "https://instagram.com/upadhyaya_rudra56", photo: "/committee_picture/IMG_4544 - Rudra Upadhyaya.jpeg" }
    ]
  },
  {
    division: "STRATEGIC ALLIANCE",
    role: "Sponsorship",
    color: "blue",
    members: [
      { name: "Simanta Sarma", github: "#", linkedin: "https://www.linkedin.com/in/simantasarma1", insta: "https://instagram.com/unstoppable.exe", photo: "/committee_picture/simanta_sarma.jpg" }
    ]
  },
  {
    division: "SUPPLY CHAIN",
    role: "Merchandise",
    color: "yellow",
    members: [
      { name: "Birochan Das", github: "#", linkedin: "#", insta: "https://instagram.com/__biru__09", photo: "/committee_picture/BIRU - Birochan Das.jpeg" },
      { name: "Rudra Upadhyaya", github: "#", linkedin: "https://www.linkedin.com/in/rudra-upadhyaya-235788217/", insta: "https://instagram.com/upadhyaya_rudra56", photo: "/committee_picture/IMG_4544 - Rudra Upadhyaya.jpeg" },
      { name: "Aritram Dutta", github: "#", linkedin: "#", insta: "#" }
    ]
  }
];


const merch = [
  {
    title: 'HACKDAYS 4.0 REGULAR FIT',
    originalPrice: '₹499',
    price: '₹429',
    image: '/tshirt_new2.jpeg',
    backImage: '/tshirt_new.jpeg',
    color: 'black',
    urgency: 'FOR FIRST 50 CUSTOMERS ONLY!',
    discount: '15% OFF'
  },

];

// Multiverse Gallery Assets
const galleryPhotos = [
  { id: 1, category: 'hackathon', src: '/gallery of hackdays 3.0/photo_2026-03-28_17-16-39.jpg', label: 'THE HACKATHON' },
  { id: 2, category: 'hackathon', src: '/gallery of hackdays 3.0/photo_2026-03-28_17-16-39 (2).jpg', label: 'THE HACKATHON' },
  { id: 3, category: 'workshops', src: '/gallery of hackdays 3.0/photo_2026-03-28_17-16-40.jpg', label: 'THE WORKSHOPS' },
  { id: 4, category: 'workshops', src: '/gallery of hackdays 3.0/photo_2026-03-28_17-16-40 (2).jpg', label: 'THE WORKSHOPS' },
  { id: 5, category: 'victors', src: '/gallery of hackdays 3.0/photo_2026-03-28_17-16-41.jpg', label: 'THE VICTORS' },
  { id: 6, category: 'victors', src: '/gallery of hackdays 3.0/photo_2026-03-28_17-16-41 (2).jpg', label: 'THE VICTORS' },
  { id: 7, category: 'hackathon', src: '/gallery of hackdays 3.0/photo_2026-03-28_17-16-39 (3).jpg', label: 'THE HACKATHON' },
  { id: 8, category: 'workshops', src: '/gallery of hackdays 3.0/photo_2026-03-28_17-16-40 (3).jpg', label: 'THE WORKSHOPS' },
  { id: 9, category: 'victors', src: '/gallery of hackdays 3.0/photo_2026-03-28_17-16-41 (3).jpg', label: 'THE VICTORS' },
  { id: 10, category: 'victors', src: '/gallery of hackdays 3.0/photo_2026-03-28_17-16-41 (4).jpg', label: 'THE VICTORS' },
  { id: 11, category: 'hackathon', src: '/gallery of hackdays 3.0/photo_2026-03-28_17-16-42.jpg', label: 'THE HACKATHON' },
];

const testimonials = [
  { name: 'SAMANNAYA ADHIKARI', text: 'AN AMAZING EXPERIENCE THAT HELPED ME GROW AS A DEVELOPER!', sound: 'POW!', rating: 5, year: '2023-24', color: 'red' },
  { name: 'RAJDEEP DAS', text: 'THE CHALLENGES WERE TOUGH BUT INCREDIBLY REWARDING.', sound: 'BANG!', rating: 4, year: '2023-24', color: 'blue' },
  { name: 'SWARUP DAS', text: 'GREAT ORGANIZATION AND LEARNING OPPORTUNITIES.', sound: 'WHAM!', rating: 4, year: '2023-24', color: 'yellow' },
  { name: 'BINIT GOSWAMI', text: 'MADE GREAT CONNECTIONS AND LEARNED NEW TECHNOLOGIES.', sound: 'THWIP!', rating: 5, year: '2023-24', color: 'red' },
  { name: 'SANCHIT KUMAR', text: 'THE ENERGY WAS UNREAL. THE BEST HACKATHON IN NE INDIA!', sound: 'BOOM!', rating: 4, year: '2023-24', color: 'yellow' },
];

const leadership = [
  {
    name: 'PROF. SHIKHAR KUMAR SARMA',
    role: 'DEAN OF TECH // HOD, IT',
    msg: '"Hackdays 4.0 represents our commitment to fostering innovation and technical excellence. This event brings together the brightest minds to create, compete, and collaborate."',
    portrait: '/shikhar_sarma.jpg',
    clearance: 'LEVEL 10 CLEARANCE',
    id: 'GU_IT_DIRECTOR_01'
  },
  {
    name: 'DR. RUPAM BHATTACHARYYA',
    role: 'FACULTY ADVISOR // ASST. PROF',
    msg: '"Our goal is to provide a platform where students can showcase their skills, learn from peers, and push the boundaries of what’s possible in technology."',
    portrait: '/rupam_b.jpg',
    clearance: 'ALPHA CLEARANCE',
    id: 'GU_IT_ADVISOR_02'
  }
];

// Moved components to ./components/

function App() {
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  const [selectedSubEvent, setSelectedSubEvent] = useState(null);
  const [showOriginStory, setShowOriginStory] = useState(false);
  const [commsOverlayOpen, setCommsOverlayOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState('00:00:00:00');
  const [isVillainMode, setIsVillainMode] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(20);
  const heroRef = useRef(null);
  const holoRefs = useRef({});
  const revealRefs = useRef([]);
  const [konamiIdx, setKonamiIdx] = useState(0);
  const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showStarkBubble, setShowStarkBubble] = useState(false);
  const starkBubbleMessages = [
    "Hello sir! I am ready to help you 🤖",
    "Need assistance? Click me! ⚡",
    "Try typing 'help' in my terminal 💡",
    "Secret commands await, Operator... 🔐",
    "At your service, True Believer! 🦸"
  ];
  const [starkBubbleMsg, setStarkBubbleMsg] = useState(starkBubbleMessages[0]);

  useEffect(() => {

    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Periodic Stark logo dialogue bubble
  useEffect(() => {
    if (isLoading || secretUnlocked) return;
    const showBubble = () => {
      const msg = starkBubbleMessages[Math.floor(Math.random() * starkBubbleMessages.length)];
      setStarkBubbleMsg(msg);
      setShowStarkBubble(true);
      setTimeout(() => setShowStarkBubble(false), 4000);
    };
    const initialTimer = setTimeout(showBubble, 6000);
    const interval = setInterval(showBubble, 20000);
    return () => { clearTimeout(initialTimer); clearInterval(interval); };
  }, [isLoading, secretUnlocked]);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Don't play if still loading
      if (isLoading) return;

      // Exclude these specifically as they have their own sounds
      const isTerminal = e.target.closest('.console-trigger-btn');
      const isToggle = e.target.closest('.villain-toggle');
      const isGame = e.target.closest('.bug-hunter-container');

      if (!isTerminal && !isToggle && !isGame) {
        if (!window._starkAudio) {
          window._starkAudio = new Audio("/Voicy_At Your Service Sir.mp3");
          window._starkAudio.volume = 0.4;
        }
        window._starkAudio.currentTime = 0;
        window._starkAudio.play().catch(() => { });
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [isLoading]);

  // Audio/Video Bypass logic
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);

  const handleStartVideo = () => {
    setVideoStarted(true);
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        // Success
      }).catch((err) => {
        console.error("Video play blocked:", err);
        setIsLoading(false); // Failsafe skip if blocked or missing
      });
      // Removed the 3s safety skip to let the video play fully. 
      // Only long failsafes or onEnded will trigger the main app reveal now.
    } else {
      setIsLoading(false);
    }
  };

  // Magnetic Button (20px pull radius)
  const MagneticButton = ({ children, className, onClick, onMouseEnter, onMouseLeave }) => {
    const btnRef = useRef(null);
    const handleMouseMove = (e) => {
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      // Calculate distance and constrain to a raw 20px max magnetic radius
      const maxRadius = 20;
      const dist = Math.sqrt(x * x + y * y);
      const pullX = (x / dist) * Math.min(dist * 0.4, maxRadius) || 0;
      const pullY = (y / dist) * Math.min(dist * 0.4, maxRadius) || 0;

      btnRef.current.style.transform = `translate(${pullX}px, ${pullY}px)`;
    };
    const handleMouseLeave = () => {
      btnRef.current.style.transform = `translate(0px, 0px)`;
      if (onMouseLeave) onMouseLeave();
    };
    return (
      <button
        ref={btnRef} className={className} onClick={onClick}
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={onMouseEnter}
        style={{ transition: 'transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)', willChange: 'transform' }}
      >
        {children}
      </button>
    );
  };

  // Turn Villain with Glitch
  const toggleVillain = () => {
    setIsGlitching(true);

    // Play sound based on target mode
    const soundFile = !isVillainMode ? "Voicy_You don't deserve this power!.mp3" : "Voicy_spiderman theme song.mp3";
    new Audio(`/${soundFile}`).play().catch(e => console.log("Audio play blocked", e));

    setTimeout(() => {
      setIsVillainMode(!isVillainMode);
      setTimeout(() => setIsGlitching(false), 500); // 0.5s glitch completes
    }, 200);
  };

  // Scroll Spy Reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );

    // Micro-delay ensures React DOM Refs are solidly attached
    const timer = setTimeout(() => {
      revealRefs.current.forEach(el => {
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Marquee Accelerate specifically on Scroll Velocity (Not global scroll depth)
  useEffect(() => {
    let scrollTimeout;
    let rafPending = false;
    const handleScroll = () => {
      if (!rafPending) {
        rafPending = true;
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--marquee-speed', '3s');
          rafPending = false;
        });
      }
      window.clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.documentElement.style.setProperty('--marquee-speed', '20s');
      }, 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(scrollTimeout);
    };
  }, []);

  // Konami Code specific 
  useEffect(() => {
    let hackKeys = '';
    const handleKeyDown = (e) => {
      // Secret HACK Console
      hackKeys += e.key.toUpperCase();
      if (hackKeys.endsWith('HACK')) setSecretUnlocked(true);
      if (hackKeys.length > 10) hackKeys = hackKeys.slice(-10);

      // Konami Comic Confetti Overlay
      if (e.key.toLowerCase() === konamiPattern[konamiIdx].toLowerCase()) {
        if (konamiIdx === konamiPattern.length - 1) {
          import('canvas-confetti').then((confetti) => {
            // Generate Pixelated Comic Element shapes directly
            const scalar = 3;
            const boom = confetti.default.shapeFromText({ text: '💥', scalar });
            const star = confetti.default.shapeFromText({ text: '⭐', scalar });
            const alien = confetti.default.shapeFromText({ text: '👾', scalar });
            const zap = confetti.default.shapeFromText({ text: '⚡', scalar });

            confetti.default({
              particleCount: 120,
              spread: 360,
              ticks: 200,
              shapes: [boom, star, alien, zap],
              scalar: 2
            });
          });
          setKonamiIdx(0);
        } else setKonamiIdx(konamiIdx + 1);
      } else {
        setKonamiIdx(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIdx, konamiPattern]);

  // Holographic Hover Tilt
  const handleHoloMove = (e, idx) => {
    const el = holoRefs.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    el.querySelector('.holo-foil').style.backgroundPosition = `${x}px ${y}px`;
  };
  const handleHoloLeave = (idx) => {
    const el = holoRefs.current[idx];
    if (el) el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };
  useEffect(() => {
    if (heroRef.current && !isLoading) {
      gsap.fromTo(heroRef.current.children,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: 'back.out(1.5)' }
      );
    }
  }, [isLoading]);

  const scrollToSection = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let rafPending = false;
    const handleScroll = () => {
      if (!rafPending) {
        rafPending = true;
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          rafPending = false;
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  useEffect(() => {
    const targetDate = new Date('2026-04-30T00:00:00').getTime(); // Event starts 30th April
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) return;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft(
        `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fade-in from black state
  const [fadeIn, setFadeIn] = useState(false);

  const handleVideoEnd = () => {
    setFadeIn(true); // Start fade-in from black
    setTimeout(() => setIsLoading(false), 50); // Tiny delay to ensure CSS class is applied
  };

  useEffect(() => {
    if (videoStarted) {
      // Extended failsafe to 60 seconds just in case of extreme errors,
      // but the primary skip is handled by naturally finishing the video (onEnded).
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 60000);
      return () => clearTimeout(timer);
    }
  }, [videoStarted]);

  // Custom Spider-Man Mask Global Cursor
  useEffect(() => {
    if (isTouchDevice || isMobile) {
      const existing = document.getElementById('comic-cursor-override');
      if (existing) existing.remove();
      return;
    }
    const img = new Image();

    img.src = '/cursor.png';
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const size = 32;
      const canvasSize = 48; // Extrusion padding
      const canvas = document.createElement('canvas');
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const ctx = canvas.getContext('2d');

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = size;
      tempCanvas.height = size;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(img, 0, 0, size, size);

      const imageData = tempCtx.getImageData(0, 0, size, size);
      const data = imageData.data;

      const bgR = data[0], bgG = data[1], bgB = data[2];

      for (let i = 0; i < data.length; i += 4) {
        // Drop any color mirroring the top-left background pixel natively into Transparency
        if (Math.abs(data[i] - bgR) < 40 && Math.abs(data[i + 1] - bgG) < 40 && Math.abs(data[i + 2] - bgB) < 40) {
          data[i + 3] = 0;
        }
      }
      tempCtx.putImageData(imageData, 0, 0);

      // Paint Comic Shadow behind
      for (let i = 1; i <= 3; i++) {
        ctx.drawImage(tempCanvas, i, i);
      }
      ctx.globalCompositeOperation = 'source-in';
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      // Paint Spidey 
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(tempCanvas, 0, 0);

      const dataUrl = canvas.toDataURL('image/png');

      const style = document.createElement('style');
      style.id = "comic-cursor-override";
      style.innerHTML = `
        * { cursor: url('${dataUrl}') 16 16, auto !important; }
        button, a, .nav-btn, .btn-hero, .comic-button, .creative-event-card {
          cursor: url('${dataUrl}') 16 16, pointer !important;
        }
      `;

      // Cleanup previous run if exists
      const existing = document.getElementById('comic-cursor-override');
      if (existing) existing.remove();

      document.head.appendChild(style);
    };
  }, []);
  if (isLoading) {
    return (
      <div className="loader-screen" style={{ backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {!videoStarted && (
          <div style={{ position: 'absolute', zIndex: 10, textAlign: 'center' }}>
            <h2 style={{ color: 'var(--marvel-yellow)', fontFamily: 'var(--font-heading)', fontSize: '3rem', WebkitTextStroke: '2px var(--black)', marginBottom: '2rem' }}>WELCOME TO HACKDAYS 4.0</h2>
            <button className="comic-button btn-red" onClick={handleStartVideo} style={{ fontSize: '2rem', padding: '1.5rem 4rem', animation: 'pulse 2s infinite' }}>CLICK TO INITIATE</button>
          </div>
        )}
        <video
          key={isMobile ? 'mobile-vid' : 'desktop-vid'}
          ref={videoRef}
          className="loading-video"
          src={isMobile ? "/hackdays_loading_mobile.mp4" : "/hackdays_loading_new.webm"}
          playsInline
          onEnded={handleVideoEnd}
          style={{ opacity: videoStarted ? 1 : 0, transition: 'opacity 0.5s ease', pointerEvents: 'none', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="lightning-loader" />}>
      <InteractiveDotGrid />
      <SpidermanScroll isVillainMode={isVillainMode} />
      <SpeedLines scrollY={scrollY} />

      {/* Professional 'Utility Belt' Navbar */}
      {isMobile ? (
        <MobileAppNav
          activeSection={activeSection || 'home'}
          onNavigate={(id) => {
            scrollToSection(id);
            setActiveSection(id);
          }}
          onToggleTerminal={() => setSecretUnlocked(true)}
          isVillainMode={isVillainMode}
          onToggleMode={toggleVillain}
          onToggleComms={() => setCommsOverlayOpen(true)}
        />
      ) : (




        <div className={`nav-container-fixed utility-belt-nav ${isVillainMode ? 'villain-mode' : ''} ${isGlitching ? 'crt-glitch' : ''} ${scrollY > 50 ? 'navbar-scrolled' : ''}`}>
          <div className="nav-logo">HACKDAYS 4.0</div>
          <div className="nav-links">
            {['HOME', 'EVENTS', 'SPONSORS', 'COMMITTEE', 'MERCH'].map(item => (
              <button
                key={item} className="nav-btn"
                onClick={() => scrollToSection(item.toLowerCase())}
                onMouseEnter={() => setCursorHover(true)} onMouseLeave={() => setCursorHover(false)}
              >
                {item}
              </button>
            ))}
            <button className="nav-btn villain-toggle" onClick={toggleVillain} onMouseEnter={() => setCursorHover(true)} onMouseLeave={() => setCursorHover(false)}>
              {isVillainMode ? '🦸 HERO MODE' : '🦹 VILLAIN MODE'}
            </button>
          </div>
        </div>
      )}

      <div className={`app-container ${isVillainMode ? 'villain-mode' : ''} ${isGlitching ? 'crt-glitch' : ''} ${fadeIn ? 'fade-in-from-black' : ''}`}>
        {/* Navbar removed from here to be outside app-container */}


        {/* Hero Section */}
        <section id="home" className="bg-marvel-blue hero-section">
          <Suspense fallback={null}>
            <FloatingComicObjects />
          </Suspense>
          <StarSVG style={{ top: '30%', left: '25%' }} />
          <StarSVG style={{ top: '45%', right: '15%', fill: '#e62429', transform: 'scale(1.2) rotate(10deg)' }} />
          <StarSVG style={{ bottom: '25%', left: '35%', fill: '#e62429', opacity: 0.5, transform: 'scale(1.5) rotate(-15deg)' }} />

          {/* Parallax Action Bubbles */}
          <div className="action-bubble bubble-pow" style={{ transform: `translateY(${scrollY * -0.3}px) rotate(10deg)` }}>POW!</div>
          <div className="action-bubble bubble-zap" style={{ transform: `translateY(${scrollY * -0.5}px) rotate(-15deg)` }}>ZAP!</div>
          <div className="action-bubble bubble-boom" style={{ transform: `translateY(${scrollY * -0.2}px) rotate(5deg)` }}>BOOM!</div>

          {/* Framed Side Images (Creatively Placed) */}
          {(() => {
            const portraitScale = 1 + Math.min(scrollY / 1000, 0.5);
            const portraitOpacity = Math.max(1 - scrollY / 600, 0);
            const portraitStyle = {
              opacity: portraitOpacity,
              transform: `scale(${portraitScale})`
            };

            return (
              <>
                <div className="hero-side-img img-left comic-torn-edge" style={{ ...portraitStyle, transform: `${portraitStyle.transform} translate(var(--mouse-x, 0), var(--mouse-y, 0))` }}>
                  {/* Hero Mode: Use the newly generated pic | Villain Mode: Use 90s cartoon villain */}
                  <img src={isVillainMode ? "/villain_90s.png" : "/Spider_Man.webp"} alt="Marvel Hero/Villain" />
                </div>
                <div className="img-speech speech-left" style={{ opacity: portraitOpacity, transform: `translate(calc(var(--mouse-x, 0) * 0.5), calc(var(--mouse-y, 0) * 0.5))` }}>
                  {isVillainMode ? "MUAHAHA!" : "LET'S GO!"}
                </div>

                <div className="hero-side-img img-right-top comic-torn-edge" style={{ ...portraitStyle, transform: `${portraitStyle.transform} translate(calc(var(--mouse-x, 0) * -1), calc(var(--mouse-y, 0) * -1))` }}>
                  <img src={isVillainMode ? "/villain_loki.png" : "/iron_man.jpg"} alt="Marvel Hero/Villain" />
                </div>

                <div className="hero-side-img img-right-bottom comic-torn-edge" style={{ ...portraitStyle, transform: `${portraitStyle.transform} translate(calc(var(--mouse-x, 0) * 0.8), calc(var(--mouse-y, 0) * 0.8))` }}>
                  <img src={isVillainMode ? "/villain_thanos.png" : "/Deadpool.png"} alt="Marvel Hero/Villain" />
                </div>
              </>
            );
          })()}

          <div className="hero-burst-badge" style={{ transform: `translate(calc(var(--mouse-x, 0) * -0.3), calc(var(--mouse-y, 0) * -0.3)) rotate(15deg)` }}>
            14+<br />EVENTS
          </div>

          {/* Center Content with GSAP Ref */}
          <div className="hero-center" ref={heroRef}>
            <div className="subtitle-badge">THE ULTIMATE TECH SHOWDOWN!</div>

            <h1 className="hero-h1">
              HACKDAYS 4.0
            </h1>

            <div className="hero-dept-box">
              Department of Information Technology
              <br />
              <span style={{ fontWeight: 'normal', fontSize: '1.2rem', fontFamily: 'var(--font-body)' }}>Gauhati University</span>
            </div>

            <p className="hero-desc">
              Join us for the most EPIC tech event of the year! Compete in 14 AMAZING events,<br />showcase your SUPERPOWERS, and win LEGENDARY prizes!
            </p>

            <div className="hero-buttons">
              <MagneticButton className="btn-hero btn-red comic-button" onClick={() => {
                scrollToSection('events');
                if (window._starkAudio) window._starkAudio.play().catch(() => { });
              }} onMouseEnter={() => setCursorHover(true)} onMouseLeave={() => setCursorHover(false)}>REGISTER NOW!</MagneticButton>
              <MagneticButton className="btn-hero btn-yellow comic-button" onClick={() => {
                scrollToSection('events');
                if (window._starkAudio) window._starkAudio.play().catch(() => { });
              }} onMouseEnter={() => setCursorHover(true)} onMouseLeave={() => setCursorHover(false)}>VIEW EVENTS</MagneticButton>
            </div>

            <div className="hero-date digital-clock">
              <Calendar size={28} style={{ color: "var(--black)" }} /> COUNTDOWN: {timeLeft}
            </div>

            <div className="hero-date-text" style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--marvel-yellow)', textShadow: '2px 2px 0 var(--black)', WebkitTextStroke: '1.5px var(--black)', transform: 'rotate(-2deg)' }}>
              30TH APRIL & 1ST MAY 2026
            </div>
          </div>

        </section>

        {/* Marquee - First View pinned divider */}
        <div className={`marquee-container ${cursorHover ? 'paused' : ''}`} style={{ background: '#fff', color: '#000', marginBottom: '-5px' }} onMouseEnter={() => setCursorHover(true)} onMouseLeave={() => setCursorHover(false)}>
          <div className="marquee-content" style={{ animationDuration: 'var(--marquee-speed, 20s)' }}>
            * HACKDAYS 4.0 IS HERE * ASSEMBLE YOUR TEAM * CODE THE FUTURE * WIN EXCITING PRIZES * HACKDAYS 4.0 IS HERE * ASSEMBLE YOUR TEAM * CODE THE FUTURE * WIN EXCITING PRIZES *&nbsp;
          </div>
          <div className="marquee-content" style={{ animationDuration: 'var(--marquee-speed, 20s)' }}>
            * HACKDAYS 4.0 IS HERE * ASSEMBLE YOUR TEAM * CODE THE FUTURE * WIN EXCITING PRIZES * HACKDAYS 4.0 IS HERE * ASSEMBLE YOUR TEAM * CODE THE FUTURE * WIN EXCITING PRIZES *&nbsp;
          </div>
        </div>

        {/* Events Arena */}
        <section id="events" className="marvel-section">
          <div className="section-bg-layer bg-comic-grid"></div>
          <div className="container" style={{ position: 'relative', zIndex: 5 }}>
            <div className="section-title yellow">
              <h2>EVENTS ARENA</h2>
              <StarSVG style={{ top: '-10px', right: '-20px', fill: '#e62429' }} />
            </div>

            <div className="events-creative-grid">
              {creativeEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="creative-event-card"
                  style={{ '--rot': evt.rotation }}
                  onClick={() => setActiveCategory(evt)}
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <div className="bg-layer" style={{ backgroundImage: `url(${evt.bg})` }}></div>
                  <div className="content-layer">
                    <h3>{evt.title}</h3>
                    <p>{evt.list}</p>
                  </div>
                  <div className="exclamation-pop">{evt.exclaim}</div>
                  <div className="bubble-tail"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S.H.I.E.L.D. Leadership Dossiers */}
        <section id="leadership" className="marvel-section">
          <div className="section-bg-layer bg-stark-blueprint"></div>
          <div className="container relative z-10">
            <div className="section-title">
              <h2 style={{ background: '#00aaff', color: '#fff' }}>S.H.I.E.L.D. COMMAND</h2>
              <div className="action-bubble bubble-zap" style={{ top: '-40px', right: '-20px' }}>ENCRYPTED</div>
            </div>

            <div className="leadership-dossier-grid">
              {leadership.map((leader, idx) => (
                <div key={idx} className="leadership-card dossier-container">
                  <div className="dossier-edge"></div>
                  <div className="dossier-content">
                    <div className="dossier-header">
                      <div className="clearance-tag">{leader.clearance}</div>
                      <div className="id-tab">ID: {leader.id}</div>
                    </div>

                    <div className="dossier-body">
                      <div className="leader-portrait-hud">
                        <div className="hud-ring"></div>
                        <img src={leader.portrait} alt={leader.name} className="leader-img" loading="lazy" onError={(e) => e.target.src = "https://ui-avatars.com/api/?name=" + leader.name + "&background=001f3f&color=fff"} />
                        <div className="hud-scanline"></div>
                      </div>
                      <div className="leader-text">
                        <div className="msg-quote">"</div>
                        <p className="leader-msg">{leader.msg}</p>
                        <div className="leader-bio">
                          <h3 className="leader-name">{leader.name}</h3>
                          <p className="leader-role">{leader.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="feedback" className="marvel-section">
          <div className="section-bg-layer bg-comic-halftone"></div>
          <div className="container relative z-10">
            <div className="section-title blue">
              <h2>CITIZEN REPORTS</h2>
              <div className="action-bubble bubble-zap" style={{ top: '-40px', left: '-20px' }}>THWIP!</div>
            </div>

            <div className="citizen-reports-grid">
              {testimonials.map((t, idx) => (
                <div key={idx} className={`citizen-bubble-card color-${t.color}`}>
                  <div className="bubble-sound-effect">{t.sound}</div>
                  <div className="bubble-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < t.rating ? 'active' : ''}`}>★</span>
                    ))}
                  </div>
                  <p className="bubble-text">"{t.text}"</p>
                  <div className="bubble-author">
                    <div className="author-avatar"><User size={24} /></div>
                    <div className="author-info">
                      <div className="author-name">{t.name}</div>
                      <div className="author-mission">MISSION: HD {t.year}</div>
                    </div>
                  </div>
                  <div className="bubble-tail"></div>
                </div>
              ))}
            </div>

            <div className="feedback-cta-container">
              <MagneticButton className="comic-button yellow large-btn btn-hero" onClick={() => {
                new Audio("/Voicy_At Your Service Sir.mp3").play().catch(e => console.log(e));
                alert("TRANSMITTING YOUR STORY TO HQ...");
              }}>JOIN THE LEGACY! SHARE YOUR STORY</MagneticButton>
            </div>
          </div>
        </section>

        {/* DANGER ZONE - SYSTEM COMPROMISED */}
        <section className="danger-zone-parallax">
          <div className="danger-alert-tape">
            <span>DANGER - BUGS DETECTED - DANGER - BUGS DETECTED - DANGER - BUGS DETECTED</span>
            <span>DANGER - BUGS DETECTED - DANGER - BUGS DETECTED - DANGER - BUGS DETECTED</span>
          </div>
          <div className="danger-window-overlay">
            <div className="danger-content-box">
              <div className="danger-header">
                <AlertTriangle className="alarm-icon-flash" />
                <span>SYSTEM STATUS: INFILTRATED</span>
                <AlertTriangle className="alarm-icon-flash" />
              </div>
              <h2 className="danger-main-title">CORE DATA CORRUPTED!!!</h2>
              <p className="danger-subtitle">"AVENGERS ARE OFFLINE! IT'S UP TO YOU, BUG-HUNTER! THWIP THE THREATS!"</p>

              <div className="game-wrapper-parallax">
                <Suspense fallback={<div>INITIATING BUG HUNTER...</div>}>
                  <BugHunter />
                </Suspense>
              </div>

              <div className="danger-footer">CLICK THE BUGS TO KILL THEM! DATA THEFT AT 94%...</div>
            </div>
          </div>
          <div className="danger-alert-tape bottom">
            <span>SYSTEM BREACH - HERO REQUIRED - SYSTEM BREACH - HERO REQUIRED - SYSTEM BREACH</span>
            <span>SYSTEM BREACH - HERO REQUIRED - SYSTEM BREACH - HERO REQUIRED - SYSTEM BREACH</span>
          </div>
        </section>

        {/* Committee Section - Consolidated Marvel Panel Layout */}
        <section id="committee" className="marvel-section">
          <div className="section-bg-layer bg-comic-grid"></div>
          <div className="container" style={{ position: 'relative', zIndex: 5 }}>
            <div className="section-title red">
              <h2>THE ASSEMBLED TEAM</h2>
              <div className="action-bubble bubble-zap" style={{ top: '-40px', right: '-20px' }}>ASSEMBLE!</div>
            </div>

            <div className="committee-panel-grid">
              {committeeMembers.map((group, gIdx) => (
                <div key={gIdx} className={`committee-division-panel panel-${group.color} comic-box`}>
                  <div className="panel-header">
                    <span className="division-slug">{group.division}</span>
                    <h3 className="division-role">{group.role}</h3>
                  </div>
                  <div className="members-list">
                    {group.members.map((m, mIdx) => (
                      <div key={mIdx} className="member-item group relative">
                        <div className="member-info">
                          <span className="member-name">{m.name}</span>

                          {/* Creative Character Intel Pop-over */}
                          {m.photo && (
                            <div className="character-popover">
                              <div className="comic-intel-card">
                                <div className="intel-header">CHARACTER DATA: {group.division}</div>
                                <div className="intel-image-frame dot-matrix">
                                  <img src={m.photo} alt={m.name} loading="lazy" />
                                  <div className="onomatopoeia-zap">ZAP!</div>
                                </div>
                                <div className="intel-footer">
                                  <span className="intel-name">{m.name}</span>
                                  <div className="intel-stats">
                                    <div className="stat-label">SKILL_RANK</div>
                                    <div className="stat-bar"><div className="stat-fill" style={{ width: '94%' }}></div></div>
                                    <div className="stat-label">ENERGY_LEVEL</div>
                                    <div className="stat-bar"><div className="stat-fill" style={{ width: '88%' }}></div></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="member-socials">
                          <a href={m.github} target="_blank" rel="noreferrer" className="social-icon github"><Code size={16} title="Github" /></a>
                          <a href={m.linkedin} target="_blank" rel="noreferrer" className="social-icon linkedin"><Globe size={16} title="LinkedIn" /></a>
                          <a href={m.insta} target="_blank" rel="noreferrer" className="social-icon insta"><Camera size={16} title="Instagram" /></a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="panel-pop-label">HD 4.0</div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Sponsors Section */}
        <section id="sponsors" className="marvel-section">
          <div className="section-bg-layer bg-marvel-red"></div>
          <div className="container" style={{ position: 'relative', zIndex: 5 }}>
            <div className="section-title blue">
              <h2>OUR SPONSORS</h2>
            </div>

            <div className="sponsor-tier yellow">
              <div style={{ textAlign: 'center' }}>
                <h3>TITLE & CO-SPONSORS</h3>
              </div>
              <div className="sponsor-boxes" style={{ alignItems: 'center' }}>
                {/* <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--marvel-red)', textShadow: '2px 2px 0 var(--black)', fontFamily: 'var(--font-heading)', background: 'var(--marvel-yellow)', padding: '1rem 3rem', border: '4px solid var(--black)', transform: 'rotate(-2deg)', boxShadow: '6px 6px 0 var(--black)', marginRight: '1rem' }}>
                  Revealing soon !
                </div> */}
                <div className="sponsor-box small">
                  <img src="/kuhipaat.jpg" alt="Kuhipaat communication" className="sponsor-logo" />
                  <span className="sponsor-name">Kuhipaat Communication (Co-sponsor)</span>
                </div>
              </div>
            </div>

            <div className="sponsor-tier red">
              <div style={{ textAlign: 'center' }}>
                <h3>PARTNERS & COLLABORATORS</h3>
              </div>
              <div className="sponsor-boxes">
                <div className="sponsor-box small">
                  <img src="/.xyz.png" alt=".XYZ Domain" className="sponsor-logo" />
                  <span className="sponsor-name">.xyz (Domain Partner)</span>
                </div>
                <div className="sponsor-box small">
                  <img src="/web3assam_logo.jpg" alt="Web3Assam" className="sponsor-logo" />
                  <span className="sponsor-name">Web3Assam (Community Partner)</span>
                </div>
                <div className="sponsor-box small">
                  <img src="/frint.webp" alt="Frint.in" className="sponsor-logo" />
                  <span className="sponsor-name">Frint.in (Hiring Partner)</span>
                </div>
                <div className="sponsor-box small">
                  <img src="/api_community.jpg" alt="The API Community" className="sponsor-logo" />
                  <span className="sponsor-name">The API Community (Community Partner)</span>
                </div>
                <div className="sponsor-box small">
                  <img src="/nexus.png" alt="NSOC" className="sponsor-logo" />
                  <span className="sponsor-name">NSOC (Community Partner)</span>
                </div>
                <div className="sponsor-box small">
                  <img src="/gfg_campusbody.jpg" alt="GeeksforGeeks Campus Body GU" className="sponsor-logo" />
                  <span className="sponsor-name">GeeksforGeeks Campus GU (Community Partner)</span>
                </div>
                <div className="sponsor-box small">
                  <img src="/gdgoc.jpg" alt="GDGOC GU" className="sponsor-logo" />
                  <span className="sponsor-name">GDGOC GU (Community Partner)</span>
                </div>
                <div className="sponsor-box small">
                  <img src="/gmc.png" alt="Give My Certificate" className="sponsor-logo" />
                  <span className="sponsor-name">Give My Certificate (Certification Partner)</span>
                </div>
                {/* <div className="sponsor-box small">
                  <img src="https://placehold.co/200x200/ffffff/000000?text=GDG+Guwahati" alt="GDG Guwahati" className="sponsor-logo" />
                  <span className="sponsor-name">GDG Guwahati (Community Partner)</span>
                </div> */}
              </div>
            </div>

            <div className="sponsor-tier blue">
              <div style={{ textAlign: 'center' }}>
                <h3>IN-KIND, MEDIA & ENTERTAINMENT</h3>
              </div>
              <div className="sponsor-boxes">
                <div className="sponsor-box small">
                  <img src="/GeeksForGeeks_logo.png" alt="GeeksForGeeks" className="sponsor-logo" />
                  <span className="sponsor-name">GeeksForGeeks (In-Kind Sponsor)</span>
                </div>
                <div className="sponsor-box small">
                  <img src="/gplus.png" alt="Gplus" className="sponsor-logo" />
                  <span className="sponsor-name">Gplus (Media Partner)</span>
                </div>
                <div className="sponsor-box small">
                  <img src="/knox.jpg" alt="Knox" className="sponsor-logo" />
                  <span className="sponsor-name">Knox (Entertainment Partner)</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>WANT TO SPONSOR HACKDAYS?</p>
              <button className="comic-button red">SPONSOR US</button>
            </div>
          </div>
        </section>


        {/* Multiverse Gallery Section */}
        <section id="gallery" className="marvel-section bg-deep-space">
          <div className="section-bg-layer bg-halftone-dots"></div>
          <div className="container relative z-10">
            <div className="section-title yellow mb-12">
              <h2>MULTIVERSE GALLERY</h2>
              <div className="action-bubble bubble-pow" style={{ top: '-40px', left: '-20px' }}>POW!</div>
            </div>

            {/* HACKATHON CATEGORY */}
            <div className="gallery-category-header">
              <div className="comic-label-tag">[ THE HACKATHONS ]</div>
            </div>
            <div className="gallery-masonry-grid mb-16">
              {galleryPhotos.filter(p => p.category === 'hackathon').map(photo => (
                <TradingCard key={photo.id} photo={photo} onOpen={(p) => setSelectedGallery(p)} />
              ))}
            </div>


            {/* WORKSHOPS CATEGORY */}
            <div className="gallery-category-header">
              <div className="comic-label-tag yellow-tag">[ THE WORKSHOPS ]</div>
              <div className="action-bubble bubble-zap" style={{ top: '-10px', right: '-10px' }}>ZAP!</div>
            </div>
            <div className="gallery-masonry-grid mb-16">
              {galleryPhotos.filter(p => p.category === 'workshops').map(photo => (
                <TradingCard key={photo.id} photo={photo} onOpen={(p) => setSelectedGallery(p)} />
              ))}
            </div>

            {/* VICTORS CATEGORY */}
            <div className="gallery-category-header">
              <div className="comic-label-tag blue-tag">[ THE VICTORS ]</div>
              <div className="action-bubble bubble-win" style={{ top: '-20px', left: '50%' }}>WIN!</div>
            </div>
            <div className="gallery-masonry-grid">
              {galleryPhotos.filter(p => p.category === 'victors').map(photo => (
                <TradingCard key={photo.id} photo={photo} onOpen={(p) => setSelectedGallery(p)} />
              ))}
            </div>
          </div>
        </section>

        {/* Stark-HUD Lightbox */}
        <AnimatePresence>
          {selectedGallery && (
            <motion.div
              className="stark-hud-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="hud-blur-overlay" onClick={() => setSelectedGallery(null)}></div>
              <motion.div
                className="hud-zoom-container"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
              >
                <div className="hud-frame" style={{ position: 'relative', overflow: 'hidden' }}>
                  <div className="hud-corner top-left"></div>
                  <div className="hud-corner top-right"></div>
                  <div className="hud-corner bottom-left"></div>
                  <div className="hud-corner bottom-right"></div>
                  <img src={selectedGallery.src} alt="Zoomed Asset" className="hud-full-image" loading="eager" />
                  <div className="hud-scanner-line"></div>
                  <div className="hud-metadata">
                    <div>SCANNING OBJECT: MISSION_3.0_RECAP</div>
                    <div>COORDINATES: GAUHATI_UNIVERSITY_IT_DEPT</div>
                    <div>STATUS: LEGENDARY_ARCHIVE</div>
                  </div>
                  <button className="hud-close-btn" onClick={() => setSelectedGallery(null)}>&times;</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Merch Marquee */}
        <div className="marquee-container" style={{ background: '#e62429', color: '#fff' }}>
          <div className="marquee-content" style={{ animationDuration: '25s' }}>
            * GET YOUR AWESOME MERCH * EXCLUSIVE DESIGNS * LIMITED EDITION * GET YOUR AWESOME MERCH * EXCLUSIVE DESIGNS * LIMITED EDITION *&nbsp;
          </div>
          <div className="marquee-content" style={{ animationDuration: '25s' }}>
            * GET YOUR AWESOME MERCH * EXCLUSIVE DESIGNS * LIMITED EDITION * GET YOUR AWESOME MERCH * EXCLUSIVE DESIGNS * LIMITED EDITION *&nbsp;
          </div>
        </div>

        {/* Merch Store */}
        <section id="merch" className="marvel-section">
          <div className="section-bg-layer bg-marvel-yellow"></div>
          <div className="container" style={{ position: 'relative', zIndex: 5 }}>
            <div className="section-title">
              <h2 style={{ background: '#fff' }}>MERCH STORE</h2>
            </div>

            <div className="merch-items-grid">
              {merch.map((item, idx) => (
                <div key={idx} className="comic-box merch-card stable-card" style={{ flex: '1 0 320px' }}>
                  <div className="merch-top-interactive group" style={{ minHeight: '380px' }}>
                    {/* Image Swap Layer */}
                    <div className="merch-img-container">
                      <img src={item.image} alt={item.title} className="merch-img front-img" loading="lazy" />
                      <img src={item.backImage} alt={`${item.title} Back`} className="merch-img back-img" loading="lazy" />
                    </div>

                    {/* Labels should stay on top of the image but stable */}
                    <div className={`urgency-banner`}>{item.urgency}</div>
                    <div className="discount-tag">{item.discount}</div>
                    <div className="reveal-hint-overlay">REVEALING BACKSIDE...</div>
                  </div>

                  <div className="merch-bottom">
                    <h4>{item.title}</h4>
                    <div className="price-container">
                      <span className="original-price">{item.originalPrice}</span>
                      <span className="price">{item.price}</span>
                    </div>
                    <a href='https://docs.google.com/forms/d/e/1FAIpQLScwF_1m1UZg2CBN7yHwR0wR20Gy2ZHzEd4GVTQ3ardQZADcmg/viewform?usp=header' target="_blank" rel="noopener noreferrer"> <button className="comic-button btn-red" style={{ width: '100%' }}>BUY NOW</button></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="marvel-section">
          <div className="section-bg-layer bg-solid-black"></div>
          <div className="container" style={{ position: 'relative', zIndex: 5 }}>
            <div className="footer-grid">
              <div>
                <div className="footer-logo">HACKDAYS 4.0</div>
                <p style={{ opacity: 0.7, marginTop: '1rem', fontFamily: 'var(--font-body)' }}>Code, Build, Create. Join the biggest hackathon of the year and show your marvel powers.</p>

              </div>

              <div>
                <div className="footer-links">
                  <h4>QUICK LINKS</h4>
                  <ul style={{ fontFamily: 'var(--font-body)' }}>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Events</a></li>
                    <li><a href="#">Sponsors</a></li>
                    <li><a href="#">Merch Store</a></li>

                  </ul>
                </div>
              </div>

              <div>
                <div className="footer-links">
                  <h4>SOCIALS</h4>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <a
                      href="https://www.instagram.com/_hackdays_?igsh=MTFrdm5rb29lOWs5dg%3D%3D"
                      target="_blank" rel="noreferrer"
                      className="footer-social-btn"
                      style={{
                        width: '45px', height: '45px', background: 'var(--marvel-red)',
                        border: '3px solid white', display: 'flex', justifyContent: 'center',
                        alignItems: 'center', transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        color: 'white', fontWeight: 'bold'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.2) rotate(-5deg)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) rotate(0deg)'; }}
                    >
                      IG
                    </a>
                    <a
                      href="https://x.com/_HackDays_?t=PTs5CHJUMF5BQtvVQP7VOA&s=09"
                      target="_blank" rel="noreferrer"
                      className="footer-social-btn"
                      style={{
                        width: '45px', height: '45px', background: 'var(--marvel-blue)',
                        border: '3px solid white', display: 'flex', justifyContent: 'center',
                        alignItems: 'center', transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        color: 'white', fontWeight: 'bold'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.2) rotate(5deg)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) rotate(0deg)'; }}
                    >
                      X
                    </a>
                    <a
                      href="https://www.linkedin.com/company/hack-days-2-0/"
                      target="_blank" rel="noreferrer"
                      className="footer-social-btn"
                      style={{
                        width: '45px', height: '45px', background: 'var(--marvel-yellow)',
                        border: '3px solid white', display: 'flex', justifyContent: 'center',
                        alignItems: 'center', transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        color: 'black', fontWeight: 'bold'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.2) rotate(-10deg)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) rotate(0deg)'; }}
                    >
                      LI
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '2rem 0', borderTop: '2px solid rgba(255,255,255,0.1)', opacity: 0.8, fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#fff' }}>
              <p>&copy; Designed By Tinku & Rishikul ; 2026 HACKDAYS PORT. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Comic Elements Navigation (Desktop Only) */}
      {!isMobile && (
        <>
          <div className="floating-comic-nav nav-origin-story" onClick={() => setShowOriginStory(true)}>
            <div className="narrator-box">HERE WE GO AGAIN...</div>
          </div>
          <div className="floating-comic-nav nav-signal" onClick={() => setCommsOverlayOpen(true)}>
            <div className="uplink-label"></div>
            <div className="uplink-circle">
              <div className="uplink-glow"></div>
              <Wifi size={24} color="#fff" />
            </div>
          </div>
        </>
      )}

      {showOriginStory && (
        <div className="origin-story-modal-wrapper">
          <div className="origin-story-container">
            {/* Panel 1: THE LEGACY */}
            <div className="comic-panel-3d panel-legacy">
              <div className="comic-panel-inking-overlay" />
              <div className="panel-content-depth">
                <div className="narrator-title-box">THE LEGACY</div>
                <h3 className="comic-panel-header">GUWAHATI, 1948:<br />THE FOUNDATION.</h3>
                <div className="narrator-body-box">
                  <p>Established as the oldest sentinel of education in NE India. Bordered by the Brahmaputra, this A+ Grade NAAC powerhouse (CGPA 3.32) manages 350+ colleges across 7 faculties.</p>
                </div>
                <div className="iso-seal-pulse">
                  <div className="iso-circle">ISO 9001:2015</div>
                </div>
              </div>
            </div>

            {/* Panel 2: THE LAB */}
            <div className="comic-panel-3d panel-lab">
              <div className="comic-panel-inking-overlay" />
              <div className="panel-content-depth">
                <div className="narrator-title-box lab-header">THE LAB</div>
                <h3 className="comic-panel-header">2009:<br />THE NEURAL CENTER.</h3>
                <div className="narrator-body-box">
                  <p>The Department ofInformation Technology under the Faculty of Technology, Gauhati University has been established in the year 2009 for different Undergraduate, Postgraduate and Research programmes in the field of Computer and Information Technologies..</p>
                  <div className="binary-glitch-text">
                    [ <span className="glitch-active">Dept. of IT</span> ]
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 3: THE EVOLUTION */}
            <div className="comic-panel-3d panel-evolution">
              <div className="comic-panel-inking-overlay" />
              <div className="panel-content-depth">
                <div className="narrator-title-box evolution-header">THE EVOLUTION</div>
                <h3 className="comic-panel-header">FROM SPARK TO<br />SUPERNOVA.</h3>
                <div className="narrator-body-box">
                  <p>A premier 3-day tech odyssey of hackathons and innovation. Rooted in the <strong>Utkranti</strong> legacy (2018-21) and rebranded in 2023, HackDays has evolved into Gauhati University's flagship TechFest. Now, <strong>HackDays 4.0</strong> is here to push the boundaries of real-world problem solving.</p>
                </div>
                <div className="evolution-timeline-container">
                  <div className="power-bar-track">
                    <div className="power-bar-fill" />
                  </div>
                  <div className="timeline-labels">
                    <span className="year-2018">2018</span>
                    <span className="year-2023">2023</span>
                    <span className="year-2026 active">2026</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="origin-story-close-btn" onClick={() => setShowOriginStory(false)}>
              <div className="xforce-icon-implode">
                <X size={40} color="#fff" strokeWidth={5} />
              </div>
            </button>

            <div className="mission-action-bubble">
              MISSION: EMPOWER. LEARN. BUILD.
            </div>
          </div>
        </div>
      )}

      {commsOverlayOpen && (
        <div className="comms-overlay-wrapper" onClick={() => setCommsOverlayOpen(false)}>
          <div className="comms-data-panels mobile-full-panel" onClick={e => e.stopPropagation()}>
            <div className="comms-mobile-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="matrix-status">STATUS: ONLINE</div>
              <button
                className="comms-close-action"
                onClick={() => setCommsOverlayOpen(false)}
                style={{ background: '#ff3131', color: '#fff', border: '2px solid #000', padding: '5px 15px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', boxShadow: '4px 4px 0 #000' }}
              >✕ ABORT</button>
            </div>


            <div className="comms-panel panel-1">
              <div className="comms-panel-header">NAVIGATION_MATRIX</div>
              <div className="comms-panel-body mobile-links">
                {['HOME', 'EVENTS', 'SPONSORS', 'COMMITTEE', 'MERCH'].map(item => (
                  <button key={item} className="mobile-link-btn" onClick={() => { scrollToSection(item.toLowerCase()); setCommsOverlayOpen(false); }}>{item}</button>
                ))}
                <button className="mobile-link-btn villain-toggle-btn" onClick={() => { toggleVillain(); setCommsOverlayOpen(false); }}>
                  {isVillainMode ? 'HERO MODE' : 'VILLAIN MODE'}
                </button>
              </div>
            </div>

            <div className="comms-panel panel-2">
              <div className="comms-panel-header">SECURE CHANNEL</div>
              <div className="comms-panel-body">
                <a href="mailto:hackdays4.0@gmail.com" className="comms-link">hackdays4.0@gmail.com //// [EMAIL_ADDRESS]</a>
                <a href="tel:+916901523636" className="comms-link">+91 6901523636/////[Call AVENGERS]</a>
                <a href="tel:+916901523636" className="comms-link">Department of IT, GU////[ZONE]</a>
              </div>
            </div>

            <button className="xforce-close-btn" onClick={() => setCommsOverlayOpen(false)}>
              <div className="xforce-icon"><X size={32} strokeWidth={4} /></div>
              <span>RETURN_TO_BASE</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Stark Industries Logo Button (Desktop Only) */}
      {!isMobile && (
        <div
          className="stark-logo-trigger"
          onClick={() => {
            setShowStarkBubble(false);
            setSecretUnlocked(true);
            new Audio("/Voicy_Jarvis Start Up.mp3").play().catch(e => console.log("Audio play blocked", e));
          }}
        >
          {/* Dialogue Bubble */}
          {showStarkBubble && (
            <div className="stark-dialogue-bubble">
              {starkBubbleMsg}
              <div className="stark-bubble-pointer" />
            </div>
          )}
          <div className="stark-logo-inner">
            <svg viewBox="0 0 100 100" width="50" height="50">
              <polygon points="50,5 61,35 95,35 68,55 78,90 50,68 22,90 32,55 5,35 39,35" fill="none" stroke="currentColor" strokeWidth="3" />
              <text x="50" y="58" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="bold" fontFamily="monospace">S.I</text>
            </svg>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM GLASS NAVBAR removed in favor of MobileAppNav */}


      {secretUnlocked && (
        <Suspense fallback={null}>
          <StarkOSTerminal
            onClose={() => setSecretUnlocked(false)}
            onVillainMode={() => { if (!isVillainMode) toggleVillain(); }}
            onLocateEvents={() => {
              setSecretUnlocked(false);
              setTimeout(() => {
                const el = document.getElementById('events');
                if (el) {
                  el.classList.add('target-highlight');
                  el.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => el.classList.remove('target-highlight'), 3000);
                }
              }, 300);
            }}
            onHackPrizes={() => {
              // Briefly glitch prize numbers
              const priceEls = document.querySelectorAll('.price');
              priceEls.forEach(el => {
                const original = el.textContent;
                el.textContent = '₹99,999,999';
                el.style.color = '#ff3131';
                setTimeout(() => { el.textContent = original; el.style.color = ''; }, 2000);
              });
            }}
            onSudoRegister={() => {
              setSecretUnlocked(false);
              setTimeout(() => {
                const el = document.getElementById('events');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }}
          />
        </Suspense>
      )}

      {/* Category Selection Modal */}
      {activeCategory && (
        <div className="comic-modal-overlay" onClick={() => setActiveCategory(null)}>
          <div className="comic-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="comic-modal-close" onClick={() => setActiveCategory(null)}>X</button>
            <div className="modal-header">
              <h2>{activeCategory.title}</h2>
              <div className="modal-exclaim">{activeCategory.exclaim}</div>
            </div>

            <div className="modal-subevents-grid">
              {activeCategory.subEvents.map(sub => (
                <div key={sub.id} className="sub-event-card comic-box">
                  <div className="sub-event-img" style={{ backgroundImage: `url(${sub.image})` }}></div>
                  <div className="sub-event-info">
                    <h4>{sub.title}</h4>
                    <div className="sub-event-actions">
                      <button className="comic-button yellow btn-small" onClick={() => {
                        new Audio("/Voicy_At Your Service Sir.mp3").play().catch(e => console.log(e));
                        setSelectedSubEvent(sub);
                      }}>VIEW INTEL</button>
                      <a href={sub.link} target="_blank" rel="noreferrer" className="comic-button red btn-small" onClick={() => {
                        new Audio("/Voicy_At Your Service Sir.mp3").play().catch(e => console.log(e));
                      }}>REGISTER</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Event Detail "Intel Dossier" Modal */}
      <AnimatePresence>
        {selectedSubEvent && (
          <motion.div
            className="intel-dossier-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSubEvent(null)}
          >
            <motion.div
              className="dossier-file-content"
              initial={{ scale: 0.9, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dossier-top-secret-label">CLASSIFIED INTEL</div>

              <div className="dossier-inner">
                <div className="dossier-header-flex">
                  <div className="dossier-image-frame">
                    <img src={selectedSubEvent.image} alt={selectedSubEvent.title} />
                    <div className="topographic-overlay"></div>
                  </div>
                  <div className="dossier-title-block">
                    <h1>MISSION: {selectedSubEvent.title.toUpperCase()}</h1>
                    <div className="dossier-clearance">CLEARANCE: OMEGA-LEVEL</div>
                    <div className="dossier-id">ID_HASH: {selectedSubEvent.id}_X82</div>
                  </div>
                </div>

                <div className="dossier-body-grid">
                  <div className="dossier-section">
                    <h3>[ 01. THE REWARD ]</h3>
                    <div className="prize-burst-text">{selectedSubEvent.prizes || 'TBA'}</div>
                  </div>

                  <div className="dossier-section">
                    <h3>[ 02. PROTOCOLS / RULES ]</h3>
                    <p>{selectedSubEvent.rules || 'Standard Mission rules apply.'}</p>
                  </div>

                  <div className="dossier-section full-width">
                    <h3>[ 03. MISSION PROCESS ]</h3>
                    <div className="process-steps">
                      {selectedSubEvent.process || 'Engage, build, and conquer.'}
                    </div>
                  </div>
                </div>

                <div className="dossier-footer">
                  <button className="comic-button red" onClick={() => setSelectedSubEvent(null)}>ABORT MISSION</button>
                  <a href={selectedSubEvent.link} target="_blank" rel="noreferrer" className="comic-button yellow" onClick={() => {
                    new Audio("/Voicy_At Your Service Sir.mp3").play().catch(e => console.log(e));
                  }}>EXECUTE REGISTRATION</a>
                </div>
              </div>

              <div className="dossier-stamp">HACKDAYS // 2026</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Suspense>
  );
}

export default App;
