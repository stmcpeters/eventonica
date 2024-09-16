import React, { useState, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"

const MyForm = ({ onSaveEvent, editingEvent, onUpdateEvent }) => {

    // This is the original State with not initial event 
    const [event, setEvent] = useState(editingEvent || {
        title: "",
        location: "",
        catergory: "",
        date: ""
    });

    //create functions that handle the event of the user typing into the form
    const handleTitleChange = (event) => {
        const title = event.target.value;
        setEvent((event) => ({ ...event, title }));

    };

    const handleLocationChange = (event) => {
        const location = event.target.value;
        setEvent((event) => ({ ...event, location }));
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        //console.log(category);
        setEvent((event) => ({ ...event, category }));
    };

    const handleDateChange = (event) => {
        const date = event.target.value;
        //console.log(date);
        setEvent((event) => ({ ...event, date }));
    };

    const clearForm = () => {
        setEvent({ title: "", location: "", category: "", date: "" })
    }

    //A function to handle the post request
    const postEvent = (newEvent) => {
        return fetch("http://localhost:8080/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log("From the post ", data);
                //I'm sending data to the List of Events (the parent) for updating the list
                onSaveEvent(data);
                //this line just for cleaning the form
                clearForm();
            });
    };

    //A function to handle the post request
    const putEvent = (toEditEvent) => {
        return fetch(`http://localhost:8080/api/events/${toEditEvent.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toEditEvent),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                onUpdateEvent(data);
                //this line just for cleaning the form
                clearForm();
            });
    };


    //A function to handle the submit in both cases - Post and Put request!
    const handleSubmit = (e) => {
        e.preventDefault();
        if (event.id) {
            putEvent(event);
        } else {
            postEvent(event);
        }
    };

    return (
        <Form className='form-events' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <input
                    type="text"
                    id="add-event-title"
                    placeholder="Title"
                    required
                    value={event.title}
                    onChange={handleTitleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Location</Form.Label>
                <input
                    type="text"
                    id="add-event-location"
                    placeholder="Location"
                    required
                    value={event.location}
                    onChange={handleLocationChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <input
                    type="text"
                    id="add-event-category"
                    placeholder="Category"
                    required
                    value={event.category}
                    onChange={handleCategoryChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <input
                    type="date"
                    id="add-event-date"
                    required
                    value={event.date}
                    onChange={handleDateChange}
                />
            </Form.Group>
            <Form.Group>
            <Button type="submit" variant="outline-success">{event.id ? "Edit Event" : "Add Event"}</Button>
            {event.id ? <Button type="button" variant="outline-warning" onClick={clearForm}>Cancel</Button> : null}
            </Form.Group>
        </Form>
    );
};


export default MyForm