const { UserModel } = require('../models');
const { encryptPassword, comparePassword } = require('../utils/handlePassword');
const { handleHTTPError, handleSuccess } = require('../utils/handleResponses');
const { generateToken } = require('../utils/handleToken');


const login = async (req, res) => {
  try {
    
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return handleHTTPError(res, 'Credenciales invalidas.', 404);
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return handleHTTPError(res, 'Credenciales invalidas.', 401);
    }

    const token = await generateToken(user);
    user.set('password', undefined, { strict: false });
    return handleSuccess(res, 'Ingreso exitoso',{token});

  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


const register = async (req, res) => {
  try {
    const {name, username, email, password, birthDate, country, city, phone} = req.body;
    
    const validateUsername = await UserModel.findOne({ username });
    if (validateUsername) { return handleHTTPError(res, 'El usuario ya existe', 409); }

    const validateEmail = await UserModel.findOne({ email });
    if (validateEmail) { return handleHTTPError(res, 'El email ya se encuentra registrado.', 409); }

    const encryptedPassword = await encryptPassword(password);

    const newUser = new UserModel({
      name,
      username,
      email,
      password: encryptedPassword,
      birthDate,
      country,
      city,
      phone
    });
    await newUser.save();
    newUser.set('password', undefined, { strict: false });
    return handleSuccess(res,'Usuario registrado exitosamente', newUser);

  } catch (error) {
    handleHTTPError(res, error.message);
  }
}


const verify = async (req, res) => {
  
}


module.exports = { login, register };