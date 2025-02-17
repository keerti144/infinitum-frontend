"use client";
const url="https://infinitum-website.onrender.com";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


interface Student {
  id: string;
  name: string;
  department:string;
  year:number
  event:string
}
interface AttendanceResponse {
  [key: string]: boolean;
}

const AdminDashboard = () => {
  const router=useRouter();
  useEffect(()=>{
    
    const isAuthenticated=localStorage.getItem("isAdminLoggedIn");
    // console.log(isAuthenticated);
    if (!isAuthenticated) {
      router.replace("/admin");}
  },[router])

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [attendance, setAttendance] = useState<AttendanceResponse>({});
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error("Token not found in localStorage!");
      router.replace("/admin"); // Redirect back to login if no token
    }
  }, [router]);

  
  const fetchStudents = async (eventId: string) => {
    if (!token) {
      console.error("Token is missing. Cannot fetch students.");
      return;
    }
    try {
      console.log("Current token:", token);
      if (!token) {
        console.error("Token is missing. Cannot fetch students.");
        return;
      }
      const response = await axios.get<Student[]>(
        `${url}/fetch/${eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.length === 0) {
        setError("No students found for this event.");
        setStudents([]);
      } else {
        setStudents(response.data);
        setError("");
      }
    } catch (error:any) {
      console.error("Error fetching students:", error);
    }
  };
  const fetchStudentEvents = async (query: string) => {
    if (!query) {setStudents([]);return;}
    try {
          const response = await axios.get<Student[]>(
        `${url}/registeredEvents/${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (response.data.length === 0) {
        setError("No students found matching your query.");
        setStudents([]);
      } else {
        setStudents(response.data);
        setError("");
      }
      
    } catch (error: any) {
      console.error("Full error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
    }
  };
  const handleAttendanceChange = async (rollNo: string, eventId: string) => {
    try {
      
      setAttendance((prev) => ({
        ...prev,
        [rollNo]: !prev[rollNo],
      }));
      const response = await axios.put(
        `${url}/attendance/update`,
        { roll_no: rollNo, event_id: eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Attendance updated:", response.data);
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };
  

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedEvent(selected);
    if (selected) {
      fetchStudents(selected);
    } else {
      setStudents([]);
    }
  };

  return (
    <div className=" min-h-screen p-6 bg-[#1A1A2E] text-white">
      <h1 className="text-2xl font-bold mt-14 ">Admin Dashboard</h1>

      <div className="flex justify-between items-center my-4 mt-10">
        <div>
            <label className="mr-5 font-semibold ">Select Event:</label>
            <select
            className="border p-2 text-black bg-[#CCD6E0FC]"
            onChange={handleFilterChange}
            value={selectedEvent}
            >
            
            <option value="1234">CSEA</option>
            <option value="2">EYE</option>
            <option value="3">GHCC</option>
            
            </select>
        </div>
        <div>
    <label className="mr-5 font-semibold">Search:</label>
    <input
      type="text"
      placeholder="Enter Roll No or Name"
      className="border p-2 text-gray-800 bg-[#CCD6E0FC] placeholder-gray-500 focus:placeholder-gray-700 focus:text-black focus:cursor-black"
      onChange={(e) => fetchStudentEvents(e.target.value)}
    />
  </div>
</div>

      <table className="w-full border-collapse border border-black mt-11">
        <thead>
          <tr className="bg-[#CCD6E0FC] text-black">
            <th className="border border-black p-2">Roll No</th>
            <th className="border border-black p-2">Name</th>
            <th className="border border-black p-2">Department</th>
            <th className="border border-black p-2">Event</th>
            <th className="border border-black p-2">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id} className="text-center">
                <td className="border p-2">{student.id}</td>
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.department}</td>
                <td className="border p-2">{student.event}</td>
                <td className="border p-2">
                  <input type="checkbox" checked={attendance[student.id] || false} onChange={() => handleAttendanceChange(student.id, student.event)}/>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="border p-2 text-center">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
