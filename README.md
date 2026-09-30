# Placement 360 - Campus Placement Management Platform

A modern, professional Placement Management System designed to handle all campus recruitment activities, built with React and powered by a Supabase PostgreSQL backend.

This system replaces traditional spreadsheet-based placement tracking with a centralized, real-time DBMS solution that eliminates data redundancy and inconsistency across departments.

## ✨ Features

- **Real-time Dashboard:** Track overall placement statistics, top recruiting companies, and real-time student placement rates.
- **Student Directory:** A unified view of all student records across multiple tables (Placed, Not Placed, Non-Placement). Includes advanced filtering and real-time Supabase syncing.
- **Company Management:** Track partner companies, their active recruitment drives, and highest packages offered.
- **Placement Drives:** Manage upcoming and active recruitment events, including eligibility criteria and applicant tracking.
- **Application Tracking:** Monitor student applications through various interview stages.
- **Advanced Analytics:** Visual reports generated with Recharts to break down placement data by department and status.
- **SQL Console:** A dedicated interface for executing raw SQL queries directly against the DBMS (for educational/administrative purposes).

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **UI Components:** Lucide React (Icons), Custom Accessible Components
- **Data Visualization:** Recharts
- **Backend / DBMS:** Supabase (PostgreSQL)

## 🗄️ Database Architecture

The system uses a relational database architecture to enforce data integrity:

1. \`student_details\` - The master table containing all registered students.
2. \`placed\` - A strict table for students who have secured a job (Foreign Key to \`student_details\`).
3. \`not_placed\` - Tracks students actively seeking placement.
4. \`non_placement\` - Tracks students who opted out for higher studies or business.

*Triggers and constraints automatically move or delete records across these tables to prevent anomalies.*

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A Supabase Project (PostgreSQL)

### 1. Database Setup
1. Create a new Supabase project.
2. Open the **SQL Editor** in your Supabase dashboard.
3. Copy the contents of \`supabase_schema.sql\` and run it to create the necessary tables and relationships.
4. (Optional) Run \`bulk_import.sql\` to populate the database with dummy student records.

### 2. Environment Variables
Rename \`.env.example\` to \`.env\` and add your Supabase credentials:
\`\`\`env
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

### 3. Installation & Execution
\`\`\`bash
# Install dependencies
npm install

# Start the development server
npm run dev
\`\`\`

## 📸 Screenshots
*(Add screenshots of the Dashboard, Students view, and Analytics here)*

## 🔮 Future Improvements
- Role-based authentication (Admin vs. Student login)
- Automated email triggers when a student's status changes
- Resume upload and parsing integration

---
Built as a comprehensive DBMS project to solve institutional data fragmentation.
