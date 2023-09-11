const User=require("./User")
const Contact=require("./Contact")
// admin
let admin = User.newAdmin("akshay", "pawar",true,"Akshay","password");
console.log(User.admin)
// users
// let user1 = admin.createUser("om", "rane");
// let user2 = admin.createUser("pankaj", "kashid");

// update user
// admin.updateUser(1,"lastName","ap")


// delete user
// admin.deleteUser(1)


// Alluser
// console.log(admin.getAllUser())


// user1 contact
// user1.createContact("pratik","kalghuge")
// user1.createContact("swapnil","rokde")

// user2 contact
// user2.createContact("akash","pawar")
// user2.createContact("ayush","dhone")

// delete user1 contact
// user1.deleteContacts(0)

// printing user1 contact
// console.log(user1.contacts);

// update contact
// user1.updateContact(0,"firstName","as")
// console.log(user1.contacts);

// user creating contact details
// console.log(user1.createContactDetails("self",8237212119,0))
// console.log(user1.createContactDetails("self",823721219,0))
// console.log(user1.contacts);

// update contact details
// user1.updateContactDetail(0,0,"typeOfContactDetail","friend")
// console.log(user1.contacts[0].contactDetails)

//delete contact details
// user1.deleteContactDetails(0,0)
// console.log(user1.contacts[0].contactDetails)

