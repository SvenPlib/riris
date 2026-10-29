const express = require("express");
const pool = require("../db");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

const allowedApplianceTypes = [
  "REFRIGERATOR",
  "WASHING_MACHINE",
  "DISHWASHER",
  "DRYER",
  "OVEN",
  "FREEZER",
];

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("CUSTOMER"),
  async (req, res) => {
    const { title, description, applianceType, brand, model } = req.body;

    if (!title || !description || !applianceType || !brand || !model) {
      return res.status(400).json({
        message: "Vsa polja so obvezna.",
      });
    }

    if (!allowedApplianceTypes.includes(applianceType)) {
      return res.status(400).json({
        message: "Neveljavna vrsta aparata.",
      });
    }

    try {
      const result = await pool.query(
        `
        INSERT INTO service_requests (
          title,
          description,
          appliance_type,
          brand,
          model,
          customer_id
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [
          title,
          description || null,
          applianceType,
          brand || null,
          model || null,
          req.user.id,
        ],
      );

      return res.status(201).json({
        message: "Servisni zahtevek je bil uspešno ustvarjen.",
        request: result.rows[0],
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Napaka pri ustvarjanju servisnega zahtevka.",
      });
    }
  },
);

router.get(
  "/",
  authenticateToken,
  authorizeRoles("CUSTOMER", "TECHNICIAN"),
  async (req, res) => {
    try {
      let query = `
        SELECT
          id,
          title,
          description,
          appliance_type,
          brand,
          model,
          status,
          created_at,
          updated_at,
          customer_id,
          technician_id
        FROM service_requests
      `;

      let values = [];

      if (req.user.role === "CUSTOMER") {
        query += " WHERE customer_id = $1";
        values = [req.user.id];
      }

      if (req.user.role === "TECHNICIAN") {
        query += " WHERE technician_id = $1";
        values = [req.user.id];
      }

      query += " ORDER BY created_at DESC";

      const result = await pool.query(query, values);

      return res.status(200).json({
        requests: result.rows,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Napaka pri pridobivanju servisnih zahtevkov.",
      });
    }
  },
);

module.exports = router;
