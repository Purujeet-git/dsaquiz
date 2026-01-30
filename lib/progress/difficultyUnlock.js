export const isDifficultyUnlocked = (
  difficulty,
  progress
) => {
  if (difficulty === "easy") return true;
  if (difficulty === "medium") return progress.easy >= 80;
  if (difficulty === "hard") return progress.medium >= 70;
  return false;
};
