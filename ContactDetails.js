const Contact = require("./Contact");
const {
    NotFound,
    ValidationError,
    UnauthorizeError

}=require('./error')

class ContactDetails {
    static id = 0;

    constructor(typeOfCd, valueOfCd) {
        this.id = ContactDetails.id++;
        this.typeOfCd = typeOfCd;
        this.valueOfCd = valueOfCd;
    }

    static newContactDetails(typeOfCd, valueOfCd) {
        try {
            if (typeof typeOfCd !== "string") {
                throw new ValidationError("Invalid typeOfCd");
            }
           
            return new ContactDetails(typeOfCd, valueOfCd);
        } catch (error) {
            throw error;
        }
    }

    updateTypeOfContactDetail(newValue) {
        try {
            if (typeof newValue !== "string") {
                throw new ValidationError("Invalid value");
            }
           return this.typeOfCd = newValue;
        } catch (error) {
            throw error;
        }
    }

    updateValueOfContactDetail(newValue) {
        try {
            if (typeof newValue !== "string") {
                throw new ValidationError("Invalid value");
            }
            return this.valueOfCd = newValue;
        } catch (error) {
            throw error;
        }
    }

    updateContactDetails(parameter, newValue) {
        try {
            if (typeof parameter !== "string") {
                throw new ValidationError("Invalid parameter");
            }
            switch (parameter) {
                case "typeOfContactDetail":
                     this.updateTypeOfContactDetail(newValue);
                     break;
                case "valueOfContactDetail":
                    return this.updateValueOfContactDetail(newValue);
                    break
                default:
                    return "Invalid param";
                    
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ContactDetails;
