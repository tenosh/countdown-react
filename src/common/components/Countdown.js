import { useState, useEffect, useRef } from 'react';

function Countdown({ date }) {
  const [countDown, setCountDown] = useState({
    years: 0,
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  });

  let interval = useRef(null);

  useEffect(() => {
    // Update every second.
    stop();
    interval.current = setInterval(() => {
      const newDate = calculateCountdown(date);
      newDate ? setCountDown(newDate) : stop();
    }, 1000);
    return () => {
      stop();
    }
  }, [date]);

  const calculateCountdown = (endDate) => {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  const stop = () => {
    clearInterval(interval.current);
  }

  const addLeadingZeros = (value) => {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }
  return (
    <div className="countdown-container">
      <div className='column'>
        <h1>{addLeadingZeros(countDown.years)}</h1>
        <p>{countDown.years === 1 ? 'Year' : 'Years'}</p>
      </div>
      <div className='column'>
        <h1>{addLeadingZeros(countDown.days)}</h1>
        <p>{countDown.days === 1 ? 'Day' : 'Days'}</p>
      </div>
      <div className='column'>
        <h1>{addLeadingZeros(countDown.hours)}</h1>
        <p>Hours</p>
      </div>
      <div className='column'>
        <h1>{addLeadingZeros(countDown.min)}</h1>
        <p>Mins</p>
      </div>
      <div className='column'>
        <h1>{addLeadingZeros(countDown.sec)}</h1>
        <p>Sec</p>
      </div>
    </div>
  );
}

export default Countdown;
