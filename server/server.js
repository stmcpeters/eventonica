const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

// create the get request for students in the endpoint '/api/students'
app.get('/api/events', async (req, res) => {
    try {
        const { rows: events } = await db.query('SELECT * FROM events');
        res.send(events);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// create the POST request
app.post('/api/events', async (req, res) => {
    try {
        const newEvent = {
            title: req.body.title,
            location: req.body.location,
            category: req.body.category,
            date: req.body.date
        };
        //console.log([newEvent.title, newEvent.location, newEvent.category, newEvent.date]);
        const result = await db.query(
            'INSERT INTO events(title, location, category, date) VALUES($1, $2, $3, $4) RETURNING *',
            [newEvent.title, newEvent.location, newEvent.category, newEvent.date],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request for events
app.delete('/api/events/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        await db.query('DELETE FROM events WHERE id=$1', [eventId]);
        console.log("From the delete request-url", eventId);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});

//A put request - Update an event 
app.put('/api/events/:eventId', async (req, res) =>{
    //console.log(req.params);
    //This will be the id that I want to find in the DB - the event to be updated
    const eventId = req.params.eventId
    const updatedEvent = { title: req.body.title, location: req.body.location, category: req.body.category, date: req.body.date}
    console.log("In the server from the url - the event id", eventId);
    console.log("In the server, from the react - the event to be edited", updatedEvent);
    // UPDATE events SET title = "something" WHERE id="16";
    const query = `UPDATE events SET title=$1, location=$2, category=$3, date=$4 WHERE id=${eventId} RETURNING *`;
    const values = [updatedEvent.title, updatedEvent.location, updatedEvent.category, updatedEvent.date];
    try {
      const updated = await db.query(query, values);
      console.log(updated.rows[0]);
      res.send(updated.rows[0]);
  
    }catch(e){
      console.log(e);
      return res.status(400).json({e})
    }
  })

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});