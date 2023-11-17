import React, { useState } from 'react';
import supabase from './supabase';

const CATEGORIES = [
    { name: "technology", color: "#3b82f6", icon: "bi bi-cpu-fill" },
    { name: "science", color: "#16a34a", icon: "bi bi-rocket-takeoff" },
    { name: "finance", color: "#ef4444", icon: "bi bi-cash-coin" },
    { name: "society", color: "#eab308", icon: "bi bi-people-fill" },
    { name: "entertainment", color: "#db2777", icon: "bi bi-film" },
    { name: "health", color: "#14b8a6", icon: "bi bi-heart-pulse-fill" },
    { name: "history", color: "#f97316", icon: "bi bi-clock-history" },
    { name: "news", color: "#8b5cf6", icon: "bi bi-newspaper" },
];

function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        {
            alert("❌ Invalid source/URL. Please add a valid url.");
        }
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
    const [text, setText] = useState("");
    const [source, setSource] = useState("");
    const [category, setCategory] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const textLength = text.length;

    async function handleSubmit(e) {
        e.preventDefault();

        //checking data validation
        if (text && isValidHttpUrl(source) && category && textLength <= 200) {

            // const newFact = {
            //   id: Math.floor(Math.random() * 100000) + 1,
            //   text,
            //   source,
            //   category,
            //   votesInteresting: 0,
            //   votesMindblowing: 0,
            //   votesFalse: 0,
            //   createdIn: new Date().getFullYear(),
            // }

            //uploading facts to supabase
            setIsUploading(true);
            const { data: newFact, error } = await supabase.from("facts").insert([{ text, source, category }])
                .select()
            setIsUploading(false);

            //adding fact to UI
            if (!error) setFacts((facts) => [newFact[0], ...facts]);

            //Reset fom fields
            setText("");
            setSource("");
            setCategory("");

            //closing form
            setShowForm(false);
        }
    }

    return (
        <form className='fact-form' onSubmit={handleSubmit}>
            <input type="text"
                placeholder="Share a fact with the world..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isUploading}
            />
            <span>{200 - textLength}</span>
            <input type="text"
                placeholder="Trustworthy source..."
                value={source}
                onChange={(e) => setSource(e.target.value)}
                disabled={isUploading}
            />
            <select value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isUploading}
            >
                <option value="">Choose category:</option>
                {
                    CATEGORIES.map((cat) => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))
                }
            </select>
            <button className="btn btn-large">Post</button>
        </form>
    );
}

export default NewFactForm