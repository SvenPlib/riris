import { useEffect, useState } from "react";
import CustomerRequests from "../components/CustomerRequests";

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("token");
        setLoading(false);
        return;
      }

      const data = await response.json();

      setUser(data.user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Nalaganje...</p>;
  }

  if (!user) {
    return <p>Uporabnik ni prijavljen.</p>;
  }

  if (user.role === "CUSTOMER") {
    return <CustomerRequests />;
  }

  if (user.role === "TECHNICIAN") {
    return <TechnicianRequests />;
  }

  if (user.role === "ADMIN") {
    return <AdminRequests />;
  }

  return <p>Neveljavna uporabniška vloga.</p>;
}

export default Home;
