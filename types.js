const zod = require("zod");

const createUser = zod.object({
    first_name: zod.string(),
    last_name: zod.string(),
    email: zod.string().email(), // Added email validation
    password: zod.string().min(6) // Added password length validation
});

const findUser = zod.object({
    password: zod.string().min(6),
    email: zod.string().email() 
})

const updateUser = zod.object({
    id: zod.string(),
    title: zod.string().optional(),
    email: zod.string().email().optional(),
    password: zod.string().min(6).optional(),
    completed: zod.boolean().optional()
});

module.exports = {
    createUser,
    updateUser,
    findUser
};
