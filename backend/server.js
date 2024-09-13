const express = require ('express');
const db = require("./db/connection.js")
const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));


const Port = process.env.PORT || 3001;
app.use(express.json());

// get all services
app.get('/', async(req, res) =>{
    const allListing = await db.query('select * from allservices;')
    console.log(allListing.rows)
    res.json(allListing.rows)
})
// get all service providers
app.get('/providers', async(req, res) =>{
    const allListing = await db.query('select * from allservices WHERE provider = true AND seeker = false;')
    console.log(allListing.rows)
    res.json(allListing.rows)
})

// get all service seeker
app.get('/seekers', async(req, res) =>{
    const allListing = await db.query('select * from allservices WHERE provider = false AND seeker = true;')
    console.log(allListing.rows)
    res.json(allListing.rows)
})


// get all service providers that matches a keyword
app.get('/providers/:keyword', async(req, res) =>{
    const {keyword} = req.params
    try{
        const query = 'SELECT * FROM allservices WHERE job ILIKE $1 AND provider = true;';
    const allListing = await db.query(query, [`%${keyword}%`]);  
    console.log(allListing.rows);
    res.json(allListing.rows);    
} catch (err) {
    console.error(err.message);   
    res.status(500).json({ error: 'Internal server error' });
}
    
})

// get all service seeker that matches a keyword
app.get('/api/allServices/seekers/:keyword', async(req, res) =>{
    const {keyword} = req.params
    try{
        const query = 'SELECT * FROM allservices WHERE job ILIKE $1 AND seeker = true;';
    const allListing = await db.query(query, [`%${keyword}%`]);  
    console.log(allListing.rows);
    res.json(allListing.rows);    
} catch (err) {
    console.error(err.message);   
    res.status(500).json({ error: 'Internal server error' });
}
    
})


//  get service by id

app.get('/service/:id', async (req, res) => {
    const { id } = req.params;  

    try {
        const query = 'SELECT * FROM allservices WHERE serial_number = $1;';
        const values = [id];  
        const result = await db.query(query, values);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);  
        } else {
          res.status(404).json({ error: 'Service not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get reviews for a specific service
app.get('/api/reviews/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    try {
        const query = 'SELECT * FROM reviews WHERE service_id = $1 ORDER BY created_at DESC LIMIT 20;';
        const values = [serviceId];
        const result = await db.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// create new listing
app.post('/api/allServices/create', async (req, res) => {
    const { name, location, job, details, email, provider, seeker, status } = req.body;

    try {
        const query = `
          INSERT INTO allservices (name, location, job, details, email, provider, seeker, status)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
        `;

        const values = [name, location, job, details, email, provider, seeker, status];

        
        const newListing = await db.query(query, values);

        
        res.status(201).json(newListing.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to create listing' });
    }
});


// update one service

app.put('api/allServices/:id',(req,res) =>{

})



app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
