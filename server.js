const express = require('express');
const {errorHandler}=require('./middleware/ErrorHandler')
const User = require('./User');
const cookieParser = require('cookie-parser')

const {
    NotFound,
    ValidationError,
    UnauthorizeError

} = require('./error');
const { isAdmin } = require('./middleware/JwtAuthentication');
const JwtAuthentication = require('./middleware/JwtAuthentication');

const application = express();
application.use(express.json());
application.use(cookieParser());
const mainRouter = express.Router();
const adminRouter = express.Router();
const contactDetailRouter=express.Router({ mergeParams: true });
const userRouter = express.Router({ mergeParams: true });
application.use('/api/v1/contact-app', mainRouter)
mainRouter.use('/:userid/contact', userRouter)
mainRouter.use('/user', adminRouter)
userRouter.use(JwtAuthentication.isUser)
adminRouter.use(JwtAuthentication.isAdmin)
userRouter.use('/:contactId/contactDetail',contactDetailRouter)               // /api/v1/contact-app/user          
const login = (req, res,next) => {
    try {
        let { userName, password } = req.body;
        if (typeof userName !== "string" || typeof password !== "string") {
            throw new ValidationError("Invalid credentials");
        }
        let token = User.adminAuthentication(userName, password);
        console.log(token);
        res.cookie("authe", token);
        res.status(200).send("login successful")
    } catch (error) {
        next(error);
    }
}

mainRouter.post('/login', login);    // /api/v1/contact-app/login           

const createAdmin = (req, res,next) => {
    try {
        const { fname, lname, isAdmin, userName, password } = req.body;
        let createAdmins = User.newAdmin(fname, lname, isAdmin, userName, password);
        res.status(200).send("Admin created");
    } catch (error) {
        
        next(error);
    }
}
mainRouter.post("/createadmin", createAdmin)


const createUser = (req, res,next) => {
    try {
        const { fname, lname, isAdmin, userName, password } = req.body;
        let createUsers = User.createUser(fname, lname, isAdmin, userName, password);
        res.status(200).send(createUsers);
    } catch (error) {
        
        next(error);
    }
}

adminRouter.post("/", createUser)  // /api/v1/contact-app/user

const getAllUser = (req, res,next) => {
    try {

        let allUser = User.getAllUser()
        res.status(200).send(allUser)


    } catch (error) {
       
        next(error)
    }
}

adminRouter.get('/', getAllUser)   // /api/v1/contact-app/user

const updateUser = (req, res,next) => {
    try {
        let id = Number(req.params.id)
       
        let { parameter, newValue } = req.body
        let userToUpdate = undefined
        switch (parameter) {
            case "firstName":
                if (typeof newValue != "string") {
                    throw new ValidationError("invalid firstname")
                }
                userToUpdate = User.updateFirstName(id, newValue);
                res.status(200).send("update sucessfully");
                break;
            case "lastName":
                if (typeof newValue != "string") {
                    throw new ValidationError("invalid firstname")
                }
                userToUpdate = User.updateLastName(id, newValue);
                res.status(200).send("update sucessfully");
                break;
            case "userName":
                if (typeof newValue != "string") {
                    throw new ValidationError("invalid firstname")
                }
                userToUpdate = User.updateUserName(id, newValue);
                res.status(200).send("update sucessfully");
                break;
            case "password":
                if (typeof newValue != "string") {
                    throw new ValidationError("invalid firstname")
                }
                userToUpdate = User.updateUserPassword(id, newValue);
                res.status(200).send("update sucessfully");
                break;

            default:
                throw new ValidationError("invalid parameter")

        }


    } catch (error) {
       
        next(error)
    }
}
adminRouter.put('/:id', updateUser)  // localhost:5000/api/v1/contact-app/user/1
const updateContact=(req,res)=>{
    try {
        
        let {userid,contactid} = req.params
    
        let [user,index]=User.findUser(userid) 
        
        let { parameter, newValue } = req.body
        let updateContactobjs=user.updateContact(contactid, parameter, newValue)

  res.status(200).send(updateContactobjs)

        
    } catch (error) {
       
        next(error)
    }
}

