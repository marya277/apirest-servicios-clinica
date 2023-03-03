const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user.id;

        const user = await User.findOne({ _id: userId, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }

        const isDoctor = await Doctor.exists({ _id: user._id });
        if (isDoctor) {
            req.user = { ...user.toObject(), role: 'doctor' };
            return next();
        }

        const isHospital = await Hospital.exists({ _id: user._id });
        if (isHospital) {
            req.user = { ...user.toObject(), role: 'hospital' };
            return next();
        }

        throw new Error();
    } catch (error) {
        res.status(401).send({ error: 'No autorizado' });
    }
};

module.exports = authMiddleware;
