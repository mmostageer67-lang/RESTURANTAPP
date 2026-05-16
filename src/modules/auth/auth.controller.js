const register = require('./auth.service');

const registerController = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, address } = req.body;
    const user = await register(req.body);
    res.status(201).json({
      success:true,
      message: 'User registered successfully',  
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController };