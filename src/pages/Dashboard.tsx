import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

interface Shift {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
}

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [sickDate, setSickDate] = useState("");

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/my_shifts", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        setShifts(response.data);
      } catch (error) {
        console.error("Error fetching shifts", error);
      }
    };

    if (auth?.token) {
      fetchShifts();
    }
  }, [auth?.token]);

  const reportSick = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/report-sick",
        { date: sickDate },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error reporting sick", error);
      alert("Failed to report sick.");
    }
  };

  return (
    <div>
      <h2>My Shifts</h2>
      {shifts.length > 0 ? (
        <ul>
          {shifts.map((shift) => (
            <li key={shift.id}>
              {shift.date} | {shift.start_time} - {shift.end_time} | {shift.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No shifts assigned yet.</p>
      )}

      <h3>Report Sick Leave</h3>
      <input
        type="date"
        value={sickDate}
        onChange={(e) => setSickDate(e.target.value)}
      />
      <button onClick={reportSick}>Report Sick</button>
    </div>
  );
};

export default Dashboard;
