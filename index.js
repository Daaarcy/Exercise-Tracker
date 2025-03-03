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
  let userName = req.username;

  users.push({ username: userName, _id: users.lenght + 1 });
  res.json({ username: userName, _id: users.lenght + 1 });
})

// a list of all users
app.get("/api/users/:_id/logs", function(req, res){
  res.send(users)
})

// form description, duration, and optionally date data
app.post("/api/users/:_id/exercises", function(req, res){
  let description = req.description;
  let duration = req.duration;
  let date = req.date;

  // If no date is supplied, the current date will be used.
  if(!date){
    date = new Date();
  };

  users.push({ 
    username: userName,
    description: description,
    duration: duration,
    date, date.toDateString(),
     _id: users.lenght + 1 });

  res.json({ 
    username: userName,
    description: description,
    duration: duration,
    date, date,
     _id: users.lenght + 1 });

})
//



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
