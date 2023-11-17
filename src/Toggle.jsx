import React, { useState } from 'react';
import './toggle.css'

const Toggle = ({ onToggle }) => {
  const [isChecked, setChecked] = useState(true);

  const handleToggle = () => {
    setChecked(!isChecked);
    onToggle(!isChecked);
  };

  return (

    <label className="switch">
      <span className="sun"><i className="bi bi-sun-fill"></i></span>
      <span className="moon"><i className="bi bi-moon-fill"></i></span>
      <input type="checkbox" className="input" checked={isChecked} onChange={handleToggle}/>
        <span className="slider"></span>
    </label>
  );
};

export default Toggle;
