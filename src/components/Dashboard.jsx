import React, { useMemo, useState } from 'react';
import { User, LogOut, Upload, ListChecks, CheckCircle2, Clock4, Image as ImageIcon, Settings } from 'lucide-react';
import ProblemUploadForm from './ProblemUploadForm';

export default function Dashboard({ role, user, problems, onAddProblem, onUpdateStatus, onLogout }) {
  const [tab, setTab] = useState(role === 'citizen' ? 'upload' : 'assigned');
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '' });

  const myProblems = useMemo(() => {
    if (role === 'citizen') {
      return problems.filter((p) => p.createdBy === user.emailOrUsername || user.name === 'Citizen');
    }
    // Simplified: officials see all problems in their department
    return problems.filter((p) => p.department === user.department || user.department === 'Municipal Services');
  }, [problems, role, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700"><User size={20}/></div>
            <div>
              <div className="font-semibold text-slate-900">{role === 'citizen' ? 'Citizen Dashboard' : 'Official Dashboard'}</div>
              <div className="text-sm text-slate-500">Welcome, {user.name || user.userId}</div>
            </div>
          </div>

          <button onClick={onLogout} className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <LogOut size={18}/> Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-2">
          {role === 'citizen' ? (
            <>
              <SidebarButton icon={<Upload size={18}/>} label="Upload Problem" active={tab==='upload'} onClick={() => setTab('upload')} />
              <SidebarButton icon={<ListChecks size={18}/>} label="My Problems" active={tab==='my'} onClick={() => setTab('my')} />
              <SidebarButton icon={<User size={18}/>} label="Profile" active={tab==='profile'} onClick={() => setTab('profile')} />
              <SidebarButton icon={<Settings size={18}/>} label="Reset Password" active={tab==='reset'} onClick={() => setTab('reset')} />
            </>
          ) : (
            <>
              <SidebarButton icon={<ListChecks size={18}/>} label="Assigned Problems" active={tab==='assigned'} onClick={() => setTab('assigned')} />
              <SidebarButton icon={<User size={18}/>} label="Profile" active={tab==='profile'} onClick={() => setTab('profile')} />
              <SidebarButton icon={<Settings size={18}/>} label="Reset Password" active={tab==='reset'} onClick={() => setTab('reset')} />
            </>
          )}
        </aside>

        <section className="lg:col-span-3">
          {role === 'citizen' && tab === 'upload' && (
            <Card title="Report a municipal problem">
              <ProblemUploadForm onSubmit={(data) => onAddProblem({ ...data, createdBy: user.emailOrUsername || 'citizen' })} />
            </Card>
          )}

          {((role === 'citizen' && tab === 'my') || (role === 'official' && tab === 'assigned')) && (
            <Card title={role === 'citizen' ? 'My Reported Problems' : 'Assigned Problems'}>
              <div className="grid gap-4">
                {myProblems.length === 0 && (
                  <div className="text-slate-500">No problems yet.</div>
                )}
                {myProblems.map((p, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200 p-4 bg-white">
                    <div className="flex flex-col md:flex-row gap-4">
                      {p.image ? (
                        <img src={p.image} alt="problem" className="h-28 w-40 object-cover rounded-lg border" />
                      ) : (
                        <div className="h-28 w-40 rounded-lg border flex items-center justify-center text-slate-400 bg-slate-50"><ImageIcon size={24}/></div>
                      )}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge>{p.department}</Badge>
                          <Badge tone="amber">{p.priority}</Badge>
                          <StatusBadge status={p.status} />
                        </div>
                        <p className="text-slate-700 mt-2">{p.description || 'No description provided.'}</p>
                        {(p.lat || p.lng) && (
                          <p className="text-sm text-slate-500 mt-1">Location: {p.lat}, {p.lng}</p>
                        )}

                        {role === 'official' && (
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => onUpdateStatus(idx, 'On Process')}
                              className="px-3 py-1.5 rounded-lg border text-slate-700 hover:bg-slate-50"
                            >
                              Mark On Process
                            </button>
                            <label className="px-3 py-1.5 rounded-lg border bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer">
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = (ev) => onUpdateStatus(idx, 'Completed', ev.target.result);
                                reader.readAsDataURL(file);
                              }} />
                              Upload Proof & Complete
                            </label>
                          </div>
                        )}

                        {p.proof && (
                          <div className="mt-3">
                            <div className="text-sm text-slate-600 mb-1">Completion Proof:</div>
                            <img src={p.proof} alt="proof" className="h-28 w-40 object-cover rounded border" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'profile' && (
            <Card title="Profile">
              {role === 'citizen' ? (
                <div className="space-y-2 text-slate-700">
                  <p><span className="text-slate-500">Name:</span> {user.name || 'Citizen'}</p>
                  <p><span className="text-slate-500">Email/Username:</span> {user.emailOrUsername || '—'}</p>
                  <p><span className="text-slate-500">Reports submitted:</span> {myProblems.length}</p>
                </div>
              ) : (
                <div className="space-y-2 text-slate-700">
                  <p><span className="text-slate-500">Name:</span> {user.name}</p>
                  <p><span className="text-slate-500">User ID:</span> {user.userId}</p>
                  <p><span className="text-slate-500">Department:</span> {user.department} ({user.departmentId})</p>
                  <p><span className="text-slate-500">Problems in queue:</span> {myProblems.length}</p>
                </div>
              )}
            </Card>
          )}

          {tab === 'reset' && (
            <Card title="Reset Password">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Password updated successfully (demo only)');
                  setPasswordForm({ current: '', next: '' });
                }}
                className="space-y-4"
              >
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordForm.next}
                  onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
                  required
                />
                <button className="bg-slate-900 text-white px-4 py-2 rounded-lg">Update Password</button>
              </form>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}

function SidebarButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 rounded-lg border ${
        active ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
      }`}
    >
      <span className="inline-flex items-center gap-2">{icon} {label}</span>
    </button>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Badge({ children, tone = 'sky' }) {
  const tones = {
    sky: 'bg-sky-50 text-sky-700 ring-sky-200',
    amber: 'bg-amber-50 text-amber-700 ring-amber-200',
    emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    slate: 'bg-slate-50 text-slate-700 ring-slate-200',
  };
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full ring-1 ${tones[tone]}`}>{children}</span>
  );
}

function StatusBadge({ status }) {
  let content = (
    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ring-1 bg-slate-50 text-slate-700 ring-slate-200">
      <Clock4 size={14}/> Submitted
    </span>
  );
  if (status === 'On Process') {
    content = (
      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ring-1 bg-amber-50 text-amber-700 ring-amber-200">
        <Clock4 size={14}/> On Process
      </span>
    );
  } else if (status === 'Completed') {
    content = (
      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ring-1 bg-emerald-50 text-emerald-700 ring-emerald-200">
        <CheckCircle2 size={14}/> Completed
      </span>
    );
  }
  return content;
}
