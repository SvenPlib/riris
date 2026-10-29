const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, matchedPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !matchedPassword) {
    return res.status(400).json({
      message: "Vsa polja so obvezna.",
    });
  }

  if (password !== matchedPassword) {
    return res.status(400).json({
      message: "Gesli se ne ujemata.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Geslo mora vsebovati vsaj 6 znakov.",
    });
  }

  try {
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Uporabnik s tem elektronskim naslovom že obstaja.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      `
        INSERT INTO users (
          first_name,
          last_name,
          email,
          password_hash,
          role
        )
        VALUES ($1, $2, $3, $4, 'CUSTOMER')
        RETURNING id, first_name, last_name, email, role
      `,
      [firstName, lastName, email, passwordHash],
    );

    return res.status(201).json({
      message: "Registracija je bila uspešna.",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Napaka na strežniku.",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Elektronski naslov in geslo sta obvezna.",
    });
  }

  try {
    const result = await pool.query(
      `
      SELECT id, first_name, last_name, email, password_hash, role
      FROM users
      WHERE email = $1
    `,
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Napačen elektronski naslov ali geslo.",
      });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Napačen elektronski naslov ali geslo.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
      message: "Uporabnik obstaja.",
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Napaka na strežniku.",
    });
  }
});

router.get("/me", authenticateToken, (req, res) => {
  return res.status(200).json({
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    },
  });
});

module.exports = router;
