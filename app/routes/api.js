/**
 * Created by pkdo1 on 11/29/2015.
 */
var User = require('../models/user');
var Story = require('../models/story');
var Images = require('../models/image');

var nodemailer = require('nodemailer');
require("date-format-lite");

var config =  require('../../config');
var secretKey = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');
var multer = require('multer');
var fs = require('fs');
var URL = 'https://morning-fjord-34230.herokuapp.com';
//var URL = 'http://localhost:3000';

var transporter = nodemailer.createTransport({
    service: config.service,
    auth: {
        user: config.user,
        pass: config.pass
    }
});

function createToken(user){

    var token = jsonwebtoken.sign({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        country: user.country,
        city: user.city,
        connectTime: new Date()
    }, secretKey, {
        expiresIn: 60*60
    });

    return token;
}

module.exports = function(app, express, io){

var api = express.Router();

//finish to get image
api.post('/signup', function(req, res){
    var user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country,
        city: req.body.city,
        sex: req.body.sex
    });
    var token = createToken(user);
    user.save(function(err){
      if(err){
          console.log(err);
          res.send(err);
          return;
      }
     res.json({
         success: true,
         message: "user has been created",
         token: token
     });
    });
});

api.post('/handleSayHello', handleSayHello); // handle the route at yourdomain.com/sayHello
    function handleSayHello(req, res) {
        var text = 'Hello ' + req.body.name + '\n\nWelcome to Take And Give \n\nYou success to sign up to the Take And Give' +
            '\n\n Get start '+URL;

        var mailOptions = {
            from: config.user, // sender address
            to: req.body.email, // list of receivers
            subject: 'Take And Give', // Subject line
            text: text //, // plaintext body
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.json({
                    success: false,
                    message: "Fail to send",
                    error: error,
                    info: info
                });
            }else{
                console.log('Message sent: ' + info.response);
                res.json({success: true,yo: info.response});
            }
        });
}


api.post('/email',function(req, res){
  User.findOne({
      email: req.body.email
  }).select('name username password country city email sex').exec(function (err, user) {
      if (err) {
          console.log(err);
          throw  err;
      }
      if (!user) {
              res.json({
                  success: false,
                  message: "User do not exist"
             });
      } else {
              var token = createToken(user);
              res.json({
                  success: true,
                  message: "Successfully login",
                  token: token
              });
      }
  });
});

api.post('/sendPassword', function(req, res){
    var text = 'Hello ' + req.body.name + '\n\nRest password\n\n' +URL+ '/#/passwordReset/'+req.body.token;

    var mailOptions = {
        from: config.user, // sender address
        to: req.body.email, // list of receivers
        subject: 'Take And Give', // Subject line
        text: text //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({
                success: false,
                message: "Fail to send",
                error: error,
                info: info
            });
        }else{
            console.log('Message sent: ' + info.response);
            res.json({success: true,yo: info.response});
        }
    });

});

api.put('/passwordRest:_id', function(req, res){

    var user = req.body.user;
    User.findOne({
        _id: user.id
    }).select('name username password city').exec(function(err, foundObject){
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            if(!foundObject){
                res.status(404).send();
            }else {

                foundObject.password = req.body.user.newPassword;
                foundObject.save(function(err, updateObject){
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    }else{
                        var token = createToken(updateObject);
                        res.json({
                            success: true,
                            message: "user has been change",
                            token: token
                        });
                    }
                })
            }
        }
    });
});

api.get('/users',function(req, res){
    User.find({}, function(err, users){
        if(err){
            console.log(err);
            res.send(err);
            return;
        }
        res.json(users);
    });
});

api.post('/login', function(req, res) {

    User.findOne({
        username: req.body.username
    }).select('name username password country city email sex').exec(function (err, user) {
        if (err) {
            console.log(err);
            throw  err;
        }

        if (!user) {
            res.send({message: "User do not exit"})

        } else if (user) {
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                console.log("Invalid Password");
                res.send({message: "Invalid Password"});
            } else {
                var token = createToken(user);
                res.json({
                    success: true,
                    message: "Successfully login",
                    token: token
                });
            }
        }
    });
});

