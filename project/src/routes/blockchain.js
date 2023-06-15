import {createRequire} from 'module'

const require = createRequire(import.meta.url);
import {body, validationResult} from "express-validator";
import crypto from "crypto";

const express = require("express");
const router = express.Router();
import {blockChain} from "../model/BlockChain.js";
import {Transaction} from "../model/Transaction.js";
import {userService} from "../services/userService.js";
import {decryptData} from "../helpers/encryption.js";


router.get('/chain', (req, res,) => {
    res.json(blockChain.chain);
})
router.post('/createBlock', [
    // body('sender').notEmpty().isString(),
    body('recipient').notEmpty().isString(),
    body('amount').notEmpty().isInt({min: 0}),
], async (req, res) => {
    const errors = validationResult(req);
    const userId = req.auth.id;
    // Check for validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const user = await userService.getUser(userId);
    const pK = crypto.createPrivateKey(decryptData(user.prvK))

    const {recipient, amount} = req.body;
    const transaction = new Transaction(userId, recipient, Number(amount), new Date());
    const signature = crypto.sign("SHA256", new Buffer(transaction.toSting()), pK);
    transaction.setSign(signature.toString('base64'));
    blockChain.addBlock(transaction.toSting());
    res.json({status: 'ok'})


})
export default router;