export const arraysHardProblems = [
  {
    id: "arrays-hard-1",
    title: "Count Subarrays with Given Sum",
    description:
      "Given an array of integers and a target sum k, find the total number of continuous subarrays whose sum equals k.",
    concept: "Prefix sum + HashMap",
    steps: {
      understanding: [
        {
          question:
            "Does the subarray need to be contiguous?",
          options: ["Yes", "No"],
          correct: 0,
        },
      ],
      approach: {
        question:
          "Which technique allows O(n) solution?",
        options: [
          "Two pointers",
          "Prefix sum with hashmap",
          "Sorting",
        ],
        correct: 1,
        explanation:
          "We store prefix sums in a hashmap to count valid subarrays efficiently.",
        },
      complexity: {
        time: "O(n)",
        space: "O(n)",
      },
    },
  },

  {
    id: "arrays-hard-2",
    title: "Maximum Product Subarray",
    description:
      "Find the contiguous subarray within an array that has the largest product.",
    concept: "Dynamic tracking of min & max",
    steps: {
      understanding: [
        {
          question:
            "Why do we track both max and min products?",
          options: [
            "To reduce space",
            "Because negative numbers can flip signs",
            "For sorting",
          ],
          correct: 1,
        },
      ],
      approach: {
        question:
          "What variables must be tracked?",
        options: [
          "Only max product",
          "Current max and current min",
          "Prefix sums only",
        ],
        correct: 1,
        explanation:
          "A negative number can turn the smallest product into the largest.",
      },
      complexity: {
        time: "O(n)",
        space: "O(1)",
      },
    },
  },
];
