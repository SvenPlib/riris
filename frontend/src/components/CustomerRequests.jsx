import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CustomerRequests.css";

function CustomerRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Napaka pri pridobivanju zahtevkov.");
          return;
        }

        setRequests(data.requests);
      } catch (error) {
        console.error(error);
        setError("Napaka pri povezavi s strežnikom.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <p>Nalaganje zahtevkov...</p>;
  }

  if (error) {
    return <p className="requests-error">{error}</p>;
  }

  return (
    <div className="requests-page">
      <div className="requests-header">
        <h2>Moji zahtevki</h2>

        <button
          className="new-request-button"
          onClick={() => navigate("/new-request")}
        >
          + Nov zahtevek
        </button>
      </div>

      {requests.length === 0 ? (
        <p className="empty-message">Trenutno še nimate servisnih zahtevkov.</p>
      ) : (
        <div className="requests-list">
          {requests.map((request) => (
            <div className="request-row" key={request.id}>
              <div className="request-image">Slika</div>

              <div className="request-info">
                <h3>{request.title}</h3>

                <p className="request-device">
                  {request.appliance_type} | {request.brand} | {request.model}
                </p>

                <p className="request-description">{request.description}</p>
              </div>

              <div className="request-meta">
                <p className="request-status">{request.status}</p>

                <p className="request-date">
                  {new Date(request.created_at).toLocaleDateString("sl-SI")}
                </p>
              </div>

              <button
                className="details-button"
                onClick={() => navigate(`/requests/${request.id}`)}
              >
                &gt;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerRequests;
