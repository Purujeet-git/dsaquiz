export const arrayQuizzes = [
  {
    quizTag: "array_hashing",
    difficulty: "Easy",
    questions: [
      {
        type: "mcq",
        question: "Why is hashing commonly used in array problems like Two Sum?",
        options: [
          "To reduce memory usage",
          "To achieve constant time lookups",
          "To sort the array",
          "To avoid loops"
        ],
        correct: 1,
        explaination:
          "Hashing allows O(1) average-time lookup, reducing time complexity from O(n²) to O(n).",
      },
      {
        type: "mcq",
        question: "What is the time complexity of the optimal Two Sum solution using a hash map?",
        options: ["O(n²)", "O(log n)", "O(n)", "O(1)"],
        correct: 2,
        explaination:
          "Each element is processed once and hash map lookups are O(1) on average.",
      },
    ],
  },
  {
    quizTag: "prefix_sum",
    difficulty: "Medium",
    questions: [
      {
        type: "mcq",
        question: "What does a prefix sum array store?",
        options: [
          "Sum of all elements",
          "Running sum up to each index",
          "Only positive sums",
          "Maximum subarray sum",
        ],
        correct: 1,
        explaination:
          "Prefix sum stores the cumulative sum from index 0 to the current index.",
      },
      {
        type: "mcq",
        question:
          "Why does prefix sum help in problems like Subarray Sum Equals K?",
        options: [
          "It sorts the array",
          "It allows constant-time subarray sum checks",
          "It removes negative numbers",
          "It avoids extra space",
        ],
        correct: 1,
        explaination:
          "By storing cumulative sums, subarray sums can be checked in O(1) time using a hashmap.",
      },
    ],
  },
];
