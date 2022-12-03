import express from 'express';
import {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getAllHotel,
    countByCity,
    countByType,
    getHotelsOnOptions,
    getHotelRooms,
} from '../controller/hotelsController.js';
import { getAllRoom, updateRoomAvailable } from '../controller/roomController.js';
import { verifyAdmin } from '../others/verifyAdmin.js';

const router = express.Router();

// CREATE
router.post('/new', verifyAdmin, createHotel);

// UPDATE
router.put('/:hotelId', verifyAdmin, updateHotel);
router.put('/rooms/available/:roomNumberId', updateRoomAvailable);

// DELETE
router.delete('/:hotelId', verifyAdmin, deleteHotel);

// GET
router.get('/find/:hotelId', getHotel);

// GET ALL
router.get('/', getAllHotel);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/options', getHotelsOnOptions);
router.get('/rooms/:hotelId', getHotelRooms);
router.get('/rooms', getAllRoom);

export default router;
