const mongoose = require('mongoose');
const User = require('./models/User');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/mongoose');
mongoose.connection
    .once('open',()=>{console.log("Connected")})
    .on('error',(err)=>{console.log(`Could not connect ${err}`)});

app.get('/',(req,res)=>{
    res.send('Root');
});

app.post('/users',(req,res)=>{
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isActive: req.body.isActive
    });

    newUser.save().then(savedUser => {
        res.send('saved user');
    }).catch(err => {
        res.status(500).send(`User Not Saved, Because: ${err}`);
    });

app.get('/users',(req,res)=>{

    User.find({}).then(users=>{
        res.send(users);
    }).catch(err=>{
        res.status(500).send(`Fetching Users Data failed: err`)
    });

});

app.patch('/users/:id', (req,res)=>{
    const id = req.params.id;
    const firstName = req.body.firstName;

    User.findByIdAndUpdate({_id: id}, {$set: {firstName: firstName}}, {new: true})     //Third param new states that instead of original obj return a new updated value
        .then(savedUser => {
            res.send('Used Saved By Patch');
        })
        .catch(err => {
            res.status(500).send(`Problem because of: ${err}`);
        });
});

});

// const newUser = new User({
//     firstName: 'Emma',
//     lastName: 'Roberts',
//     isActive: 1
// });

// newUser.save((err,dataSaved)=>{
//     if(err) return console.log(err);
//     console.log('Data Saved: ', dataSaved);
// });

const port = 4444 || process.env.PORT;

app.listen(port,()=>{
    console.log(`Listening on ${port}`);
});
