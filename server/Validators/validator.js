const { z } = require("zod");
const { login } = require("../Controllers/userController");

const loginSchema=z.object({
  email: z
  .string({
    required_error: "Email is required",
  })
  .trim()
  .email({ message: "Invalid email address" })
  .min(9, { message: "Email must be at least 3 characters. " })
  .max(256, { message: "Email must not be more than 256 characters. " }),

password: z
  .string({
    required_error: "Password is required",
  })
  .min(7, { message: "Password must be at least 7 characters. " })
  .max(1024, { message: "Password can't be greater than 1024 characters. " }),

})

// creating an object schema

const signupSchema = loginSchema.extend({
  username: z
    .string({
      required_error: "Name is required",
    })
    .trim()
    .min(3, { message: "Name must be at lest of 3 characters. " })
    .max(255, { message: "Name must not be more than 256 characters. " }),

    isadmin: z
    .string({
      required_error: "isadmin is required",
    }),
   

    
    
    
   
});



module.exports={signupSchema, loginSchema};