import { useState, useEffect } from 'react';
import supabase from './supabase'
import './style.css';
import Header from './Header'
import Loader from './Loader';
import NewFactForm from './NewFactForm';
import CategoryFilter from './CategoryFilter';

import FactList from './FactList';
import './loader.css'

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

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);

      let query = supabase.from("facts").select("*");
      if (currentCategory !== 'all')
        query = query.eq("category", currentCategory)

      const { data: facts, error } = await query
        .order("votesInteresting", { ascending: false })
        .limit(1000);

      if (!error) {
        setFacts(facts);
      } else {
        alert("📌 Problem while fetching the data....")
      }
      setIsLoading(false);
    }
    getFacts();
  }, [currentCategory])

  const toggleDarkMode = (isChecked) => {
    setDarkMode(isChecked);
    document.body.classList.toggle('darkmode', isChecked);
    document.body.classList.toggle('lightmode', !isChecked);
  };

  return (
    <div>
      <Header showForm={showForm} setShowForm={setShowForm} toggleDarkMode={toggleDarkMode} />

      {showForm ? <NewFactForm setFacts={setFacts} setShowForm={setShowForm} /> : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader /> : <FactList facts={facts} setFacts={setFacts} />}

      </main>

    </div>
  );
}

export default App;