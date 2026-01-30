import { isSameDay, isYesterday } from "@/lib/progress/dateUtils";

/* ---------- GLOBAL STREAK ---------- */
export function updateGlobalStreak(user, today) {
  if (!user.lastActiveDate) {
    user.streakCount = 1;
    user.longestStreak = 1;
    user.lastActiveDate = today;
    return;
  }

  const last = user.lastActiveDate;

  if (isSameDay(last, today)) return;

  if (isYesterday(last, today)) {
    user.streakCount += 1;
  } else {
    user.streakCount = 1;
  }

  user.longestStreak = Math.max(
    user.longestStreak || 0,
    user.streakCount
  );

  user.lastActiveDate = today;
}

/* ---------- TOPIC STREAK ---------- */
export function updateTopicStreak(user, topicId, today) {
  let topic = user.topicStreaks.find(
    (t) => t.topicId === topicId
  );

  if (!topic) {
    topic = {
      topicId,
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: today,
    };
    user.topicStreaks.push(topic);
    return;
  }

  const last = topic.lastActiveDate;

  if (last && isSameDay(last, today)) return;

  if (last && isYesterday(last, today)) {
    topic.currentStreak += 1;
  } else {
    topic.currentStreak = 1;
  }

  topic.longestStreak = Math.max(
    topic.longestStreak,
    topic.currentStreak
  );

  topic.lastActiveDate = today;
}
    