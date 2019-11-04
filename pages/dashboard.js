const express = require('express');

const Dashboard = () => {
    app.use('/dashboard', require('../routes/index.js'));
};

export default Dashboard;

