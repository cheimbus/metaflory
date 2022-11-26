## truffle 명령어들

truffle develop로 진입후
truffle migrate 하면   배포까지함

truffle(development)> let instance = await MetaCoin.deployed()
truffle(development)> let accounts = await web3.eth.getAccounts()

let instance = await Metafloris.deployed() 해서  배포된 인스턴스 가져오고

Metafloris.defaults({from:'바꿀계정주소'}) 치면  msg.sender바뀜
 

payable Test방법

instnace.함수({value:web3.utils.toWei(String(5),'finney')})


 let inst = await Metafloris.deployed()
 inst.addProduct('Test',5,'tt',5)
 truffle(develop)> inst.getMetaflorisFlowerInfo(0)
[
  '0',
  'Test',
  '5',
  'tt',
  '5000000000000000',
  _flowerType: '0',
  _flowerName: 'Test',
  _maxAmount: '5',
  _tokenInfoUri: 'tt',
  _price: '5000000000000000'
]

정상구매
truffle(develop)> inst2.buyNFT(0,{value:web3.utils.toWei(String(5),'finney')})
{
  tx: '0xf803a11172e4d1c39795de219a34f3240a6fdcb5c0779942b1a7f63e03791d61',
  receipt: {
    transactionHash: '0xf803a11172e4d1c39795de219a34f3240a6fdcb5c0779942b1a7f63e03791d61',
    transactionIndex: 0,
    blockNumber: 10,
    blockHash: '0x9ec191128c87985c1cd0ed7b595be38fa2deb12667953ec6290a2220ad264204',
    from: '0x127c53cb707f733b04a98c1af749f0d804c424c5',
    to: '0x1c5031d87bedee64c07d531d4fc514bd7568b91d',
    cumulativeGasUsed: 133722,
    gasUsed: 133722,
    contractAddress: null,
    logs: [ [Object] ],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000040000000000000000000000000008000000000000000000040000000000000000000000000000020000000800000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000002000060002000000000000000000000000000000000000000000000000000800000000000',
    status: true,
    effectiveGasPrice: 2917601110,
    type: '0x2',
    rawLogs: [ [Object] ]
  },
  logs: [
    {
      address: '0x1c5031D87bEDEE64c07d531D4fc514bd7568B91D',
      blockHash: '0x9ec191128c87985c1cd0ed7b595be38fa2deb12667953ec6290a2220ad264204',
      blockNumber: 10,
      logIndex: 0,
      removed: false,
      transactionHash: '0xf803a11172e4d1c39795de219a34f3240a6fdcb5c0779942b1a7f63e03791d61',
      transactionIndex: 0,
      id: 'log_994b8dba',
      event: 'Transfer',
      args: [Result]
    }
  ]
}




    //tokenId - Flowertype  mapping
    mapping(uint256 => uint256) private _tokenIdAndFlowerTypeMap;
    //Flowertype - MetaflorisFlowerInfo mapping
    mapping(uint256 => MetaflorisFlower) private _productsMap;
    //Flowertype - sellCnt mapping
    mapping(uint256 => uint256) private _productSellStateMap;
    uint256 private _flowerTypeCnt=0;



---

C:\Users\test\Desktop\부케\metaflori\nft>truffle develop
This version of µWS is not compatible with your Node.js build:

Error: Cannot find module './uws_win32_x64_102.node'
Falling back to a NodeJS implementation; performance may be degraded.


Truffle Develop started at http://127.0.0.1:9545/

Accounts:
(0) 0x127c53cb707f733b04a98c1af749f0d804c424c5
(1) 0xa8a9507566b5b76f54c26db0d49672789a891c16
(2) 0xdcfd1513ef74713506b8b714d2ec9a1d89e484d4
(3) 0x9d04d2fb0f076274c9747c6d85c7cf68ce20173b
(4) 0xb9c648df976e7ea2165855ac4ad27d605f57fad4
(5) 0x8fe8d3cec9343c2ee3f5dfed737daa02f5d8d9b2
(6) 0xc8c2afff8ca17d81a93767d3043388d335a1c732
(7) 0x31862e92dd43793bb0b226b8e6a29ebe4d59ec4c
(8) 0x02be58415128a3f0056b08736ab024ae1af18de0
(9) 0x9f264fcdee63904a613f918713117f0954a3697b

Private Keys:
(0) 2dfe573c9fdae1c04ac541ed7439d1a3b5eb13d6d55407ab38f132796e6fd7c8
(1) 90085d9134d17247462ba224002f30b2e44b08b932b6068389daeb1474900341
(2) 3b4f6a92645908ed1f06f4a6ae60e8fd63cb7d17ae7f0eaca56214c4fb9cbd43
(3) 574fc2eca64314b5cafcbfda27d541ffbc1a6122414697d249fc47588fd0b1b3
(4) 3ad943a810d6e66764bc1517ec1d17f6c4fa662f12256b5b5874bb332f64e5aa
(5) a8738235fa32a7dd7f8e9d044e676ac6aca1b60ac223cbc4e49c7bfe576f0f98
(6) abedee5e29755224bd4960a7350d554f04d7da57a8b83d258af2ac27d9477c9f
(7) 9020b9fd2b7d05359a5cdf458f2c586221972065d445a8932451976dc10a46c1
(8) 2bef1a598459cf64ba64f925c1dfba6457b4f52c9d776a529f50469a73939b99
(9) 70c552a5313c0379c647dec534fba7547bdac379d42c74996b4b7757d1984f0e

