var scheduleContent = document.getElementById('schedule'); var gameId; var inputVal = '2021'; standingsArray = []; linesArray10 = []
// lines below will allow user to select date then to select game on that date
function getInputValue() {
  var inputVal = document.getElementById('datepicker').value; var date = inputVal.split('/');
  var formatted = date[2] + '-' + date[0] + '-' + date[1];
  // var requestURL = 'https://corsproxy.io/?key=2ddedfd8&url=https://api-web.nhle.com/v1/schedule/' + formatted;
  var requestURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/schedule/' + formatted;
  fetch(requestURL, {
    "method": "GET", "headers": {}
  })
    .then(function (response) { return response.json() })
    .then(function (data) { console.log('I am in schedule then');
      var numberOfGames = data.gameWeek[0].games.length; scheduleContent.textContent = '';
      for (var i = 0; i < numberOfGames; i++) { var gameName = document.createElement('button');
        gameName.setAttribute('id', 'game' + i); var idx = gameName.getAttribute('id');
        gameName.innerHTML = 'Game ' + i + ': ' + data.gameWeek[0].games[i].awayTeam.abbrev + ' vs ' + data.gameWeek[0].games[i].homeTeam.abbrev;
        document.getElementById('schedule').appendChild(gameName); gameName.addEventListener('click', displayGameData);
      }
      
      function displayGameData(event) { idx = event.currentTarget; idxString = event.currentTarget.textContent;
        idxArray = idxString.split(':'); idxNumber = idxArray[0].split(' '); gameNumber = idxNumber[1];
        const gameId = data.gameWeek[0].games[gameNumber].id; console.log(gameId);
        // var requestURL = 'https://corsproxy.io/?key=2ddedfd8&url=https://api-web.nhle.com/v1/gamecenter/' + gameId + '/boxscore';
        var requestURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/gamecenter/' + gameId + '/boxscore';
        fetch(requestURL, {
          "method": "GET", "headers": {}
        })
          .then(function (response) { return response.json() })
          .then(function (data) { const gameInfo = document.createElement('section'); gameInfo.setAttribute('id', 'gameInfo');
            document.getElementById('schedule').appendChild(gameInfo);
            var gameTitle = document.createElement('h2'); gameTitle.textContent = '';
            gameTitle.innerHTML = 'You are watching analysis for ' + data.awayTeam.abbrev + ' at ' + data.homeTeam.abbrev + ' game' + ' on ' + formatted;
            document.getElementById('gameInfo').appendChild(gameTitle); shiftsArray = [];

            function Shifts(playerId, jerseyNumber, name, position, team, shiftsObject) {
              this.playerId = playerId;
              this.jerseyNumber = jerseyNumber;
              this.name = name;
              this.position = position;
              this.team = team;
              this.shiftsObject = {startTime: [[],[],[]], endTime: [[],[],[]]}
            }

            for (i = 0; i < data.playerByGameStats.homeTeam.goalies.length; i++) { const CurrentPlayer = new Shifts(data.playerByGameStats.homeTeam.goalies[i].playerId, data.playerByGameStats.homeTeam.goalies[i].sweaterNumber, data.playerByGameStats.homeTeam.goalies[i].name, 'G', 'H');
              shiftsArray.push(CurrentPlayer)}
            for (i = 0; i < data.playerByGameStats.homeTeam.defense.length; i++) { const CurrentPlayer = new Shifts(data.playerByGameStats.homeTeam.defense[i].playerId, data.playerByGameStats.homeTeam.defense[i].sweaterNumber, data.playerByGameStats.homeTeam.defense[i].name, 'D', 'H');
              shiftsArray.push(CurrentPlayer)}
            for (i = 0; i < data.playerByGameStats.homeTeam.forwards.length; i++) { const CurrentPlayer = new Shifts(data.playerByGameStats.homeTeam.forwards[i].playerId, data.playerByGameStats.homeTeam.forwards[i].sweaterNumber, data.playerByGameStats.homeTeam.forwards[i].name, 'F', 'H');
              shiftsArray.push(CurrentPlayer)}
            for (i = 0; i < data.playerByGameStats.awayTeam.goalies.length; i++) { const CurrentPlayer = new Shifts(data.playerByGameStats.awayTeam.goalies[i].playerId, data.playerByGameStats.awayTeam.goalies[i].sweaterNumber, data.playerByGameStats.awayTeam.goalies[i].name, 'G', 'A');
              shiftsArray.push(CurrentPlayer)}
            for (i = 0; i < data.playerByGameStats.homeTeam.defense.length; i++) { const CurrentPlayer = new Shifts(data.playerByGameStats.awayTeam.defense[i].playerId, data.playerByGameStats.awayTeam.defense[i].sweaterNumber, data.playerByGameStats.awayTeam.defense[i].name, 'D', 'A');
              shiftsArray.push(CurrentPlayer)}
            for (i = 0; i < data.playerByGameStats.homeTeam.forwards.length; i++) { const CurrentPlayer = new Shifts(data.playerByGameStats.awayTeam.forwards[i].playerId, data.playerByGameStats.awayTeam.forwards[i].sweaterNumber, data.playerByGameStats.awayTeam.forwards[i].name, 'F', 'A');
              shiftsArray.push(CurrentPlayer)}
              var shiftsURL = 'https://cors-anywhere.herokuapp.com/https://api.nhle.com/stats/rest/en/shiftcharts?cayenneExp=gameId=' + gameId;
            fetch(shiftsURL, { "method": "GET", "headers": {} })
              .then(function (response) { return response.json() })
              .then(function (data_shifts) {  }); // end second .then shifts
          }); // end second .then gamecenter;
      } // end displayGameData 
    } // end second .then from getinputvalue
    );
} // end getInput Value

for (j = 0; j < 2; j++) {for (k = 0; k < fiveOnFive[i][j].length/2; k++)  {for (l = 0; l < fiveOnFive3[i][j].length/2; l++) {
  if ((fiveOnFive[i][j][2*k] >= fiveOnFive3[i][j][2*l])&&(fiveOnFive[i][j][2*k+1] <= fiveOnFive3[i][j][2*l+1])) {fiveOnFive5[i][j].push(fiveOnFive[i][j][2*k], fiveOnFive[i][j][2*k+1])}
  else if ((fiveOnFive[i][j][2*k] <= fiveOnFive3[i][j][2*l])&&(fiveOnFive[i][j][2*k+1] >= fiveOnFive3[i][j][2*l+1])) {fiveOnFive5[i][j].push(fiveOnFive3[i][j][2*l], fiveOnFive3[i][j][2*l+1])}
  else if ((fiveOnFive[i][j][2*k]>=fiveOnFive3[i][j][2*l])&&(fiveOnFive[i][j][2*k+1]>=fiveOnFive3[i][j][2*l+1])&&(fiveOnFive[i][j][2*k]<fiveOnFive3[i][j][2*l+1])) {fiveOnFive5[i][j].push(fiveOnFive[i][j][2*k], fiveOnFive3[i][j][2*l+1])}
  else if ((fiveOnFive[i][j][2*k]<=fiveOnFive3[i][j][2*l])&&(fiveOnFive[i][j][2*k+1]<=fiveOnFive3[i][j][2*l+1])&&(fiveOnFive[i][j][2*k+1]>fiveOnFive3[i][j][2*l])) {fiveOnFive5[i][j].push(fiveOnFive3[i][j][2*l], fiveOnFive[i][j][2*k+1])}
}}}