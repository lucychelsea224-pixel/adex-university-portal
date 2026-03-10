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
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <form onSubmit={handleRegistration} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-5 border-t-8 border-blue-600">
        <h2 className="text-2xl font-bold text-gray-800 text-center">University Registration</h2>
        
        <div className="space-y-3">
            <input type="text" placeholder="Full Name" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input type="text" placeholder="WhatsApp Number" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            <input type="text" placeholder="Course of Study" required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" onChange={(e) => setFormData({...formData, course: e.target.value})} />
        </div>

        <div>
          <p className="font-semibold text-gray-700 mb-2">Select Program:</p>
          <div className="flex flex-wrap gap-4 bg-gray-50 p-3 rounded-lg border">
            {['Full-time', 'Part-time', 'Online'].map((p) => (
              <label key={p} className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                <input type="radio" name="program" value={p} checked={formData.program === p} onChange={(e) => setFormData({...formData, program: e.target.value})} className="w-4 h-4 text-blue-600" />
                {p}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-700 mb-2">Academic Level:</p>
          <select className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none" onChange={(e) => setFormData({...formData, level: e.target.value})}>
            <option value="100L">100 Level</option>
            <option value="200L">200 Level</option>
            <option value="300L">300 Level</option>
            <option value="400L">400 Level</option>
            <option value="Graduate">Graduate</option>
          </select>
        </div>

        <div className="p-4 border-2 border-dashed rounded-lg bg-blue-50/50">
          <p className="text-xs text-blue-600 font-bold mb-2">Upload Credentials (PDF/Images)</p>
          <input type="file" multiple required className="w-full text-sm" onChange={(e) => setFiles(e.target.files)} />
        </div>

        <button disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition transform active:scale-95 shadow-md">
          {loading ? "Uploading Application..." : "Submit to Portal"}
        </button>
      </form>
    </div>
  );
}