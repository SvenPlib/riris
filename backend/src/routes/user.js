const express = require("express");
const pool = require("../db");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/technicians",
  authenticateToken,
  authorizeRoles("ADMIN"),
  async (req, res) => {
    try {
      const result = await pool.query(
        `
        SELECT
          id,
          first_name,
          last_name,
          email
        FROM users
        WHERE role = 'TECHNICIAN'
        ORDER BY last_name, first_name
        `,
      );

      return res.status(200).json({
        technicians: result.rows,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Napaka pri pridobivanju seznama serviserjev.",
      });
    }
  },
);

module.exports = router;
