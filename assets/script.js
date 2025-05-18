var scheduleContent = document.getElementById('schedule'); var gameId; var inputVal = '2021'; standingsArray = []; linesArray10 = []
// lines below will allow user to select date then to select game on that date
function getInputValue() {
  var inputVal = document.getElementById('datepicker').value; var date = inputVal.split('/');
  var formatted = date[2] + '-' + date[0] + '-' + date[1];
  var requestURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/schedule/' + formatted;
  fetch(requestURL, {
    "method": "GET", "headers": {}
  })
    .then(function (response) { return response.json() })
    .then(function (data) {
      console.log('I am in schedule then');
      var numberOfGames = data.gameWeek[0].games.length; scheduleContent.textContent = '';
      for (var i = 0; i < numberOfGames; i++) {
        var gameName = document.createElement('button');
        gameName.setAttribute('id', 'game' + i); var idx = gameName.getAttribute('id');
        gameName.innerHTML = 'Game ' + i + ': ' + data.gameWeek[0].games[i].awayTeam.abbrev + ' vs ' + data.gameWeek[0].games[i].homeTeam.abbrev;
        document.getElementById('schedule').appendChild(gameName); gameName.addEventListener('click', displayGameData);
      }

      function displayGameData(event) {
        idx = event.currentTarget; idxString = event.currentTarget.textContent;
        idxArray = idxString.split(':'); idxNumber = idxArray[0].split(' '); gameNumber = idxNumber[1];
        const gameId = data.gameWeek[0].games[gameNumber].id; console.log(gameId);
        var requestURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/gamecenter/' + gameId + '/boxscore';
        fetch(requestURL, {
          "method": "GET", "headers": {}
        })
          .then(function (response) { return response.json() })
          .then(function (data) {
            const gameInfo = document.createElement('section'); gameInfo.setAttribute('id', 'gameInfo');
            document.getElementById('schedule').appendChild(gameInfo);
            var gameTitle = document.createElement('h2'); gameTitle.textContent = '';
            gameTitle.innerHTML = 'You are watching analysis for ' + data.awayTeam.abbrev + ' at ' + data.homeTeam.abbrev + ' game' + ' on' + formatted;
            document.getElementById('gameInfo').appendChild(gameTitle);
            shiftsArray = [[],[],[],[],[],[]]

            console.log(data.playerByGameStats.homeTeam); console.log(data.playerByGameStats.homeTeam.goalies);

            for (i=0; i<data.playerByGameStats.homeTeam.goalies.length;i++) { shiftsArray[0].push(data.playerByGameStats.homeTeam.goalies[i].playerId) }
            for (i=0; i<data.playerByGameStats.homeTeam.defense.length;i++) { shiftsArray[1].push(data.playerByGameStats.homeTeam.defense[i].playerId) }
            for (i=0; i<data.playerByGameStats.homeTeam.forwards.length;i++) { shiftsArray[2].push(data.playerByGameStats.homeTeam.goalies[i].playerId) }
            for (i=0; i<data.playerByGameStats.awayTeam.goalies.length;i++) { shiftsArray[3].push(data.playerByGameStats.awayTeam.goalies[i].playerId) }
            for (i=0; i<data.playerByGameStats.awayTeam.defense.length;i++) { shiftsArray[4].push(data.playerByGameStats.awayTeam.defense[i].playerId) }
            for (i=0; i<data.playerByGameStats.awayTeam.forwards.length;i++) { shiftsArray[5].push(data.playerByGameStats.awayTeam.goalies[i].playerId) }
            console.log(shiftsArray)

     

            var shiftsURL = 'https://cors-anywhere.herokuapp.com/https://api.nhle.com/stats/rest/en/shiftcharts?cayenneExp=gameId=' + gameId;
            fetch(shiftsURL, { "method": "GET", "headers": {} })
              .then(function (response) { return response.json() })
              .then(function (data_shifts) {
                console.log('I am in second shift then', data_shifts);
                // to add script here

              }); // end second .then shifts

          }); // end second .then gamecenter;
      } // end displayGameData 
    } // end second .then from getinputvalue
    );
} // end getInput Value function 