Mnemonic: define universe open fabric intact patch junior disease cloth liar brief cash

⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
Ensure you do not use it on production blockchains, or else you risk losing funds.

truffle(develop)> migrate

Compiling your contracts...
===========================
> Compiling .\contracts\ConvertLib.sol
> Compiling .\contracts\MetaCoin.sol
> Compiling .\contracts\Metafloris.sol
> Compiling .\contracts\Metafloris.sol
> Compilation warnings encountered:

    Warning: SPDX license identifier not provided in source file. Before publishing, consider adding a comment containing "SPDX-License-Identifier: <SPDX-License>" to each source file. Use "SPDX-License-Identifier: UNLICENSED" for non-open-source code. Please see https://spdx.org for more information.
--> project:/contracts/Metafloris.sol


> Artifacts written to C:\Users\test\Desktop\부케\metaflori\nft\build\contracts
> Compiled successfully using:
   - solc: 0.8.13+commit.abaa5c0e.Emscripten.clang


Starting migrations...
======================
> Network name:    'develop'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_deploy_contracts.js
=====================

   Replacing 'ConvertLib'
   ----------------------
   > transaction hash:    0x679b6a39f40fc8286fa6e4f92218fd9a34e60cca16e8490f495bcd944aa3f3b8
   > Blocks: 0            Seconds: 0
   > contract address:    0xbCEab0f085c8e5426230033317AAA9C4D174B7Eb
   > block number:        1
   > block timestamp:     1669472150
   > account:             0x127c53cb707F733b04A98c1af749F0d804C424C5
   > balance:             99.999468208
   > gas used:            157568 (0x26780)
   > gas price:           3.375 gwei
   > value sent:          0 ETH
   > total cost:          0.000531792 ETH


   Replacing 'Metafloris'
   ----------------------
   > transaction hash:    0x58953867f606e7f422d4eb075f057d5b94589625b941ca25e5950232fa270ead
   > Blocks: 0            Seconds: 0
   > contract address:    0x8bc13C93849fBE2E47AF8b42ce735134189d9318
   > block number:        2
   > block timestamp:     1669472150
   > account:             0x127c53cb707F733b04A98c1af749F0d804C424C5
   > balance:             99.987604825045007629
   > gas used:            3627111 (0x375867)
   > gas price:           3.270752661 gwei
   > value sent:          0 ETH
   > total cost:          0.011863382954992371 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:     0.012395174954992371 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.012395174954992371 ETH

