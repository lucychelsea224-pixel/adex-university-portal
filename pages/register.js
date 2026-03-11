import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function StudentRegister() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ 
    name: '', phone: '', course: '', program: 'Full-time', level: '100L' 
  });

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please upload at least one document");
    setLoading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileName = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from('credentials').upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('credentials').getPublicUrl(fileName);
        return data.publicUrl;
      });

      const allUrls = await Promise.all(uploadPromises);

      const { error } = await supabase.from('students').insert([{ 
        name: formData.name, 
        phone: formData.phone, 
        course: formData.course,
        program: formData.program,
        academic_level: formData.level,
        document_urls: allUrls 
      }]);

      if (error) throw error;
      alert("Application Submitted Successfully!");
      setFiles([]);
      e.target.reset();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
    <form onSubmit={handleRegistration} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-6 border-t-8 border-blue-700">
      <h2 className="text-3xl font-black text-gray-900 text-center tracking-tight">University Registration</h2>
      
      <div className="space-y-4">
          {/* Inputs with darker text and thicker borders */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
            <input type="text" placeholder="Enter your full name" required className="w-full p-4 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-400 focus:border-blue-600 focus:ring-0 outline-none transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 ml-1">WhatsApp Number</label>
            <input type="text" placeholder="e.g. 08012345678" required className="w-full p-4 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-400 focus:border-blue-600 focus:ring-0 outline-none transition-all" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700 ml-1">Course of Study</label>
            <input type="text" placeholder="e.g. Computer Science" required className="w-full p-4 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder-gray-400 focus:border-blue-600 focus:ring-0 outline-none transition-all" onChange={(e) => setFormData({...formData, course: e.target.value})} />
          </div>
      </div>

      <div>
        <p className="font-bold text-gray-900 mb-3 ml-1">Select Program:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl border-2 border-gray-100">
          {['Full-time', 'Part-time', 'Online'].map((p) => (
            <label key={p} className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.program === p ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-700 font-bold'}`}>
              <input type="radio" name="program" value={p} checked={formData.program === p} onChange={(e) => setFormData({...formData, program: e.target.value})} className="hidden" />
              {p}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-bold text-gray-900 mb-3 ml-1">Academic Level:</p>
        <select className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white text-gray-900 font-bold focus:border-blue-600 outline-none appearance-none cursor-pointer" onChange={(e) => setFormData({...formData, level: e.target.value})}>
          <option value="100L">100 Level</option>
          <option value="200L">200 Level</option>
          <option value="300L">300 Level</option>
          <option value="400L">400 Level</option>
          <option value="Graduate">Graduate</option>
        </select>
      </div>

      <div className="p-5 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/30">
        <p className="text-sm text-blue-800 font-black mb-2 uppercase tracking-wider">Upload Credentials</p>
        <input type="file" multiple required className="w-full text-sm text-gray-600 font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700" onChange={(e) => setFiles(e.target.files)} />
      </div>

      <button disabled={loading} className="w-full bg-blue-700 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-800 transition transform active:scale-95 shadow-xl shadow-blue-200">
        {loading ? "PROCESSING..." : "SUBMIT TO PORTAL"}
      </button>
    </form>
  </div>
);
}