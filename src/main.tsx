import { StrictMode, ReactNode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  simulateCreatorPost,
  simulateVibeLike,
  simulateVibeComment,
  scheduleStreakReminder,
  showStreakNotification,
  checkStreakRisk,
  simulatePulseReward,
  simulateLanguageMatchNotification,
} from "./store/notificationStore";
import { mockUsers, mockReels } from "./lib/mock/mockData";

class ErrorBoundary extends React.Component<{children: ReactNode}, {hasError: boolean, error: any}> {
  public state = { hasError: false, error: null as any };
  constructor(props: {children: ReactNode}) {
    super(props);
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", background: "#f8d7da", color: "#721c24", height: "100vh", overflow: "auto", position: "fixed", inset: 0, zIndex: 999999 }}>
          <h1 style={{ fontSize: "24px" }}>Something went wrong.</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.error?.toString()}</pre>
          <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return (this as any).props.children;
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // SW registered
      })
      .catch((err) => {
        console.log("SW registration failed: ", err);
      });

    // Listen for messages from SW
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data && event.data.type === "REMIND_LATER") {
        const now = new Date();
        const reminder9PM = new Date();
        reminder9PM.setHours(21, 0, 0, 0); // 9 PM
        if (now < reminder9PM) {
          const delay = reminder9PM.getTime() - now.getTime();
          setTimeout(() => {
            const { atRisk, streakCount } = checkStreakRisk();
            if (atRisk) {
              showStreakNotification(streakCount);
            }
          }, delay);
        }
      }
    });
  });
}

// Initial streak schedule setup
scheduleStreakReminder();

// @ts-ignore
window.simulateCreatorPost = () =>
  simulateCreatorPost(mockUsers[0], mockReels[0]);
// @ts-ignore
window.simulateVibeLike = (likes = 0) =>
  simulateVibeLike(mockUsers[0], mockReels[0], likes);
// @ts-ignore
window.simulateVibeComment = (reply = false) =>
  simulateVibeComment(
    mockUsers[0],
    { id: "c1", text: "this vibe is \uD83D\uDD25\uD83D\uDD25\uD83D\uDD25" },
    mockReels[0],
    reply,
  );
// @ts-ignore
window.simulateStreakReminder = (count = 5) => showStreakNotification(count);
// @ts-ignore
window.simulatePulseReward = (event = "milestone_20") =>
  simulatePulseReward(event as any);
// @ts-ignore
window.simulateLanguageMatch = (
  langs = ["te", "en"],
  count = 15,
  force = true,
) => simulateLanguageMatchNotification(langs, count, force);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
