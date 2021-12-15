import './App.css';
import Countdown from './common/components/Countdown';
import { useState } from 'react';

function App() {
  const [date, setDate] = useState('2022-12-24T00:00:00');

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>The Countdown</h1>
        <form>
          <label>
            Set a date:
            <input type="date" value={date} onChange={handleChange} />
          </label>
        </form>
      </header>
      <div className="content-container">
        <Countdown date={date} />
      </div>
    </div>
  );
}

export default App;
