import {createRequire} from 'module'

const require = createRequire(import.meta.url);
import User from "../model/User.js";
import {NotFoundError} from "../errors/NotFoundError.js";
import {UnauthorizedError} from '../errors/UnauthorizedError.js';
import {encryptData} from "../helpers/encryption.js";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const prime_length = 1000;
class UserService {
    async authenticateUser({email, password}) {
        const user = await User.findOne({email});
        if (user && bcrypt.compareSync(password, user.hash)) {
            const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '31d'});
            return {token}
        } else {
            throw new UnauthorizedError('login or password is incorrect')
        }
    }

    async getUser(id) {
        const user = User.findOne({_id: id});
        if (!user) {
            throw new NotFoundError('No user with such id');
        }
        return user;
    }

    async createUser(user) {
        if (await User.findOne({email: user.email})) {
            throw new UnauthorizedError('User with this email already registered');
        }
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
        });
        const newUser = new User({...user, prvK: encryptData(privateKey.export({type: 'pkcs1', format: 'pem'})), pubK: publicKey.export({type: 'pkcs1', format: 'pem'}) });
        newUser.hash = bcrypt.hashSync(user.password, 10)
        return await newUser.save();
    }
}

export const userService = new UserService();