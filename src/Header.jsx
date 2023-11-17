import React from 'react'
import Toggle from './Toggle';

function Header({ showForm, setShowForm, toggleDarkMode }) {
    return (
        <header className="header">
            <div className="logo">
                <img
                    src="logo.png"
                    height="68"
                    width="68"
                    alt="Factual Hub Logo"
                />
                <h1>Factual Hub</h1>
            </div>
            <div>
                <Toggle onToggle={toggleDarkMode} />
            </div>
            <button className="btn btn-large btn-open"
                onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close" : "Add fact"}
            </button>
        </header>
    );
}

export default Header