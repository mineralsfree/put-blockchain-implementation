import {createRequire} from 'module'
import {Block} from "./Block.js";
import {Transaction} from "./Transaction.js";
const require = createRequire(import.meta.url);

require('dotenv').config();

const CryptoJS = require("crypto-js");
 class BlockChain {
    constructor(difficulty) {
        this.chain = [];
        this.difficulty = difficulty;
        this.addBlock(new Transaction('genesis','genesis',0, new Date()).toSting())
    }

    mine(block) {
        block.setNonce(0);
        let hash = CryptoJS.SHA256(block.toString())
        console.log(Math.abs(hash.words[0]), ((1 << this.difficulty) - 1));
        while ((Math.abs(hash.words[0]) & ((1 << this.difficulty) - 1)) !== 0) {
            block.setNonce(block.nonce + 1);
            hash = CryptoJS.SHA256(block.toString())
        }
         console.log(block.toString(),  block.nonce)
        return hash.toString(CryptoJS.enc.Hex)
    }

    addBlock(data) {
        const prevHash = this.chain.length ? this.chain[this.chain.length - 1].hash : '';
        const newBlock = new Block(this.chain.length, new Date(), data, prevHash)
        const hash = this.mine(newBlock);
        newBlock.setHash(hash)
        this.chain.push(newBlock);
        return newBlock;
    }
    findBlock(index){
        return  this.chain.find(block=>{
             return block.index === index
         });
    }
}
export const blockChain = new BlockChain(process.env.DIFFICULTY)