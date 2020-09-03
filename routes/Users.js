const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");


router.post("/register", async(req, res) => {
    
    try{
        const {firstName, lastName ,email, password, address, phone} = req.body;

        //validate parameters
        // All fields required
        if(!email || !password || !firstName || !lastName || !address || !phone)
            return res.status(400)
                        .json({
                                msg: "Some information is missing , please fill out every field."
                            });

        //secured password
        if( password.length < 6 )
            return res.status(400)
                        .json({
                                msg: "The password needs to be at least 6 charachters long."
                            });
        if(!password.match(/[A-Z]/g))
            return res.status(400)
                        .json({
                                msg: "The password needs to have at least one uppercase letter."
                            });
        
        if(!password.match(/[a-z]/g))
            return res.status(400)
                        .json({
                                msg: "The password needs to have at least one lower letter."
                            });
        
        if(!password.match(/[0-9]/g))
            return res.status(400)
                        .json({
                                msg: "The password needs to have at least one number."
                            });
        
        if(!password.match(/[*@!#%&()^~{}]/g))
            return res.status(400)
                        .json({
                                msg: "The password needs to have at least one special character."
                            });
        // 11 or 10 numbers only                    
        if(!phone.match(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/g))
            return res.status(400)
                        .json({
                                msg: "Please use a valid phone number."
                            });

        // check for Existing user
        const existingUser = await User.findOne({email : email})
        if(existingUser)
            return res.status(400)
                      .json({
                          msg: " An account with that email already exists."
                      });
        
        // Insert to database if got to this point
        // first salt and hash
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hash,
            address,
            phone
        });

        const savedUser = await newUser.save();
        res.json(savedUser);

    
    }catch (err) {

        res.status(500)
            .json({
                error: err.message
            });
    }
                            
});

// Login by jasonwebtoken

router.post("/login", async (req, res) => {

    try{
        const{email,password} = req.body;

        if(!email || !password)
            return res.status(400)
            .json({
                    msg: "Some information is missing , please fill out every field."
                });
            
        //validating that the email matches the password on db
        // first looking up if the user exists
        const findUser= await User.findOne({email: email})
        if(!findUser)
            return res.status(400)
            .json({
                msg: "No account with this email has been created."
            });

        //if it exist now we check if they have the correct password
            const correctPassword = await bcrypt.compare(password,user.password);
            
            if(!correctPassword)
                return res.status(400)
                .json({
                    msg: "Invalid Password."
                });

        //otherwise create the token for login of the current user
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                email: user.email
            }
        })



    }catch (err) {

        res.status(500)
            .json({
                error: err.message
            });
    }
})


module.exports = router;