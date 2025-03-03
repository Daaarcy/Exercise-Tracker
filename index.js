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

  const newUser = { 
    username: userName, 
    _id: users.length + 1,
    logs: [] };

    users.push(newUser);

  res.json({ username: userName, _id: newUser._id });
})

// a list of all users
app.get("/api/users", function(req, res){
  res.json(users);
})

// form description, duration, and optionally date data
app.post("/api/users/:_id/exercises", function(req, res){
  const userId = parseInt(req.params._id);
  const user = user.find(u => u._id === userId);

  if (user) {
    const description = req.body.description;
    const duration = req.body.duration;
    const date = req.body.date ? new Date(req.body.date) : new Date();
    const formattedDate = date.toDateString();

    const newExcercise = {
      description: description,
      duration: duration,
      date: date
    };

    user.log.push(newExcercise);

    res.json({ 
      username: user.username,
      description: description,
      duration: duration,
      date: formattedDate,
       _id: user._id });

  } else {
    res.status(404).json({ error: "User not found" });
  }
});

//



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
