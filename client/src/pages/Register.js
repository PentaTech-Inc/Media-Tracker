import React from 'react';
import { useState, useEffect } from 'react';
import { Button, FormGroup, FormControl, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/Register.css';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

const Register = props => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        // if logged in redirect to profile
        fetch("/api/getUserDetails", { credentials: 'include' })
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
        return username.length > 0 && email.length > 0
            && password.length > 0 && (password === confirmPassword);
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch("/api/register?username=" + username + "&email=" + email + "&password=" + password
            , { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    alert("Registration successful. Welcome!");
                    fetch("/api/auth?email=" + email + "&password=" + password
                        , { credentials: 'include' })
                        .then(res => {
                            if (res.status === 200) {
                                props.history.push('/profile/' + username);
                            } else {
                                const error = new Error(res.error);
                                throw error;
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        });
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error registering. Please try again.');
            });
    }

    return (
        <div style={body}>
            <Header />
            <div className="Register" style={registerStyle}>
                <h1 style={{ borderBottom: '1px solid black' }}>Register</h1>
                <br />
                <form onSubmit={handleSubmit} style={formStyle}>
                    <FormGroup controlId="username" bsSize="large">
                        <Form.Label>Username</Form.Label>
                        <FormControl
                            autoFocus
                            type="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="email" bsSize="large">
                        <Form.Label>Email</Form.Label>
                        <FormControl
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
                    <FormGroup controlId="confirmPassword" bsSize="large">
                        <Form.Label>Confirm password</Form.Label>
                        <FormControl
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            type="password"
                        />
                    </FormGroup>
                    <br /><br />
                    <Button block bsSize="large" disabled={!validateForm()} type="submit">
                        Register
                    </Button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

const body = {
    backgroundColor: '#00000F',
};

const registerStyle = {
    paddingLeft: '6%',
    paddingRight: '6%',
    paddingTop: '3%',
    paddingBottom: '5%',
    textAlign: 'center',
    width: '50%',
    display: 'block',
    margin: '3% auto 3% auto',
    backgroundColor: 'white',
    borderRadius: 5
};

const formStyle = {
    display: 'block',
    margin: 'auto',
    width: '100%',
    textAlign: 'left'
};

export default withRouter(Register);