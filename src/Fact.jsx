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

function Fact({ fact, setFacts }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const isDisputed =
      fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;
  
    async function handleVote(columnName) {
      setIsUpdating(true);
      const { data: updatedFact, error } = await supabase
        .from('facts')
        .update({ [columnName]: fact[columnName] + 1 })
        .eq('id', fact.id)
        .select();
      setIsUpdating(false);
  
      if (!error)
        setFacts((facts) =>
          facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
        );
    }
  
    return (
      <li className='fact'>
        <p>
          {isDisputed ? <span className='disputed'>[⛔️ DISPUTED]</span> : null}
          {fact.text}
          <a className='source' href={fact.source} target='_blank'>
            (Source)
          </a>
        </p>
        <span
          className='tag'
          style={{
            backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
              .color,
          }}
        >
          {fact.category}
        </span>
        <div className='vote-buttons'>
          <button
            onClick={() => handleVote('votesInteresting')}
            disabled={isUpdating}
          >
            👍 {fact.votesInteresting}
          </button>
          <button
            onClick={() => handleVote('votesMindblowing')}
            disabled={isUpdating}
          >
            🤯 {fact.votesMindblowing}
          </button>
          <button onClick={() => handleVote('votesFalse')} disabled={isUpdating}>
            ⛔️ {fact.votesFalse}
          </button>
        </div>
      </li>
    );
  }

export default Fact