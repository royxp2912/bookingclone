import User from "../models/usersModel.js"

export const updateUser = async (req, res, next) => {
    const userId = req.params.id

    try {
        const updateUser = await User.findByIdAndUpdate(
            userId,
            { $set: req.body },
            { new: true })
        res.status(200).json(updateUser)
    } catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    const userId = req.params.id

    try {
        await User.findByIdAndDelete(userId)
        res.status(200).json("Delete User Done!")
    } catch (err) {
        next(err)
    }
}

export const getUser = async (req, res, next) => {
    const userId = req.params.id

    try {
        const infoUser = await User.findById(userId)
        res.status(200).json(infoUser)
    } catch (err) {
        next(err)
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        const listUsers = await User.find()

        res.status(200).json(listUsers)
    } catch (err) {
        next(err)
    }
}