api.put('/update:_id', function(req, res){

    var user = req.body.user;
    User.findOne({
        _id: user.id
    }).select('name username password city').exec(function(err, foundObject){
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            if(!foundObject){
                res.status(404).send();
            }else {
                var IsTrue = false;
                if(req.body.user.newPassword != undefined && req.body.user.newPassword != ""){
                    var validPassword = foundObject.comparePassword(req.body.user.oldPassword);
                    IsTrue = true;
                }
                if(!validPassword && IsTrue){
                    res.send({message: "Invalid Password"});
                }else{
                    //foundObject.username = req.body.user.username;
                    if(req.body.user.newPassword != undefined && req.body.user.newPassword != "")
                        foundObject.password = req.body.user.newPassword;

                    foundObject.name = req.body.user.name;
                    foundObject.email = req.body.user.email;
                    foundObject.city = req.body.user.city;

                    foundObject.save(function(err, updateObject){
                        if(err){
                            console.log(err);
                            res.status(500).send();
                        }else{
                            var token = createToken(updateObject);
                            res.json({
                                success: true,
                                message: "user has been change",
                                token: token
                            });
                        }
                    })
                }
            }
        }
    });
});


//upload

// save the title and image
api.post('/image', multer({ dest: './public/uploads' }).single('image'), function(req, res, next) {
    // creates an object of the image model
    var image = new Images();

    // adds the fields coming from the request in the image object
    if(req.body.category == undefined || req.body.toUse == undefined || req.body.size == undefined || req.file.size > 7000000){
        console.log("Missing parameter");
        res.redirect('/#/myStuffError');
    }else{
        image.username = req.body.username;
        image.category = req.body.category;
        image.toUse = req.body.toUse;
        image.size = req.body.size;
        image.status = 'home';
        image.userRequest = 'no request';
        image.permission = "No";
        image.city = req.body.city;
        image.country = req.body.country;
        image.datasrc = fs.readFileSync(req.file.path).toString('base64');
        //image.image.data = fs.readFileSync(req.file.path).toString('base64');
        image.image.contentType = req.file.mimetype;

        // save image
        image.save(function(err) {
            // check for errors
            if(err) {
                // go to the error handler middleware
                return next(err);
            }

            // if no errors, log this message in the console
            console.log('image saved in mongodb!');

            // delete image from uploads directory
            fs.unlink(req.file.path, function(err) {
                // check for errors
                if(err) {
                    // go to the error handler middleware
                    return next(err);
                }

                // if no errors, log this message in the console
                console.log('image deleted from server!');

                console.log("Save the image!!!");
                res.req.baseUrl = '';
                res.redirect('/#/myStuff');
            });
        });
    }

});

//finish upload

//get the image
// http://localhost:3000/images/
// displays a list of all images
api.get('/image/:username',function(req, res) {
    // get all images
    Images.find({
        status : 'home',
        username: {$ne: req.params.username}
    }, function(err, images) {
        // check for errors
        if(err) {
            // go to the error handler middleware
            //return next(err);
            console.log(err);
            res.send(err);
            return;
        }

        // if no errors, go to the list page
        res.json(images);

    });//.sort({ _id: 1 });
});

// http://localhost:3000/images/:id
// display an image
api.get('/imageperuser/:username',function(req, res, next) {
    // get an image that its id be equals the value sent by url parameter

    Images.find({
        status : {$ne: 'receive'},
        username: req.params.username
    }).exec(function(err, images) {
        // check for errors
        if(err) {
            // adds the http status code to the err object
            err.status = 422;

            // go to the error handler middleware
            return next(err);
        }
        // if no errors, go to the image page
        res.json(images);
        //res.json(images.toString('base64'));
    });
});

api.get('/getHistoryImages/:username',function(req, res, next) {
    // get an image that its id be equals the value sent by url parameter

    Images.find({
        //status : 'receive',
        permission: 'Yes',
        username: req.params.username
    }).exec(function(err, images) {
        // check for errors
        if(err) {
            // adds the http status code to the err object
            err.status = 422;

            // go to the error handler middleware
            return next(err);
        }
        // if no errors, go to the image page
        res.json(images);
        //res.json(images.toString('base64'));
    });
});

/*        time in the cart
api.get('/validateImageTime/',function(req, res, next) {
    // get an image that its id be equals the value sent by url parameter
    Images.find({
        status: 'Waiting for approval'
    }).select('timeRequest status').exec(function(err, images){
        // check for errors
        if(err) {
            // adds the http status code to the err object
            err.status = 422;

            // go to the error handler middleware
            return next(err);
        }

        // if no errors, go to the image page
        res.json(images);
        //res.json(images.toString('base64'));
    });
});*/
api.get('/getCartImage/:username',function(req, res, next) {
    // get an image that its id be equals the value sent by url parameter

    Images.find({
        userRequest: req.params.username,
        status: 'Waiting for approval'
    }).exec(function(err, images) {
        // check for errors
        if(err) {
            // adds the http status code to the err object
            err.status = 422;

            // go to the error handler middleware
            return next(err);
        }
        // if no errors, go to the image page
        res.json(images);
        //res.json(images.toString('base64'));
    });
});

