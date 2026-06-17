import { create } from "zustand";

export const useNotificationStore = create<any>((set: any) => ({
  pulseToasts: [],
  addPulseToast: (toast: any) =>
    set((state: any) => ({ pulseToasts: [...state.pulseToasts, toast] })),
  removePulseToast: (id: string) =>
    set((state: any) => ({
      pulseToasts: state.pulseToasts.filter((t: any) => t.id !== id),
    })),

  notifications: [],
  addNotification: (notif: any) =>
    set((state: any) => ({ notifications: [...state.notifications, notif] })),
  removeNotification: (id: string) =>
    set((state: any) => ({
      notifications: state.notifications.filter((n: any) => n.id !== id),
    })),

  globalVibeNotificationsEnabled: true,
  toggleGlobalVibeNotifications: () =>
    set((state: any) => ({
      globalVibeNotificationsEnabled: !state.globalVibeNotificationsEnabled,
    })),

  likesNotificationsEnabled: true,
  toggleLikesNotifications: (val: boolean) =>
    set({ likesNotificationsEnabled: val }),

  likesMilestonesOnly: false,
  toggleLikesMilestonesOnly: (val: boolean) =>
    set({ likesMilestonesOnly: val }),

  commentsNotificationsEnabled: true,
  toggleCommentsNotifications: (val: boolean) =>
    set({ commentsNotificationsEnabled: val }),

  repliesNotificationsEnabled: true,
  toggleRepliesNotifications: (val: boolean) =>
    set({ repliesNotificationsEnabled: val }),

  blazeRunRemindersEnabled: true,
  toggleBlazeRunReminders: (val: boolean) =>
    set({ blazeRunRemindersEnabled: val }),

  blazeRunReminderTime: "20:00",
  setBlazeRunReminderTime: (val: string) => set({ blazeRunReminderTime: val }),

  pulseRewardsEnabled: true,
  togglePulseRewards: (val: boolean) => set({ pulseRewardsEnabled: val }),

  languageMatchNotificationsEnabled: true,
  toggleLanguageMatchNotifications: (val: boolean) =>
    set({ languageMatchNotificationsEnabled: val }),

  creatorNotificationPrefs: {},
  toggleCreatorNotifications: (username: string) =>
    set((state: any) => ({
      creatorNotificationPrefs: {
        ...state.creatorNotificationPrefs,
        [username]:
          state.creatorNotificationPrefs[username] === false ? true : false,
      },
    })),
}));

export const simulateCreatorPost = (...args: any[]) =>
  console.log("simulateCreatorPost", args);
export const simulateVibeLike = (...args: any[]) =>
  console.log("simulateVibeLike", args);
export const simulateVibeComment = (...args: any[]) =>
  console.log("simulateVibeComment", args);
export const scheduleStreakReminder = (...args: any[]) =>
  console.log("scheduleStreakReminder", args);
export const showStreakNotification = (...args: any[]) =>
  console.log("showStreakNotification", args);
export const checkStreakRisk = (...args: any[]) => ({
  atRisk: false,
  streakCount: 0,
});
export const simulatePulseReward = (...args: any[]) =>
  console.log("simulatePulseReward", args);
export const simulateLanguageMatchNotification = (...args: any[]) =>
  console.log("simulateLanguageMatchNotification", args);
