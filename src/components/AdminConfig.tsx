'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const components = ['aboutMe', 'address', 'birthDate'];

export default function AdminConfig() {
  const [step2, setStep2] = useState<string[]>([]);
  const [step3, setStep3] = useState<string[]>([]);

  useEffect(() => {
    axios.get('/api/config').then(({ data }) => {
      if (data) {
        setStep2(data.step2);
        setStep3(data.step3);
      } else {
        setStep2(['aboutMe']);
        setStep3(['address']);
      }
    });
  }, []);

  const toggle = (step: 2 | 3, val: string) => {
    const state = step === 2 ? step2 : step3;
    const setter = step === 2 ? setStep2 : setStep3;
    setter(state.includes(val) ? state.filter((c) => c !== val) : [...state, val]);
  };

  const save = async () => {
    if (!step2.length || !step3.length) {
      alert('Each step must have at least one component');
      return;
    }
    await axios.post('/api/config', { step2, step3 });
    alert('Saved!');
  };

  const renderChecks = (state: string[], step: 2 | 3) =>
    components.map((c) => (
      <label key={`${step}-${c}`} className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={state.includes(c)}
          onChange={() => toggle(step, c)}
        />
        <span>{c}</span>
      </label>
    ));

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-6">
      <h1 className="text-xl font-semibold">Admin Config</h1>
      <div>
        <h2 className="font-medium mb-2">Step 2 components</h2>
        <div className="space-y-1">{renderChecks(step2, 2)}</div>
      </div>
      <div>
        <h2 className="font-medium mb-2">Step 3 components</h2>
        <div className="space-y-1">{renderChecks(step3, 3)}</div>
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={save}>
        Save
      </button>
    </div>
  );
}
