import React, { useReducer } from 'react'
import { Button, Form } from "react-bootstrap"

const initialValue = {
    title: '',
    location: '',
    category: '',
    date: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'textInput':
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            }
        case 'resetForm':
            return initialValue;
        default:
            throw new Error(`Unknown action type: ${action.type}`)
    }
}


const MyForm = ({ onSaveEvent, editingEvent, onUpdateEvent }) => {

    const [state, dispatch] = useReducer(reducer, editingEvent || initialValue);

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
                dispatch({ type: 'resetForm' });
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
                dispatch({ type: 'resetForm' });
            });
    };


    //A function to handle the submit in both cases - Post and Put request!
    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.id) {
            putEvent(state);
        } else {
            postEvent(state);
        }
    };

    const handleChange = (e, key) => {
        dispatch({
            type: 'textInput',
            payload: { key:key, value: e.target.value}
        })
    }


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
                    onChange={(event) => handleChange(event, 'title')}
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
                    onChange={(event) => handleChange(event, 'location')}
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
                    onChange={(event) => handleChange(event, 'category')}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <input
                    type="date"
                    id="add-event-date"
                    required
                    value={state.date}
                    onChange={(event) => handleChange(event, 'date')}
                />
            </Form.Group>
            <Form.Group>
            <Button type="submit" variant="outline-success">{state.id ? "Edit Event" : "Add Event"}</Button>
            {state.id ? <Button type="button" variant="outline-warning" onClick={() => dispatch({ type: 'resetForm' })}>Cancel</Button> : null}
            </Form.Group>
        </Form>
    );
};


export default MyForm