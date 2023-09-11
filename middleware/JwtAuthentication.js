const { sign } = require('cookie-signature');
const Contact=require('../User')
const jwt=require('jsonwebtoken')
class JwtAuthentication{
    static key="RandomKey"
    constructor(id,userName,isAdmin)
    {
        this.id=id;
        this.userName=userName;
        this.isAdmin=isAdmin;
    }
    static newAuthenticate(id,userName,isAdmin){
       let  payload=new JwtAuthentication(id,userName,isAdmin)
        let token=jwt.sign(JSON.stringify(payload),JwtAuthentication.key)
       
        return token
    }
    static verifyToken(token){
        let payload=jwt.verify(token,JwtAuthentication.key)
       
        return payload

    }
    static isAdmin(req,res,next){
      
        try {
     
            const token=req.cookies.authe;
           
            if(!token){
                throw new Error("unauthorize")
            }
            let payload=JwtAuthentication.verifyToken(token)
            if(payload.isAdmin){
                
                next()
    
            }
            else{
            throw Error("unauthorized")
            }
            
         } catch (error) {
            throw error
         }

    }
    static isUser(req,res,next){

        try {
          
            const token=req.cookies.authe;
          
            if(!token){
                throw new Error("unauthorize")
            }
            
            let payload=JwtAuthentication.verifyToken(token)

            if(!payload.isAdmin){
                
                next()
    
            }
            else{
            throw Error("unauthorized")
            }
            
         } catch (error) {
            throw error
         }

    
    }
}
module.exports=JwtAuthentication