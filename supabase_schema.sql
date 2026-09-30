-- Supabase SQL Schema for Placement 360

-- 1. Create student_details (Master Table)
CREATE TABLE IF NOT EXISTS student_details (
    regno VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dept VARCHAR(20),
    cgpa DECIMAL(3,2),
    backlogs INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Not Placed'
);

-- 2. Create not_placed table
CREATE TABLE IF NOT EXISTS not_placed (
    regno VARCHAR(20) PRIMARY KEY REFERENCES student_details(regno) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    dept VARCHAR(20),
    cgpa DECIMAL(3,2),
    backlogs INT DEFAULT 0
);

-- 3. Create placed table
CREATE TABLE IF NOT EXISTS placed (
    "S.No" SERIAL PRIMARY KEY,
    "Register No" VARCHAR(20) UNIQUE REFERENCES student_details(regno) ON DELETE CASCADE,
    "Student Name" VARCHAR(100) NOT NULL,
    "Career Path" VARCHAR(20) CHECK ("Career Path" IN ('on-campus', 'off-campus')),
    "Department" VARCHAR(20),
    "Company Name" VARCHAR(100)
);

-- 4. Create non_placement table
CREATE TABLE IF NOT EXISTS non_placement (
    regno VARCHAR(20) PRIMARY KEY REFERENCES student_details(regno) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    dept VARCHAR(20),
    cgpa DECIMAL(3,2),
    purpose VARCHAR(100)
);

-- Insert Dummy Data into student_details
INSERT INTO student_details (regno, name, dept, cgpa, backlogs, status) VALUES
('714025104001', 'Kishore S', 'CSE', 9.1, 0, 'Placed'),
('714025104002', 'Jeevinth M', 'CSE', 8.9, 0, 'Placed'),
('714025104003', 'Aarav Sharma', 'CSE', 9.4, 0, 'Non-Placement'),
('714025104004', 'Karthik R', 'ECE', 7.4, 1, 'Not Placed'),
('714025104005', 'Priya Patel', 'IT', 9.1, 0, 'Not Placed');

-- Insert Dummy Data into placed
INSERT INTO placed ("Register No", "Student Name", "Career Path", "Department", "Company Name") VALUES
('714025104001', 'Kishore S', 'on-campus', 'CSE', 'TCS Digital'),
('714025104002', 'Jeevinth M', 'on-campus', 'CSE', 'Zoho Corporation');

-- Insert Dummy Data into non_placement
INSERT INTO non_placement (regno, name, dept, cgpa, purpose) VALUES
('714025104003', 'Aarav Sharma', 'CSE', 9.4, 'Higher Studies');

-- Insert Dummy Data into not_placed
INSERT INTO not_placed (regno, name, dept, cgpa, backlogs) VALUES
('714025104004', 'Karthik R', 'ECE', 7.4, 1),
('714025104005', 'Priya Patel', 'IT', 9.1, 0);

-- ENABLE REALTIME FOR ALL TABLES
alter publication supabase_realtime add table student_details;
-- ENABLE REALTIME FOR ALL TABLES
alter publication supabase_realtime add table student_details;
alter publication supabase_realtime add table not_placed;
alter publication supabase_realtime add table placed;
alter publication supabase_realtime add table non_placement;
