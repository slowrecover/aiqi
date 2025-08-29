'use client';

import { useState, useEffect } from 'react';

export default function Debug() {
  const [data, setData] = useState<any>({});
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const loadData = () => {
      const allData: any = {};
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('aiiq_')) {
          const value = localStorage.getItem(key);
          try {
            allData[key] = JSON.parse(value || '');
          } catch {
            allData[key] = value;
          }
        }
      });
      setData(allData);
    };
    loadData();
  }, [refresh]);

  const addTestData = () => {
    const current = parseInt(localStorage.getItem('aiiq_total_tests') || '0');
    localStorage.setItem('aiiq_total_tests', (current + 1).toString());
    
    const scores = JSON.parse(localStorage.getItem('aiiq_all_scores') || '[]');
    scores.push(Math.floor(Math.random() * 100));
    localStorage.setItem('aiiq_all_scores', JSON.stringify(scores));
    
    setRefresh(r => r + 1);
  };

  const clearAll = () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('aiiq_')) {
        localStorage.removeItem(key);
      }
    });
    setRefresh(r => r + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Debug Dashboard</h1>
      
      <div className="space-x-4 mb-6">
        <button 
          onClick={addTestData}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Add Fake Test
        </button>
        <button 
          onClick={clearAll}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Clear All Data
        </button>
        <button 
          onClick={() => setRefresh(r => r + 1)}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white/10 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">LocalStorage Data:</h2>
        <pre className="text-sm overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>Total Tests: {data.aiiq_total_tests || 0}</p>
        <p>Scores Count: {data.aiiq_all_scores ? JSON.parse(data.aiiq_all_scores).length : 0}</p>
      </div>
    </div>
  );
}