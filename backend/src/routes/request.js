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
  authorizeRoles("CUSTOMER", "TECHNICIAN", "ADMIN"),
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

router.patch(
  "/:id/assign",
  authenticateToken,
  authorizeRoles("ADMIN"),
  async (req, res) => {
    const requestId = req.params.id;
    const { technicianId } = req.body;

    if (!technicianId) {
      return res.status(400).json({
        message: "Serviser mora biti izbran.",
      });
    }

    try {
      const technicianResult = await pool.query(
        `
        SELECT id, role
        FROM users
        WHERE id = $1
        `,
        [technicianId],
      );

      if (technicianResult.rows.length === 0) {
        return res.status(404).json({
          message: "Serviser ne obstaja.",
        });
      }

      const technician = technicianResult.rows[0];

      if (technician.role !== "TECHNICIAN") {
        return res.status(400).json({
          message: "Izbrani uporabnik ni serviser.",
        });
      }

      const requestResult = await pool.query(
        `
        UPDATE service_requests
        SET
          technician_id = $1,
          status = 'ASSIGNED',
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
        `,
        [technicianId, requestId],
      );

      if (requestResult.rows.length === 0) {
        return res.status(404).json({
          message: "Servisni zahtevek ne obstaja.",
        });
      }

      return res.status(200).json({
        message: "Servisni zahtevek je bil uspešno dodeljen serviserju.",
        request: requestResult.rows[0],
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Napaka pri dodeljevanju servisnega zahtevka.",
      });
    }
  },
);

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("CUSTOMER", "TECHNICIAN", "ADMIN"),
  async (req, res) => {
    const requestId = req.params.id;

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
        WHERE id = $1
      `;

      const values = [requestId];

      if (req.user.role === "CUSTOMER") {
        query += " AND customer_id = $2";
        values.push(req.user.id);
      }

      if (req.user.role === "TECHNICIAN") {
        query += " AND technician_id = $2";
        values.push(req.user.id);
      }

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Servisni zahtevek ne obstaja ali nimate dostopa.",
        });
      }

      return res.status(200).json({
        request: result.rows[0],
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Napaka pri pridobivanju servisnega zahtevka.",
      });
    }
  },
);

module.exports = router;
