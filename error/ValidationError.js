const ContactAppError = require("./ContactAppError");
const { StatusCodes } = require('http-status-codes')
class ValidationError extends ContactAppError{
    constructor(specifcMessage){
    super("check user parameter",
    "validation Error",
    StatusCodes.BAD_REQUEST,
    specifcMessage
    )
    }
}
module.exports=ValidationError
