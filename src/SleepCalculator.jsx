import React, { useState } from "react";
import "./SleepCalculator.css";

const SleepCalculator = () => {
  const [bedtime, setBedtime] = useState("");
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [bestWakeUpTime, setBestWakeUpTime] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [bestWakeUpTimes, setBestWakeUpTimes] = useState([]);

  const handleCalculate = () => {
    if (!bedtime || !wakeUpTime) {
      setBestWakeUpTimes(["Please enter both bedtime and wake-up time."]);
      return;
    }
  
    const bedTimeDate = new Date(`1970-01-01T${bedtime}:00`);
    const wakeUpTimeDate = new Date(`1970-01-01T${wakeUpTime}:00`);
  
    // Se o horário de acordar é antes do de dormir, adiciona um dia ao horário de acordar
    if (wakeUpTimeDate <= bedTimeDate) {
      wakeUpTimeDate.setDate(wakeUpTimeDate.getDate() + 1);
    }
  
    const sleepCycle = 90 * 60 * 1000; // 90 minutos em milissegundos
    const optimalTimes = [];
  
    for (let i = 1; i <= 10; i++) { // Calcula até 10 ciclos
      const cycleEnd = new Date(bedTimeDate.getTime() + i * sleepCycle);
      if (cycleEnd > wakeUpTimeDate) break; // Para quando passa o horário de acordar
      optimalTimes.push(cycleEnd);
    }
  
    if (optimalTimes.length > 0) {
      // Obtém as duas últimas opções
      const recommendedTimes = optimalTimes
        .slice(-2) // Pega os últimos dois horários
        .map(time => time.toTimeString().substring(0, 5));
  
      setBestWakeUpTimes(recommendedTimes);
    } else {
      setBestWakeUpTimes(["No optimal time found."]);
    }
  };
  
  
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="container">
      <h1>
        <span className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#ffffff"
          >
            <path d="M12.3 2.1c0 .6-.4 1.2-.9 1.5-2.8 1.1-4.8 3.9-4.8 7 0 4.1 3.4 7.5 7.5 7.5 3.1 0 5.8-2 7-4.8.3-.6.9-.9 1.5-.9.3 0 .5.1.8.2 1.5.6 2.6 2.1 2.6 3.8C24 20.6 18.6 24 12 24S0 18.6 0 12C0 5.4 3.4 0 7.9 0c1.7 0 3.3 1.1 3.8 2.6.1.3.2.5.2.8z" />
          </svg>
        </span>
        Sleep Calculator
      </h1>
      <label>
        Bedtime:  
        <input
          type="time"
          value={bedtime}
          onChange={(e) => setBedtime(e.target.value)}
        />
      </label>
      <label>
        Desired Wake Up Time:
        <input
          type="time"
          value={wakeUpTime}
          onChange={(e) => setWakeUpTime(e.target.value)}
        />
      </label>
      <button onClick={handleCalculate}>Calculate Best Wake-Up Time</button>
     
{bestWakeUpTimes.length > 0 && (
  <div>
    <h2>Recommended Wake-Up Times:</h2>
    <ul>
      {bestWakeUpTimes.map((time, index) => (
        <li key={index}>{time}</li>
      ))}
    </ul>
    <button onClick={toggleInfo}>{showInfo ? 'Hide Info' : 'More Info'}</button>
    {showInfo && (
      <p>
        Sleep cycles typically last about 90 minutes and consist of several stages, including
        light sleep, deep sleep, and REM (rapid eye movement) sleep. Waking up at the end of a
        cycle, rather than in the middle, helps you feel more refreshed. This calculator
        suggests the best times to wake up based on complete sleep cycles to optimize your rest.
      </p>
    )}
  </div>
)}

      <footer className="footer">  Developed by <a href="https://github.com/eduardobaia" target="_blank" rel="noopener noreferrer">Eduardo Baia</a>
      </footer>
    </div>
  );
};

export default SleepCalculator;
