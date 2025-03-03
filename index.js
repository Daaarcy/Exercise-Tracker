const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

let users = [];

// create new user
app.post("/api/users", function(req, res){
  let userName = req.body.username;

  users.push({ username: userName, _id: users.length + 1 });
  res.json({ username: userName, _id: users.length});
})

// a list of all users
app.get("/api/users/:_id/logs", function(req, res){
  res.send(users)
})

// form description, duration, and optionally date data
app.post("/api/users/:_id/exercises", function(req, res){
  let description = req.body.description;
  let duration = req.body.duration;
  let date = req.body.date || new Date();

  users.push({ 
    username: req.body.username,
    description: description,
    duration: duration,
    date, date,
     _id: req.params._id });

  res.json({ 
    username: req.body.username,
    description: description,
    duration: duration,
    date, date.toDateString(),
     _id: req.params._id });

})
//



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
