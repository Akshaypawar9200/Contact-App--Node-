const ContactAppError=require('./ContactAppError')
const { StatusCodes } = require('http-status-codes')
class UnauthorizeError extends ContactAppError{
    constructor(specifcMessage){
    super(
        "Unauthorize error",
        StatusCodes.UNAUTHORIZED,
        specifcMessage
    )
    }
}
module.exports=UnauthorizeError