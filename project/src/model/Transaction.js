let tId = 0;

export class Transaction {
    constructor(sender, recipient, amount, timestamp) {
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
        this.timestamp = timestamp;
        this.id = tId++;
    }

    toSting() {
        return '' + this.id + ';' + this.timestamp + ';' + this.sender + ';' + this.recipient + ';' + this.amount + (this.sign ? ';' + this.sign : '');
    }

    setSign(sign) {
        this.sign = sign
    }
}