import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

interface ShiftRequest {
  id: number;
  shift_id: number;
  requester_name: string;
  status: string;
}

const ShiftRequests = () => {
  const auth = useContext(AuthContext);
  const [requests, setRequests] = useState<ShiftRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get-shift-requests", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching shift requests", error);
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
      alert("Request approved.");
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
      alert("Request rejected.");
      setRequests(requests.filter((r) => r.id !== requestId));
    } catch (error) {
      console.error("Error rejecting request", error);
    }
  };

  return (
    <div>
      <h2>Shift Swap Requests</h2>
      {requests.length > 0 ? (
        <ul>
          {requests.map((request) => (
            <li key={request.id}>
              {request.requester_name} requested swap for Shift {request.shift_id} | Status: {request.status}
              <button onClick={() => handleApprove(request.id)}>Approve</button>
              <button onClick={() => handleReject(request.id)}>Reject</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No shift swap requests.</p>
      )}
    </div>
  );
};

export default ShiftRequests;
