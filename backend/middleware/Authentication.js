const express = require("express")
const jwt = require("jsonwebtoken")
const {UserModel} = require("../models/user.model")

const authentication= async (req,res,next)=>{
    const token= await req.cookies.Token
    console.log(token)
    if(token){
       jwt.verify(token, 'imran', async(err, decoded)=> {
            if(decoded){
                req.body.user=decoded.userId
                req.user= await UserModel.find({_id:decoded.userId})
                next()
            }   
            else{
                res.end("Please login first")
            }
          });
    }
    else{
        res.send("Login first")
    }
}

module.exports={
    authentication
}