userRouter.put('/:contactid', updateContact)  // api/v1/contact-app/:userid/contact/contactid
const deleteContact=(req,res)=>{
    try {
        let {userid,contactid} = req.params 
        let [user,index]=User.findUser(userid)
        let deleteContact = user.deleteContacts(userid,contactid)
        res.status(200).send("contact deleted"  )
    } catch (error) {
        
        next(error)
    }
}
userRouter.delete('/:contactid',deleteContact)  // /api/v1/contact-app/:userid/contact/:contactid


const getAllContact=(req,res)=>{
    try {
        let {userid}=req.params
        console.log(userid)
        let [user,index]=User.findUser(userid)
        console.log(user.contacts)
        res.status(200).send(user.contacts)
    } catch (error) {
      
        next(error)
    }
}
userRouter.get('/',getAllContact) //api/v1/contact-app/:userid/contact
const deleteUser = (req, res,next) => {
    try {
        let {id} = req.params
        
        let deleteUsers = User.deleteUser(id)
        res.status(200).send("user deleted sucessfully")
    } catch (error) {
        
        next(error)
    }
}
adminRouter.delete('/:id', deleteUser)  //localhost:5000/api/v1/contact-app/user/

const createContact = (req, res,next) => {
    try {
        let id = req.params.userid
        let [contact, index] = User.findUser(id)
        
        const { firstName, lastName } = req.body
        if (typeof firstName != "string" || typeof lastName != "string") {
            throw new ValidationError("invalid parameters")
        }
       
        res.status(200).send(contact.createContact(firstName, lastName))
    } catch (error) {
     
        next(error)
    }


}

userRouter.post('/', createContact)///api/v1/contact-app/:userid/contact

const createContactDetails=(req,res)=>{
try {
    
    let {userid,contactId}=req.params
    let [user,index]=User.findUser(userid)
    let{typeofCd,value}=req.body
    let createContactDetailObj=user.createContactDetails(typeofCd, value, contactId)
    res.status(200).send(createContactDetailObj)
} catch (error) {
    
    next(error)
}
}
contactDetailRouter.post('/',createContactDetails) //  /api/v1/contact-app/:userid/contact/:contactId/contactDetail

const updateContactDetails=(req,res)=>{
   try {
    let {userid,contactId,contactDetailId}=req.params
   
    let [user,index]=User.findUser(userid)
    
   
    let { parameter, newValue } = req.body
    let updateContactobjs=user.updateContactDetail(contactId, contactDetailId, parameter, newValue)
   
    res.status(200).send("updated successfully")

   } catch (error) {
  
    next(error)
   }

}
contactDetailRouter.put('/:contactDetailId',updateContactDetails)  // /api/v1/contact-app/:userid/contact/:contactId/contactDetail/:contactDetailId
const deleteContactDetails=(req,res)=>{
    try {
        let {userid,contactId,contactDetailId} = req.params 
        
        let [user,index]=User.findUser(userid)
        let deleteContact = user.deleteContactDetails(contactId, contactDetailId)
        
        res.status(200).send("deleted sucessfully")
    } catch (error) {
        
        next(error)
    }
}
contactDetailRouter.delete('/:contactDetailId',deleteContactDetails)  // /api/v1/contact-app/:userid/contact/:contactId/contactDetail/:contactDetailId

const getAllContactDetails=(req,res)=>{
    try {
        
        let {userid,contactId}=req.params
        
        let [contact, index] = User.findUser(userid)
      
        let foundContact=contact.findContact(contactId)
      console.log(foundContact);
        res.status(200).send(foundContact)
    } catch (error) {
        next(error)
    }
}
contactDetailRouter.get('/',getAllContactDetails)  // // /api/v1/contact-app/:userid/contact/:contactId/contactDetail/
application.use(errorHandler)
application.listen(5000, () => {
    console.log("Server running on port 5000");
    // User.newAdmin("akshay", "pawar", true, "Akshay", "password")
    // User.createUser("pankaj", "kashid", false, "Pankaj", "password")

});

console.log("Hello");
