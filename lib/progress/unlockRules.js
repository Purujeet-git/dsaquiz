export const isTopicUnlocked = (topicId, progress) => {
  if (topicId === "arrays") return true;

  if (["searching", "sorting"].includes(topicId)) {
    return progress.arrays >= 60;
  }

  if (topicId === "linked-list") {
    return (
      progress.searching >= 50 &&
      progress.sorting >= 50
    );
  }

  if (topicId === "stack-queue") {
    return progress["linked-list"] >= 50;
  }

  return false;
};