truffle(develop)> let instance = await Metafloris.deployed()
undefined
truffle(develop)> instance.setBaseURI("https://metafloris.com/nft/json/")
{
  tx: '0x793d531c4fcba21abbf5edf271845cf3e1d7caccf0f9e39dd95a6c46eec7de99',
  receipt: {
    transactionHash: '0x793d531c4fcba21abbf5edf271845cf3e1d7caccf0f9e39dd95a6c46eec7de99',
    transactionIndex: 0,
    blockNumber: 3,
    blockHash: '0x56dd06c8f5f8ee96d3dc4fb591da10c7c7843e1d9598ebf519c39906fb3964e7',
    from: '0x127c53cb707f733b04a98c1af749f0d804c424c5',
    to: '0x8bc13c93849fbe2e47af8b42ce735134189d9318',
    cumulativeGasUsed: 69826,
    gasUsed: 69826,
    contractAddress: null,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    effectiveGasPrice: 3281620751,
    type: '0x2',
    rawLogs: []
  },
  logs: []
}
truffle(develop)> instance.setName("Metafloris")
{
  tx: '0x985e1f07f402dc9516b583690b12ece65394f676a1db54e7947067f695f76ee0',
  receipt: {
    transactionHash: '0x985e1f07f402dc9516b583690b12ece65394f676a1db54e7947067f695f76ee0',
    transactionIndex: 0,
    blockNumber: 4,
    blockHash: '0x06be40e9d26943523ce5b85296b6d2392f1d27da6ee34ace89f0c26bae717818',
    from: '0x127c53cb707f733b04a98c1af749f0d804c424c5',
    to: '0x8bc13c93849fbe2e47af8b42ce735134189d9318',
    cumulativeGasUsed: 47324,
    gasUsed: 47324,
    contractAddress: null,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    effectiveGasPrice: 3185947972,
    type: '0x2',
    rawLogs: []
  },
  logs: []
}
truffle(develop)> instance.setSymbol("METAFALOWER")
{
  tx: '0xf2c332fc97cdcadc54df35a140319e6830bd99a60a3dab1b34f1d894302b4c07',
  receipt: {
    transactionHash: '0xf2c332fc97cdcadc54df35a140319e6830bd99a60a3dab1b34f1d894302b4c07',
    transactionIndex: 0,
    blockNumber: 5,
    blockHash: '0x460e5d73ea51be43c12a0307ae7c5f6f78678522530c73c6abf848de62ace40a',
    from: '0x127c53cb707f733b04a98c1af749f0d804c424c5',
    to: '0x8bc13c93849fbe2e47af8b42ce735134189d9318',
    cumulativeGasUsed: 47392,
    gasUsed: 47392,
    contractAddress: null,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    effectiveGasPrice: 3101411778,
    type: '0x2',
    rawLogs: []
  },
  logs: []
}
truffle(develop)> instance.addProduct("Flower1",10,"flower1/",3)
{
  tx: '0x62d1973536f5a9c488b97090fcd40a91f80f7c48dcbe570fabb66c9fc1c37873',
  receipt: {
    transactionHash: '0x62d1973536f5a9c488b97090fcd40a91f80f7c48dcbe570fabb66c9fc1c37873',
    transactionIndex: 0,
    blockNumber: 6,
    blockHash: '0xaf068d507c0dcd4bd06a8d3c8493d1af08b723ee003c1294cd2836700b2559d0',
    from: '0x127c53cb707f733b04a98c1af749f0d804c424c5',
    to: '0x8bc13c93849fbe2e47af8b42ce735134189d9318',
    cumulativeGasUsed: 149040,
    gasUsed: 149040,
    contractAddress: null,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    effectiveGasPrice: 3027295341,
    type: '0x2',
    rawLogs: []
  },
  logs: []
}
truffle(develop)> instance.addProduct("Flower2",4,"flower2/",5)
{
  tx: '0xaa3c0c94918484e7dca744de52a2c7c664b05aedd2927eac891ace0c61b1d721',
  receipt: {
    transactionHash: '0xaa3c0c94918484e7dca744de52a2c7c664b05aedd2927eac891ace0c61b1d721',
    transactionIndex: 0,
    blockNumber: 7,
    blockHash: '0xd783c375660ba35fe2208cb315d6093a96b1b8698893adb1f09b0bcb36426e90',
    from: '0x127c53cb707f733b04a98c1af749f0d804c424c5',
    to: '0x8bc13c93849fbe2e47af8b42ce735134189d9318',
    cumulativeGasUsed: 151840,
    gasUsed: 151840,
    contractAddress: null,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    effectiveGasPrice: 2964306230,
    type: '0x2',
    rawLogs: []
  },
  logs: []
}
truffle(develop)> instance.addProduct("Flower3",2,"flower3/",2)
{
  tx: '0x3465d17e0602584af6c6ece45c4ab557b603ab84b6df79777cdc6b1d44d2777a',
  receipt: {
    transactionHash: '0x3465d17e0602584af6c6ece45c4ab557b603ab84b6df79777cdc6b1d44d2777a',
    transactionIndex: 0,
    blockNumber: 8,
    blockHash: '0x4bedfff1599c0492e3dc88030204b48f90ae9bc1086f5d1e46367ee2daf9b0a9',
    from: '0x127c53cb707f733b04a98c1af749f0d804c424c5',
    to: '0x8bc13c93849fbe2e47af8b42ce735134189d9318',
    cumulativeGasUsed: 151840,
    gasUsed: 151840,
    contractAddress: null,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    status: true,
    effectiveGasPrice: 2908889959,
    type: '0x2',
    rawLogs: []
  },
  logs: []
}
truffle(develop)> instance.buyNFT(0)
Uncaught:
Error: Returned error: VM Exception while processing transaction: revert Not enough eth -- Reason given: Not enough eth.
    at evalmachine.<anonymous>
    at sigintHandlersWrap (node:vm:268:12)
    at Script.runInContext (node:vm:137:14)
    at runScript (C:\Users\test\AppData\Roaming\npm\node_modules\truffle\build\webpack:\packages\core\lib\console.js:454:1)
    at Console.interpret (C:\Users\test\AppData\Roaming\npm\node_modules\truffle\build\webpack:\packages\core\lib\console.js:469:1)
    at bound (node:domain:421:15)
    at REPLServer.runBound [as eval] (node:domain:432:12)
    at REPLServer.onLine (node:repl:893:10)
    at REPLServer.emit (node:events:527:28)
    at REPLServer.emit (node:domain:475:12)
    at REPLServer.[_onLine] [as _onLine] (node:internal/readline/interface:418:12)
    at REPLServer.[_line] [as _line] (node:internal/readline/interface:879:18)
    at REPLServer.[_ttyWrite] [as _ttyWrite] (node:internal/readline/interface:1257:22)
    at REPLServer.self._ttyWrite (node:repl:988:9)
    at ReadStream.onkeypress (node:internal/readline/interface:269:20)
    at ReadStream.emit (node:events:527:28)
    at ReadStream.emit (node:domain:475:12)
    at emitKeys (node:internal/readline/utils:358:14)
    at emitKeys.next (<anonymous>)
    at ReadStream.onData (node:internal/readline/emitKeypressEvents:64:36)
    at ReadStream.emit (node:events:527:28)
    at ReadStream.emit (node:domain:475:12)
    at addChunk (node:internal/streams/readable:324:12)
    at readableAddChunk (node:internal/streams/readable:297:9)
    at ReadStream.Readable.push (node:internal/streams/readable:234:10)
    at TTY.onStreamRead (node:internal/stream_base_commons:190:23) {
  data: {
    hash: null,
    programCounter: 3288,
    result: '0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000e4e6f7420656e6f75676820657468000000000000000000000000000000000000',
    reason: 'Not enough eth',
    message: 'revert'
  },
  reason: 'Not enough eth',
  hijackedStack: 'Error: Returned error: VM Exception while processing transaction: revert Not enough eth -- Reason given: Not enough eth.\n' +
    '    at Object.ErrorResponse (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-core-helpers\\lib\\errors.js:28:1)\n' +
    '    at C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-core-requestmanager\\lib\\index.js:300:1\n' +
    '    at C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\packages\\provider\\wrapper.js:123:1\n' +
    '    at XMLHttpRequest.request.onreadystatechange (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-providers-http\\lib\\index.js:98:1)\n' +
    '    at XMLHttpRequestEventTarget.dispatchEvent (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request-event-target.js:34:1)\n' +
    '    at XMLHttpRequest.exports.modules.996763.XMLHttpRequest._setReadyState (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:208:1)\n' +
    '    at XMLHttpRequest.exports.modules.996763.XMLHttpRequest._onHttpResponseEnd (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:318:1)\n' +
    '    at IncomingMessage.<anonymous> (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:289:48)\n' +
    '    at IncomingMessage.emit (node:events:539:35)\n' +
    '    at IncomingMessage.emit (node:domain:537:15)\n' +
    '    at endReadableNT (node:internal/streams/readable:1342:12)\n' +
    '    at processTicksAndRejections (node:internal/process/task_queues:83:21)'
}
truffle(develop)> instance.buyNFT(0,{value:web3.utils.toWei(String(5),'finney')})
{
  tx: '0x470767ea0e462220f4f90cf043fd2496e82f0b9147cc7cec7f68dc6cdf51b1a4',
  receipt: {
    transactionHash: '0x470767ea0e462220f4f90cf043fd2496e82f0b9147cc7cec7f68dc6cdf51b1a4',
    transactionIndex: 0,
    blockNumber: 9,
    blockHash: '0x58bd15aa9e61dec489bbfac7941ac9dd6883fce0e1e27b20fc9273bcc20125c4',
    from: '0x127c53cb707f733b04a98c1af749f0d804c424c5',
    to: '0x8bc13c93849fbe2e47af8b42ce735134189d9318',
    cumulativeGasUsed: 154177,
    gasUsed: 154177,
    contractAddress: null,
    logs: [ [Object] ],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000020000000000000000000000001000000000000000000000000000000000000000040000000000000000000000000008000000000000000000040000000000000000000000000000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000002000020000000000000000000000000000000000000000000000060002000000000000000000000000000000000001000000000000000000000000000',
    status: true,
    effectiveGasPrice: 2860087778,
    type: '0x2',
    rawLogs: [ [Object] ]
  },
  logs: [
    {
      address: '0x8bc13C93849fBE2E47AF8b42ce735134189d9318',
      blockHash: '0x58bd15aa9e61dec489bbfac7941ac9dd6883fce0e1e27b20fc9273bcc20125c4',
      blockNumber: 9,
      logIndex: 0,
      removed: false,
      transactionHash: '0x470767ea0e462220f4f90cf043fd2496e82f0b9147cc7cec7f68dc6cdf51b1a4',
      transactionIndex: 0,
      id: 'log_3ff826f3',
      event: 'Transfer',
      args: [Result]
    }
  ]
}
truffle(develop)> instance.buyNFT(0,{value:web3.utils.toWei(String(5),'finney')})
{
  tx: '0xc030a65d3fdb502ebce799b302a92da02a0373a31e357b4e3c672972321c4544',
  receipt: {
    transactionHash: '0xc030a65d3fdb502ebce799b302a92da02a0373a31e357b4e3c672972321c4544',
    transactionIndex: 0,
    blockNumber: 10,
    blockHash: '0x6492ff1339fe366470ed779ccdf7ffbb3e103abfc857dfc440ed19345b883fa1',
    from: '0x127c53cb707f733b04a98c1af749f0d804c424c5',
    to: '0x8bc13c93849fbe2e47af8b42ce735134189d9318',
    cumulativeGasUsed: 85777,
    gasUsed: 85777,
    contractAddress: null,
    logs: [ [Object] ],
    logsBloom: '0x04000000000000000000000000000000000000000000000000000000020000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000100000000000000000000000000000000000000000000000002000020000000000000000000000000000000000000000000000020002000000000000000000000000000000000001000008000000000000000000000',
    status: true,
    effectiveGasPrice: 2817141574,
    type: '0x2',
    rawLogs: [ [Object] ]
  },
  logs: [
    {
      address: '0x8bc13C93849fBE2E47AF8b42ce735134189d9318',
      blockHash: '0x6492ff1339fe366470ed779ccdf7ffbb3e103abfc857dfc440ed19345b883fa1',
      blockNumber: 10,
      logIndex: 0,
      removed: false,
      transactionHash: '0xc030a65d3fdb502ebce799b302a92da02a0373a31e357b4e3c672972321c4544',
      transactionIndex: 0,
      id: 'log_7a433e2f',
      event: 'Transfer',
      args: [Result]
    }
  ]
}
truffle(develop)> instance.buyNFT(1,{value:web3.utils.toWei(String(5),'finney')})
{
  tx: '0x833dc8dc9487dcd4be2da0bbbddc79d150e38a130d8dc54b3f59f091e8b31421',
  receipt: {
    transactionHash: '0x833dc8dc9487dcd4be2da0bbbddc79d150e38a130d8dc54b3f59f091e8b31421',
    transactionIndex: 0,
    blockNumber: 11,
    blockHash: '0x6375d4f520512a653faa6e20db20ca9e2e32ee6f16d3acf40541ba73f1da4bf1',
    from: '0x127c53cb707f733b04a98c1af749f0d804c424c5',
    to: '0x8bc13c93849fbe2e47af8b42ce735134189d9318',
    cumulativeGasUsed: 122789,
    gasUsed: 122789,
    contractAddress: null,
    logs: [ [Object] ],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000020000000000000000000000001000000000000000000000020000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000800000000000000000400000000002000020000000000000000000000000000000000000000000000020002000000000000000000000000000000000001000000000000000000000000000',
    status: true,
    effectiveGasPrice: 2778510614,
    type: '0x2',
    rawLogs: [ [Object] ]
  },
  logs: [
    {
      address: '0x8bc13C93849fBE2E47AF8b42ce735134189d9318',
      blockHash: '0x6375d4f520512a653faa6e20db20ca9e2e32ee6f16d3acf40541ba73f1da4bf1',
      blockNumber: 11,
      logIndex: 0,
      removed: false,
      transactionHash: '0x833dc8dc9487dcd4be2da0bbbddc79d150e38a130d8dc54b3f59f091e8b31421',
      transactionIndex: 0,
      id: 'log_9a6140ea',
      event: 'Transfer',
      args: [Result]
    }
  ]
}
truffle(develop)> instance.buyNFT(2,{value:web3.utils.toWei(String(5),'finney')})
{
  tx: '0x8b36bb0c03b901578b5e501e7d229947b6bbda3ad00ad035374731a36a0d18df',
  receipt: {
    transactionHash: '0x8b36bb0c03b901578b5e501e7d229947b6bbda3ad00ad035374731a36a0d18df',
    transactionIndex: 0,
    blockNumber: 12,
    blockHash: '0x651ec0ae60a6899017f7036cc82dd53fe69585f8861fa76972ae1920f18566d2',
    from: '0x127c53cb707f733b04a98c1af749f0d804c424c5',
    to: '0x8bc13c93849fbe2e47af8b42ce735134189d9318',
    cumulativeGasUsed: 122789,
    gasUsed: 122789,
    contractAddress: null,
    logs: [ [Object] ],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000020000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000008000000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000002000000000000000000002000020000000000000000000000000008000000000000000000020002000000000000000000000000000000000001000000000000000000000000000',
    status: true,
    effectiveGasPrice: 2744968663,
    type: '0x2',
    rawLogs: [ [Object] ]
  },
  logs: [
    {
      address: '0x8bc13C93849fBE2E47AF8b42ce735134189d9318',
      blockHash: '0x651ec0ae60a6899017f7036cc82dd53fe69585f8861fa76972ae1920f18566d2',
      blockNumber: 12,
      logIndex: 0,
      removed: false,
      transactionHash: '0x8b36bb0c03b901578b5e501e7d229947b6bbda3ad00ad035374731a36a0d18df',
      transactionIndex: 0,
      id: 'log_0b142685',
      event: 'Transfer',
      args: [Result]
    }
  ]
}
truffle(develop)> instance.buyNFT(3,{value:web3.utils.toWei(String(5),'finney')})
Uncaught:
Error: Returned error: VM Exception while processing transaction: revert It is not exist flower Type -- Reason given: It is not exist flower Type.
    at evalmachine.<anonymous>
    at sigintHandlersWrap (node:vm:268:12)
    at Script.runInContext (node:vm:137:14)
    at runScript (C:\Users\test\AppData\Roaming\npm\node_modules\truffle\build\webpack:\packages\core\lib\console.js:454:1)
    at Console.interpret (C:\Users\test\AppData\Roaming\npm\node_modules\truffle\build\webpack:\packages\core\lib\console.js:469:1)
    at bound (node:domain:421:15)
    at REPLServer.runBound [as eval] (node:domain:432:12)
    at REPLServer.onLine (node:repl:893:10)
    at REPLServer.emit (node:events:527:28)
    at REPLServer.emit (node:domain:475:12)
    at REPLServer.[_onLine] [as _onLine] (node:internal/readline/interface:418:12)
    at REPLServer.[_line] [as _line] (node:internal/readline/interface:879:18)
    at REPLServer.[_ttyWrite] [as _ttyWrite] (node:internal/readline/interface:1257:22)
    at REPLServer.self._ttyWrite (node:repl:988:9)
    at ReadStream.onkeypress (node:internal/readline/interface:269:20)
    at ReadStream.emit (node:events:527:28)
    at ReadStream.emit (node:domain:475:12)
    at emitKeys (node:internal/readline/utils:358:14)
    at emitKeys.next (<anonymous>)
    at ReadStream.onData (node:internal/readline/emitKeypressEvents:64:36)
    at ReadStream.emit (node:events:527:28)
    at ReadStream.emit (node:domain:475:12)
    at addChunk (node:internal/streams/readable:324:12)
    at readableAddChunk (node:internal/streams/readable:297:9)
    at ReadStream.Readable.push (node:internal/streams/readable:234:10)
    at TTY.onStreamRead (node:internal/stream_base_commons:190:23) {
  data: {
    hash: null,
    programCounter: 3204,
    result: '0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001b4974206973206e6f7420657869737420666c6f77657220547970650000000000',
    reason: 'It is not exist flower Type',
    message: 'revert'
  },
  reason: 'It is not exist flower Type',
  hijackedStack: 'Error: Returned error: VM Exception while processing transaction: revert It is not exist flower Type -- Reason given: It is not exist flower Type.\n' +
    '    at Object.ErrorResponse (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-core-helpers\\lib\\errors.js:28:1)\n' +
    '    at C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-core-requestmanager\\lib\\index.js:300:1\n' +
    '    at C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\packages\\provider\\wrapper.js:123:1\n' +
    '    at XMLHttpRequest.request.onreadystatechange (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-providers-http\\lib\\index.js:98:1)\n' +
    '    at XMLHttpRequestEventTarget.dispatchEvent (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request-event-target.js:34:1)\n' +
    '    at XMLHttpRequest.exports.modules.996763.XMLHttpRequest._setReadyState (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:208:1)\n' +
    '    at XMLHttpRequest.exports.modules.996763.XMLHttpRequest._onHttpResponseEnd (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:318:1)\n' +
    '    at IncomingMessage.<anonymous> (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:289:48)\n' +
    '    at IncomingMessage.emit (node:events:539:35)\n' +
    '    at IncomingMessage.emit (node:domain:537:15)\n' +
    '    at endReadableNT (node:internal/streams/readable:1342:12)\n' +
    '    at processTicksAndRejections (node:internal/process/task_queues:83:21)'
}
truffle(develop)> instance.tokenURI(1)
'https://metafloris.com/nft/json/flower1/1.json'
truffle(develop)> instance.tokenURI(2)
'https://metafloris.com/nft/json/flower2/2.json'
truffle(develop)> instance.tokenURI(3)
'https://metafloris.com/nft/json/flower3/3.json'
truffle(develop)> instance.tokenURI(4)
'https://metafloris.com/nft/json/flower1/4.json'
truffle(develop)> instance.tokenURI(5)
Uncaught:
Error: Returned error: VM Exception while processing transaction: revert ERC721: invalid token ID
    at evalmachine.<anonymous>
    at sigintHandlersWrap (node:vm:268:12)
    at Script.runInContext (node:vm:137:14)
    at runScript (C:\Users\test\AppData\Roaming\npm\node_modules\truffle\build\webpack:\packages\core\lib\console.js:454:1)
    at Console.interpret (C:\Users\test\AppData\Roaming\npm\node_modules\truffle\build\webpack:\packages\core\lib\console.js:469:1)
    at bound (node:domain:421:15)
    at REPLServer.runBound [as eval] (node:domain:432:12)
    at REPLServer.onLine (node:repl:893:10)
    at REPLServer.emit (node:events:527:28)
    at REPLServer.emit (node:domain:475:12)
    at REPLServer.[_onLine] [as _onLine] (node:internal/readline/interface:418:12)
    at REPLServer.[_line] [as _line] (node:internal/readline/interface:879:18)
    at REPLServer.[_ttyWrite] [as _ttyWrite] (node:internal/readline/interface:1257:22)
    at REPLServer.self._ttyWrite (node:repl:988:9)
    at ReadStream.onkeypress (node:internal/readline/interface:269:20)
    at ReadStream.emit (node:events:527:28)
    at ReadStream.emit (node:domain:475:12)
    at emitKeys (node:internal/readline/utils:358:14)
    at emitKeys.next (<anonymous>)
    at ReadStream.onData (node:internal/readline/emitKeypressEvents:64:36)
    at ReadStream.emit (node:events:527:28)
    at ReadStream.emit (node:domain:475:12)
    at addChunk (node:internal/streams/readable:324:12)
    at readableAddChunk (node:internal/streams/readable:297:9)
    at ReadStream.Readable.push (node:internal/streams/readable:234:10)
    at TTY.onStreamRead (node:internal/stream_base_commons:190:23) {
  data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000184552433732313a20696e76616c696420746f6b656e2049440000000000000000',
  hijackedStack: 'Error: Returned error: VM Exception while processing transaction: revert ERC721: invalid token ID\n' +
    '    at Object.ErrorResponse (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-core-helpers\\lib\\errors.js:28:1)\n' +
    '    at C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-core-requestmanager\\lib\\index.js:300:1\n' +
    '    at C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\packages\\provider\\wrapper.js:123:1\n' +
    '    at XMLHttpRequest.request.onreadystatechange (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-providers-http\\lib\\index.js:98:1)\n' +
    '    at XMLHttpRequestEventTarget.dispatchEvent (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request-event-target.js:34:1)\n' +
    '    at XMLHttpRequest.exports.modules.996763.XMLHttpRequest._setReadyState (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:208:1)\n' +
    '    at XMLHttpRequest.exports.modules.996763.XMLHttpRequest._onHttpResponseEnd (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:318:1)\n' +
    '    at IncomingMessage.<anonymous> (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:289:48)\n' +
    '    at IncomingMessage.emit (node:events:539:35)\n' +
    '    at IncomingMessage.emit (node:domain:537:15)\n' +
    '    at endReadableNT (node:internal/streams/readable:1342:12)\n' +
    '    at processTicksAndRejections (node:internal/process/task_queues:83:21)'
}
truffle(develop)> instance.tokenURI(6)
'https://metafloris.com/nft/json/flower1/6.json'
truffle(develop)> instance.tokenURI(7)
'https://metafloris.com/nft/json/flower1/7.json'
truffle(develop)> instance.tokenURI(8)
'https://metafloris.com/nft/json/flower1/8.json'
truffle(develop)> instance.tokenURI(9)
'https://metafloris.com/nft/json/flower1/9.json'
truffle(develop)> instance.tokenURI(10)
Uncaught:
Error: Returned error: VM Exception while processing transaction: revert ERC721: invalid token ID
    at evalmachine.<anonymous>
    at sigintHandlersWrap (node:vm:268:12)
    at Script.runInContext (node:vm:137:14)
    at runScript (C:\Users\test\AppData\Roaming\npm\node_modules\truffle\build\webpack:\packages\core\lib\console.js:454:1)
    at Console.interpret (C:\Users\test\AppData\Roaming\npm\node_modules\truffle\build\webpack:\packages\core\lib\console.js:469:1)
    at bound (node:domain:421:15)
    at REPLServer.runBound [as eval] (node:domain:432:12)
    at REPLServer.onLine (node:repl:893:10)
    at REPLServer.emit (node:events:527:28)
    at REPLServer.emit (node:domain:475:12)
    at REPLServer.[_onLine] [as _onLine] (node:internal/readline/interface:418:12)
    at REPLServer.[_line] [as _line] (node:internal/readline/interface:879:18)
    at REPLServer.[_ttyWrite] [as _ttyWrite] (node:internal/readline/interface:1257:22)
    at REPLServer.self._ttyWrite (node:repl:988:9)
    at ReadStream.onkeypress (node:internal/readline/interface:269:20)
    at ReadStream.emit (node:events:527:28)
    at ReadStream.emit (node:domain:475:12)
    at emitKeys (node:internal/readline/utils:358:14)
    at emitKeys.next (<anonymous>)
    at ReadStream.onData (node:internal/readline/emitKeypressEvents:64:36)
    at ReadStream.emit (node:events:527:28)
    at ReadStream.emit (node:domain:475:12)
    at addChunk (node:internal/streams/readable:324:12)
    at readableAddChunk (node:internal/streams/readable:297:9)
    at ReadStream.Readable.push (node:internal/streams/readable:234:10)
    at TTY.onStreamRead (node:internal/stream_base_commons:190:23) {
  data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000184552433732313a20696e76616c696420746f6b656e2049440000000000000000',
  hijackedStack: 'Error: Returned error: VM Exception while processing transaction: revert ERC721: invalid token ID\n' +
    '    at Object.ErrorResponse (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-core-helpers\\lib\\errors.js:28:1)\n' +
    '    at C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-core-requestmanager\\lib\\index.js:300:1\n' +
    '    at C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\packages\\provider\\wrapper.js:123:1\n' +
    '    at XMLHttpRequest.request.onreadystatechange (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-providers-http\\lib\\index.js:98:1)\n' +
    '    at XMLHttpRequestEventTarget.dispatchEvent (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request-event-target.js:34:1)\n' +
    '    at XMLHttpRequest.exports.modules.996763.XMLHttpRequest._setReadyState (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:208:1)\n' +
    '    at XMLHttpRequest.exports.modules.996763.XMLHttpRequest._onHttpResponseEnd (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:318:1)\n' +
    '    at IncomingMessage.<anonymous> (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:289:48)\n' +
    '    at IncomingMessage.emit (node:events:539:35)\n' +
    '    at IncomingMessage.emit (node:domain:537:15)\n' +
    '    at endReadableNT (node:internal/streams/readable:1342:12)\n' +
    '    at processTicksAndRejections (node:internal/process/task_queues:83:21)'
}
truffle(develop)> instance.getHoldTimeMap(0)
BN {
  negative: 0,
  words: [ 58863102, 24, <1 empty item> ],
  length: 2,
  red: null
}
truffle(develop)> instance.ownerOf(0)
'0xA8a9507566B5B76f54c26dB0d49672789A891C16'
truffle(develop)> accounts
[
  '0x127c53cb707F733b04A98c1af749F0d804C424C5',
  '0xA8a9507566B5B76f54c26dB0d49672789A891C16',
  '0xdcfD1513eF74713506B8b714d2eC9A1D89e484d4',
  '0x9d04d2Fb0f076274c9747c6D85c7Cf68Ce20173B',
  '0xB9C648df976E7eA2165855AC4ad27D605F57faD4',
  '0x8fE8D3ceC9343c2Ee3F5dfED737daA02f5D8d9b2',
  '0xc8C2afFF8Ca17D81a93767d3043388d335a1c732',
  '0x31862E92Dd43793BB0b226b8e6a29EbE4d59eC4C',
  '0x02BE58415128A3f0056B08736Ab024ae1af18dE0',
  '0x9f264fcdEe63904A613f918713117f0954a3697B'
]
truffle(develop)> instance.transferFrom(accounts[1],accounts[2],0)
Uncaught:
Error: Returned error: VM Exception while processing transaction: revert ERC721: caller is not token owner or approved -- Reason given: ERC721: caller is not token owner or approved.
    at evalmachine.<anonymous>
    at sigintHandlersWrap (node:vm:268:12)
    at Script.runInContext (node:vm:137:14)
    at runScript (C:\Users\test\AppData\Roaming\npm\node_modules\truffle\build\webpack:\packages\core\lib\console.js:454:1)
    at Console.interpret (C:\Users\test\AppData\Roaming\npm\node_modules\truffle\build\webpack:\packages\core\lib\console.js:469:1)
    at bound (node:domain:421:15)
    at REPLServer.runBound [as eval] (node:domain:432:12)
    at REPLServer.onLine (node:repl:893:10)
    at REPLServer.emit (node:events:527:28)
    at REPLServer.emit (node:domain:475:12)
    at REPLServer.[_onLine] [as _onLine] (node:internal/readline/interface:418:12)
    at REPLServer.[_line] [as _line] (node:internal/readline/interface:879:18)
    at REPLServer.[_ttyWrite] [as _ttyWrite] (node:internal/readline/interface:1257:22)
    at REPLServer.self._ttyWrite (node:repl:988:9)
    at ReadStream.onkeypress (node:internal/readline/interface:269:20)
    at ReadStream.emit (node:events:527:28)
    at ReadStream.emit (node:domain:475:12)
    at emitKeys (node:internal/readline/utils:358:14)
    at emitKeys.next (<anonymous>)
    at ReadStream.onData (node:internal/readline/emitKeypressEvents:64:36)
    at ReadStream.emit (node:events:527:28)
    at ReadStream.emit (node:domain:475:12)
    at addChunk (node:internal/streams/readable:324:12)
    at readableAddChunk (node:internal/streams/readable:297:9)
    at ReadStream.Readable.push (node:internal/streams/readable:234:10)
    at TTY.onStreamRead (node:internal/stream_base_commons:190:23) {
  data: {
    hash: null,
    programCounter: 2490,
    result: '0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002d4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6572206f7220617070726f76656400000000000000000000000000000000000000',
    reason: 'ERC721: caller is not token owner or approved',
    message: 'revert'
  },
  reason: 'ERC721: caller is not token owner or approved',
  hijackedStack: 'Error: Returned error: VM Exception while processing transaction: revert ERC721: caller is not token owner or approved -- Reason given: ERC721: caller is not token owner or approved.\n' +
    '    at Object.ErrorResponse (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-core-helpers\\lib\\errors.js:28:1)\n' +
    '    at C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-core-requestmanager\\lib\\index.js:300:1\n' +
    '    at C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\packages\\provider\\wrapper.js:123:1\n' +
    '    at XMLHttpRequest.request.onreadystatechange (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\web3-providers-http\\lib\\index.js:98:1)\n' +
    '    at XMLHttpRequestEventTarget.dispatchEvent (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request-event-target.js:34:1)\n' +
    '    at XMLHttpRequest.exports.modules.996763.XMLHttpRequest._setReadyState (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:208:1)\n' +
    '    at XMLHttpRequest.exports.modules.996763.XMLHttpRequest._onHttpResponseEnd (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:318:1)\n' +
    '    at IncomingMessage.<anonymous> (C:\\Users\\test\\AppData\\Roaming\\npm\\node_modules\\truffle\\build\\webpack:\\node_modules\\xhr2-cookies\\dist\\xml-http-request.js:289:48)\n' +
    '    at IncomingMessage.emit (node:events:539:35)\n' +
    '    at IncomingMessage.emit (node:domain:537:15)\n' +
    '    at endReadableNT (node:internal/streams/readable:1342:12)\n' +
    '    at processTicksAndRejections (node:internal/process/task_queues:83:21)'
}
truffle(develop)> instance.transferFrom(accounts[1],accounts[2],0, {from:accounts[1]})
{
  tx: '0x186292c22b4c3ba3a64486e9d973375cbab2a95d467a3a1757c08411712b6c85',
  receipt: {
    transactionHash: '0x186292c22b4c3ba3a64486e9d973375cbab2a95d467a3a1757c08411712b6c85',
    transactionIndex: 0,
    blockNumber: 10,
    blockHash: '0x1874165d133dc736e46ac8adbc0ccd1a7c386a6d3964be71337d54c56e5eae7b',
    from: '0xa8a9507566b5b76f54c26db0d49672789a891c16',
    to: '0x8bc13c93849fbe2e47af8b42ce735134189d9318',
    cumulativeGasUsed: 61337,
    gasUsed: 61337,
    contractAddress: null,
    logs: [ [Object] ],
    logsBloom: '0x00000000000000000000000000000400000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000020000000200000000000800000000000000000000000010000000000000000000000000000000000000020000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000002000020000000000000000000000000000000000000000000000020000000000000000000000000000000000000001008000000000000000000000000',
    status: true,
    effectiveGasPrice: 2818717425,
    type: '0x2',
    rawLogs: [ [Object] ]
  },
  logs: [
    {
      address: '0x8bc13C93849fBE2E47AF8b42ce735134189d9318',
      blockHash: '0x1874165d133dc736e46ac8adbc0ccd1a7c386a6d3964be71337d54c56e5eae7b',
      blockNumber: 10,
      logIndex: 0,
      removed: false,
      transactionHash: '0x186292c22b4c3ba3a64486e9d973375cbab2a95d467a3a1757c08411712b6c85',
      transactionIndex: 0,
      id: 'log_5260a79f',
      event: 'Transfer',
      args: [Result]
    }
  ]
}
truffle(develop)> instance.ownerOf(0)
'0xdcfD1513eF74713506B8b714d2eC9A1D89e484d4'
truffle(develop)> accounts
[
  '0x127c53cb707F733b04A98c1af749F0d804C424C5',
  '0xA8a9507566B5B76f54c26dB0d49672789A891C16',
  '0xdcfD1513eF74713506B8b714d2eC9A1D89e484d4',
  '0x9d04d2Fb0f076274c9747c6D85c7Cf68Ce20173B',
  '0xB9C648df976E7eA2165855AC4ad27D605F57faD4',
  '0x8fE8D3ceC9343c2Ee3F5dfED737daA02f5D8d9b2',
  '0xc8C2afFF8Ca17D81a93767d3043388d335a1c732',
  '0x31862E92Dd43793BB0b226b8e6a29EbE4d59eC4C',
  '0x02BE58415128A3f0056B08736Ab024ae1af18dE0',
  '0x9f264fcdEe63904A613f918713117f0954a3697B'
]
truffle(develop)> instance.getHoldTimeMap(0)
BN {
  negative: 0,
  words: [ 58863229, 24, <1 empty item> ],
  length: 2,
  red: null
}
truffle(develop)>