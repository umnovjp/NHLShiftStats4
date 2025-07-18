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
              .then(function (data_shifts) { 
                // script here
               }); // end second .then shifts
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

for (h = 0; h < 2; h++) {// h = 0 home team F, h = 1 away team F
  for (i = 0; i < 3; i++) { for (j = 0; j < fArray[h].length; j++) { // i loop for 3 periods
      for (k = j + 1; k < fArray[h].length; k++) {shiftsPair = []; for (l = 0; l < fArray[h][j][i].length / 2; l++) {
          for (m = 0; m < fArray[h][k][i].length / 2; m++) { if ((fArray[h][k][i][2 * m] >= fArray[h][j][i][2 * l]) && (fArray[h][k][i][2 * m] <= fArray[h][j][i][2 * l + 1])) {
              if (fArray[h][k][i][2 * m + 1] >= fArray[h][j][i][2 * l + 1]) { shiftsPair.push(fArray[h][k][i][2 * m], fArray[h][j][i][2 * l + 1]) }
              else { shiftsPair.push(fArray[h][k][i][2 * m], fArray[h][k][i][2 * m + 1]) }}
            else if ((fArray[h][k][i][2 * m] <= fArray[h][j][i][2 * l]) && (fArray[h][k][i][2 * m + 1] >= fArray[h][j][i][2 * l])) {
              if (fArray[h][k][i][2 * m + 1] >= fArray[h][j][i][2 * l + 1]) { shiftsPair.push(fArray[h][j][i][2 * l], fArray[h][j][i][2 * l + 1]) }
              else {shiftsPair.push(fArray[h][j][i][2 * l], fArray[h][k][i][2 * m + 1])}
            }}}// end m, l loop
            for (l = k + 1; l < fArray[h].length; l++) {tempTime = []; tempTime2 = [];
            for (m = 0; m < shiftsPair.length/2; m++){
              for (n = 0; n < fArray[h][l][i].length/2; n++) {if ((fArray[h][l][i][2*n]>=shiftsPair[2*m])&&(fArray[h][l][i][2*n]<shiftsPair[2*m+1])){
                if (fArray[h][l][i][2*n+1]>=shiftsPair[2*m+1]) {tempTime.push(fArray[h][l][i][2*n], shiftsPair[2 * m + 1])}
                else { tempTime.push(fArray[h][l][i][2*n], fArray[h][l][i][2*n+1]) }}
                else if (fArray[h][l][i][2 * n] <= shiftsPair[2 * m] && fArray[h][l][i][2 * n + 1] > shiftsPair[2 * m]) {
                  if (fArray[h][l][i][2 * n + 1] >= shiftsPair[2 * m + 1]) { tempTime.push(shiftsPair[2 * m], shiftsPair[2 * m + 1]) }
                  else { tempTime.push(shiftsPair[2 * m], fArray[h][l][i][2 * n + 1])}
                }}} // end second m loop
            for (m = 0; m < fiveOnFive5[h][i].length/2; m++) { for (n = 0; n < tempTime.length/2; n++) {if ((tempTime[2*n]>=fiveOnFive5[h][i][2*m])&&(tempTime[2*n]<=fiveOnFive5[h][i][2*m+1])){
              if (tempTime[2*n+1] >= fiveOnFive5[h][i][2*m+1]) {tempTime2.push(fiveOnFive5[h][i][2*m+1]-tempTime[2*n])}
              else {tempTime2.push(tempTime[2*n+1]-tempTime[2*n])}}
            else if ((tempTime[2*n] <= fiveOnFive5[h][i][2*m])&&(tempTime[2*n+1] >= fiveOnFive5[h][i][2*m])) {
              if (tempTime[2*n+1] >= fiveOnFive5[h][i][2*m+1]) {tempTime2.push(fiveOnFive5[h][i][2*m+1]-fiveOnFive5[h][i][2*m])}
              else {tempTime2.push(tempTime[2*n+1] - fiveOnFive5[h][i][2*m])}
            }}} // end second m,n loop to count only 5x5 plays
            shifts = 0; const sum = tempTime2.reduce((partialSum, a) => partialSum + a, 0);
            for (o = 0; o < tempTime.length; o++) { if (tempTime[o] >= 10) { shifts = shifts + 1;
            tempTime2.push(tempTime[o])}}
            linesArray[i + 3 * h].push(sum); linesArray[i + 3 * h].push(shifts, j, k, l); // console.log(i, j, k, tempTime);
          } // end second l loop
      }} // temp end k, j loops
    }} // end k, j, i and h loop periods

    // darray line 97 [0] [151, 198, 324, 369, 453, 487, 749, 757, 1095, 1144] [102, 122, 311, 358, 454, 517, 803, 857, 1014, 1032, 1088,] [147, 180, 284, 322, 491, 508, 595, 643, 782, 794, 901, 934,] []
    // [1] [0, 50, 92, 151, 248, 294, 423, 453, 525, 565, 591, 629, 68] [0, 49, 243, 358, 410, 483, 607, 665, 850, 984, 1032, 1062, ] [0, 10, 38, 63, 239, 284, 433, 491, 644, 696, 839, 901, 946]
    // [2] [37, 92, 107, 151, 232, 295, 368, 378, 420, 453, 524, 563, ] [49, 102, 266, 311, 407, 454, 517, 607, 747, 803, 983, 1032,] [38, 63, 178, 236, 317, 370, 416, 485, 643, 701, 825, 896, 9]
    // [3] [50, 88, 199, 248, 295, 324, 369, 420, 487, 524, 565, 591, ] [48, 102, 196, 266, 358, 410, 516, 606, 747, 803, 916, 937,] [10, 38, 63, 125, 180, 239, 322, 416, 519, 586, 700, 752, 79]
    // [4] [0, 37, 88, 107, 198, 232, 294, 324, 378, 424, 487, 525, 563] [0, 49, 122, 198, 358, 408, 606, 747, 857, 917, 937, 966, 1] [0, 38, 63, 147, 236, 284, 370, 433, 506, 595, 701, 782, 794]
    // [5] [151, 201, 324, 368, 453, 487, 746, 757, 917, 989] [102, 122, 483, 516, 803, 850, 1106, 1165] [125, 178, 284, 317, 485, 519, 585, 644, 752, 794, 895, 946]
    // farray line 97 [0] [0, 48, 294, 300, 453, 487, 591, 629, 757, 761, 782, 813, 99] [249, 279, 453, 499, 803, 837, 1107, 1152] [177, 232, 354, 370, 403, 451, 552, 585, 680, 732, 894, 943]
    // [1] [0, 33, 107, 128, 271, 300, 453, 487, 591, 637, 757, 784, 8] [249, 279, 465, 501, 803, 850, 1119, 1175] [184, 236, 406, 454, 732, 794, 1189, 1200]
    // [2] [0, 38, 107, 129, 453, 487, 591, 638, 757, 761, 881, 884, 98] [246, 279, 453, 503, 803, 850, 1095, 1167] [187, 234, 409, 457, 735, 794, 1189, 1200]
    // [3] [91, 107, 242, 294, 378, 423, 568, 570, 682, 700, 746, 757, ] [54, 102, 198, 243, 327, 358, 407, 427, 598, 747, 917, 985] [0, 38, 63, 129, 284, 354, 506, 552, 586, 595, 636, 680, 794]
    // [4] [87, 107, 242, 271, 378, 420, 559, 570, 689, 700, 744, 757] [49, 102, 323, 358, 578, 660, 908, 983] [751, 794, 1189, 1200]
    // [5] [38, 89, 198, 242, 300, 324, 422, 453, 570, 591, 700, 725, ] [0, 48, 122, 183, 279, 315, 427, 453, 658, 747, 850, 914, 10] [128, 187, 343, 409, 552, 595, 696, 735, 896, 942, 1041, 113]
    // [6] [151, 192, 324, 378, 487, 568, 629, 682, 884, 919, 1076, 11] [102, 122, 180, 249, 358, 407, 499, 598, 747, 803, 985, 1032] [38, 63, 129, 177, 232, 284, 451, 506, 595, 638, 836, 894, ]
    // [7] [89, 107, 129, 151, 241, 300, 378, 422, 524, 570, 689, 700,] [49, 109, 122, 179, 315, 358, 408, 427, 602, 655, 665, 747,] [0, 38, 63, 128, 284, 343, 508, 552, 635, 697, 794, 847, 940]
    // [8] [48, 91, 128, 151, 192, 242, 300, 324, 424, 453, 570, 591, ] [0, 54, 183, 249, 279, 327, 427, 453, 660, 665, 837, 916, 1] [110, 184, 348, 403, 552, 595, 697, 751, 908, 940, 1037, 108]
    // [9] [151, 198, 324, 378, 487, 559, 637, 689, 877, 924, 1077, 11] [102, 122, 179, 246, 358, 410, 501, 578, 747, 803, 984, 103] [38, 63, 236, 284, 454, 506, 595, 636, 852, 908, 990, 1026,]
    // [10] [151, 199, 324, 378, 487, 524, 638, 689, 879, 923, 1089, 112] [109, 180, 358, 407, 503, 602, 747, 803, 982, 1032, 1167, ] [38, 63, 234, 284, 457, 508, 595, 635, 847, 895, 987, 1032,]
    // [11] [33, 87, 201, 241, 300, 324, 420, 453, 570, 591, 700, 744,] [0, 49, 122, 196, 279, 323, 410, 465, 655, 747, 850, 908,] [0, 38, 63, 110, 284, 348, 370, 406, 508, 552, 638, 700, 79]