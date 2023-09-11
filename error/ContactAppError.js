
class ContactAppError extends Error{
    constructor(message,name,StatusCode,spacificMessage){
        super(message)
        this.name=name,
        this.StatusCode=StatusCode,
        this.spacificMessage=spacificMessage

    }
}
module.exports=ContactAppError