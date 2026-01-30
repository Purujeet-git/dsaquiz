// app/admin/topics/page.jsx
"use client";

import { useState, useEffect } from "react";
import AdminRoute from "@/components/AdminRoute";
import { VT323, Press_Start_2P } from "next/font/google";

const pixelBody = VT323({ weight: '400', subsets: ['latin'] });
const pixelHeader = Press_Start_2P({ weight: '400', subsets: ['latin'] });

export default function AdminTopicsListPage() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form state
    const [form, setForm] = useState({
        topicId: "",
        title: "",
        description: "",
        order: 0,
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchTopics();
    }, []);

    async function fetchTopics() {
        try {
            const res = await fetch("/api/admin/topic");
            const data = await res.json();
            if (data.success) {
                setTopics(data.topics);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setMessage("");

        const res = await fetch("/api/admin/topic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                topicId: form.topicId,
                title: form.title,
                description: form.description,
                order: Number(form.order),
            }),
        });

        const data = await res.json();

        if (data.success) {
            setMessage("✅ Topic created successfully");
            setForm({
                topicId: "",
                title: "",
                description: "",
                order: 0,
            });
            // Refresh the topics list
            fetchTopics();
        } else {
            setMessage(`❌ ${data.message}`);
        }

        setSubmitting(false);
    }

    async function deleteTopic(topicId) {
        if (!confirm(`Delete topic "${topicId}"?`)) return;

        const res = await fetch("/api/admin/topic", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topicId }),
        });

        const data = await res.json();
        if (data.success) {
            setTopics(topics.filter(t => t.topicId !== topicId));
            setMessage("✅ Topic deleted successfully");
        } else {
            setMessage(`❌ ${data.message}`);
        }
    }

    return (
        <AdminRoute>
            <div className={`${pixelBody.className} min-h-screen bg-[#0a0a0a] p-8 text-white`}>
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className={`${pixelHeader.className} text-2xl text-[#00ffff] mb-2`}>
                            📚 TOPIC MANAGEMENT
                        </h1>
                        <p className="text-sm text-zinc-400">// System Database</p>
                    </div>

                    {/* Topics List */}
                    {loading ? (
                        <div className="text-center text-zinc-400 py-12">Loading...</div>
                    ) : (
                        <div className="bg-black border-4 border-[#00ffff] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-zinc-900">
                                        <tr className={`${pixelHeader.className} text-[8px] text-[#00ffff]`}>
                                            <th className="p-4 text-left">ID</th>
                                            <th className="p-4 text-left">TITLE</th>
                                            <th className="p-4 text-center">ORDER</th>
                                            <th className="p-4 text-center">STATUS</th>
                                            <th className="p-4 text-center">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topics.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="p-8 text-center text-zinc-500">
                                                    No topics found. Create one below to get started.
                                                </td>
                                            </tr>
                                        ) : (
                                            topics.map((topic) => (
                                                <tr key={topic._id} className="border-t border-zinc-800 hover:bg-zinc-900/50">
                                                    <td className="p-4 font-mono text-sm text-[#ff00ff]">{topic.topicId}</td>
                                                    <td className="p-4">{topic.title}</td>
                                                    <td className="p-4 text-center text-zinc-400">{topic.order}</td>
                                                    <td className="p-4 text-center">
                                                        <span className={`text-xs px-2 py-1 border ${
                                                            topic.isActive 
                                                                ? 'border-green-500 text-green-500' 
                                                                : 'border-red-500 text-red-500'
                                                        }`}>
                                                            {topic.isActive ? 'ACTIVE' : 'INACTIVE'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <button
                                                            onClick={() => deleteTopic(topic.topicId)}
                                                            className="text-red-500 hover:text-red-400 text-sm hover:underline"
                                                        >
                                                            DELETE
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Message Display */}
                    {message && (
                        <div className={`p-4 border-2 ${
                            message.includes('✅') 
                                ? 'border-green-500 bg-green-500/10 text-green-400' 
                                : 'border-red-500 bg-red-500/10 text-red-400'
                        }`}>
                            <p className="text-sm font-mono">{message}</p>
                        </div>
                    )}

                    {/* Create New Topic Form - Always Visible */}
                    <div className="bg-black border-4 border-[#ff00ff] p-8 shadow-[0_0_20px_rgba(255,0,255,0.3)]">
                        <h2 className={`${pixelHeader.className} text-lg text-[#ff00ff] mb-6 uppercase`}>
                            + Create New Topic
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Topic ID */}
                                <div>
                                    <label className="block text-xs text-[#00ffff] mb-2 uppercase tracking-wider">
                                        Topic ID *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. arrays, linked-lists"
                                        value={form.topicId}
                                        onChange={(e) => setForm({ ...form, topicId: e.target.value })}
                                        className="w-full bg-zinc-900 border-2 border-zinc-700 p-3 rounded text-white placeholder-zinc-600 focus:border-[#ff00ff] focus:outline-none transition-colors"
                                        required
                                        disabled={submitting}
                                    />
                                </div>

                                {/* Topic Title */}
                                <div>
                                    <label className="block text-xs text-[#00ffff] mb-2 uppercase tracking-wider">
                                        Topic Title *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Arrays, Linked Lists"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="w-full bg-zinc-900 border-2 border-zinc-700 p-3 rounded text-white placeholder-zinc-600 focus:border-[#ff00ff] focus:outline-none transition-colors"
                                        required
                                        disabled={submitting}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs text-[#00ffff] mb-2 uppercase tracking-wider">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Brief description of the topic..."
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full bg-zinc-900 border-2 border-zinc-700 p-3 rounded text-white placeholder-zinc-600 focus:border-[#ff00ff] focus:outline-none transition-colors resize-none"
                                    rows={3}
                                    disabled={submitting}
                                />
                            </div>

                            {/* Order */}
                            <div>
                                <label className="block text-xs text-[#00ffff] mb-2 uppercase tracking-wider">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={form.order}
                                    onChange={(e) => setForm({ ...form, order: e.target.value })}
                                    className="w-full bg-zinc-900 border-2 border-zinc-700 p-3 rounded text-white placeholder-zinc-600 focus:border-[#ff00ff] focus:outline-none transition-colors"
                                    disabled={submitting}
                                />
                                <p className="text-xs text-zinc-500 mt-1">Lower numbers appear first in the list</p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`${pixelHeader.className} w-full py-4 text-xs bg-[#ff00ff] text-white border-4 border-black shadow-[4px_4px_0_0_#000] hover:bg-[#ff55ff] active:translate-y-1 transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {submitting ? "PROCESSING..." : "▶ CREATE TOPIC"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminRoute>
    );
}