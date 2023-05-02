require("dotenv").config();
const express = require("express")
const morgan = require("morgan")
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express()
const db = require("./db")


//Middleware
app.use(morgan("tiny"));
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.post('/api/warehouses', async (req, res) => {
  try {
    const { name, zone, shelves } = req.body;

    // Check if zone has reached maximum shelves
    const result = await db.query('SELECT COUNT(*) FROM shelves WHERE zone = $1', [zone]);
    const count = parseInt(result.rows[0].count);
    if (count + shelves.length > 10) {
      return res.status(400).json({ message: 'Zone has reached maximum number of shelves' });
    }

    // Start transaction
    await db.query('BEGIN');

    // Insert warehouse
    const warehouseResult = await db.query('INSERT INTO warehouses (name, zone) VALUES ($1, $2) RETURNING id', [name, zone]);
    const warehouseId = parseInt(warehouseResult.rows[0].id);

    // Insert shelves
    const values = shelves.map((shelf) => `('${shelf.name}', ${warehouseId}, ${zone})`).join(',');
    await db.query(`INSERT INTO shelves (name, warehouse_id, zone) VALUES ${values}`);

    // Commit transaction
    await db.query('COMMIT');

    return res.status(201).json({ message: 'Warehouse created successfully' });
  } catch (err) {
    await db.query('ROLLBACK');
    console.error(err);
    return res.status(500).json({ message: 'Error creating warehouse' });
  }
});

const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log(`server running and listening on port ${port}`)
});