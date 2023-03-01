var querystring = require('querystring');
var stateKey = 'spotify_auth_state';
const fs = require('fs');
const path = require('path');

// Define the filepath
const filePath = path.join(__dirname, './../database.json');

const modeChoiceView = (req, res) => {
    var code = req.query.code || null;
    var state = req.query.state || null;
    var stateInDatabase = false;
    // checking if the request has cookies, if it does, what it checks for the auth state if it can't find either return null.
    var storedState = req.cookies ? req.cookies[stateKey] : null;


    /*var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token;

        console.log("access token:  ", access_token);
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
             console.log("Me ", response.statusCode, body.display_name);
             const displayName = body.display_name;
          })
      }
      else{  console.log("ERROR ",response.body) }
    })*/
    const displayNameFile = require('./getDisplayName.js');


    // Read the existing data from the database
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      let jsonData = JSON.parse(data);

      // Check if the key exists in the JSON data
      if (jsonData.hasOwnProperty(storedState)) {
        console.log("state in database.")
        stateInDatabase = true;
      }

      if ((state === null || state !== storedState) === true && stateInDatabase === false) {
        console.log("REDIRECT");
        res.redirect('/#' +
           querystring.stringify({
              error: 'state_mismatch'
           }));
      }
      else {
  
        // Check if the key exists in the JSON data
        if (jsonData.hasOwnProperty(state)) {
          console.log('The key already exists in the JSON data.');
        }
        else{
          // If the key does not exist, add it to the database
          //console.log("hhheerreee")
          console.log("prop display name ", displayNameFile.displayName(code));
          
          jsonData[state] = "true"
          console.log(jsonData);

          // Convert the JSON data to a string
          const jsonString = JSON.stringify(jsonData, null, 2);

          // Write the updated data back to the file
          fs.writeFile(filePath, jsonString, 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(jsonString);
            console.log('The key was successfully added to the JSON data.');
          });
        }
        // This is looking at views diretory 
        res.render("mode", {
        }); 
      }
    });
}

module.exports = modeChoiceView;
