import React, { useEffect, useState } from 'react';
import { Upload, Image as ImageIcon, MapPin, Building2, AlertTriangle } from 'lucide-react';

export default function ProblemUploadForm({ onSubmit }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [form, setForm] = useState({
    department: '',
    priority: 'Medium',
    description: '',
    lat: '',
    lng: '',
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setForm((f) => ({ ...f, lat: latitude.toFixed(6), lng: longitude.toFixed(6) }));
        },
        () => {
          // Ignore errors; user can input manually
        }
      );
    }
  }, []);

  const handleImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, image: imagePreview });
    setImagePreview(null);
    setForm({ department: '', priority: 'Medium', description: '', lat: '', lng: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="flex items-center gap-2 text-slate-700 font-medium"><Building2 size={18}/> Department</span>
          <select
            required
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
          >
            <option value="" disabled>Select department</option>
            <option>Sanitation</option>
            <option>Road Works</option>
            <option>Water Supply</option>
            <option>Electrical</option>
            <option>Parks & Public Spaces</option>
          </select>
        </label>

        <label className="block">
          <span className="flex items-center gap-2 text-slate-700 font-medium"><AlertTriangle size={18}/> Priority</span>
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="flex items-center gap-2 text-slate-700 font-medium"><ImageIcon size={18}/> Problem Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImage(e.target.files[0])}
          className="mt-1 w-full rounded-lg border border-dashed border-slate-300 px-3 py-2"
        />
        {imagePreview && (
          <img src={imagePreview} alt="preview" className="mt-3 h-40 w-full object-cover rounded-lg border" />
        )}
      </label>

      <label className="block">
        <span className="flex items-center gap-2 text-slate-700 font-medium">Description</span>
        <textarea
          rows={4}
          placeholder="Describe the issue..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="flex items-center gap-2 text-slate-700 font-medium"><MapPin size={18}/> Latitude</span>
          <input
            type="text"
            placeholder="e.g. 12.9716"
            value={form.lat}
            onChange={(e) => setForm({ ...form, lat: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
          />
        </label>
        <label className="block">
          <span className="flex items-center gap-2 text-slate-700 font-medium"><MapPin size={18}/> Longitude</span>
          <input
            type="text"
            placeholder="e.g. 77.5946"
            value={form.lng}
            onChange={(e) => setForm({ ...form, lng: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
          />
        </label>
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg shadow"
      >
        <Upload size={18}/> Submit Problem
      </button>
    </form>
  );
}
