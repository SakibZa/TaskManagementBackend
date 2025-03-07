const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const db = require('./db/postgresSql');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
