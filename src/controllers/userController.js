const User = require('../models/Users');
const Hospital = require('../models/Hospital');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

async function createHospitalUser(reqBody) {
  const { name, address, services } = reqBody;
  const newUser = new Hospital({ name, address, services });
  return newUser;
}

async function createPatientUser(reqBody) {
  const { name, address, birthdate } = reqBody;
  const newUser = new Patient({ name, address, birthdate });
  return newUser;
}

async function createDoctorUser(reqBody) {
  const { name, address, services } = reqBody;
  const newUser = new Doctor({ name, address, services });
  return newUser;
}

createUser = async (req, res) => {
  try {
    const { identification, email, phone, password, confirmed, userType } = req.body;

    let newUser;

    if (userType === 'Hospital') {
      newUser = await createHospitalUser(req.body);
    } else if (userType === 'Patient') {
      newUser = await createPatientUser(req.body);
    } else if (userType === 'Doctor') {
      newUser = await createDoctorUser(req.body);
    } else {
      throw new Error('Tipo de usuario no válido');
    }

    newUser.identification = identification;
    newUser.email = email;
    newUser.phone = phone;
    newUser.password = password;
    newUser.confirmed = confirmed;

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

 

confirmUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    user.confirmed = true;
    await user.save();

    res.status(200).json({ message: 'Usuario confirmado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al confirmar el usuario' });
  }
};


loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email o contraseña incorrectos');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Email o contraseña incorrectos');
    }

    const token = user.generateAuthToken();

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Email o contraseña incorrectos' });
  }
};
 
module.exports={
  createUser,
  confirmUser,
  loginUser
}