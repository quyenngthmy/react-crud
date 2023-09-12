import React, { useState, useEffect, Fragment } from "react";
import { Button, Table, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function Home() {
    const [users, setUsers] = useState({});
    let history = useNavigate();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [id, setId] = useState("");

    const handleDelete = (id) => {
        var index = users.map(function(e){
            return e.id
        }).indexOf(id);
        users.splice(index, 1);

        history('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        users.push({id: users.length + 1, userName: name, role: role});
        history("/")
    }
 
    const handleEdit = (id, userName, role) => {
        localStorage.setItem('id', id);
        localStorage.setItem('userName', userName);
        localStorage.setItem('role', role);
    }

    useEffect(()=> {
        axios.get("https://64ff4a78f8b9eeca9e29f4af.mockapi.io/users")
        .then((res) => {
            setUsers(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
        console.log(name);
        localStorage.setItem('id', id);
        localStorage.setItem('userName', name);
        localStorage.setItem('role', role);
    }, [id, name, role])

    return (
        <Fragment>
            <Form className="d-grid gap-2" style={{margin:"15rem"}}>
                <p>Create new user</p>
                <Form.Group className="mb-3" controlId='formName'>
                    <Form.Control type='text' placeholder='Enter Name' required onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId='formRole'>
                    <Form.Control type='text' placeholder='Enter Role' required onChange={(e) => setRole(e.target.value)}></Form.Control>
                </Form.Group>
                <Button size="lg" onClick={(e) => handleSubmit(e)} type='submit'>Create</Button>
            </Form>
            <div style={{margin:"10rem"}}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                UserName
                            </th>
                            <th>
                                Role
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody> 
                        {users && users.length > 0 
                            ?
                            users.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            {item.id}
                                        </td>
                                        <td>
                                            {item.userName}
                                        </td>
                                        <td>
                                            {item.role}
                                        </td>
                                        <td>
                                            <Link to={'/edit'}>
                                                <Button onClick={() => handleEdit(item.id, item.userName, item.role)}>EDIT</Button>
                                            </Link>
                                            &nbsp;
                                            <Button onClick={() => handleDelete(item.id)}>DELETE</Button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            "No data available"
                        }
                    </tbody>
                </Table>
                <br></br>
            </div>
            
        </Fragment>
    )
}

export default Home;