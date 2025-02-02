import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

interface CoverageRequest {
  id: number;
  shift_date: string;
  start_time: string;
  end_time: string;
  requested_by: string;
}

const ShiftCoverage = () => {
  const auth = useContext(AuthContext);
  const [coverRequests, setCoverRequests] = useState<CoverageRequest[]>([]);

  useEffect(() => {
    const fetchCoverRequests = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get-coverage-requests", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        setCoverRequests(response.data);
      } catch (error) {
        console.error("Error fetching coverage requests", error);
      }
    };

    if (auth?.token) {
      fetchCoverRequests();
    }
  }, [auth?.token]);

  const acceptShift = async (requestId: number) => {
    try {
      await axios.post(
        `http://127.0.0.1:5000/accept-coverage/${requestId}`,
        {},
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      alert("Shift accepted.");
      setCoverRequests(coverRequests.filter((r) => r.id !== requestId));
    } catch (error) {
      console.error("Error accepting shift", error);
    }
  };

  return (
    <div>
      <h2>Available Shift Cover Requests</h2>
      {coverRequests.length > 0 ? (
        <ul>
          {coverRequests.map((request) => (
            <li key={request.id}>
              Shift on {request.shift_date} from {request.start_time} - {request.end_time} |
              Requested by: {request.requested_by}
              <button onClick={() => acceptShift(request.id)}>Accept Shift</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No available shifts for coverage.</p>
      )}
    </div>
  );
};

export default ShiftCoverage;
