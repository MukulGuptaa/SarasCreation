const { StatusCodes } = require("http-status-codes");
const BaseError = require("./base.error");

class BadRequest extends BaseError{
    constructor(propertyNaeme, details){
        super("BadRequest", StatusCodes.BAD_REQUEST, `Invalid request for ${propertyNaeme} provided`, details);
    }
}

module.exports = BadRequest;