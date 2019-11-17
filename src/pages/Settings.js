import React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Modal, Button, Badge, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Settings = props => {
    const [details, setDetails] = useState({ data: {} });
    const [show, setShow] = useState(false);
    const [avatar, setAvatar] = useState("tZXYBtb.png");

    useEffect(() => {
        fetch("/api/getUserDetails", { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                }
            }).then(data => {
                setDetails({ data: data });
                setAvatar(data.avatar.replace("https://i.imgur.com/", ""));
            })
            .catch(err => {
                console.error(err);
                alert('Error checking for valid token.');
            });
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = async () => {
        fetch("/api/settings?avatarURL=" + avatar, { credentials: 'include' })
            .then(res => {
                if (res.status === 200) {
                    setShow(false);
                    setDetails({ data: { username: details.data.username, email: details.data.email, avatar: "https://i.imgur.com/" + avatar } });
                    alert("Successfully changed avatar!");
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error checking for valid token.');
            }
            );
    };
    const handleChange = value => {
        setAvatar(value);
    };

    return (
        <Layout>
            <h1 style={{ borderBottom: '1px solid black' }}>Settings</h1>
            <div className="d-flex flex-column">
                <h4><strong>Change avatar</strong></h4>
                <div className="d-flex">
                    <Button style={mainBtnStyle} size="sm" variant="primary" onClick={handleShow}>
                        <img style={mainImageStyle} src={details.data.avatar} alt="avatar" />
                        <Badge variant="light">Edit</Badge>
                    </Button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Avatar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                        <ToggleButtonGroup as="div" type="radio" name="options" defaultValue={avatar} onChange={handleChange} className="d-flex flex-row flex-wrap justify-content-center">
                            <ToggleButton variant="" value="tZXYBtb.png" style={btnStyle}><img style={imageStyle} src="https://i.imgur.com/tZXYBtb.png" alt="man" /></ToggleButton>
                            <ToggleButton variant="" value="jAD61vn.png" style={btnStyle}><img style={imageStyle} src="https://i.imgur.com/jAD61vn.png" alt="man" /></ToggleButton>
                            <ToggleButton variant="" value="d5pjXqZ.png" style={btnStyle}><img style={imageStyle} src="https://i.imgur.com/d5pjXqZ.png" alt="man" /></ToggleButton>

                            <ToggleButton variant="" value="Rbim1ko.png" style={btnStyle}><img style={imageStyle} src="https://i.imgur.com/Rbim1ko.png" alt="woman" /></ToggleButton>
                            <ToggleButton variant="" value="gYtKCqo.png" style={btnStyle}><img style={imageStyle} src="https://i.imgur.com/gYtKCqo.png" alt="woman" /></ToggleButton>
                            <ToggleButton variant="" value="JnpM1lB.png" style={btnStyle}><img style={imageStyle} src="https://i.imgur.com/JnpM1lB.png" alt="woman" /></ToggleButton>


                            <ToggleButton variant="" value="LQLByr5.png" style={btnStyle}><img style={imageStyle} src="https://i.imgur.com/LQLByr5.png" alt="man" /></ToggleButton>
                            <ToggleButton variant="" value="0qssL8F.png" style={btnStyle}><img style={imageStyle} src="https://i.imgur.com/0qssL8F.png" alt="man" /></ToggleButton>
                            <ToggleButton variant="" value="nY6scNj.png" style={btnStyle}><img style={imageStyle} src="https://i.imgur.com/nY6scNj.png" alt="man" /></ToggleButton>


                            <ToggleButton variant="" value="Ytoq2qT.png" style={btnStyle}><img style={imageStyle} src="https://i.imgur.com/Ytoq2qT.png" alt="woman" /></ToggleButton>
                            <ToggleButton variant="" value="EQSoEus.png" style={btnStyle}><img style={imageStyle} src="https://i.imgur.com/EQSoEus.png" alt="woman" /></ToggleButton>
                            <ToggleButton variant="" value="i2Aez2p.png" style={btnStyle}><img style={imageStyle} src="https://i.imgur.com/i2Aez2p.png" alt="woman" /></ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="outline-primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button size="sm" variant="primary" onClick={handleSave}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
};

const mainImageStyle = {
    width: 75,
    height: 75,
    marginBottom: -15,
    padding: 0
};

const imageStyle = {
    width: 75,
    height: 75,
    padding: 0
};

const mainBtnStyle = {
    maxWidth: 75,
    maxHeight: 75,
    padding: 0,
    borderRadius: 50,
    margin: 5
};

const btnStyle = {
    maxWidth: 75,
    maxHeight: 75,
    padding: 0,
    borderRadius: 50,
    margin: 5
};

export default Settings;