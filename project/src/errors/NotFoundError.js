import {ExtendableError} from "./ExtandableError.js";

export class NotFoundError extends ExtendableError {
  constructor(props) {
    super(props);
    this.status = 404;
  }
}