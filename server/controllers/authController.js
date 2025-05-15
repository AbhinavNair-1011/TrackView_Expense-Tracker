const Helpers = require("../utils/helpers");
const User = require("../models/userModel");

const register = async(req, res) => {

    try {
        const {
            first_name,
            last_name,
            phone,
            password,
            confirm_password,
            email
        } = req.body

        if (!first_name.trim() || !last_name.trim() || !phone.trim() || !password.trim() || !email.trim()) {
            Helpers.sendBadRequest(res, "all field values required")
        }
        if(confirm_password===password){
            Helpers.sendBadRequest(res,"password mismatch")
        }

        const user = User.findOne({
            where: { email }
        });

        if (user.email || user.phone) {
            Helpers.sendConflict(res, "user already exists")
        }

        const hashedPassword = await Helpers.encrypt(password);
        const createdUser=User.create({
            first_name,
            last_name,
            phone,
            password:hashedPassword,
            email
        })

        Helpers.sendCreated(res,{first_name,last_name,phone,email})

    } catch (err) {
        console.error(err);
        Helpers.sendInternalServerError(res, err.message || err)
    }

}



module.exports = { register }