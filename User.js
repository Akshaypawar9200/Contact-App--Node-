const Contact = require("./Contact");
const bcrypt = require('bcrypt');
const JwtAuthentication=require('./middleware/JwtAuthentication')
const {
    NotFound,
    ValidationError,
    UnauthorizeError

}=require('./error')

class User {
    static id = 0;
    static allUser = [];

    constructor(fname, lname, isAdmin,userName,password) {
        this.id = User.id++;
        this.fname = fname;
        this.lname = lname;
        this.isAdmin = isAdmin;
        this.userName=userName;
        this.password=password;
        this.isActive = true;
        this.contacts = [];


    }
// create admin
    static async newAdmin(fname, lname,isAdmin,userName,password) {
        try {
            if (typeof fname !== "string") {
                throw new ValidationError("Invalid firstName");
            }
            if (typeof lname !== "string") {
                throw new ValidationError("Invalid lastName");
            }
          

            let hashPassword=bcrypt.hash(password,12)
            console.log(await hashPassword);
            let newAdmin= new User(fname, lname, isAdmin,userName,await hashPassword);

            User.allUser.push(newAdmin)
            return newAdmin

        } catch (error) {
            console.log(error);
        }
    }

// find admin username
    static findAdminUserName(userName){
        for(let i=0;i<User.allUser.length;i++){
            if(User.allUser[i].userName==userName){
                return User.allUser[i]
            }
        }
        return null
        
    }
    
    static async adminAuthentication(userName,password){
     
        try {
            let adminObj=User.findAdminUserName(userName)
            if(adminObj==null){
                throw new NotFound("user not found")
            }
           
            let checkPassword=await bcrypt.compare(password, adminObj.password)
            
            if(!checkPassword)
            {
                throw new ValidationError("invalid password")
            }
            let token=JwtAuthentication.newAuthenticate(adminObj.id,adminObj.userName,adminObj.isAdmin)
            return token
            
        } catch (error) {
            throw error
        }
    }

// create user  
    static async createUser(fname, lname,isAdmin,userName,password) {
        try {
            let hashPassword=bcrypt.hash(password,12)
            console.log(await hashPassword);
            let newUser = new User(fname, lname, isAdmin,userName,await hashPassword);
            User.allUser.push(newUser);
            return newUser;
        } catch (error) {
            throw error
        }
    }
// find user
    static findUser(id) {
        
        try {
           
            for (let i = 0; i < User.allUser.length; i++) {
                
                if (User.allUser[i].id==id) {
                    return [User.allUser[i],i];
                }
            }
            throw new NotFound("user not found")
        } catch (error) {
            throw error
        }
        
    }

// alluser
    static getAllUser() {
        return User.allUser;
    }
// update firstname of user
static updateFirstName(id, newValue) {
    try {
        const [user, userIndex] = User.findUser(id);
        console.log(user);
    

        if (user === null) {
            throw new NotFound("User not found");
        }

        if (typeof newValue !== "string") {
            throw new ValidationError("Invalid value");
        }

        user.fname = newValue;
    } catch (error) {
        throw error;
    }
}

// update lastname of user
    static updateLastName(id,newValue) {
        try {
            let [user,userIndex]=User.findUser(id)
            if(user==null){
                throw new NotFound("user not found")
            }

            if (typeof newValue !== "string") {
                throw new ValidationError("Invalid value");
            }
            user.lname = newValue;
        } catch (error) {
            throw error;
        }
    }

// update username of user
   static updateUserName(id,newValue){
        try {
            let [user,userIndex]=User.findUser(id)
            if(user==null){
                throw new NotFound("user not found")
            }

            if (typeof newValue !== "string") {
                throw new ValidationError("Invalid value");
            }
            user.userName = newValue;
        } catch (error) {
            throw error;
        }
        
    }
// update user password
static updateUserPassword(id,newValue){
    try {
        let [user,userIndex]=User.findUser(id)
        if(user==null){
            throw new NotFound("user not found")
        }

        if (typeof newValue !== "string") {
            throw new ValidationError("Invalid value");
        }
        user.password = newValue;
    } catch (error) {
        throw error;
    }
}
// delete user
    static deleteUser(id) {
        try {
        
            const [userToBeDeleted,index] = User.findUser(id);
         
            if (userToBeDeleted === null) {
                throw new NotFound("User not found");
            }

             userToBeDeleted.isActive = false;
        } catch (error) {
           throw error
        }
    }

   

// update user

    updateUser(id, parameter, newValue) {
        try {
            switch (parameter) {
                case "firstName":
                    return User.updateFirstName(newValue,id)
                   break
                   
                case "lastName":
                    return User.updateLastName(newValue,id)
                    break
                case "userName":
                    return User.updateLastName(newValue,id)
                    break
                case "password":
                        return User.updateLastName(newValue,id)
                    break
                default:
                    return "Invalid parameter";
            }
        } catch (error) {
            return error.message
        }
    }

    // find user by id



// create contact
    createContact(firstName, lastName) {
        try{
        let newContact = Contact.newContact(firstName, lastName);
        this.contacts.push(newContact);
        return newContact;
    }
    catch(error){
      throw error
    }
    }
// find contact 
    findContact(id) {
      
        for (let i = 0; i < this.contacts.length; i++) {
            
            if (id == this.contacts[i].id) {
                return this.contacts[i];
            }
        }
        throw new NotFound("contact not found")
    }

    getAllContact() {
        return this.contacts;
    }

// update contact
    updateContact(id, parameter, newValue) {
        try{
            console.log(id);
        let contactToBeUpdated = this.findContact(id);
        if (contactToBeUpdated === null) {
            throw new NotFound("Contact not found");
        }
        return contactToBeUpdated.updateContact(parameter, newValue);
    }catch(error){
        console.log(error.message);
    }}
// delete Contact
    deleteContacts(userId,contactId) {
        try {
           let [contact,index]=User.findUser(userId)
            let contactToBeDeleted = contact.findContact(contactId);
            
            if (contactToBeDeleted === null) {
                throw new NotFound("Contact not found");
            }

            contactToBeDeleted.deleteContact();
        } catch (error) {
            return error.message
        }
    }
// create contact details
    createContactDetails(typeOfCd, newValue, id) {
        try {
            
            let contactObj = this.findContact(id);
            if (contactObj === null) {
                throw new ValidationError("Invalid ID");
            }
            return contactObj.createContactDetail(typeOfCd, newValue);
            
        } catch (error) {
            throw error
        }
    }
// update contact details
    updateContactDetail(id, contactDetailId, parameter, newValue) {
        try {
          
            let contactDetailsToBeUpdated = this.findContact(id);
          
            if (contactDetailsToBeUpdated === null) {
                throw new NotFound("Contact not found");
            }

            return contactDetailsToBeUpdated.updateContactDetailFromContact(contactDetailId, parameter, newValue);
        } catch (error) {

            throw error
        }
    }
// delete contact details
    deleteContactDetails(id, contactDetailId) {
        try {
           
            
            let contactDetailsToBeDeleted = this.findContact(id);
           

            if (contactDetailsToBeDeleted === null) {
                throw new NotFound("User not found");
            }

            contactDetailsToBeDeleted.deleteContactDetailsFromContact(contactDetailId);
        } catch (error) {
            return error.message
        }
    }
    getallcontactDetails(id){
        let conatctObjs=findContact(id)
        
        return conatctObjs.getAllContactDetail()

    }
    
}

module.exports = User;
