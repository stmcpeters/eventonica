import React, { useState, useEffect, useReducer } from 'react'
import { Button, Form } from "react-bootstrap"

const MyForm = ({ onSaveEvent, editingEvent, onUpdateEvent }) => {

    // This is the original State with initial values 
    const [event, setEvent] = useState(editingEvent || {
        title: "",
        location: "",
        category: "",
        date: ''
    });

    const initialValue = {
        title: '',
        location: '',
        category: '',
        date: ''
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'title':
                return {...state, title: action.payload};
            case 'location':
                return {...state, location: action.payload};
            case 'category': 
                return {...state, category: action.payload};
            case 'date':
                return {...state, date: action.payload};
            default:
                throw new Error(`Unknown action type: ${action.type}`)
        }
    }

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

    const [state, dispatch] = useReducer(reducer,initialValue);
    return (
        <Form className='form-events' onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <input
                    type="text"
                    id="add-event-title"
                    placeholder="Title"
                    required
                    value={state.title}
                    onChange={(event) => {
                        dispatch({type: 'title', payload: event.target.value})
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Location</Form.Label>
                <input
                    type="text"
                    id="add-event-location"
                    placeholder="Location"
                    required
                    value={state.location}
                    onChange={(event) => {
                        dispatch({type: 'location', payload: event.target.value})
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <input
                    type="text"
                    id="add-event-category"
                    placeholder="Category"
                    required
                    value={state.category}
                    onChange={(event) => {
                        dispatch({type: 'category', payload: event.target.value})
                    }}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <input
                    type="date"
                    id="add-event-date"
                    required
                    value={state.date}
                    onChange={(event) => {
                        dispatch({type: 'date', payload: event.target.value})
                    }}
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