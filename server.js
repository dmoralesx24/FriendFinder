
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// holding the data

let friends = [
  {
      name: "Morgan Freeman",
      photo: "https://www.imdb.com/name/nm0000151/mediaviewer/rm3587479040",
      scores: [
          "5",
          "1",
          "4",
          "4",
          "5",
          "1",
          "2",
          "5",
          "4",
          "1"
      ]
  },
  {
      name: "Natalie Portman",
      photo: "https://www.imdb.com/name/nm0000204/mediaviewer/rm512132096",
      scores: [

          "4",
          "2",
          "5",
          "1",
          "3",
          "2",
          "2",
          "1",
          "3",
          "2"
      ]
  },
  {
      name: "Leonardo Dicaprio",
      photo: "https://www.imdb.com/name/nm0000138/mediaviewer/rm487490304",
      scores: [
          "5",
          "2",
          "2",
          "2",
          "4",
          "1",
          "3",
          "2",
          "5",
          "5"
      ]
  },
  {
      name: "Anne Hathaway",
      photo: "https://www.imdb.com/name/nm0004266/mediaviewer/rm1111862272",
      scores: [
          "3",
          "3",
          "4",
          "2",
          "2",
          "1",
          "3",
          "2",
          "2",
          "3"
      ]
  },
  {
      name: "Brad Pitt",
      photo: "https://www.imdb.com/name/nm0000093/mediaviewer/rm864335360",
      scores: [
          "4",
          "3",
          "4",
          "1",
          "5",
          "2",
          "5",
          "3",
          "1",
          "4"
      ]
  },
  {
      name: "Jennifer Lawrence",
      photo: "https://www.imdb.com/name/nm2225369/mediaviewer/rm2555577344",
      scores: [
          "4",
          "4",
          "2",
          "3",
          "2",
          "2",
          "3",
          "2",
          "4",
          "5"
      ]
  },
  {
      name: "Robert De Niro",
      photo: "https://www.imdb.com/name/nm0000134/mediaviewer/rm418418432",
      scores: [
          "3",
          "2",
          "3",
          "4",
          "4",
          "3",
          "3",
          "4",
          "3",
          "3"
      ]
  },
  {
      name: "Julianne Moore",
      photo: "https://www.imdb.com/name/nm0000194/mediaviewer/rm1315691776",
      scores: [
          "2",
          "4",
          "2",
          "3",
          "2",
          "2",
          "2",
          "3",
          "3",
          "3"
      ]
  },
  {
      name: "Tom Hanks",
      photo: "https://www.imdb.com/name/nm0000158/mediaviewer/rm3040001536",
      scores: [
          "2",
          "3",
          "3",
          "2",
          "4",
          "4",
          "3",
          "3",
          "1",
          "4"
      ]
  },
  {
      name: "Amy Adams",
      photo: "https://www.imdb.com/name/nm0010736/mediaviewer/rm3448061696",
      scores: [
          "2",
          "3",
          "3",
          "3",
          "2",
          "3",
          "3",
          "3",
          "2",
          "3"
      ]
  }
];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "survey.html"));
});

app.get("/api/friends", function(req, res) {
  return res.json(friends);
});

app.post("/api/friends", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middlewar
  let bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
  };

  let userData = req.body;
  let userScores = userData.scores;
  
  let totalDifference = 0;

  for(let i = 0; i < friends.length; i++) {
      totalDifference = 0;
      for(let j = 0; j < friends[i].scores[j]; j++) {
          totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

          if(totalDifference <= bestMatch.friendDifference) {
              bestMatch.name = friends[i].name;
              bestMatch.photo = friends[i].photo;
              bestMatch.friendDifference = friends[i].totalDifference;
          }
      }
  }

  friends.push(userData);
  res.json(bestMatch);


   
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

