import React, { useState, useEffect } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({ 
    groupManagement: { autoKick: false },
    blockList: [],
    silentMode: []
  });
  const [newNum, setNewNum] = useState('');

  useEffect(() => {
    fetch('/api/config').then(res => res.json()).then(data => setSettings(data));
  }, []);

  const saveSettings = async (updatedSettings) => {
    await fetch('/api/config', {
      method: 'POST',
      body: JSON.stringify(updatedSettings),
      headers: { 'Content-Type': 'application/json' }
    });
    setSettings(updatedSettings);
    alert('Saved!');
  };

  const addBlock = () => {
    const updated = { ...settings, blockList: [...settings.blockList, newNum] };
    saveSettings(updated);
    setNewNum('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Settings</h1>
      
      <section>
        <h3>Group Management</h3>
        <label>
          <input type="checkbox" checked={settings.groupManagement.autoKick} 
            onChange={(e) => saveSettings({...settings, groupManagement: { autoKick: e.target.checked }})} />
          Auto-Kick
        </label>
      </section>

      <section style={{ marginTop: '20px' }}>
        <h3>Block List</h3>
        <input value={newNum} onChange={(e) => setNewNum(e.target.value)} placeholder="Nomor HP" />
        <button onClick={addBlock}>Add</button>
        <ul>
          {settings.blockList.map(n => <li key={n}>{n}</li>)}
        </ul>
      </section>
    </div>
  );
}
