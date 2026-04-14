Adex University Portal
........................

​A full-stack web application designed for a business cafe to manage university registrations, document uploads, and student records. This portal streamlines the application process and provides an administrative interface for record management.

//////////......//////
​🚀 Features
///////////.......////
​Student Registration: Interactive form for students to submit personal details, course info, and academic levels.
​Secure Document Upload: Integration with Supabase Storage for handling credentials and identity documents.
​Admin Dashboard: A private interface to search, filter, and manage student applications.
​Status Management: Ability for admins to update application statuses in real-time.
​Secure Backend: Row Level Security (RLS) policies implemented to protect sensitive student data.

​🛠 Tech Stack
.....///////////. .....
​Frontend: React.js & Tailwind CSS
​Backend/Database: Supabase (PostgreSQL)
​Storage: Supabase Buckets (for file management)
​Deployment: Netlify
​Version Control: GitHub

​📂 Project Structure

├── src
│   ├── components      # Reusable UI components (Forms, Tables, Loaders)
│   ├── pages           # Main views (Home, Admin Login, Dashboard)
│   ├── lib             # Supabase client configuration
│   └── assets          # Images and styling
├── public              # Static assets
└── supabase            # SQL migrations and security policies



🔒 Security
​This project uses Supabase Auth and Row Level Security (RLS). Ensure that the credentials bucket has the appropriate policies set so that only authenticated admins can view uploaded documents.
