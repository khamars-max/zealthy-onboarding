'use client'
if(typeof window !=='undefined') localStorage.removeItem('tempEmail')
import { useEffect, useState } from 'react'
import axios from 'axios'
import StepForm from './StepForm'

type Config = { step2: string[]; step3: string[] }

export default function Wizard() {
  const [config, setConfig] = useState<Config>({
    step2: ['aboutMe'],
    step3: ['birthDate'],
  })
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})

  const mapFields = (s: number, cfg: Config) =>
    s === 1 ? ['email', 'password'] : s === 2 ? cfg.step2 : cfg.step3

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get('/api/config')
      const safe: Config = {
        step2: data?.step2?.length ? data.step2 : ['aboutMe'],
        step3: data?.step3?.length ? data.step3 : ['address'],
      }
      setConfig(safe)

      const email = localStorage.getItem('tempEmail')
      if (email) {
        const res = await axios.get('/api/users', { params: { email } })
        if (res.data?.length) {
          const saved = res.data[0]
          
          if (saved.onboardingStep >= 3) {
            localStorage.removeItem('tempEmail')
            setStep(saved.onboardingStep)
            setFormData(saved)
          } else {
            setStep(saved.onboardingStep)
            setFormData(saved)
            
          }
        } else {
          localStorage.removeItem('tempEmail')
        }
      }
    })()
  }, [])

  const stepsMap: Record<number, string[]> = {
    1: ['email', 'password'],
    2: config.step2,
    3: config.step3,
  }

  const handleSubmit = async (values: Record<string, any>) => {
    const nextData = { ...formData, ...values }
    setFormData(nextData)

    await axios.post('/api/users', {
      ...nextData,
      onboardingStep: Math.min(step + 1, 3),
    })

    if (step === 1) localStorage.setItem('tempEmail', values.email)
    if (step < 3) setStep(step + 1)
    else {
      alert('🎉 Onboarding complete!')
      localStorage.removeItem('tempEmail')
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <button
      onClick={() => {
        localStorage.removeItem('tempEmail');
        location.reload();
      }}
      className="text-sm text-black text-sm text-black underline mb-2 border border-black rounded px-3 py-[2px] mb-2"
    >
      Start over
    </button>
      <div className="flex mb-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 mx-1 ${s <= step ? 'bg-blue-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
      <StepForm step={step} fields={stepsMap[step]} onSubmit={handleSubmit} />
    </div>
  )
}
