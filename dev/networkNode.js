const Express = require('express')
const uuid = require('uuid')
const bodyParser = require('body-parser');
const rp = require('request-promise');
const Blockchain = require('./blockchain');

const app = Express()
const mychain = new Blockchain();
const nodeAddr = uuid.v1().split('-').join('');
const start_port = process.argv[2]  
const nodeUrl = process.argv[3]

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

app.post('/register-and-broadcast-node', function(req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1)
        bitcoin.networkNodes.push(newNodeUrl);
    
    const reqPromises = []

    bitcoin.networkNodes.forEach(nodeUrl => {
        //call register-node
        const reqParameters = {
            uri: nodeUrl + '/register-node',
            method: 'POST',
            body : {
                newNodeUrl: newNodeUrl
            },
            json: true
        }
        reqPromises.push(rp(reqParameters))
    })
    Promise.all(reqPromises).then(data => {
        //do something with the replies
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: {
                allNetworkNodes: [...bitcoin.networkNodes, bitcoin.nodeUrl]
            },
            json: true
        };
        return rp(bulkRegisterOptions);
    }).then( data => {
        res.json({note: "new node register SUCCESS"})
    })
}); 

app.post('/register-node', function(req, res) {
    const newNodeUrl = req.body.newNodeUrl
    if ((bitcoin.networkNodes.indexOf(newNodeUrl) == -1) && (bitcoin.nodeUrl !== newNodeUrl))
        bitcoin.networkNodes.push(newNodeUrl)
    res.json({note: "new node recorded"})
});

app.post('/register-node-bulk', function(req, res) {
    
});

app.listen(start_port, function() {
    console.log(`listening on port ${start_port}...`)
});

