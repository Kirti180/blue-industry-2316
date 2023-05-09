const express = require("express")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/user.model")
const { BlacklistModel } = require("../models/blacklist.model")
const { createClient } = require("redis");
// const cors = require("cors");
// app.use(cors());
const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

const authentication = async (req, res, next) => {
    
    const token = await client.get('token')


    if (token) {
        const blocked = await BlacklistModel.find({ token })
        if (blocked.length > 0) {
            res.end("Your Login expired, Please login again")
        }
        jwt.verify(token, 'imran', async (err, decoded) => {
            if (decoded) {
                req.body.user = decoded.userId
                req.user = await UserModel.find({ _id: decoded.userId })
                next()
            }
            else {
                res.end("Please login first")
            }
        });
    }
    else {
        res.send("Login first")
    }
}

module.exports = {
    authentication
}