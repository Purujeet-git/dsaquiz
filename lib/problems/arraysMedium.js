export const arraysMediumProblems = [
  {
    id: "arrays-medium-1",
    title: "Kadane’s Algorithm (Maximum Subarray Sum)",
    description:
      "Given an integer array, find the contiguous subarray with the largest sum.",
    concept: "Prefix sum optimization",
    steps: {
      understanding: [
        {
          question: "What kind of subarray is required?",
          options: [
            "Any subsequence",
            "Contiguous subarray",
            "Only positive elements",
          ],
          correct: 1,
        },
      ],
      approach: {
        question: "Which approach is optimal?",
        options: [
          "Nested loops",
          "Prefix sum + tracking max",
          "Sorting",
        ],
        correct: 1,
        explanation:
          "Kadane’s algorithm maintains current and global maximum in O(n).",
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
    },
  },

  {
    id: "arrays-medium-2",
    title: "Longest Consecutive Sequence",
    description:
      "Find the length of the longest consecutive elements sequence.",
    concept: "HashSet optimization",
    steps: {
      understanding: [
        {
          question: "Do elements need to be contiguous in array?",
          options: ["Yes", "No"],
          correct: 1,
        },
      ],
      approach: {
        question: "Which data structure helps achieve O(n)?",
        options: [
          "Sorting",
          "Hash Set",
          "Binary Search Tree",
        ],
        correct: 1,
        explanation:
          "HashSet allows constant-time lookups for sequence detection.",
      },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
    },
  },
];
