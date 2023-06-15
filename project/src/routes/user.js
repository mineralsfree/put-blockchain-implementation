import {createRequire} from 'module'
import {userService} from "../services/userService.js";
import {Block} from "../model/Block.js";
import {blockChain} from "../model/BlockChain.js";
import crypto from "crypto";
const require = createRequire(import.meta.url);
const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');


router.post('/auth', async (req, res, next) => {
    try {
        const result = await userService.authenticateUser(req.body);
        res.json({userToken: result.token});
    } catch (e) {
        next(e);
    }
})
router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 8}),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const user = req.body;
        try {
            await userService.createUser(user);
            return res.json({success: true});
        } catch (e) {
            next(e);
        }
    })
router.post('/verify', async (req,res)=>{
    const data = req.body.str;
    const [index, transactionTimestamp, sender, recipient, amount, signature] = data.split(';');
    const user = await userService.getUser(sender);
    const publicKey = crypto.createPublicKey(user.pubK);
    const block = blockChain.findBlock(Number(index));
    if (!block || !user){
        res.json({isValid: false});
    }
    const transaction =[index, transactionTimestamp, sender, recipient, amount].join(';')
    console.log(data);
    const isValid = crypto.verify("SHA256", new Buffer(transaction), publicKey, new Buffer(signature, 'base64'));
    console.log(isValid);
    res.json({isValid});
})

export default router;
