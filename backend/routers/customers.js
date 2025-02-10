import express from "express";
import pool from "../db.js";

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const [customers] = await pool.query("SELECT * FROM customers");
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const [customer] = await pool.query("SELECT * FROM customers WHERE id = ?", [req.params.id]);
        res.json(customer[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/", async (req, res) => {
    try {
        const { name, contact, email, contact_person, whatsapp, address, city, state, pin_code, gst_no, pan_no } = req.body;
        const [result] = await pool.query("INSERT INTO customers (name, contact, email, contact_person, whatsapp, address, city, state, pin_code, gst_no, pan_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [name, contact, email, contact_person, whatsapp, address, city, state, pin_code, gst_no, pan_no]);
        res.json({ id: result.insertId, message: "Customer added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const { name, contact, email, contact_person, whatsapp, address, city, state, pin_code, gst_no, pan_no } = req.body;
        await pool.query("UPDATE customers SET name=?, contact=?, email=?, contact_person=?, whatsapp=?, address=?, city=?, state=?, pin_code=?, gst_no=?, pan_no=? WHERE id=?",
            [name, contact, email, contact_person, whatsapp, address, city, state, pin_code, gst_no, pan_no, req.params.id]);
        res.json({ message: "Customer updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM customers WHERE id = ?", [req.params.id]);
        res.json({ message: "Customer deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
