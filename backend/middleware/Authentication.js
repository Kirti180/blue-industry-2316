const express = require("express")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/user.model")
const { BlacklistModel } = require("../models/blacklist.model")
require("dotenv").config()
// const cors = require("cors");
// app.use(cors());

const {createClient} = require("redis")

const client = createClient({
    password:process.env.password,
    socket: {
        host: process.env.redisURL,
        port: process.env.redis_port
    }
  });
client.connect(()=>console.log("Redis connected"))



const authentication = async (req, res, next) => {
    
    const token = await client.get('token')
    console.log(token)
    if (token) {
        const blocked = await BlacklistModel.find({ token })
        if (blocked.length > 0) {
            res.end("Your Login expired, Please login again")
        }
        jwt.verify(token, process.env.secretKey, async (err, decoded) => {
            if (decoded) {
                req.body.user = decoded.userId
                req.user = await UserModel.find({ _id: decoded.userId })
                next()
            }
            else {
                res.status(400).send({"msg":"Please login first"})
            }
        });
    }
    else {
        res.status(400).send({"msg":"Please login first"})
    }
}

module.exports = {
    authentication
}