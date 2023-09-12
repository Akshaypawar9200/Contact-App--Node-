const { sign } = require('cookie-signature');

require('dotenv').config()
const Contact=require('../User')
const jwt=require('jsonwebtoken');
const UnauthorizeError = require('../error/UnauthorizeError');
class JwtAuthentication{
    // static key=
    constructor(id,userName,isAdmin)
    {
        this.id=id;
        this.userName=userName;
        this.isAdmin=isAdmin;
    }
    static newAuthenticate(id,userName,isAdmin){
       let  payload=new JwtAuthentication(id,userName,isAdmin)
        let token=jwt.sign(JSON.stringify(payload),process.env.JWT_SECRET_KEY)
       
        return token
    }
    static verifyToken(token){
        let payload=jwt.verify(token,process.env.JWT_SECRET_KEY)
       
        return payload

    }
    static isAdmin(req,res,next){
      
        try {
     
            const token=req.cookies[process.env.AUTH_COOKIE_NAME];
            console.log(process.env.AUTH_COOKIE_NAME);
            console.log("tokrn");
           
            if(!token){
                throw new UnauthorizeError("invalid token")
            }
            let payload=JwtAuthentication.verifyToken(token)
            if(payload.isAdmin){
                
                next()
    
            }
            else{
            throw new UnauthorizeError("unauthorized acess")
            }
            
         } catch (error) {
            throw error
         }

    }
    static isUser(req,res,next){

        try {
          
            const token=req.cookies[process.env.AUTH_COOKIE_NAME];
          
            if(!token){
                throw new Error("unauthorize")
            }
            
            let payload=JwtAuthentication.verifyToken(token)

            if(!payload.isAdmin){
                
                next()
    
            }
            else{
            throw new UnauthorizeError("unauthorized acesss")
            }
            
         } catch (error) {
            throw error
         }

    
    }
}
module.exports=JwtAuthentication