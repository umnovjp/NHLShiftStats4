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
        // var requestURL = 'https://corsproxy.io/?key=2ddedfd8&url=https://api-web.nhle.com/v1/gamecenter/' + gameId + '/boxscore';
        var requestURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/gamecenter/' + gameId + '/boxscore';
        fetch(requestURL, {
          "method": "GET", "headers": {}
        })
          .then(function (response) { return response.json() })
          .then(function (data) {
            const gameInfo = document.createElement('section'); gameInfo.setAttribute('id', 'gameInfo');
            document.getElementById('schedule').appendChild(gameInfo);
            var gameTitle = document.createElement('h2'); gameTitle.textContent = '';
            gameTitle.innerHTML = 'You are watching analysis for ' + data.awayTeam.abbrev + ' at ' + data.homeTeam.abbrev + ' game' + ' on ' + formatted;
            document.getElementById('gameInfo').appendChild(gameTitle); shiftsArray = [];

            var shiftsURL = 'https://cors-anywhere.herokuapp.com/https://api.nhle.com/stats/rest/en/shiftcharts?cayenneExp=gameId=' + gameId;
            fetch(shiftsURL, { "method": "GET", "headers": {} })
              .then(function (response) { return response.json() })
              .then(function (data_shifts) {
                // script here;
              }); // end second .then shifts
          }); // end second .then gamecenter;
      } // end displayGameData 
    } // end second .then from getinputvalue
    );
} // end getInput Value

