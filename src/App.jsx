import React, { useState } from 'react';
import RoleSelect from './components/RoleSelect';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
  const [step, setStep] = useState('role'); // role | auth | dashboard
  const [role, setRole] = useState(null); // 'citizen' | 'official'
  const [user, setUser] = useState(null);
  const [problems, setProblems] = useState([]);

  const handleRoleSelect = (selected) => {
    setRole(selected);
    setStep('auth');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setStep('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
    setStep('role');
  };

  const addProblem = (data) => {
    const newProblem = {
      ...data,
      status: 'Submitted',
      createdAt: new Date().toISOString(),
    };
    setProblems((prev) => [newProblem, ...prev]);
  };

  const updateStatus = (index, status, proof) => {
    setProblems((prev) => prev.map((p, i) => i === index ? { ...p, status, proof: proof || p.proof } : p));
  };

  if (step === 'role') {
    return <RoleSelect onSelect={handleRoleSelect} />;
  }

  if (step === 'auth') {
    return <LoginForm role={role} onBack={() => setStep('role')} onLogin={handleLogin} />;
  }

  return (
    <Dashboard
      role={role}
      user={user}
      problems={problems}
      onAddProblem={addProblem}
      onUpdateStatus={updateStatus}
      onLogout={handleLogout}
    />
  );
}

export default App;
