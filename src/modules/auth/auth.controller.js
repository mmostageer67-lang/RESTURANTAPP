const {register} = require('./auth.service');

const registerController = async (req, res, next) => {
  try {
    
    const user = await register( req.body);
    res.status(201).json({
      success:true,
      message: 'User registered successfully',  
  
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
     
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController };