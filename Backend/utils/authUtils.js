const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const hashPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

const generateToken = async(user) => {
    const payload = {

        user: {
            id: user.id,
        }
    }
    try {
        return await new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                process.env.JWT_SECRET, { expiresIn: '1h' },
                (err, token) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(token);
                    }
                }
            );
        });
    } catch (error) {
        throw new Error('Error generating token');
    }

}


module.exports = { hashPassword, generateToken };