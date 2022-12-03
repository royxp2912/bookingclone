import Room from "../models/roomsModel.js"
import Hotel from "../models/hotelsModel.js"

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true })
        res.status(200).json(updateRoom)
    } catch (err) {
        next(err)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    try {
        await Room.findByIdAndDelete(req.params.id)

        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        } catch (err) {
            next(err)
        }
        res.status(200).json("Delete Room Done!")
    } catch (err) {
        next(err)
    }
}

export const getRoom = async (req, res, next) => {
    const roomId = req.params.id

    try {
        const infoRoom = await Room.findById(roomId)
        res.status(200).json(infoRoom)
    } catch (err) {
        next(err)
    }
}

export const getAllRoom = async (req, res, next) => {
    try {
        const listRooms = await Room.find()
        res.status(200).json(listRooms)
    } catch (err) {
        next(err)
    }
}

export const updateRoomAvailable = async (req, res, next) => {
    const roomNumberId = req.params.roomNumberId

    try {
        await Room.updateOne(
            { "roomNumbers._id": roomNumberId },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                }
            })
        res.status(200).json("Update Room Availabel Done!")
    } catch (err) {
        next(err)
    }
}