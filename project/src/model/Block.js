export class Block {
    constructor(index, timestamp, data, prevHash, nonce = 0) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.nonce = 0;
    }
    setNonce(nonce){
        this.nonce = nonce
    }
    setHash(hash){
        this.hash = hash;
    }
    toString(){
        return '' + this.index + Number(this.timestamp) + this.data + this.prevHash + this.nonce;
    }
}