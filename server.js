const express = require('express');
const connectDB = require('./config/db')
const path = require('path');

const app = express();

// Connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'))

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/article', require('./routes/api/article'));

const port = process.env.PORT || 8080;

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(port, () => console.log(`server started on port ${port}`));