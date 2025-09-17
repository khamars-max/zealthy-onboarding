'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StepForm from './StepForm';

type Config = { step2: string[]; step3: string[] } | null;

export default function Wizard() {
  const [config, setConfig] = useState<Config>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    (async () => {
      const cfgRes = await axios.get('/api/config');
      setConfig(cfgRes.data || { step2: ['aboutMe'], step3: ['address'] });

      const email = localStorage.getItem('tempEmail');
      if (email) {
        const { data } = await axios.get('/api/users', { params: { email } });
        if (data?.length) {
          setStep(data[0].onboardingStep);
          setFormData(data[0]);
        }
      }
    })();
  }, []);

  if (!config) return null;

  const stepsMap: Record<number, string[]> = {
    1: ['email', 'password'],
    2: config.step2,
    3: config.step3,
  };

  const handleSubmit = async (values: any) => {
    const next = { ...formData, ...values };
    setFormData(next);

    await axios.post('/api/users', {
      ...next,
      onboardingStep: Math.min(step + 1, 3),
    });

    if (step === 1) localStorage.setItem('tempEmail', values.email);
    if (step < 3) setStep(step + 1);
    else {
      alert('🎉 Onboarding complete!');
      localStorage.removeItem('tempEmail');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <div className="flex mb-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 mx-1 ${s <= step ? 'bg-blue-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
      <StepForm fields={stepsMap[step]} onSubmit={handleSubmit} />
    </div>
  );
}