api.get('/getPermissionImage/:username',function(req, res, next) {
    // get an image that its id be equals the value sent by url parameter

    Images.find({
        username: req.params.username,
        status: 'Waiting for approval',
        permission: 'No'
    }).exec(function(err, images) {
        // check for errors
        if(err) {
            // adds the http status code to the err object
            err.status = 422;

            // go to the error handler middleware
            return next(err);
        }
        // if no errors, go to the image page
        res.json(images);
        //res.json(images.toString('base64'));
    });
});

api.get('/getReceiveImages/:userRequest',function(req, res, next) {
    // get an image that its id be equals the value sent by url parameter

    console.log('approval Delivery');
    Images.find({
        status : 'receive',
        permission : "Yes",
        userRequest : req.params.userRequest

    }).exec(function(err, images) {
        // check for errors
        if(err) {
            // adds the http status code to the err object
            err.status = 422;

            // go to the error handler middleware
            return next(err);
        }
        // if no errors, go to the image page
        res.json(images);
        //res.json(images.toString('base64'));
    });
});

api.get('/getRentingImages/:username',function(req, res, next) {
    // get an image that its id be equals the value sent by url parameter
    Images.find({
        status : 'rented',
        permission : "Yes",
        userRequest : req.params.username

    }).exec(function(err, images) {
        // check for errors
        if(err) {
            // adds the http status code to the err object
            err.status = 422;

            // go to the error handler middleware
            return next(err);
        }
        // if no errors, go to the image page
        res.json(images);
        //res.json(images.toString('base64'));
    });
});

api.put('/updateImage/:_id', function(req, res){

    var id = req.params._id;
    Images.findOne({
        _id: id
    }).select('userRequest timeRequest status toUse').exec(function(err, foundObject){
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            if(!foundObject){
                res.status(404).send();
            }else {
                if(foundObject.status == 'Waiting for approval' && req.body.flag == '0'){//this for refuse to deliver/renting
                    foundObject.status = 'home';
                    foundObject.userRequest = 'no request';
                    foundObject.permission = "No";
                }
                else if(foundObject.status == 'Waiting for approval' && req.body.flag == '1'){//this for accept to request
                    if(foundObject.toUse == 'Delivery'){//for deliver
                        var now = new Date();
                        foundObject.timeRequest = Date.parse(now);
                        foundObject.status = 'receive';
                        foundObject.permission = "Yes";
                    }else{                              //for renting
                        var now = new Date();
                        foundObject.timeRequest = Date.parse(now);
                        foundObject.status = 'rented';
                        foundObject.permission = "Yes";
                    }
                }
                else{                                   //this for to send to cart page
                    foundObject.userRequest = req.body.userRequest;
                    var now = new Date();
                    foundObject.timeRequest = Date.parse(now);
                    foundObject.status = 'Waiting for approval';
                }
                foundObject.save(function(err, updateObject){
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    }else{
                        res.send(updateObject);
                    }
                })
            }
        }
    });
});

api.delete('/delete/:_id', function(req, res){

    var id = req.params._id;
    Images.findByIdAndRemove({
        _id: id
    },function(err, deleteObject){
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            if(!deleteObject){
                console.log("Image Not Exist");
                res.status(500).send();
            }else{
                console.log("Image Exist And Remove From DB");
                res.send(deleteObject);
            }
        }
    });
});
/*
api.delete('/delete/:id', function(req, res){
    var id = req.param.id;

    User.findOne({_id: id}, function(err, deleteObject){
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            if(!deleteObject){
                console.log("User Not Exist");
                res.status(500).send();
            }else{
                console.log("User Exist And Remove From DB");
            }
        }
    });
});
*/

api.use(function(req, res, next){

    console.log("Somebody just came to our app!");

    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    //check if token exit
    if(token){

        jsonwebtoken.verify(token, secretKey, function(err, decoded){
            if(err){
                res.status(403).send( {success: false, message: "Fail to authenticate user"});

            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        res.status(403).send({ success: false, message: "No Token Provided"});
    }
});


// Destination B // provided a legitimate token
api.route('/')

    .post(function(req, res){

        var story = new Story({
            creator : req.decoded.id,
            content: req.body.content
        });

        story.save(function(err, newStory){
            if(err){
                res.send(err);
                return;
            }
            io.emit('story', newStory);
            res.json({message: "New Story Created"});
        });
    })

    .get(function(req, res){
        Story.find({ creator: req.decoded.id}, function(err, stories){
            if(err){
                res.send(err);
                return;
            }
            res.json(stories);
        })

    });


api.get('/me', function(req, res){
    res.json(req.decoded);
});

return api;

};

