import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

interface HolidayRequest {
  id: number;
  requester_name: string;
  date: string;
  status: string;
}

const HolidayRequests = () => {
  const auth = useContext(AuthContext);
  const [requests, setRequests] = useState<HolidayRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get-holiday-requests", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching holiday requests", error);
      }
    };

    if (auth?.token) {
      fetchRequests();
    }
  }, [auth?.token]);

  const handleApprove = async (requestId: number) => {
    try {
      await axios.post(
        `http://127.0.0.1:5000/approve-request/${requestId}`,
        {},
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      alert("Holiday approved.");
      setRequests(requests.filter((r) => r.id !== requestId));
    } catch (error) {
      console.error("Error approving request", error);
    }
  };

  const handleReject = async (requestId: number) => {
    try {
      await axios.post(
        `http://127.0.0.1:5000/reject-request/${requestId}`,
        {},
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      alert("Holiday rejected.");
      setRequests(requests.filter((r) => r.id !== requestId));
    } catch (error) {
      console.error("Error rejecting request", error);
    }
  };

  return (
    <div>
      <h2>Holiday Requests</h2>
      {requests.length > 0 ? (
        <ul>
          {requests.map((request) => (
            <li key={request.id}>
              {request.requester_name} requested holiday on {request.date} | Status: {request.status}
              <button onClick={() => handleApprove(request.id)}>Approve</button>
              <button onClick={() => handleReject(request.id)}>Reject</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No holiday requests.</p>
      )}
    </div>
  );
};

export default HolidayRequests;
