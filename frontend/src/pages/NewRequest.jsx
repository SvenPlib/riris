import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NewRequest.css";

function NewRequest() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    applianceType: "",
    brand: "",
    model: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Zahtevka ni bilo mogoče ustvariti.");
        return;
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Napaka pri povezavi s strežnikom.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-page">
      <div className="request-card">
        <h2 className="request-title">Nov servisni zahtevek</h2>

        <form className="request-form" onSubmit={handleSubmit}>
          <div className="request-form-group">
            <label htmlFor="title">Naslov zahtevka</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="request-form-group">
            <label htmlFor="applianceType">Vrsta aparata</label>
            <select
              id="applianceType"
              name="applianceType"
              value={formData.applianceType}
              onChange={handleChange}
              required
            >
              <option value="">Izberi vrsto aparata</option>
              <option value="REFRIGERATOR">Hladilnik</option>
              <option value="WASHING_MACHINE">Pralni stroj</option>
              <option value="DISHWASHER">Pomivalni stroj</option>
              <option value="DRYER">Sušilni stroj</option>
              <option value="OVEN">Pečica</option>
              <option value="FREEZER">Zamrzovalnik</option>
            </select>
          </div>

          <div className="request-form-group">
            <label htmlFor="brand">Znamka</label>
            <input
              id="brand"
              name="brand"
              type="text"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="request-form-group">
            <label htmlFor="model">Model</label>
            <input
              id="model"
              name="model"
              type="text"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>

          <div className="request-form-group">
            <label htmlFor="description">Opis težave</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="request-error">{error}</p>}

          <div className="request-actions">
            <button
              className="request-button"
              type="button"
              onClick={() => navigate("/")}
            >
              Prekliči
            </button>

            <button className="request-button" type="submit" disabled={loading}>
              {loading ? "Pošiljanje..." : "Oddaj zahtevek"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewRequest;
