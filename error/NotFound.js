const ContactAppError = require("./ContactAppError");
const { StatusCodes } = require("http-status-codes");
class NotFound extends ContactAppError {
  constructor(speecificMessage) {
    //message,name,StatusCode,spacificMessage
    super(
      "record not found",
      "Not Found",
      StatusCodes.NOT_FOUND,
      speecificMessage
    );
  }
}
module.exports = NotFound;
