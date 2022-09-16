const Blockchain = require('./blockchain')

const bitcoin = new Blockchain();

const previousBlockHash = '1c03c777606df74652d7a128060c74c4c335c0b877858da466861059cc839ac0'
console.log(bitcoin);
const currentBlockData = [   
    {
        amount: 10,
        sender: 'b4cee9c0e5cd571',
        receiver: '3a3f6e462d48e9',
    },
    {
        amount: 20,
        sender: 'r4cef9chg6cdhg51',
        receiver: '5agf6e4j1d48e1',
    },
    {
        amount: 30,
        sender: '54ceg9c0e5cty72',
        receiver: '1a34he4h7d4ae5',
    }
]

const nonce = 100

console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));

console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData))

console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 433));


// bitcoin.createNewBlock(undefined, undefined, 'x235weg');

// bitcoin.createNewTransaction(100, 'Ana', 'Bogdan')

// bitcoin.createNewTransaction(90, 'Dan', 'Cristi')

// bitcoin.createNewBlock(2398, 'x235weg', '23dfqregwt')

// bitcoin.createNewBlock(2399, '23dfqregwt', 'k54jtag')

// bitcoin.createNewBlock(2400, 'k54jtag', '034-hgnq')

// console.log(bitcoin.getLastBlock())

