let mongoose = require('mongoose');
let Schema = mongoose.Schema;
 const BlockChainSchema = new Schema({
    index: {
        required: true,
        type: Schema.Types.Number
    },
    timestamp:{
        required: true,
        default: new Date(),
        type: Schema.Types.Date,
    },
    data: {
        required: true,
        type: Schema.Types.String
    },
    hash: {
        required: true,
        type: Schema.Types.String
    },
    prevHash: {
        required: true,
        type: Schema.Types.String
    }

})
module.exports = mongoose.model("BlockChain", BlockChainSchema);