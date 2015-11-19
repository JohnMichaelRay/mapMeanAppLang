var mongoose = require('mongoose');
var User = require('./model.js');

// opens app routes
module.exports= function(app) {
    
    //retrieves records from db
    app.get('/users', function (req, res){
        var query = User.find({});
       query.exec(function(err, users){
        if (err){
            res.send(err);
        } else {
            res.json(users);
        }
       });
    });
    
    // post routes/ method for saving new users
    app.post('/users', function(req, res){
        
        //creates a new User on the mongoose schema
        var newuser= new User(req.body);
        
        //saves said user
        newuser.save(function(err){
            if (err){
                res.send(err);
            } else{
                res.json(req.body);
            }
        });
    });
};