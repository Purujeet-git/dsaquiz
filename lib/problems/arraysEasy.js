export const arraysEasyProblems = [
  {
    id: "arrays-easy-1",
    title: "Find the largest element in an array",
    description:
      "Given an array of integers, find the largest element.",
    steps: {
      understanding: [
        {
          question: "What is the size of the input?",
          options: [
            "Very small (≤10)",
            "Up to 10⁵ elements",
            "Infinite stream",
          ],
          correct: 1,
        },
      ],

      approach: {
        question: "Which approach is optimal?",
        options: [
          "Nested loops",
          "Sort the array",
          "Single traversal",
        ],
        correct: 2,
        explanation:
          "A single traversal finds the max in O(n) time with O(1) space.",
      },

      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
    },
  },
];
