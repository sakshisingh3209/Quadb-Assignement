const { hashPassword, generateToken } = require("../utils/authUtils");

const registerController = async(req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exist' });
        }

        user = new User({
            name,
            email,
            password: await hashPassword(password),
            role: role || 'user'
        });


        await user.save();

        const token = await generateToken(user);
        res.json({ token, role: user.role });

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


const loginController = async(req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const token = await generateToken(user);
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}


module.exports = { registerController, loginController };