import { useContext } from 'react';
import Context from '@/store/store';

export default function TheHeader() {
  const { value, setValue } = useContext(Context);
  return (
    <header className={value ? 'dark-mode--bc' : ''}>
      <h1 className={value ? 'dark-mode--text' : ''}>Todo Calendar</h1>

      <div className="toggle-btn">
        <input
          type="checkbox"
          id="switch"
          defaultChecked={value}
          onClick={() => {
            setValue(!value);
          }}
        />
        <label htmlFor="switch" className="switch-label">
          <div className="toggle"></div>
        </label>
      </div>
    </header>
  );
}
