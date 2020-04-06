const path = require('path');
const express = require('express');

const publicDirPath = path.join(__dirname, '../public');

const app = express();
const port = process.env.PORT || 3000;
// Set up static dir
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
    res.redirect('/html/game.html');
});

app.listen(port, () => {
    console.log('Server started port ' + port);
});