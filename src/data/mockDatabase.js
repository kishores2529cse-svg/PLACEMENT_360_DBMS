// Placement 360 - Database & Initial Datasets

export const INITIAL_STUDENTS_NOT_PLACED = [
  {
    rollNo: "24ECE014",
    name: "Karthik R",
    dept: "ECE",
    cgpa: 7.4,
    backlogs: 1,
    email: "karthik.r@college.edu",
    phone: "+91 98765 43213",
    skills: ["Verilog", "Embedded C", "IoT"]
  },
  {
    rollNo: "24MECH032",
    name: "Siddharth M",
    dept: "MECH",
    cgpa: 7.2,
    backlogs: 0,
    email: "siddharth.m@college.edu",
    phone: "+91 98765 43215",
    skills: ["SolidWorks", "AutoCAD", "MATLAB"]
  }
];

export const INITIAL_STUDENTS_PLACED = [
  {
    rollNo: "24CSE001",
    name: "Kishore S",
    dept: "CSE",
    cgpa: 9.1,
    backlogs: 0,
    offerCompany: "TCS Digital",
    ctc: 9.0,
    placementType: "on-campus",
    email: "kishores25cs@srishakthi.ac.in",
    phone: "+91 98765 43210",
    skills: ["React", "Python", "SQL", "DBMS"]
  },
  {
    rollNo: "24CSE002",
    name: "Jeevinth M",
    dept: "CSE",
    cgpa: 8.9,
    backlogs: 0,
    offerCompany: "Zoho Corporation",
    ctc: 12.0,
    placementType: "on-campus",
    email: "jeevinthm25cs@srishakthi.ac.in",
    phone: "+91 98765 43211",
    skills: ["Java", "Spring Boot", "MySQL"]
  },
  {
    rollNo: "24IT089",
    name: "Priya Patel",
    dept: "IT",
    cgpa: 9.1,
    backlogs: 0,
    offerCompany: "Amazon",
    ctc: 32.0,
    placementType: "off-campus",
    email: "priya.p@college.edu",
    phone: "+91 98765 43214",
    skills: ["AWS", "Node.js", "MongoDB"]
  }
];

export const INITIAL_NON_PLACEMENT = [
  {
    rollNo: "24CSE003",
    name: "Aarav Sharma",
    dept: "CSE",
    cgpa: 9.4,
    backlogs: 0,
    purpose: "Higher Studies",
    email: "aarav.s@college.edu",
    phone: "+91 98765 43212",
    skills: ["C++", "System Design", "Algorithms"]
  }
];

export const INITIAL_DRIVES = [
  { id: "DRV-101", company: "Google", role: "Software Development Engineer", package: 44.0, minCgpa: 8.5, maxBacklogs: 0, depts: ["CSE", "IT"], location: "Bengaluru", status: "Active", applicants: 45 },
  { id: "DRV-102", company: "Zoho Corporation", role: "Software Developer", package: 12.0, minCgpa: 8.0, maxBacklogs: 0, depts: ["CSE", "IT", "ECE"], location: "Chennai", status: "Active", applicants: 88 }
];

export const INITIAL_APPLICATIONS = [
  { appId: "APP-901", rollNo: "24CSE001", studentName: "Kishore S", driveId: "DRV-103", company: "TCS Digital", role: "Systems Engineer", appliedDate: "2026-09-18", status: "Offered", round: "Final HR Complete" }
];

export const DBMS_SCHEMA = [
  {
    tableName: "STUDENTS_PLACED",
    primaryKey: "roll_no",
    columns: [
      { name: "roll_no", type: "VARCHAR(12)", key: "PK" },
      { name: "name", type: "VARCHAR(100)", key: "" },
      { name: "dept", type: "VARCHAR(10)", key: "" },
      { name: "cgpa", type: "DECIMAL(3,2)", key: "" },
      { name: "offer_company", type: "VARCHAR(50)", key: "" },
      { name: "ctc", type: "DECIMAL(5,2)", key: "" },
      { name: "placement_type", type: "VARCHAR(20)", key: "" }
    ]
  },
  {
    tableName: "STUDENTS_NOTPLACED",
    primaryKey: "roll_no",
    columns: [
      { name: "roll_no", type: "VARCHAR(12)", key: "PK" },
      { name: "name", type: "VARCHAR(100)", key: "" },
      { name: "dept", type: "VARCHAR(10)", key: "" },
      { name: "cgpa", type: "DECIMAL(3,2)", key: "" },
      { name: "backlogs", type: "INT", key: "" }
    ]
  },
  {
    tableName: "NON_PLACEMENT",
    primaryKey: "roll_no",
    columns: [
      { name: "roll_no", type: "VARCHAR(12)", key: "PK" },
      { name: "name", type: "VARCHAR(100)", key: "" },
      { name: "dept", type: "VARCHAR(10)", key: "" },
      { name: "cgpa", type: "DECIMAL(3,2)", key: "" },
      { name: "purpose", type: "VARCHAR(50)", key: "" }
    ]
  }
];

export const SAMPLE_QUERIES = [
  {
    title: "All Placed Students (On-Campus & Off-Campus)",
    query: "SELECT roll_no, name, dept, offer_company, placement_type FROM STUDENTS_PLACED;"
  },
  {
    title: "Students Needing Placement",
    query: "SELECT roll_no, name, dept, cgpa FROM STUDENTS_NOTPLACED WHERE backlogs = 0;"
  },
  {
    title: "Non-Placement Students by Purpose",
    query: "SELECT purpose, COUNT(*) as count FROM NON_PLACEMENT GROUP BY purpose;"
  }
];
