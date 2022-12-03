import express from 'express';
import { createRoom, updateRoom, deleteRoom, getRoom, getAllRoom } from '../controller/roomController.js';
import { verifyAdmin } from '../others/verifyAdmin.js';
import { getAllHotel } from '../controller/hotelsController.js';

const router = express.Router();

// CREATE ROOM
router.post('/:hotelId', verifyAdmin, createRoom);

// UPDATE ROOM
router.put('/:id', verifyAdmin, updateRoom);

// DELETE ROOM
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);

// GET ROOM
router.get('/:id', getRoom);

// GET ALL ROOM
router.get('/', getAllRoom);

//GET ALL HOTEL
router.get('/hotels/all', getAllHotel);

export default router;
