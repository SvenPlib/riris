import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    matchedPassword: "",
  });
  const [message, setMessage] = useState("");
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
    setMessage("");
    setError("");

    if (formData.password !== formData.matchedPassword) {
      setError("Gesli se ne ujemata.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Registracija ni uspela.");
        return;
      }

      setMessage("Registracija je bila uspešna.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      setError("Napaka pri povezavi s strežnikom.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Registracija</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">Ime</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Priimek</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-poštni naslov</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Geslo</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="matchedPassword">Potrdite geslo</label>
            <input
              id="matchedPassword"
              name="matchedPassword"
              type="password"
              value={formData.matchedPassword}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          <div className="register-actions">
            <button
              className="auth-button"
              type="button"
              onClick={() => navigate("/login")}
            >
              Prekliči
            </button>

            <button className="auth-button" type="submit" disabled={loading}>
              {loading ? "Registracija..." : "Registriraj se"}
            </button>
          </div>
        </form>

        {error && <p className="auth-message auth-error">{error}</p>}

        {message && <p className="auth-message auth-success">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
