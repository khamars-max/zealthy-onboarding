'use client'
import { FormEvent, useState } from 'react'

type Props = {
  step: number
  fields: string[]
  onSubmit: (v: any) => void
}

export default function StepForm({ step, fields, onSubmit }: Props) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [show, setShow] = useState(false)

  const update = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }))
  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(values)
  }


  if (step === 1) {
    
    return (
      <div className="max-w-md mx-auto text-center space-y-6 text-gray-900">
        <h1 className="text-4xl font-extrabold leading-tight">  
          You're on your way to<br />Prioritising yourself.
        </h1>

      
        <p className="text-gray-700">
          Already have an account?{' '}
          <a href="#" className="text-green-700 underline">
            Log in
          </a>
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email address *"
            className="w-full bg-gray-100 p-3 rounded"
            onChange={(e) => update('email', e.target.value)}
          />

          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              required
              placeholder="Create a password *"
              className="w-full bg-gray-100 p-3 rounded pr-10"
              onChange={(e) => update('password', e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {show ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-700 text-white py-3 rounded font-semibold"
          >
            Continue with email
          </button>
        </form>
      </div>
    )
  }


if (step === 2) {
  return (
    <form onSubmit={submit} className="space-y-8 text-gray-900">
      <header className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Tell us a bit more about you</h2>
        <p className="text-gray-600">
          This helps us personalise your experience.
        </p>
      </header>

      {fields.includes('aboutMe') && (
        <div className="space-y-1">
          <label className="font-medium">About me</label>
          <textarea
            className="w-full border rounded p-3 resize-none focus:ring-2 focus:ring-green-600"
            rows={4}
            placeholder="Share something about yourself..."
            onChange={(e) => update('aboutMe', e.target.value)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.includes('address') &&
          ['street', 'city', 'state', 'zip'].map((k) => (
            <div key={k} className="space-y-1 md:col-span-1">
              <label className="text-sm font-medium capitalize">{k}</label>
              <input
                className="w-full border rounded p-2 focus:ring-2 focus:ring-green-600"
                placeholder={k}
                onChange={(e) => update(`address.${k}`, e.target.value)}
              />
            </div>
          ))}

        {fields.includes('birthDate') && (
          <div className="space-y-1 md:col-span-1">
            <label className="text-sm font-medium">Birthdate</label>
            <input
              type="date"
              className="w-full border rounded p-2 focus:ring-2 focus:ring-green-600"
              onChange={(e) => update('birthDate', e.target.value)}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-800 hover:bg-green-700 text-white py-3 rounded font-semibold"
      >
        Continue
      </button>
    </form>
  )
}




  return (
    <form onSubmit={submit} className="space-y-4">
      {fields.includes('aboutMe') && (
        <>
          <label className="text-black">About me</label>
          <textarea
            className="w-full border p-2 rounded text-black"
            rows={4}
            placeholder="About me..."
            onChange={(e) => update('aboutMe', e.target.value)}
          />
        </>
      )}

      {fields.includes('address') && (
        <>
          {['street', 'city', 'state', 'zip'].map((k) => (
            <div key={k} className="space-y-1">
              <label className="text-sm text-black capitalize">{k}</label>
              <input
                className="w-full border p-2 rounded text-black"
                placeholder={k}
                onChange={(e) => update(`address.${k}`, e.target.value)}
              />
            </div>
          ))}
        </>
      )}

      {fields.includes('birthDate') && (
        <>
          <label className="text-black">Birthdate</label>
          <input
            className="w-full border p-2 rounded text-black"
            type="date"
            onChange={(e) => update('birthDate', e.target.value)}
          />
        </>
      )}

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  )
}
