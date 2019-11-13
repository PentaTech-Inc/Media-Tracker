import React from 'react';
import { useState, useEffect } from 'react';
import { Button, FormGroup, FormControl, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/Login.css';

const Login = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // if logged in redirect to profile
        fetch("http://localhost:5000/api/getUserDetails", { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then(data => {
                props.history.push("/profile/" + data.username);
            })
            .catch(err => {
                // user not logged in, or error
            });
    }, []);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:5000/api/auth?email=" + email + "&password=" + password
            , { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    props.history.push('/');
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error logging in. Please try again.');
            });
    }

    return (
        <Layout>
            <h1>Login</h1>
            <div className="Login">
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <Form.Label>Email</Form.Label>
                        <FormControl
                            autoFocus
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <Form.Label>Password</Form.Label>
                        <FormControl
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </FormGroup>
                    <Button block bsSize="large" disabled={!validateForm()} type="submit">
                        Login
                    </Button>
                </form>
            </div>
        </Layout>
    );
};

export default withRouter(Login);