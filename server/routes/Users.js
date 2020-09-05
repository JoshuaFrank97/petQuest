const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const auth = require("../middleware/authentication");
const axios = require("axios");
const { response } = require("express");
//const { add } = require("react-native-reanimated");

//Register
//  json format req example
/*
{
    "firstName": "Joshua",
    "lastName": "Frank",
    "email": "joshuafrank97@hotmail.com",
    "password": "helloJ!9",
    "address": "3200 North Alafaya Trail",
    "phone": 4079231546
}
*/ 
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

        const initLat = 0;
        const initLng = 0;

        axios.get('https://maps.googleapis.com/maps/api/geocode/json?',{
            params:{
                address:address,
                key:'AIzaSyAfy3hqRoSktLYQl84Vt3WJYk-dcMYBFlI'
            }
        })
        .then(function (response){

            const formattedAddress = response.data.results[0].formatted_address;
        
            const lat = response.data.results[0].geometry.location.lat;
            const lng = response.data.results[0].geometry.location.lng;

            const newUser = new User({
                lat: lat,
                lng: lng,
                firstName,
                lastName,
                email,
                password: hash,
                address: formattedAddress,
                phone
            });
    
            const savedUser =  newUser.save();
            res.json({
                msg: "Your account was created successfully"
            });


        }).catch(function (err){

            res.status(500)
            .json({
                error: 'Address is not valid' + err.message
            });
        });

        
/*        const newUser = new User({
            lat: initLat,
            lng: initLng,
            firstName,
            lastName,
            email,
            password: hash,
            address,
            phone
        });

        const savedUser = await newUser.save();
        res.json(savedUser);
*/
    
    }catch(err) {

        res.status(500)
            .json({
                error: err.message
            });
    }
                            
});

// Login by sending a token back with JWT
//( you need to store it on the front end and send it on the header to be able to edit or delete account)
//json format req
/*
{
    "email": "joshuafrank97@hotmail.com",
    "password": "helloJ!9"
}
 */
router.post("/login", async (req, res) => {

    try{
        const{ email, password} = req.body;

        if(!email || !password)
            return res.status(400)
            .json({
                    msg: "Some information is missing , please fill out every field."
                });
            
        //validating that the email matches the password on db
        // first looking up if the user exists
        const findUser= await User.findOne({email: email});
        if(!findUser)
            return res.status(400)
            .json({
                msg: "No account with this email has been created."
            });

        //if it exist now we check if they have the correct password
            const correctPassword = await bcrypt.compare(password,findUser.password);
            
            if(!correctPassword)
                return res.status(400)
                .json({
                    msg: "Invalid Password."
                });

        //otherwise create the token for login of the current user and send to the front end
        const token = jwt.sign({id: findUser._id}, process.env.JWT_SECRET);

        res.json({
            token,
            id: findUser._id,
            user: {
                firstName: findUser.firstName,
                lastName: findUser.lastName,
                address: findUser.address,
                phone: findUser.phone
            }
        })
    }catch (err) {
        res.status(500)
            .json({
                error: err.message
            });
    }
});

//Update infromation only if logged in. Please send on  the token with the format header:x-atuh-token  value:token generated and saved on the front end when the user first logged in
// and the body with the information that wants to be updated
//json req format examples (you can change all or just some of the information)
/*
header: x-auth-token value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNTA3NDllMTMzMGIzMzNhY2YzMjE2NCIsImlhdCI6MTU5OTI0OTA4Mn0.3g9_prHwFe-Jkisst9plEJsokAQd4N5aqS7NSsOHiTU
{
    "firstName": "Josh",
    "lastName": "F.",
    "phone": 4079235546
}
*/
/*
header: x-auth-token value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNTA3NDllMTMzMGIzMzNhY2YzMjE2NCIsImlhdCI6MTU5OTI0OTA4Mn0.3g9_prHwFe-Jkisst9plEJsokAQd4N5aqS7NSsOHiTU
{
    "firstName": "Joshuuuuuuuaaaaa",
    "lastName": "Fraaaaaaaank",
    "email": "joshuafrank9777@hotmail.com",
    "password": "helloJ!8",
    "address": "3500 North Alafaya Trail",
    "phone": 4079231785
}
*/

