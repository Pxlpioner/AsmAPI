var express = require("express");
var router = express.Router();

const userModel = require("../models/userModel");
const JWT = require('jsonwebtoken');
const tokenConfig = require("../configs/tokenConfig");

// localhost:3000/user/login
router.post("/login", async (req, res) => {
    try {
        const { inputName, inputPass } = req.body;
        const item = await userModel.find({ username: inputName, password: inputPass });

        if (!item) { return res.status(200).json({ message: 'Username and password are incorrect' }); }

        const token = JWT.sign({ username: inputName }, tokenConfig.SECRETKEY, { expiresIn: '30s' });
        const refreshToken = JWT.sign({ username: inputName }, tokenConfig.SECRETKEY, { expiresIn: '1h' })

        return res.status(200).json({ model: item, token: token, refreshToken: refreshToken });

    } catch (e) { return res.status(400).json({ message: e.message }); }
});

module.exports = router;