// h is team playing with 12F h=0 home team h=1 away team, 1-h team playing with 11F qrs are 12H line but tu are 4th line on 11F team
function lineByLine3(h, q, r, s, t, u) {
  shiftsLine3 = []; for (p = 0; p < 12; p++) { shiftsLine3.push([]) } shiftsLine3[10] = [[], [], []]

  for (n = 0; n < 3; n++) {// n is the period, h is 0 or 1 home away team 
    for (l = 0; l < fArray[h][q][n].length / 2; l++) {
      for (m = 0; m < fArray[h][r][n].length / 2; m++) {
        if ((fArray[h][r][n][2 * m] >= fArray[h][q][n][2 * l]) && (fArray[h][r][n][2 * m] <= fArray[h][q][n][2 * l + 1])) {
          if (fArray[h][r][n][2 * m + 1] >= fArray[h][q][n][2 * l + 1]) { shiftsLine3[n].push(fArray[h][r][n][2 * m], fArray[h][q][n][2 * l + 1]) }
          else { shiftsLine3[n].push(fArray[h][r][n][2 * m], fArray[h][r][n][2 * m + 1]) }
        }
        else if ((fArray[h][r][n][2 * m] <= fArray[h][q][n][2 * l]) && (fArray[h][r][n][2 * m + 1] >= fArray[h][q][n][2 * l])) {
          if (fArray[h][r][n][2 * m + 1] >= fArray[h][q][n][2 * l + 1]) { shiftsLine3[n].push(fArray[h][q][n][2 * l], fArray[h][q][n][2 * l + 1]) }
          else { shiftsLine3[n].push(fArray[h][q][n][2 * l], fArray[h][r][n][2 * m + 1]) }
        }
      }
    } // end first m,l loop 
    // start second l,m loop
    for (l = 0; l < shiftsLine3[n].length / 2; l++) {
      for (m = 0; m < fArray[h][s][n].length / 2; m++) {
        if ((fArray[h][s][n][2 * m] >= shiftsLine3[n][2 * l]) && (fArray[h][s][n][2 * m] <= shiftsLine3[n][2 * l + 1])) {
          if (fArray[h][s][n][2 * m + 1] >= shiftsLine3[n][2 * l + 1]) { shiftsLine3[n + 3].push(fArray[h][s][n][2 * m], shiftsLine3[n][2 * l + 1]) }
          else { shiftsLine3[n + 3].push(fArray[h][s][n][2 * m], fArray[h][s][n][2 * m + 1]) }
        }
        else if ((fArray[h][s][n][2 * m] <= shiftsLine3[n][2 * l]) && (fArray[h][s][n][2 * m + 1] >= shiftsLine3[n][2 * l])) {
          if (fArray[h][s][n][2 * m + 1] >= shiftsLine3[n][2 * l + 1]) { shiftsLine3[n + 3].push(shiftsLine3[n][2 * l], shiftsLine3[n][2 * l + 1]) }
          else { shiftsLine3[n + 3].push(shiftsLine3[n][2 * l], fArray[h][s][n][2 * m + 1]) }
        }
      }
    } // end second m,l loop 
    for (l = 0; l < fArray[1 - h][t][n].length / 2; l++) {
      for (m = 0; m < fArray[1 - h][u][n].length / 2; m++) {
        if ((fArray[1 - h][u][n][2 * m] >= fArray[1 - h][t][n][2 * l]) && (fArray[1 - h][u][n][2 * m] <= fArray[1 - h][t][n][2 * l + 1])) {
          if (fArray[1 - h][u][n][2 * m + 1] >= fArray[1 - h][t][n][2 * l + 1]) { shiftsLine3[6 + n].push(fArray[1 - h][u][n][2 * m], fArray[1 - h][t][n][2 * l + 1]) }
          else { shiftsLine3[6 + n].push(fArray[1 - h][u][n][2 * m], fArray[1 - h][u][n][2 * m + 1]) }
        }
        else if ((fArray[1 - h][u][n][2 * m] <= fArray[1 - h][t][n][2 * l]) && (fArray[1 - h][u][n][2 * m + 1] >= fArray[1 - h][t][n][2 * l])) {
          if (fArray[1 - h][u][n][2 * m + 1] >= fArray[1 - h][t][n][2 * l + 1]) { shiftsLine3[6 + n].push(fArray[1 - h][t][n][2 * l], fArray[1 - h][t][n][2 * l + 1]) }
          else { shiftsLine3[6 + n].push(fArray[1 - h][t][n][2 * l], fArray[1 - h][u][n][2 * m + 1]) }
        }
      }
    } // end first m,l loop
    // start second l,m loop
    shiftsLine3[9].push([]); // when qrs played against tu
    for (l = 0; l < shiftsLine3[3 + n].length / 2; l++) {
      for (m = 0; m < shiftsLine3[6 + n].length / 2; m++) {
        if ((shiftsLine3[6 + n][2 * m] >= shiftsLine3[3 + n][2 * l]) && (shiftsLine3[6 + n][2 * m] <= shiftsLine3[3 + n][2 * l + 1])) {
          if (shiftsLine3[6 + n][2 * m + 1] >= shiftsLine3[3 + n][2 * l + 1]) { shiftsLine3[9][n].push(shiftsLine3[6 + n][2 * m], shiftsLine3[3 + n][2 * l + 1]) }
          else { shiftsLine3[9][n].push(shiftsLine3[6 + n][2 * m], shiftsLine3[6 + n][2 * m + 1]) }
        }
        else if ((shiftsLine3[6 + n][2 * m] <= shiftsLine3[3 + n][2 * l]) && (shiftsLine3[6 + n][2 * m + 1] >= shiftsLine3[3 + n][2 * l])) {
          if (shiftsLine3[6 + n][2 * m + 1] >= shiftsLine3[3 + n][2 * l + 1]) { shiftsLine3[9][n].push(shiftsLine3[3 + n][2 * l], shiftsLine3[3 + n][2 * l + 1]) }
          else { shiftsLine3[9][n].push(shiftsLine3[3 + n][2 * l], shiftsLine3[6 + n][2 * m + 1]) }
        }
      }
    } // end m,l loop qrs against tu
    lineVsLineTime = 0; lineVsLineShifts = 0;
    for (k = 0; k < shiftsLine3[9][n].length / 2; k++) {
      lineVsLineTime = lineVsLineTime + shiftsLine3[9][n][2 * k + 1] - shiftsLine3[9][n][2 * k];
      if (shiftsLine3[9][n][2 * k + 1] - shiftsLine3[9][n][2 * k] >= 10) { lineVsLineShifts = lineVsLineShifts + 1 }
    }
    shiftsLine3[10][0].push(lineVsLineTime, lineVsLineShifts);
    lineVsLineTime = 0; lineVsLineShifts = 0;
    for (k = 0; k < shiftsLine3[3 + n].length / 2; k++) {
      lineVsLineTime = lineVsLineTime + shiftsLine3[3 + n][2 * k + 1] - shiftsLine3[3 + n][2 * k];
      if (shiftsLine3[3 + n][2 * k + 1] - shiftsLine3[3 + n][2 * k] >= 10) { lineVsLineShifts = lineVsLineShifts + 1 }
    }
    shiftsLine3[10][1].push(lineVsLineTime, lineVsLineShifts)
    lineVsLineTime = 0; lineVsLineShifts = 0;
    for (k = 0; k < shiftsLine3[6 + n].length / 2; k++) {
      lineVsLineTime = lineVsLineTime + shiftsLine3[6 + n][2 * k + 1] - shiftsLine3[6 + n][2 * k];
      if (shiftsLine3[6 + n][2 * k + 1] - shiftsLine3[6 + n][2 * k] >= 10) { lineVsLineShifts = lineVsLineShifts + 1 }
    }
    shiftsLine3[10][2].push(lineVsLineTime, lineVsLineShifts)
  } // end n loop
  return shiftsLine3[10]
} // end function lineByLine3
