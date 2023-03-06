
const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '.././database.json');

module.exports = app.get('/spotify-username', (req, res) =>  {
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
            const data = { user_name : jsonData[user]["spot_user_name"]};
            res.json(data)
        }
        else{
            console.log("Error user not found in database.")
        }
    })
})