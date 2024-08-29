import React, { useState, useEffect } from 'react';

const TimeBlockVisualizer = () => {
  const [blocks, setBlocks] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateBlocks = () => {
      const now = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
      now = new Date(now);
      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0);
      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0, 0);
      
      const totalMinutes = (endTime - startTime) / (1000 * 60);
      const elapsedMinutes = Math.max(0, (now - startTime) / (1000 * 60));
      const remainingMinutes = Math.max(0, totalMinutes - elapsedMinutes);

      const totalBlocks = 16;
      const filledBlocks = Math.min(totalBlocks, Math.floor((remainingMinutes / totalMinutes) * totalBlocks));

      setBlocks(Array(totalBlocks).fill(0).map((_, i) => i < filledBlocks ? '⣿' : '⣀'));
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: "America/Los_Angeles" }));
    };

    updateBlocks();
    const intervalId = setInterval(updateBlocks, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const renderBlocks = () => {
    const firstGroup = blocks.slice(0, 8).join('');
    const secondGroup = blocks.slice(8, 10).join('');
    const thirdGroup = blocks.slice(10).join('');
    return [
      `| ${firstGroup} | ${secondGroup} | ${thirdGroup} |`,
      '        4hr            1hr       3hr'
    ];
  };

  return (
    <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      <div>8am-4pm Day PST (Current time: {currentTime})</div>
      {renderBlocks().map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      <div></div>
      <div>Total blocks: 16</div>
      <div>Remaining: {blocks.filter(b => b === '⣿').length}</div>
      <div>Passed: {blocks.filter(b => b === '⣀').length}</div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <TimeBlockVisualizer />
    </div>
  );
}

export default App;