import User from "../models/usersModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../others/error.js"

export const register = async (req, res, next) => {
    try {
        const { password, ...otherInfo } = req.body

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            ...otherInfo,
            password: hash
        })
        await newUser.save()
        res.status(200).send("Create User Done!")
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return next(createError(404, "User not found!"))
        }

        const isPassword = await bcrypt.compare(req.body.password, user.password)
        if (!isPassword) {
            return next(createError(404, "Wrong password or username!"))
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        const { password, isAdmin, ...otherInfo } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({ ...otherInfo, isAdmin })
    } catch (err) {
        next(err)
    }
}