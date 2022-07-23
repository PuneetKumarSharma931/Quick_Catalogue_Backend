const express = require('express');
require('./src/db/connection');

const port = process.env.PORT || 2000;

const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/authentication'));
// app.use('/api/catalogue', require('./routes/catalogue'));

app.listen(port, ()=>{

    console.log(`The Server is running at port: ${port}`);
});
