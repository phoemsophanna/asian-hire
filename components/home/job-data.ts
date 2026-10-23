export type Job = {
  code: number;
  title: string;
  company: string;
  logo: string;
  logoColor: string;
  location: string;
  salary: string;
  type: string;
  industry: string;
  category: "Featured" | "Urgent" | "Latest";
  posted: string;
};

export type JobSearchFilters = {
  keyword: string;
  industry: string;
  location: string;
};

export const jobs: Job[] = [
  {
    code: 342311,
    title: "Senior Product Designer",
    company: "Canva",
    logo: "C",
    logoColor: "bg-[#7856ff]",
    location: "Sydney, Australia",
    salary: "$110k – $135k",
    type: "Full Time",
    industry: "Design & Creative",
    category: "Featured",
    posted: "2 days ago",
  },
  {
    code: 342312,
    title: "Digital Marketing Manager",
    company: "Atlassian",
    logo: "A",
    logoColor: "bg-[#146be8]",
    location: "Melbourne, Australia",
    salary: "$95k – $120k",
    type: "Full Time",
    industry: "Marketing & Sales",
    category: "Urgent",
    posted: "1 day ago",
  },
  {
    code: 342313,
    title: "Frontend Developer",
    company: "Culture Amp",
    logo: "C",
    logoColor: "bg-[#fb4f72]",
    location: "Brisbane, Australia",
    salary: "$105k – $130k",
    type: "Full Time",
    industry: "Information Technology",
    category: "Latest",
    posted: "3 hours ago",
  },
  {
    code: 342314,
    title: "Financial Accountant",
    company: "Commonwealth Bank",
    logo: "C",
    logoColor: "bg-[#e3a32b]",
    location: "Sydney, Australia",
    salary: "$85k – $105k",
    type: "Full Time",
    industry: "Accounting & Finance",
    category: "Featured",
    posted: "1 day ago",
  },
  {
    code: 342315,
    title: "People & Culture Partner",
    company: "Xero",
    logo: "x",
    logoColor: "bg-[#20a5d2]",
    location: "Perth, Australia",
    salary: "$90k – $115k",
    type: "Full Time",
    industry: "Human Resources",
    category: "Urgent",
    posted: "4 days ago",
  },
  {
    code: 342316,
    title: "Civil Project Engineer",
    company: "Buildcorp",
    logo: "B",
    logoColor: "bg-[#213e71]",
    location: "Adelaide, Australia",
    salary: "$100k – $125k",
    type: "Full Time",
    industry: "Engineering",
    category: "Latest",
    posted: "5 hours ago",
  },
];
