import React from 'react';
import { useState, useEffect } from 'react';
import { Button, FormGroup, FormControl, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/Register.css';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { Link } from 'react-router-dom';

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
        <div>
            <Header />
            <h1 style={headingStyle}>Register</h1>
            <br />
            <div className="Register" style={registerStyle}>
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
                <br/>
                <Link to="/login">Already have an account? Click here to login</Link>
            </div>
            <Footer />
        </div>
    );
};

const headingStyle = {
    width: '50%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    marginBottom: 10,
    fontFamily: 'Impact',
    fontSize: '50pt',
    color: '#2d74da',
    borderBottomStyle: 'solid',
    bordBottomColor: '#25467a',
    borderBottomWidth: '3',
    textAlign: 'center'
};

const registerStyle = {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '3%',
    paddingBottom: '3%',
    textAlign: 'center',
    width: '50%',
    display: 'block',
    margin: '0 auto 3% auto',
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