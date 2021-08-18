const express = require('express');
const Server = require('./Server');
const { NODE_ENV, PORT, HOST } = require('./config/environment');

// Execute cron jobs
const DatabaseBackup = require('./app/jobs/database_backup');

//if (NODE_ENV === 'production') {
const DBBackup = new DatabaseBackup();
DBBackup.start();
//}

// Start Server
const server = new Server(express, PORT, NODE_ENV, HOST);

server.start();
