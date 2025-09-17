"use client";
import { FormEvent, useState } from "react";

type Props = { fields: string[]; onSubmit: (v: any) => void };

export default function StepForm({ fields, onSubmit }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});

  const update = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {fields.includes("email") && (
        <>
          <label className="text-black">Email</label>
          <input
            className="w-full border p-2 rounded text-black"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => update("email", e.target.value)}
          />
        </>
      )}
      {fields.includes("password") && (
        <>
          <label className="text-black">Password</label>
          <input
            className="w-full border p-2 rounded text-black"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => update("password", e.target.value)}
          />
        </>
      )}
      {fields.includes("aboutMe") && (
        <>
          <label className="text-black">About me</label>
          <textarea
            className="w-full border p-2 rounded text-black"
            rows={4}
            placeholder="About me..."
            onChange={(e) => update("aboutMe", e.target.value)}
          />
        </>
      )}

      {fields.includes("address") && (
        <>
          {["street", "city", "state", "zip"].map((k) => (
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
      {fields.includes("birthDate") && (
        <>
          <label className="text-black">Birthdate</label>
          <input
            className="w-full border p-2 rounded text-black"
            type="date"
            onChange={(e) => update("birthDate", e.target.value)}
          />
        </>
      )}
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Continue
      </button>
    </form>
  );
}
