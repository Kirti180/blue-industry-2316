const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const cookieparser = require("cookie-parser")
const { UserModel } = require("../models/user.model")
UserRoute = express.Router()
UserRoute.use(express.json())
UserRoute.use(cookieparser())

UserRoute.post("/signup", async (req, res) => {
    let Role = req.body.role
    req.body.role== undefined ? Role="User" : Role==req.body.role
    const { firstName, lastName, mobileNo, email, password, role } = req.body
    console.log(req.body)
    try {
        bcrypt.hash(password, 4, async (err, hash) => {
            if (err) {
                res.send(err)
            }
            else {
                const users = new UserModel({ firstName, lastName, mobileNo, email, password: hash, role })
                await users.save()
                res.send({ "msg": "New user registered", users })
            }
        });
    } catch (error) {
        res.send({ "msg": "something went wrong", "error": error })
    }
})

UserRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const usr = await UserModel.find({ email })
        if (usr.length > 0) {
            bcrypt.compare(password, usr[0].password, async (err, result) => {
                if (err) res.send(err)
                else if (result) {
                    const token = jwt.sign({ userId: usr[0]._id }, 'imran', { expiresIn: '1h' })
                    res.cookie("Token", token).send({ "msg": "User logged in successful", "token": token })
                }
            });
        }
        else {
            res.send("something went wrong")
        }
    } catch (error) {
        res.send(error)
    }
})



module.exports = {
    UserRoute
}
