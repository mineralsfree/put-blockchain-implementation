import {createRequire} from 'module'

const require = createRequire(import.meta.url);
const {Router} = require('express');

import user from './user.js' ;
import blockChain from './blockchain.js'

const router = Router();

router.use('/user', user);
router.use('/blockchain', blockChain);

export default router;