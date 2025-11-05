import React from 'react';
import { Users, Shield } from 'lucide-react';

export default function RoleSelect({ onSelect }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50 p-6">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 border border-slate-100">
        <h1 className="text-3xl font-bold text-slate-900 text-center">Welcome to Civic Connect</h1>
        <p className="text-slate-600 text-center mt-2">Report municipal issues or resolve them as an official</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <button
            onClick={() => onSelect('citizen')}
            className="group rounded-xl border border-slate-200 p-6 hover:border-sky-300 hover:shadow-lg transition bg-white"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-sky-100 text-sky-700 group-hover:bg-sky-200">
                <Users size={28} />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-semibold text-slate-900">I am a Citizen</h2>
                <p className="text-slate-600">Report problems with photo, details and location.</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelect('official')}
            className="group rounded-xl border border-slate-200 p-6 hover:border-indigo-300 hover:shadow-lg transition bg-white"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-indigo-100 text-indigo-700 group-hover:bg-indigo-200">
                <Shield size={28} />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-semibold text-slate-900">I am an Official</h2>
                <p className="text-slate-600">View assigned issues, update status, and upload proof.</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
