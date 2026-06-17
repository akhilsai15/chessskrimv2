import React, { useRef, useState, useEffect } from "react";
import { Home, PlaySquare, MessageCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNotificationStore } from "../store/notificationStore";
import { useWorldNotificationStore } from "../store/worldNotificationStore";
import { motion, AnimatePresence } from "motion/react";

const VeilIconTab = ({ active }: { active: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={active ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <path d="M3 13.5c0-1.5.5-2.5 1.5-3.5 1.5-1.5 3.5-2 5.5-1.5.5.1 1 .4 1.5.8h1c.5-.4 1-.7 1.5-.8 2-.5 4 0 5.5 1.5 1 1 1.5 2 1.5 3.5 0 2-2 3.5-4.5 3.5s-4.5-1.5-4.5-3.5v-.5h-2v.5c0 2-2 3.5-4.5 3.5S3 15.5 3 13.5z" />
    <path d="M2 13.5l1-5h18l1 5" />
  </svg>
);

export function BottomTabs() {
  const location = useLocation();
  const path = location.pathname;
  const { notifications, hasUnseen } = useWorldNotificationStore();
  const unreadWorldNotifs = notifications.filter((n) => !n.read).length;
  const { addToast } = useNotificationStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);
  const [hasVeilBadge, setHasVeilBadge] = useState(false);
  const [stealthEnabled, setStealthEnabled] = useState(
    localStorage.getItem("veil_stealth_enabled") === "true",
  );
  const [animatingStealth, setAnimatingStealth] = useState(false);

  useEffect(() => {
    const onNotify = () => setHasVeilBadge(true);
    const onClear = () => setHasVeilBadge(false);

    const onStealthToggle = (e: any) => {
      if (e.detail?.enabled) {
        setAnimatingStealth(true);
        setTimeout(() => setStealthEnabled(true), 100);
        setTimeout(() => setAnimatingStealth(false), 1000);
      } else {
        setAnimatingStealth(true);
        setStealthEnabled(false);
        setTimeout(() => setAnimatingStealth(false), 1000);
      }
    };

    const notifications = JSON.parse(
      localStorage.getItem("veil_notifications") || "[]",
    );
    if (notifications.length > 0) setHasVeilBadge(true);

    window.addEventListener("veil_notify", onNotify);
    window.addEventListener("veil_badge_clear", onClear);
    window.addEventListener(
      "veil_stealth_toggled",
      onStealthToggle as EventListener,
    );
    return () => {
      window.removeEventListener("veil_notify", onNotify);
      window.removeEventListener("veil_badge_clear", onClear);
      window.removeEventListener(
        "veil_stealth_toggled",
        onStealthToggle as EventListener,
      );
    };
  }, []);

  const WorldsIconTab = ({ active }: { active: boolean }) => (
    <div className="relative flex items-center justify-center w-6 h-6">
      {active && (
        <div className="absolute inset-[-4px] bg-gradient-to-tr from-[#7B2FF7] via-[#9D00FF] to-[#4338CA] rounded-full blur-md opacity-60 animate-pulse" />
      )}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={active ? "url(#worlds-grad)" : "none"}
        stroke={active ? "none" : "currentColor"}
        strokeWidth="1.5"
        className="relative z-10 shrink-0"
      >
        {active && (
          <defs>
            <linearGradient id="worlds-grad" x1="0" y1="0" x2="24" y2="24">
              <stop offset="0%" stopColor="#7B2FF7" />
              <stop offset="50%" stopColor="#B026FF" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
          </defs>
        )}
        {/* Outline style circles, when active they are filled by the gradient */}
        <circle cx="12" cy="8" r="5.5" />
        <circle cx="8" cy="15" r="5.5" />
        <circle cx="16" cy="15" r="5.5" />
      </svg>
    </div>
  );

  const tabs = [
    { name: "Home", path: "/discover", icon: Home, label: "Home" },
    { name: "Vibes", path: "/vibes", icon: PlaySquare, label: "Vibes" },
    { name: "Worlds", path: "/worlds", icon: WorldsIconTab, label: "Worlds" },
    {
      name: "Connect",
      path: "/connect",
      icon: MessageCircle,
      label: "Connect",
    },
    { name: "Profile", path: "/identity", icon: User, label: "Profile" },
  ];

  if (stealthEnabled && path.startsWith("/veil") && !animatingStealth) {
    return null; // hide completely while inside Veil in stealth mode
  }

  const handlePointerDown = (name: string) => {
    isLongPress.current = false;
    if (name === "Veil") {
      timerRef.current = setTimeout(() => {
        isLongPress.current = true;
        addToast({ message: "🔒 Veil locked instantly", type: "success" });
        localStorage.removeItem("veil_auth_temp");
        window.dispatchEvent(
          new CustomEvent("veil_lock", { detail: { type: "panic" } }),
        );
      }, 600);
    }
  };

  const handlePointerUp = (name: string) => {
    if (name === "Veil") {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  };

  const handleClick = (e: React.MouseEvent, name: string) => {
    if (name === "Veil" && isLongPress.current) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={`md:hidden absolute bottom-0 left-0 right-0 border-t-0 rounded-t-3xl pb-safe pt-2 px-4 flex justify-between items-center z-50 overflow-x-auto no-scrollbar transition-colors duration-500 ${path.startsWith("/veil") ? "bg-[#080810] border-[#080810]" : "glass-panel"}`}
    >
      <AnimatePresence mode="popLayout">
        {tabs.map((tab) => {
          const isActive =
            path === tab.path || (tab.path === "/discover" && path === "/");
          const Icon = tab.icon;
          const isVeil = tab.name === "Veil";

          return (
            <motion.div
              layout
              initial={{ opacity: 0, filter: "blur(5px)", scale: 0.5 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={
                isVeil
                  ? { opacity: 0, filter: "blur(10px)", y: -20, scale: 0.8 }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
              key={tab.name}
              className="shrink-0 min-w-[56px] select-none"
            >
              <Link
                to={tab.path}
                onPointerDown={() => handlePointerDown(tab.name)}
                onPointerUp={() => handlePointerUp(tab.name)}
                onPointerLeave={() => handlePointerUp(tab.name)}
                onClick={(e) => handleClick(e, tab.name)}
                className="flex flex-col items-center gap-1 p-2 w-full h-full"
              >
                {tab.name === "Worlds" ? (
                  <div className="relative">
                    <Icon active={isActive} />
                    {hasUnseen && unreadWorldNotifs > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 flex flex-col items-center justify-center min-w-[16px] h-4 bg-[#B026FF] text-white text-[9px] font-bold rounded-full px-1 shadow-[0_0_8px_rgba(176,38,255,0.6)] z-20">
                        {unreadWorldNotifs}
                      </span>
                    )}
                  </div>
                ) : isVeil ? (
                  <div className="relative">
                    {isActive && (
                      <div className="absolute inset-0 bg-[#7B2FF7] blur-md opacity-40 rounded-full scale-150 animate-pulse" />
                    )}
                    {hasVeilBadge && (
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF3B3B] rounded-full z-20 border-2 border-[#0A0A10]"
                      />
                    )}
                    <div
                      className={`relative z-10 transition-all duration-300 ${isActive ? "text-[#7B2FF7] drop-shadow-[0_0_8px_#7B2FF7] scale-110" : "text-gray-600"}`}
                    >
                      <Icon active={isActive} />
                    </div>
                  </div>
                ) : (
                  <Icon
                    className={`w-6 h-6 transition-all duration-300 ${
                      isActive
                        ? path.startsWith("/veil")
                          ? "text-[#7B2FF7] drop-shadow-[0_0_8px_currentColor] scale-110"
                          : "text-neon-purple text-glow-purple drop-shadow-[0_0_8px_currentColor] scale-110"
                        : path.startsWith("/veil")
                          ? "text-[#888899]"
                          : "text-gray-500"
                    }`}
                  />
                )}

                {!isVeil && (
                  <span
                    className={`text-[9px] font-medium transition-all duration-300 ${
                      tab.name === "Worlds" && !isActive
                        ? "opacity-0 h-0 overflow-hidden"
                        : "opacity-100"
                    } ${
                      isActive
                        ? path.startsWith("/veil")
                          ? "text-[#7B2FF7]"
                          : "text-neon-purple"
                        : path.startsWith("/veil")
                          ? "text-[#888899]"
                          : "text-gray-500"
                    }`}
                  >
                    {tab.name}
                  </span>
                )}
              </Link>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
