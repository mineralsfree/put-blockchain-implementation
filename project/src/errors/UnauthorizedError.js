import {ExtendableError} from './ExtandableError.js'

export class UnauthorizedError extends ExtendableError {
    constructor(props) {
        super(props);
        this.status = 401
    }
}