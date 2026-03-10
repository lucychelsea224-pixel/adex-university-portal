import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black flex flex-col items-center justify-center p-6 text-white">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight">Cafe Document Portal</h1>
        <p className="text-blue-200 text-lg">Fast printing for students, easy management for owners.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* STUDENT BOX */}
        <Link href="/register" className="group p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl hover:bg-blue-600 transition-all duration-300 shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 group-hover:scale-105 transition-transform">For Students</h2>
          <p className="text-blue-100 mb-6">Upload your PDFs or Images and send them straight to the printer queue.</p>
          <span className="inline-block bg-white text-blue-900 px-6 py-2 rounded-full font-bold">Upload Files →</span>
        </Link>

        {/* ADMIN BOX */}
        <Link href="/login" className="group p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl hover:bg-gray-800 transition-all duration-300 shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 group-hover:scale-105 transition-transform">For Cafe Owner</h2>
          <p className="text-blue-100 mb-6">Log in to view student submissions, download files, and manage the queue.</p>
          <span className="inline-block bg-white text-gray-900 px-6 py-2 rounded-full font-bold">Admin Login →</span>
        </Link>
      </div>

      <footer className="mt-16 text-blue-300/50 text-sm">
        Built for Speed • Powered by Supabase
      </footer>
    </div>
  );
}