export const fragments = [
  "You arrived exactly when you were meant to.",
  "The gravity here feels optional.",
  "Nothing happens here, but you feel everything.",
  "Someone dreamed of you before you existed.",
  "This place is made of memory and static.",
  "The stars don’t speak – they listen.",
  "It’s always night here, but no one sleeps.",
  "You’re not lost. You’re just early."
];

export function getRandomFragment() {
  const randomIndex = Math.floor(Math.random() * fragments.length);
  return fragments[randomIndex];
}