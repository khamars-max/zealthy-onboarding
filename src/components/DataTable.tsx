'use client';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((r) => r.data);

export default function DataTable() {
  const { data } = useSWR('/api/users', fetcher, { refreshInterval: 3000 });

  if (!data) return null;

  return (
    <div className="p-6 overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            {['Email', 'About', 'City', 'Birthdate', 'Updated'].map((h) => (
              <th key={h} className="border px-4 py-2 text-left">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((u: any) => (
            <tr key={u._id} className="border-t">
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.aboutMe || '-'}</td>
              <td className="px-4 py-2">{u.address?.city || '-'}</td>
              <td className="px-4 py-2">
                {u.birthDate ? new Date(u.birthDate).toLocaleDateString() : '-'}
              </td>
              <td className="px-4 py-2">
                {new Date(u.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