function getLatitude(location) {

    axios.get('https://maps.googleapis.com/maps/api/geocode/json?',{
        params:{
            address: location,
            key: process.env.apikey
        }
    })
    .then(function (response){
        
    const latitude= response.data.results[0].geometry.location.lat;

    console.log(latitude);

    return latitude;

    }).catch(function (err){
            console.log(err.message);
            return 0;
        });

};



router.post("/update",auth,async (req,res) => {
    try{
        const id = req.user;
    
        var {firstName, lastName ,email, password, address, phone, lat, lng} = req.body;

        if(password){
            
            if( password.length < 6 )
                return res.status(400)
                            .json({
                                    msg: "Couldnt update your information : The password needs to be at least 6 charachters long."
                                });
            if(!password.match(/[A-Z]/g))
                return res.status(400)
                            .json({
                                    msg: "Couldnt update your information : The password needs to have at least one uppercase letter."
                                });
            
            if(!password.match(/[a-z]/g))
                return res.status(400)
                            .json({
                                    msg: "Couldnt update your information :  The password needs to have at least one lower letter."
                                });
            
            if(!password.match(/[0-9]/g))
                return res.status(400)
                            .json({
                                    msg: "Couldnt update your information :  The password needs to have at least one number."
                                });
            
            if(!password.match(/[*@!#%&()^~{}]/g))
                return res.status(400)
                            .json({
                                    msg: "Couldnt update your information :  The password needs to have at least one special character."
                                });

            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password,salt);
            req.body.password = hash;

            lat = getLatitude(address);
           // console.log(lat);

        }

        if(phone){

            if(!phone.match(/^[0][1-9]\d{9}$|^[1-9]\d{9}$/g))
                return res.status(400)
                            .json({
                                    msg: "Couldnt update your information :  Please use a valid phone number."
                                });

        }


       await User.findOneAndUpdate({_id: id},req.body,{useFindAndModify: false});

        res.json({
            msg:"Your information was updated Successfully"
        });
        


    }catch(err){
        res.status(500)
        .json({
            error: err.message
        });
    }
});


// Delete a user only if logged in . 
//Please send on the token with the format header:x-atuh-token  value:token generated and saved on the front end when the user first logged in
/*
 header: x-auth-token value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNTA3NDllMTMzMGIzMzNhY2YzMjE2NCIsImlhdCI6MTU5OTI0OTA4Mn0.3g9_prHwFe-Jkisst9plEJsokAQd4N5aqS7NSsOHiTU

*/
router.delete("/delete", auth, async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json({
            msg: "Your account has been deleted."
        })
}catch(err){
    res.status(500)
    .json({
        error: err.message
    });
}
});

//lookup for a user information with email
/*
req body example

{
    "email": "joshuafrank9777@hotmail.com",
}

*/

router.post("/getUserbyEmail",async(req,res) => {

    const { email } = req.body;

    const existingUser = await User.findOne({email : email})
    if(!existingUser)
        return res.status(400)
                  .json({
                      msg: " An account with that email doesnt exist"
                  });
    res.status(200).json({
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: email,
        address: existingUser.address,
        phone: existingUser.phone
    });

});

//check if user is logged in or not
router.post("/tokenIsValid", async(req, res) => {
    try{
        const token = req.header("x-auth-token");

        if(!token) 
            return res.json(false);
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified)
            return res.json(false);

        const user = await User.findById(verified.id);

        if(!user)
            return res.json(false);

        
        return res.json(true);


    }catch(err){
        res.status(500).json({
            err: err.message
        });
    }
});


module.exports = router;