const ContactAppError=require("./ContactAppError")
const { StatusCodes } = require('http-status-codes')
class NotFound extends ContactAppError{
    constructor(speecificMessage){
        super(
            "record not found",
            StatusCodes.NOT_FOUND,
            speecificMessage
        )
    }
}
module.exports=ContactAppError

