const express = require('express');
const { dbConecction } = require('./database/config');
require('dotenv').config();
const cors = require('cors')

const app = express();



app.use(express.static('public'));

dbConecction()


app.use(cors())
app.use(express.json())


app.use('/api/auth', require('./routes/authRouter'))
app.use('/api/events', require('./routes/eventsRouter'))



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})