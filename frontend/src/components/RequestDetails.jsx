import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/RequestDetails.css";

function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [request, setRequest] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [technicianId, setTechnicianId] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  const canAdminAssign =
    user?.role === "ADMIN" &&
    request?.status === "NEW" &&
    !request?.technician_id;

  const canTechnicianStart =
    user?.role === "TECHNICIAN" && request?.status === "ASSIGNED";

  const canTechnicianResolve =
    user?.role === "TECHNICIAN" && request?.status === "IN_PROGRESS";

  const canAdminClose =
    user?.role === "ADMIN" && request?.status === "RESOLVED";

  const showActionsPanel =
    canAdminAssign ||
    canTechnicianStart ||
    canTechnicianResolve ||
    canAdminClose;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const userResponse = await fetch("http://localhost:3000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const userData = await userResponse.json();
        const verifiedUser = userData.user;

        setUser(verifiedUser);

        const requestResponse = await fetch(
          `http://localhost:3000/api/requests/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const requestData = await requestResponse.json();

        if (!requestResponse.ok) {
          setError(
            requestData.message ||
              "Napaka pri pridobivanju servisnega zahtevka.",
          );
          return;
        }

        setRequest(requestData.request);

        // Če je zahtevek že dodeljen, prikažemo trenutnega serviserja
        if (requestData.request.technician_id) {
          setTechnicianId(String(requestData.request.technician_id));
        }

        // Seznam serviserjev potrebuje samo ADMIN
        if (verifiedUser.role === "ADMIN") {
          const techniciansResponse = await fetch(
            "http://localhost:3000/api/users/technicians",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const techniciansData = await techniciansResponse.json();

          if (!techniciansResponse.ok) {
            setError(
              techniciansData.message || "Napaka pri pridobivanju serviserjev.",
            );
            return;
          }

          setTechnicians(techniciansData.technicians);
        }
      } catch (error) {
        console.error(error);
        setError("Napaka pri povezavi s strežnikom.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleAssign = async () => {
    setError("");
    setSuccess("");

    if (!technicianId) {
      setError("Izberite serviserja.");
      return;
    }

    try {
      setAssigning(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/requests/${id}/assign`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            technicianId: Number(technicianId),
            comment: comment,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Dodelitev serviserja ni uspela.");
        return;
      }

      setRequest(data.request);
      setSuccess("Zahtevek je bil uspešno dodeljen serviserju.");
      setComment("");
    } catch (error) {
      console.error(error);
      setError("Napaka pri povezavi s strežnikom.");
    } finally {
      setAssigning(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      if (newStatus === "RESOLVED" && (!comment || comment.trim() === "")) {
        setError("Zaključni komentar je obvezen.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/requests/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
            comment: comment,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Sprememba statusa ni uspela.");
        return;
      }

      setRequest(data.request);
      setSuccess("Status zahtevka je bil uspešno spremenjen.");
      setComment("");
    } catch (error) {
      console.error(error);
      setError("Napaka pri povezavi s strežnikom.");
    }
  };

  if (loading) {
    return <p className="details-message">Nalaganje zahtevka...</p>;
  }

  if (!request) {
    return (
      <p className="details-message details-error">
        {error || "Servisnega zahtevka ni mogoče prikazati."}
      </p>
    );
  }

  return (
    <div className="details-page">
      <h2 className="details-title">
        Podrobnosti zahtevka | TRENUTEN STATUS: {request.status}
      </h2>

      <div
        className={
          showActionsPanel
            ? "details-layout"
            : "details-layout details-layout-single"
        }
      >
        <div className="details-left">
          <div className="details-section">
            <h3 className="section-title">Osnovni podatki</h3>

            <div className="details-content basic-data">
              <div className="detail-row">
                <span>Naslov zahtevka:</span>
                <strong>{request.title}</strong>
              </div>

              <div className="detail-row">
                <span>Vrsta aparata:</span>
                <span>{request.appliance_type}</span>
              </div>

              <div className="detail-row">
                <span>Znamka:</span>
                <span>{request.brand}</span>
              </div>

              <div className="detail-row">
                <span>Model:</span>
                <span>{request.model}</span>
              </div>

              <div className="detail-row">
                <span>Opis težave:</span>
                <span>{request.description}</span>
              </div>
            </div>
          </div>

          <div className="details-section">
            <h3 className="section-title">Fotografije</h3>

            <div className="photos-list">
              <div className="photo-placeholder">Slika</div>
              <div className="photo-placeholder">Slika</div>
              <div className="photo-placeholder">Slika</div>
            </div>
          </div>

          <div className="details-section history-section">
            <h3 className="section-title">Zgodovina zahtevka:</h3>

            <div className="details-content">
              <p>
                Zgodovina zahtevka bo prikazana po implementaciji zgodovine
                sprememb.
              </p>
            </div>
          </div>
        </div>

        {showActionsPanel && (
          <div className="actions-panel">
            <h3 className="actions-title">Akcije</h3>

            <div className="actions-content">
              {canAdminAssign && (
                <>
                  <label className="action-label" htmlFor="technician">
                    Dodeli serviserja
                  </label>

                  <select
                    id="technician"
                    className="action-select"
                    value={technicianId}
                    onChange={(event) => setTechnicianId(event.target.value)}
                  >
                    <option value="" disabled>
                      Izberi serviserja
                    </option>

                    {technicians.map((technician) => (
                      <option key={technician.id} value={technician.id}>
                        {technician.first_name} {technician.last_name}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="comment">Komentar</label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Dodaj komentar..."
                  />

                  <button
                    className="confirm-button"
                    onClick={handleAssign}
                    disabled={assigning}
                  >
                    {assigning ? "Dodeljevanje..." : "Potrdi dodelitev"}
                  </button>
                </>
              )}

              {canTechnicianStart && (
                <>
                  <label htmlFor="comment">Komentar</label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Dodaj komentar..."
                  />

                  <button
                    className="confirm-button"
                    onClick={() => handleStatusChange("IN_PROGRESS")}
                  >
                    Prevzemi zahtevek
                  </button>
                </>
              )}

              {canTechnicianResolve && (
                <>
                  <label htmlFor="comment">Komentar</label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Dodaj komentar..."
                  />

                  <button
                    className="confirm-button"
                    onClick={() => handleStatusChange("RESOLVED")}
                  >
                    Označi kot rešeno
                  </button>
                </>
              )}

              {canAdminClose && (
                <>
                  <label htmlFor="comment">Komentar</label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Dodaj komentar..."
                  />

                  <button
                    className="confirm-button"
                    onClick={() => handleStatusChange("CLOSED")}
                  >
                    Zaključi zahtevek
                  </button>
                </>
              )}

              {error && <p className="details-error">{error}</p>}

              {success && <p className="details-success">{success}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestDetails;
