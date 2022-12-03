import Hotel from '../models/hotelsModel.js';
import Room from '../models/roomsModel.js';

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel);
    } catch (err) {
        next(err);
    }
};

export const updateHotel = async (req, res, next) => {
    const hotelId = req.params.hotelId;

    try {
        const updateHotel = await Hotel.findByIdAndUpdate(hotelId, { $set: req.body }, { new: true });
        res.status(200).json(updateHotel);
    } catch (err) {
        next(err);
    }
};

export const deleteHotel = async (req, res, next) => {
    const hotelId = req.params.hotelId;

    try {
        await Hotel.findByIdAndDelete(hotelId);
        res.status(200).json('Delete Hotel Done!');
    } catch (err) {
        next(err);
    }
};

export const getHotel = async (req, res, next) => {
    const hotelId = req.params.hotelId;

    try {
        const hotelInfo = await Hotel.findById(hotelId);
        res.status(200).json(hotelInfo);
    } catch (err) {
        next(err);
    }
};

export const getAllHotel = async (req, res, next) => {
    try {
        const listHotels = await Hotel.find();
        res.status(200).json(listHotels);
    } catch (err) {
        next(err);
    }
};

export const getHotelsOnOptions = async (req, res, next) => {
    const { min, max, limit, ...othersOption } = req.query;

    try {
        const listHotels = await Hotel.find({
            ...othersOption,
            cheapestPrice: { $gt: min || 1, $lt: max || 999999999999 },
        }).limit(limit);
        res.status(200).json(listHotels);
    } catch (err) {
        next(err);
    }
};

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',');

    try {
        const listCount = await Promise.all(cities.map((city) => Hotel.countDocuments({ city: city })));
        res.status(200).json(listCount);
    } catch (err) {
        next(err);
    }
};

export const getHotelRooms = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        const hotel = await Hotel.findById(hotelId);

        const listRooms = await Promise.all(hotel.rooms.map((room) => Room.findById(room)));
        res.status(200).json(listRooms);
    } catch (err) {
        next(err);
    }
};

export const countByType = async (req, res, next) => {
    try {
        const countHotel = await Hotel.countDocuments({ type: 'Khách Sạn' });
        const countApartment = await Hotel.countDocuments({ type: 'Căn Hộ' });
        const countResort = await Hotel.countDocuments({ type: 'Resort' });
        const countVilla = await Hotel.countDocuments({ type: 'Villa' });
        const countCabin = await Hotel.countDocuments({ type: 'Nhà Gỗ' });

        const listCountByType = [
            { type: 'Khách Sạn', amount: countHotel },
            { type: 'Căn Hộ', amount: countApartment },
            { type: 'Resort', amount: countResort },
            { type: 'Villa', amount: countVilla },
            { type: 'Nhà Gỗ', amount: countCabin },
        ];

        res.status(200).json(listCountByType);
    } catch (err) {
        next(err);
    }
};
