//Packages: express, body-parser
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test/get', (req, res) => {
    res.send({ express: 'YAHALLO! From Express Server' });
});

app.post('/test/post', (req, res) => {
    console.log(req.body);
    res.send(
        `GOT UR MESSAGE!! This is what you said to me: ${req.body.post}`,
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
