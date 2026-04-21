import { motion } from 'framer-motion';
import { Home, Zap, Terminal, ShoppingBag, MessageSquare } from 'lucide-react';

import { ShieldAlert, ShieldCheck } from 'lucide-react';

const MobileAppNav = ({ activeSection, onNavigate, onToggleTerminal, isVillainMode, onToggleMode, onToggleComms }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'HOME' },
    { id: 'events', icon: Zap, label: 'EVENTS' },
    { id: 'os', icon: Terminal, label: 'OS', isTerminal: true },
    { id: 'mode', icon: isVillainMode ? ShieldCheck : ShieldAlert, label: 'MODE', isMode: true },
    { id: 'merch', icon: ShoppingBag, label: 'SHOP' },
    { id: 'comms', icon: MessageSquare, label: 'COMMS', isComms: true },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={`mobile-app-nav ${isVillainMode ? 'villain-mode' : ''}`}
    >
      <div className="nav-items-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.isTerminal) onToggleTerminal();
              else if (item.isMode) onToggleMode();
              else if (item.isComms) onToggleComms();
              else onNavigate(item.id);
            }}
            className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''} ${item.isMode ? 'shining-mirror-btn' : 'steel-shine'}`}
          >
            <div className="icon-wrapper">
              <item.icon size={24} />
            </div>
            <span className="item-label">{item.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};



export default MobileAppNav;
