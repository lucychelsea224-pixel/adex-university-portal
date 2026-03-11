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

  const deleteRecord = async (id) => {
    if(confirm("Permanently delete this student record?")) {
        const { error } = await supabase.from('students').delete().eq('id', id);
        if (error) alert("Error deleting: " + error.message);
        fetchStudents();
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto min-h-screen bg-gray-100 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-black text-gray-900">Adex Cafe Admin</h1>
            <p className="text-gray-600 font-bold uppercase text-xs tracking-widest">University Portal Management</p>
        </div>
        <div className="bg-blue-700 text-white px-6 py-3 rounded-2xl font-black shadow-lg">
            Active Jobs: {students.length}
        </div>
      </div>

      <input 
        type="text" 
        placeholder="🔍 Search student name..." 
        className="w-full p-5 border-4 border-white rounded-2xl mb-8 shadow-sm focus:border-blue-600 outline-none transition text-gray-900 font-bold text-lg" 
        onChange={(e) => setSearch(e.target.value)} 
      />

      <div className="grid gap-6">
        {students.map((s) => (
          <div key={s.id} className={`p-6 bg-white rounded-3xl shadow-md border-l-[12px] flex flex-col md:flex-row justify-between items-start gap-6 transition ${s.status === 'Printed' ? 'border-green-600 opacity-80' : 'border-blue-700'}`}>
            <div className="space-y-3 w-full">
              <div className="flex items-center gap-3">
                <p className="font-black text-2xl text-gray-900">{s.name}</p>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-black uppercase tracking-tighter">{s.program}</span>
              </div>
              
              <p className="text-gray-800 font-extrabold text-lg">
                {s.course} <span className="text-blue-700 mx-2">|</span> {s.academic_level}
              </p>
              
              <p className="text-gray-500 font-bold bg-gray-50 p-2 rounded-lg inline-block border border-gray-200">📞 {s.phone}</p>
              
              <div className="pt-4 flex flex-wrap gap-3">
                {s.document_urls?.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noreferrer" className="text-sm bg-blue-50 border-2 border-blue-200 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition font-black text-blue-800">
                    VIEW DOC {i + 1}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
              <span className={`text-center px-4 py-2 rounded-xl text-xs font-black uppercase ring-2 ring-inset ${s.status === 'Printed' ? 'bg-green-100 text-green-800 ring-green-600' : 'bg-yellow-100 text-yellow-800 ring-yellow-600'}`}>
                {s.status}
              </span>
              
              <div className="flex flex-1 md:flex-col gap-2">
                {s.status !== 'Printed' && (
                  <button onClick={() => updateStatus(s.id, 'Printed')} className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl font-black hover:bg-green-700 shadow-md transition uppercase text-sm">
                    Mark Done
                  </button>
                )}
                
                {/* THE RED DELETE BUTTON IS BACK HERE */}
                <button onClick={() => deleteRecord(s.id)} className="flex-1 bg-red-100 text-red-700 px-6 py-3 rounded-xl font-black hover:bg-red-700 hover:text-white transition border-2 border-red-200 uppercase text-sm">
                   Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {students.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-4 border-dashed border-gray-200">
            <p className="text-gray-400 font-black text-2xl">No applications found.</p>
          </div>
        )}
      </div>
    </div>
  );
}