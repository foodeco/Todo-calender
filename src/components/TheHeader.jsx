import { useState } from 'react';
import { useEffect } from 'react';

export default function TheHeader() {
  let a = false;
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    currentTheme === 'dark' ? (a = true) : null;
  }
  const [isChecked, setIsChecked] = useState(a);
  useEffect(() => {}, []);
  function darkMode(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }
  return (
    <header>
      <h1>Todo Calendar</h1>

      <div className="toggle-btn">
        <input
          type="checkbox"
          id="switch"
          defaultChecked={isChecked}
          onClick={(e) => {
            setIsChecked(!isChecked);
            darkMode(e);
          }}
        />
        <label htmlFor="switch" className="switch-label">
          <div className="toggle"></div>
        </label>
      </div>
    </header>
  );
}
