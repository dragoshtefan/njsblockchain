const Express = require('express')
const app = Express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.get('/blockchain', function(req, res) {

});

app.post('/transaction', function(req, res){
    console.log(req.body);
    res.send(`bloc transaction amount ${req.body.amount}`);
});

app.post('/mine', function(req, res){

})

app.listen(3000, function() {
    console.log('listening on port 3000 and more...')
});

