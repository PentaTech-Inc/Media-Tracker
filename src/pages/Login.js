import React from 'react';
import Layout from '../components/Layout';
import { useState } from 'react';
import { Button, FormGroup, FormControl, Form } from 'react-bootstrap';
import '../styles/Login.css';

const Login = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
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

export default Login;