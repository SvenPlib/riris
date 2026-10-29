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

module.exports = router;
