const Express = require('express')
const uuid = require('uuid')
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

const app = Express()
const mychain = new Blockchain();
const nodeAddr = uuid.v1().split('-').join('');
const port = process.argv[2]  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.get('/blockchain', function(req, res) {
    res.send(mychain);
});

app.post('/transaction', function(req, res) {
    console.log(req.body);
    const blockIndex = mychain.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({note: `Transaction will be added in block ${blockIndex}`})
});

app.get('/mine', function(req, res){
    mychain.createNewTransaction(12.5, "XOXO", nodeAddr)

    let previousBlock = mychain.getLastBlock();
    let previousHash = previousBlock['hash'];
    let currentBlockData = {
            transactions: mychain.pendingTransactions,
            index: previousBlock['index'] + 1
    };
    let nonce = mychain.proofOfWork(previousHash, currentBlockData);
    let blockHash = mychain.hashBlock(previousHash, currentBlockData, nonce);
    
    const newBlock = mychain.createNewBlock(nonce, previousHash, blockHash);
    res.json({
        note: "new block mined",
        block: newBlock
    });
})

app.listen(3000, function() {
    console.log('listening on port 3000 and more...')
});

