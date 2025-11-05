import React, { useState } from 'react';
import { Mail, User, Lock, Phone, Building2, IdCard } from 'lucide-react';

export default function LoginForm({ role, onBack, onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    emailOrUsername: '',
    password: '',
    name: '',
    mobile: '',
    department: '',
    departmentId: '',
    userId: '',
  });

  const isOfficial = role === 'official';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOfficial && isSignup) {
      // Simulate account creation
      const user = {
        role,
        name: form.name || 'Official',
        mobile: form.mobile,
        department: form.department,
        departmentId: form.departmentId,
        userId: form.userId || form.emailOrUsername || 'official001',
      };
      onLogin(user);
    } else if (isOfficial) {
      const user = {
        role,
        name: 'Official User',
        userId: form.userId || 'official001',
        department: 'Municipal Services',
        departmentId: 'D-1001',
      };
      onLogin(user);
    } else {
      const user = {
        role,
        name: 'Citizen',
        emailOrUsername: form.emailOrUsername,
      };
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50 p-6">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 border border-slate-100">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-700">&larr; Back</button>
        <h2 className="text-2xl font-semibold text-slate-900 mt-2">
          {isOfficial ? (isSignup ? 'Official Signup' : 'Official Login') : 'Citizen Login'}
        </h2>
        <p className="text-slate-600 mb-6">{isOfficial ? 'Access your official dashboard' : 'Access your citizen dashboard'}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isOfficial && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="text"
                required
                placeholder="Email or Username"
                value={form.emailOrUsername}
                onChange={(e) => setForm({ ...form, emailOrUsername: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>
          )}

          {isOfficial && !isSignup && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <IdCard size={18} />
              </div>
              <input
                type="text"
                required
                placeholder="User ID"
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
          )}

          {isOfficial && isSignup && (
            <>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="Mobile Number"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Building2 size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Department"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <IdCard size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Department ID"
                  value={form.departmentId}
                  onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>
            </>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock size={18} />
            </div>
            <input
              type="password"
              required
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 outline-none ${
                isOfficial ? 'border-indigo-200 focus:ring-indigo-400' : 'border-sky-200 focus:ring-sky-400'
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg font-medium text-white shadow ${
              isOfficial ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-sky-600 hover:bg-sky-700'
            }`}
          >
            {isOfficial ? (isSignup ? 'Create Account' : 'Login') : 'Login'}
          </button>
        </form>

        {isOfficial && (
          <div className="mt-4 text-center text-slate-600">
            {isSignup ? (
              <span>
                Already have an account?{' '}
                <button className="text-indigo-600 hover:underline" onClick={() => setIsSignup(false)}>
                  Login
                </button>
              </span>
            ) : (
              <span>
                New official?{' '}
                <button className="text-indigo-600 hover:underline" onClick={() => setIsSignup(true)}>
                  Create account
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
