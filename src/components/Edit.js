import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import{v4 as uuid} from "uuid";
import {Link, useNavigate} from "react-router-dom";

function Edit() {
    const [users, setUsers] = useState({});
    const [userName, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [id, setId] = useState("");
    let history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        var index = users.map(function(e){
            return e.id
        }).indexOf(id);
    
        let a = users[index];
        a.id = id;
        a.userName = userName;
        a.role = role;
        history("/")
    }
 
    useEffect(()=> {
        axios.get("https://64ff4a78f8b9eeca9e29f4af.mockapi.io/users")
        .then((res) => {
            setUsers(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
        setUsername(localStorage.getItem('userName'))
        setRole(localStorage.getItem('role'))
        setId(localStorage.getItem('id'))
    }, [])

    return (
        <Form className="d-grid gap-2" style={{margin:"15rem"}}>
            <Form.Group className="mb-3" controlId='formName'>
                <Form.Control type='text' placeholder='Enter Name' value={userName} required onChange={(e) => setUsername(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId='formRole'>
                <Form.Control type='text' placeholder='Enter Role' value={role} required onChange={(e) => setRole(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Button onClick={(e) => handleSubmit(e)} type='submit'>Update</Button>
        </Form>
    )
}

export default Edit;