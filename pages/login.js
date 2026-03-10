import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Attempt to sign in with Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Access Denied: " + error.message);
    } else {
      // If successful, send the admin to the dashboard
      router.push('/admin'); 
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Cafe Owner</h2>
          <p className="text-gray-500 mt-2">Log in to manage prints</p>
        </div>

        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Admin Email" 
            required 
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button disabled={loading} className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg">
          {loading ? "Verifying..." : "Open Dashboard"}
        </button>
      </form>
    </div>
  );
}