import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Prijava ni uspela.");
        return;
      }

      localStorage.setItem("token", data.token);

      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else if (data.user.role === "TECHNICIAN") {
        navigate("/technician");
      } else {
        navigate("/customer");
      }
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
        <h2 className="auth-title">Prijava</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
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
              required
            />
          </div>

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Prijava..." : "Prijavi se"}
          </button>
        </form>

        {error && <p className="auth-message auth-error">{error}</p>}

        <div className="auth-divider">
          <span>ali</span>
        </div>

        <div className="auth-footer">
          <p>
            Nimate računa?
            <Link className="auth-link" to="/register">
              Registrirajte se
            </Link>
          </p>

          <p>
            <a className="auth-link" href="#">
              Ste pozabili geslo?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
