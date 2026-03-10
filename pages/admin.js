import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const fetchStudents = async () => {
    let query = supabase.from('students').select('*');
    if (search) query = query.ilike('name', `%${search}%`);
    const { data } = await query.order('created_at', { ascending: false });
    setStudents(data || []);
  };

  const updateStatus = async (id, newStatus) => {
    await supabase.from('students').update({ status: newStatus }).eq('id', id);
    fetchStudents();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Cafe Admin</h1>
        <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">Total: {students.length}</div>
      </div>

      <input type="text" placeholder="Search student name..." className="w-full p-4 border rounded-xl mb-8 shadow-sm outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setSearch(e.target.value)} />

      <div className="grid gap-4">
        {students.map((s) => (
          <div key={s.id} className={`p-6 bg-white rounded-xl shadow-sm border flex justify-between items-start ${s.status === 'Printed' ? 'opacity-50' : ''}`}>
            <div>
              <div className="flex items-center gap-3">
                <p className="font-bold text-xl text-gray-900">{s.name}</p>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold uppercase">{s.program}</span>
              </div>
              <p className="text-gray-600 font-medium">{s.course} • {s.academic_level}</p>
              <p className="text-gray-400 text-sm mb-4">{s.phone}</p>
              
              <div className="flex flex-wrap gap-2">
                {s.document_urls?.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noreferrer" className="text-xs bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200 font-bold text-gray-700">File {i + 1}</a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className={`text-center text-xs font-bold p-1 rounded ${s.status === 'Printed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{s.status}</span>
              {s.status !== 'Printed' && (
                <button onClick={() => updateStatus(s.id, 'Printed')} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700">Mark Done</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}