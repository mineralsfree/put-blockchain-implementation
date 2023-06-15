import {createRequire} from 'module'

const require = createRequire(import.meta.url);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdDate: {type: Date, default: Date.now},
    hash: {type: String, required: true},
    prvK: {type: String, required: true},
    pubK: {type: String, require: true},
    role: {
        type: String,
        default: 'user',
        required: true
    }
});
//we dont need to send id and hash to Front
UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.hash;
        delete ret.prvK;
    }
});
export default mongoose.model('User', UserSchema);

