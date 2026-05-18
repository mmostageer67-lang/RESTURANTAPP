const User = require('../user/user.model');

const register = async ({ name, email, password, role, phone, address }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email already in use');
    error.statusCode = 409;
  error.isOperational = true;
    throw error;
  }

  const user = await User.create({
    name,
    email,
    password,
    role:  'customer',
    phone,
    address
  });


  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address,
  };
};

module.exports = { register };
