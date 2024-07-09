const express = require("express");
const { createUser, updateUser } = require("./types");
const { User } = require("./db");
const cors = require("cors"); // Import cors package

const app = express();

app.use(express.json());
app.use(cors()); // Use cors middleware to enable CORS

app.post("/SignUpUser", async function (req, res) {
    const createPayLoad = req.body;
    const parsedPayLoad = createUser.safeParse(createPayLoad);
    if (!parsedPayLoad.success) {
        res.status(411).json({
            msg: "You have sent a wrong input"
        });
        return;
    }

    try {
        await User.create(parsedPayLoad.data);
        res.json({
            msg: "User Created"
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({
                msg: "Duplicate key error: Email already exists"
            });
        } else {
            res.status(500).json({
                msg: "Internal server error"
            });
        }
    }
});

app.get("/users", async function (req, res) {
    const users = await User.find({});
    res.json({ users });
});

app.put("/user/:id", async function (req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateUser.safeParse({ id: req.params.id, ...updatePayload });

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You have sent a wrong input"
        });
        return;
    }

    const { id, ...updateData } = parsedPayload.data;
    await User.updateOne({ _id: id }, { $set: updateData });

    res.json({
        msg: "User updated"
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
