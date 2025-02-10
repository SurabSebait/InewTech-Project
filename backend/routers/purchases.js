import express from "express";
import pool from "../db.js"

const router = express.Router();


router.get("/:id",async(req,res) => {
    try{
        const [purchases] = await pool.query("SELECT * FROM purchases WHERE customer_id = ?", [req.params.id]);

        res.json(purchases);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM purchases WHERE id = ?", [req.params.id]);
        res.json({ message: "Customer deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;