const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));


const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); 
    const hour = now.getHours();
    
  
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); 
    } else {
        res.status(403).send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
    }
};


app.use(checkWorkingHours);


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
