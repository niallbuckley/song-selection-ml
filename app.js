const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './database.json');

// set that all templates are located in `/views` directory
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use('/', require('./routes/login'));
app.use('/', require('./controllers/loginSpotifyController'));
app.use('/', require('./routes/routes'));

app.get('/spotify-username', (req, res) =>  {
    user = req.cookies.spotify_auth_state;
    // Read the existing data from the database
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
  
        let jsonData = JSON.parse(data);
  
        // Check if the key exists in the JSON data
        if (jsonData.hasOwnProperty(user)) {
            console.log("User_name: ", jsonData[user]);
        }
        else{
            console.log("Error user not found in database.")
        }
    })
    res.send("Hello Client");

})

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server listening on port: " + PORT));
