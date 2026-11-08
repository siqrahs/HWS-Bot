'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/logs');
      const data = await res.json();
      setLogs(data);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bot WhatsApp Status</h1>
      <div style={{ background: '#000', color: '#0f0', padding: '10px', height: '200px', overflowY: 'scroll' }}>
        {logs.map((log, i) => <div key={i}>[{log.time}] {log.msg}</div>)}
      </div>
    </div>
  );
}
