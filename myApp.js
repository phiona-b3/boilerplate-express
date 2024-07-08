let express = require('express');

let app = express();
require('dotenv').config()

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))






const x = "Hello World";
console.log(x);


app.use('/', function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})



//app.get('/', function(req, res) {
    //res.send("Hello Express")
//})

absolutePath = __dirname + '/views/index.html'
app.get('/', function(req, res) {
    res.sendFile(absolutePath)
})

app.use('/public', express.static(__dirname + '/public')
)

app.get('/json', (req, res) => {
    let response;
    if (process.env.MESSAGE_STYLE == 'uppercase') {
        response = "Hello json".toUpperCase()
    } else {
        response = "Hello json"
    }
    res.json({ message: response });
})

app.get('/now', function(req, res, next) {
    req.time = new Date().toString() ;
    next();
}, function(req, res) {
   res.json({time: req.time})
})

app.get('/:word/echo', (req, res) => {
    const word =  req.params.word;
    res.json({echo: word})
})


app.route('/name')
.get((req, res) => {
    const firstName = req.query.first;
    const lastName = req.query.last;
    const name = `${firstName} ${lastName}`
    res.json({ name: name })
})
.post((req, res) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    const name = `${firstName} ${lastName}`
    res.json({ name: name })
})




















 module.exports = app;
