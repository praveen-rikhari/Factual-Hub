import React from 'react'

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

function CategoryFilter({ setCurrentCategory }) {
    return (
        <aside>
            <ul>
                <li className='category'>
                    <button
                        className='btn btn-all-categories'
                        onClick={() => setCurrentCategory('all')}
                    >
                        All
                    </button>
                </li>

                {CATEGORIES.map((cat) => (
                    <li key={cat.name} className='category'>
                        <button
                            className='btn btn-category'
                            style={{ backgroundColor: cat.color }}
                            onClick={() => setCurrentCategory(cat.name)}
                        >
                            {cat.name}
                            <i className={cat.icon}></i>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default CategoryFilter