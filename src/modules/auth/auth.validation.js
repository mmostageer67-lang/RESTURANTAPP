const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().optional().default('customer'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

module.exports = { registerSchema };
