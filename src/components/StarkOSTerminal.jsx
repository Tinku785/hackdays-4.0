import { useState, useEffect, useRef } from 'react';

const BotTypewriter = ({ text, delay = 15, onStart, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const started = useRef(false);

  useEffect(() => {
    if (!started.current) {
      onStart?.();
      started.current = true;
    }

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]); // Removed dependency on onStart/onComplete to prevent re-runs

  return <span style={{ whiteSpace: 'pre-wrap' }}>{displayedText}</span>;
};

const StarkOSTerminal = ({ onClose, onVillainMode, onLocateEvents, onHackPrizes, onSudoRegister }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'S.T.A.R.K O.S v4.0 INITIALIZED.\nALL SYSTEMS NOMINAL. BIOMETRIC SCAN CONTINUOUS.\nWELCOME, AUTHORIZED OPERATOR.', type: 'system' },
    { sender: 'bot', text: 'TYPE "help" FOR AVAILABLE COMMANDS.', type: 'info' }
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [scanActive, setScanActive] = useState(false);
  const [activeTypingCount, setActiveTypingCount] = useState(0);
  
  const endOfMessagesRef = useRef(null);
  const inputRef = useRef(null);
  const outputAudioRef = useRef(null);
  const blipAudioRef = useRef(null);

  useEffect(() => {
    if (!outputAudioRef.current) {
      outputAudioRef.current = new Audio('/output.mp3');
      outputAudioRef.current.loop = true;
      outputAudioRef.current.volume = 0.4;
    }
    if (!blipAudioRef.current) {
      blipAudioRef.current = new Audio('/driken5482-retro-blip-2-236668.mp3');
      blipAudioRef.current.volume = 0.2;
    }

    if (activeTypingCount > 0) {
      outputAudioRef.current.play().catch(() => {});
    } else {
      outputAudioRef.current.pause();
      outputAudioRef.current.currentTime = 0;
    }

    return () => {
      if (outputAudioRef.current) outputAudioRef.current.pause();
    };
  }, [activeTypingCount]);

  useEffect(() => {
    const iv = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const playBlip = () => {
    if (blipAudioRef.current) {
      blipAudioRef.current.currentTime = 0;
      blipAudioRef.current.play().catch(() => {});
    }
  };

  const addMsg = (text, sender = 'bot', type = 'response') => {
    setMessages(prev => [...prev, { sender, text, type }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(nextIdx);
        setInput(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(history[history.length - 1 - nextIdx]);
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
    } else if (e.key !== 'Enter') {
      playBlip();
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    addMsg(userMsg, 'user', 'command');
    setHistory(prev => [...prev, userMsg]);
    setHistoryIdx(-1);
    setInput('');

    const cmd = userMsg.toLowerCase().trim();

    setTimeout(() => {
      if (cmd === 'help') {
        addMsg('AVAILABLE COMMANDS:\n  help — Show this list\n  locate --events — Arena targeting\n  hack --prizes — Prize pool access\n  sudo register — Registry protocol\n  villain_mode --on — ⚠ SYSTEM BREACH\n  protocol --shield — Activate defenses\n  jarvis — Talk to the A.I.\n  whoami — Operator profile\n  sysinfo — Deep diagnostics\n  matrix — Wake up, Neo\n  armor --vision — HUD overlay test\n  status — Quick diagnostics\n  clear — Wipe terminal', 'bot', 'help');
      } else if (cmd === 'jarvis') {
        const quotes = [
          "Always a pleasure working with you, sir.",
          "The house is clean, the suits are polished. What's next?",
          "I've calculated the probability of failure. It is significantly low.",
          "Sir, I've prepared the registration protocols. You might want to take a look."
        ];
        addMsg('JARVIS: ' + quotes[Math.floor(Math.random() * quotes.length)], 'bot', 'success');
      } else if (cmd === 'whoami') {
        addMsg('PROFILE: AUTHORIZED HACKER\nCLEARANCE: LEVEL 7\nSTATUS: ACTIVE\nLOCATION: HACKDAYS 4.0 HQ', 'bot', 'info');
      } else if (cmd === 'sysinfo') {
        addMsg('OS: STARK-OS v4.0.2\nKERNEL: ARC-CORE-9000\nCPU: ARC-X64 HOLOGRAPHIC\nMEMORY: 128TB TBP (TERA-BIT-PROTON)\nNETWORK: SECURE SATELLITE LINK [ACTIVE]', 'bot', 'system');
      } else if (cmd === 'matrix') {
        addMsg('FOLLOW THE WHITE RABBIT...', 'bot', 'success');
        document.body.classList.add('matrix-glitch');
        setTimeout(() => document.body.classList.remove('matrix-glitch'), 2000);
      } else if (cmd === 'armor --vision') {
        addMsg('HUD CALIBRATION INITIATED...', 'bot', 'warning');
        setScanActive(true);
        setTimeout(() => setScanActive(false), 2000);
      } else if (cmd === 'locate --events') {
        addMsg('🎯 TARGETING ARENA... REDIRECTING HUD.', 'bot', 'success');
        setTimeout(() => onLocateEvents?.(), 800);
      } else if (cmd === 'hack --prizes') {
        addMsg('⚡ OVERRIDING SECURITY... PRIZES ACCESSED.', 'bot', 'warning');
        setTimeout(() => onHackPrizes?.(), 600);
      } else if (cmd === 'sudo register') {
        addMsg('🔴 INITIATING BIOMETRIC SCAN...', 'bot', 'scan');
        setScanActive(true);
        setTimeout(() => {
          setScanActive(false);
          addMsg('✅ VERIFIED. REDIRECTING...', 'bot', 'success');
          setTimeout(() => onSudoRegister?.(), 800);
        }, 2000);
      } else if (cmd === 'villain_mode --on') {
        addMsg('⚠ WARNING: UNAUTHORIZED SHUTDOWN... SYMBIO-VIRUS DETECTED!', 'bot', 'danger');
        setTimeout(() => onVillainMode?.(), 1500);
      } else if (cmd === 'protocol --shield') {
        addMsg('🛡 INITIATING SHIELD PROTOCOL... ARMOR PLATING DEPLOYED.', 'bot', 'info');
        document.body.classList.add('shield-active');
        setTimeout(() => document.body.classList.remove('shield-active'), 5000);
      } else if (cmd === 'status') {
        addMsg('SYSTEM STATUS: 100% OPERATIONAL\nTHREAT LEVEL: NEGLIGIBLE', 'bot', 'info');
      } else if (cmd === 'clear') {
        setMessages([{ sender: 'bot', text: 'TERMINAL FLUSHED.', type: 'system' }]);
      } else {
        addMsg(`STARK-OS: "${userMsg}" IS NOT A RECOGNIZED COMMAND.`, 'bot', 'error');
      }
    }, 300);
  };

  const getColor = (type) => {
    const colors = { system: '#00d4ff', info: '#00d4ff', help: '#00aaff', success: '#39ff14', warning: '#ffde59', danger: '#ff3131', error: '#ff6b6b', command: '#0ff', response: 'limegreen', scan: '#ff3131' };
    return colors[type] || 'limegreen';
  };

  return (
    <>
      {scanActive && <div className="biometric-scan-overlay"><div className="scan-line" /></div>}
      <div className="ar-hud-overlay" onClick={onClose}>
        <div className="hex-grid-bg" />
        <div className="stark-terminal" onClick={e => e.stopPropagation()}>
          <div className="stark-terminal-header">
            <div className="hud-dot green" /><div className="hud-dot yellow" /><div className="hud-dot red" onClick={onClose} />
            <span className="hud-title">STARK-OS // HACKDAYS MAINFRAME v4.0</span>
            <button className="hud-close" onClick={onClose}>×</button>
          </div>
          <div className="stark-terminal-body" onClick={() => inputRef.current?.focus()}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`hud-msg ${msg.sender}`} style={{ color: getColor(msg.type) }}>
                <span className="hud-prefix">{msg.sender === 'user' ? 'OPERATOR>' : 'STARK-OS>'}</span>
                {msg.sender === 'bot' ? (
                  <BotTypewriter
                    text={msg.text}
                    onStart={() => setActiveTypingCount(prev => prev + 1)}
                    onComplete={() => setActiveTypingCount(prev => Math.max(0, prev - 1))}
                  />
                ) : (
                  <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                )}
              </div>
            ))}
            <div ref={endOfMessagesRef} />
          </div>
          <form onSubmit={handleSend} className="stark-terminal-input">
            <span className="hud-caret">{'>'}</span>
            <input
              ref={inputRef}
              type="text" value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter command..."
              autoFocus={window.innerWidth >= 768}
            />

            <span className={`blink-cursor ${cursorVisible ? 'visible' : ''}`}>_</span>
          </form>
        </div>
      </div>
    </>
  );
};

export default StarkOSTerminal;
