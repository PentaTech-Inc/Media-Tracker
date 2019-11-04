const express = require('express');

const Auth = () => {
    app.use('/auth', require('./routes/index.js'));
    app.use('/users', require('./routes/users.js'));
};

export default About;

