const express = require('express') ;
const app = express();                 
const morgan = require('morgan') ;  
const mongoose = require('mongoose');   
const blogRoutes = require('./routes/blogRoutes'); 

const dbURI = 'mongodb+srv://localuser:test1234@nodejs.ja8fdsp.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err)) ;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded( { extended: true } )) ; 
app.use(morgan('dev'));   

app.get('/', (req, res) => {
    res.redirect('/blogs') ;
});

app.get('/about', (req, res) => {
    res.render('about', { title:"About "});
});

app.use(blogRoutes);

app.use( (req, res) => {
    res.status(404).render('404', { title:"404" }) ;
});