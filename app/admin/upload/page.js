// app/admin/upload/page.jsx
"use client"

import { useEffect, useState } from "react";

// ✅ ADD THIS: Function to generate unique question IDs
function generateQuestionId(topicId, difficulty, batchNumber, type, index) {
  return `${topicId}_${difficulty}_b${batchNumber}_${type}_q${index + 1}`;
}

export default function AdminUploadPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [existingBatches, setExistingBatches] = useState([]);
  const [fetchingBatches, setFetchingBatches] = useState(false);

  const [form, setForm] = useState({
    topicId: "",
    difficulty: "easy",
    title: "",
    description: "",
    batchNumber: 1,
    order: 0,
    steps: `{
  "understanding": [
    {
      "question": "What is the time complexity of accessing an element in an array?",
      "code": "",
      "options": ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      "correct": 0,
      "explanation": "Array elements can be accessed directly using their index in constant time."
    }
  ],
  "approach": [
    {
      "question": "Which approach is best for finding duplicates in an array?",
      "code": "const arr = [1, 2, 3, 2, 4];\\n// Find the duplicate",
      "options": ["Nested loops", "Hash Set", "Sorting", "All of the above"],
      "correct": 3,
      "explanation": "All approaches work, but Hash Set is often most efficient with O(n) time."
    }
  ],
  "complexity": {
    "time": "O(n)",
    "space": "O(1)"
  }
}`,
  });

  // Fetch topics on mount
  useEffect(() => {
    fetch("/api/topics")
      .then((res) => res.json())
      .then((data) => setTopics(data.topics || []))
      .catch(() => setTopics([]));
  }, []);

  // Fetch existing batches when topic or difficulty changes
  useEffect(() => {
    if (form.topicId && form.difficulty) {
      fetchExistingBatches();
    } else {
      setExistingBatches([]);
    }
  }, [form.topicId, form.difficulty]);

  async function fetchExistingBatches() {
    setFetchingBatches(true);
    try {
      const res = await fetch(
        `/api/problems/batches?topicId=${form.topicId}&difficulty=${form.difficulty}`
      );
      const data = await res.json();
      
      if (data.success) {
        setExistingBatches(data.batches || []);
        const maxBatch = data.batches.length > 0 
          ? Math.max(...data.batches.map(b => b.batchNumber))
          : 0;
        setForm(prev => ({ ...prev, batchNumber: maxBatch + 1 }));
      } else {
        setExistingBatches([]);
        setForm(prev => ({ ...prev, batchNumber: 1 }));
      }
    } catch (error) {
      setExistingBatches([]);
      setForm(prev => ({ ...prev, batchNumber: 1 }));
    }
    setFetchingBatches(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    let parsedSteps;
    try {
      parsedSteps = JSON.parse(form.steps);
    } catch {
      setMessage("❌ Invalid JSON in steps");
      setLoading(false);
      return;
    }

    // ✅ ADD IDs to questions automatically
    if (parsedSteps.understanding) {
      parsedSteps.understanding = parsedSteps.understanding.map((q, index) => ({
        ...q,
        id: generateQuestionId(form.topicId, form.difficulty, form.batchNumber, 'understanding', index)
      }));
    }

    if (parsedSteps.approach) {
      parsedSteps.approach = parsedSteps.approach.map((q, index) => ({
        ...q,
        id: generateQuestionId(form.topicId, form.difficulty, form.batchNumber, 'approach', index)
      }));
    }

    const totalQuestions = 
      (parsedSteps.understanding?.length || 0) + 
      (parsedSteps.approach?.length || 0);

    if (totalQuestions === 0) {
      setMessage("❌ Please add at least one question in understanding or approach");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/admin/problem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topicId: form.topicId,
        difficulty: form.difficulty,
        title: form.title,
        description: form.description,
        batchNumber: Number(form.batchNumber),
        order: Number(form.order),
        steps: parsedSteps,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage(
        `✅ Batch ${form.batchNumber} added successfully to ${form.topicId} (${form.difficulty}). Total questions: ${totalQuestions}`
      );
      
      fetchExistingBatches();
      
      setForm({
        ...form,
        title: "",
        description: "",
        steps: `{
  "understanding": [
    {
      "question": "",
      "code": "",
      "options": [],
      "correct": 0,
      "explanation": ""
    }
  ],
  "approach": [],
  "complexity": {
    "time": "",
    "space": ""
  }
}`,
      });
    } else {
      setMessage(`❌ ${data.message}`);
    }

    setLoading(false);
  }

  function loadBatchTemplate() {
    const template = {
      understanding: Array(10).fill(null).map(() => ({
        question: "",
        code: "",
        options: ["", "", "", ""],
        correct: 0,
        explanation: ""
      })),
      approach: Array(5).fill(null).map(() => ({
        question: "",
        code: "",
        options: ["", "", "", ""],
        correct: 0,
        explanation: ""
      })),
      complexity: {
        time: "",
        space: ""
      }
    };
    setForm({ ...form, steps: JSON.stringify(template, null, 2) });
    setMessage("📝 Loaded template with 10 understanding + 5 approach questions (IDs will be auto-generated)");
  }

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="max-w-4xl mx-auto bg-black text-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">
          Admin – Upload Problem Batch
        </h1>

        {/* Existing Batches Info */}
        {form.topicId && form.difficulty && (
          <div className="mb-6 p-4 bg-black text-white rounded-lg border border-blue-200">
            <h2 className="font-semibold mb-2 text-black">
              Existing Batches for {form.topicId} ({form.difficulty})
            </h2>
            {fetchingBatches ? (
              <p className="text-sm text-gray-600">Loading...</p>
            ) : existingBatches.length > 0 ? (
              <div className="space-y-1">
                {existingBatches.map((batch) => (
                  <div key={batch.batchNumber} className="text-sm text-gray-700">
                    <span className="font-medium">Batch {batch.batchNumber}:</span>{" "}
                    {batch.understanding.length} understanding + {batch.approach.length} approach questions
                  </div>
                ))}
                <p className="text-sm font-medium text-blue-700 mt-2">
                  📌 Total: {existingBatches.length} batches
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-600">No batches yet. This will be batch #1</p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-black text-white">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Topic</label>
              <select
                value={form.topicId}
                onChange={(e) => setForm({ ...form, topicId: e.target.value })}
                className="w-full border text-black p-2 rounded"
                required
              >
                <option value="">Select Topic</option>
                {topics.map((t) => (
                  <option key={t.topicId} value={t.topicId}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Difficulty</label>
              <select
                value={form.difficulty}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Batch Number</label>
              <input
                type="number"
                min="1"
                value={form.batchNumber}
                onChange={(e) => setForm({ ...form, batchNumber: e.target.value })}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Order (optional)</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="e.g., Arrays - Easy - Batch 1"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description (optional)</label>
            <textarea
              placeholder="Brief description of this batch"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border p-2 rounded"
              rows={2}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">Questions (JSON)</label>
              <button
                type="button"
                onClick={loadBatchTemplate}
                className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                Load Template (10+5 questions)
              </button>
            </div>
            <textarea
              value={form.steps}
              onChange={(e) => setForm({ ...form, steps: e.target.value })}
              className="w-full border p-2 rounded font-mono text-sm"
              rows={16}
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 Question IDs will be auto-generated when you submit
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black px-6 py-2 rounded hover:bg-gray-800 hover:text-white disabled:bg-gray-400"
          >
            {loading ? "Uploading..." : `Upload Batch ${form.batchNumber}`}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded ${
            message.startsWith('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 p-4 bg-gray-950 text-white rounded-lg border">
          <h3 className="font-semibold mb-2">📖 How to use:</h3>
          <ol className="text-sm space-y-1 list-decimal list-inside text-gray-200">
            <li>Select a topic and difficulty level</li>
            <li>The system will show existing batches and suggest the next batch number</li>
            <li>Click "Load Template" to get a structured JSON with empty question slots</li>
            <li>Fill in your questions (don't worry about IDs - they're auto-generated)</li>
            <li>Add code snippets in the "code" field (optional, use \n for new lines)</li>
            <li>Click "Upload Batch" to save</li>
          </ol>
          <p className="text-xs text-gray-500 mt-2">
            ✨ Question IDs follow format: topicId_difficulty_bBatchNumber_type_qNumber<br/>
            Example: foundation_easy_b1_understanding_q1
          </p>
          
          <div className="mt-4 p-3 bg-yellow-950 text-amber-300 border border-yellow-200 rounded">
            <h4 className="font-semibold text-sm mb-2">💻 Code Field Tips:</h4>
            <ul className="text-xs space-y-1 text-amber-400 list-disc list-inside">
              <li>Use the "code" field for code snippets related to the question</li>
              <li>Leave it as an empty string "" if no code is needed</li>
              <li>Use \n for line breaks in your code</li>
              <li>Example: "const arr = [1, 2, 3];\nconst sum = arr.reduce((a, b) ={`>`} a + b);"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}