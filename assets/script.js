var scheduleContent = document.getElementById('schedule'); var gameId; var inputVal = '2021'; standingsArray = []; linesArray10=[]
// lines below will allow user to select date then to select game on that date
function getInputValue() { var inputVal = document.getElementById('datepicker').value; var date = inputVal.split('/');
  var formatted = date[2]+'-'+date[0]+'-'+date[1]; var requestURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/schedule/' + formatted;
  fetch(requestURL, {"method": "GET", "headers": {}
  })
    .then(function (response) {return response.json()})
    .then(function (data) {console.log('I am in schedule then');
      var numberOfGames = data.gameWeek[0].games.length; scheduleContent.textContent = '';
      for (var i = 0; i < numberOfGames; i++) { var gameName = document.createElement('button'); gameName.setAttribute('id', 'game' + i); var idx = gameName.getAttribute('id');
        gameName.innerHTML = 'Game ' + i + ': ' + data.gameWeek[0].games[i].awayTeam.abbrev + ' vs ' + data.gameWeek[0].games[i].homeTeam.abbrev;
        document.getElementById('schedule').appendChild(gameName); gameName.addEventListener('click', displayGameData)}

      function displayGameData(event) {idx = event.currentTarget; idxString = event.currentTarget.textContent;
        idxArray = idxString.split(':'); idxNumber = idxArray[0].split(' '); gameNumber = idxNumber[1]; const gameId = data.gameWeek[0].games[gameNumber].id; console.log(gameId);
        var requestURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/gamecenter/' + gameId + '/boxscore';
        fetch(requestURL, { "method": "GET", "headers": {}}
          )
          .then(function (response) { return response.json() })
          .then(function (data) {const gameInfo = document.createElement('section'); gameInfo.setAttribute('id', 'gameInfo');
            document.getElementById('schedule').appendChild(gameInfo);
            var standingsURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/standings/' + formatted;
            fetch(standingsURL, { "method": "GET", "headers": {}}
          )
              .then(function (response) { return response.json() })
              .then(function (data_standings) { console.log(data_standings.standings);
                for (i = 0; i < data_standings.standings.length; i++) { if (data_standings.standings[i].teamAbbrev.default === data.awayTeam.abbrev) {
                    standingsArray.push(data_standings.standings[i].wins, data_standings.standings[i].losses, data_standings.standings[i].otLosses)
                    console.log(i, data.awayTeam.abbrev, data_standings.standings[i].wins, data_standings.standings[i].losses, data_standings.standings[i].otLosses)}
                  else if (data_standings.standings[i].teamAbbrev.default === data.homeTeam.abbrev) {
                    standingsArray.push(data.homeTeam.abbrev, data_standings.standings[i].wins, data_standings.standings[i].losses, data_standings.standings[i].otLosses)
                    console.log(i, data.homeTeam.abbrev, data_standings.standings[i].wins, data_standings.standings[i].losses, data_standings.standings[i].otLosses)}
                  else (console.log('No Such Abbrev'))}
                var gameTitle = document.createElement('h2'); gameTitle.textContent = '';
                gameTitle.innerHTML = 'You are watching stats for ' + data.awayTeam.abbrev + standingsArray[0] + ' W ' + standingsArray[1] + ' L ' + standingsArray[2] + ' O at ' + data.homeTeam.abbrev + standingsArray[3] + ' W ' + standingsArray[4] + ' L ' + standingsArray[5] + ' O game';
                document.getElementById('gameInfo').appendChild(gameTitle);
                const homeF = []; const awayF = []; const homeD = []; const awayD = []; const homeG = []; const awayG = []; const playerIdArray = [];
                var obj = data.playerByGameStats.homeTeam.forwards; var keys = Object.keys(obj);
                for (i = 0; i < keys.length; i++) { var val = obj[keys[i]]; homeF.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []])}
                var obj = data.playerByGameStats.homeTeam.defense; var keys = Object.keys(obj);
                for (i = 0; i < keys.length; i++) { var val = obj[keys[i]]; homeD.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []])}
                var obj = data.playerByGameStats.homeTeam.goalies; var keys = Object.keys(obj);
                for (i = 0; i < keys.length; i++) { var val = obj[keys[i]]; homeG.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []])}
                var obj = data.playerByGameStats.awayTeam.forwards; var keys = Object.keys(obj);
                for (i = 0; i < keys.length; i++) { var val = obj[keys[i]]; awayF.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []])}
                var obj = data.playerByGameStats.awayTeam.defense; var keys = Object.keys(obj);
                for (i = 0; i < keys.length; i++) {var val = obj[keys[i]]; awayD.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []])}
                var obj = data.playerByGameStats.awayTeam.goalies; var keys = Object.keys(obj);
                for (i = 0; i < keys.length; i++) {var val = obj[keys[i]]; awayG.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []])}

                var shiftsURL = 'https://cors-anywhere.herokuapp.com/https://api.nhle.com/stats/rest/en/shiftcharts?cayenneExp=gameId=' + gameId;
                fetch(shiftsURL, { "method": "GET", "headers": {} })
                  .then(function (response) {return response.json()})
                  .then(function (data_shifts) { console.log('I am in second shift then', data_shifts);
                    for (i = 0; i < data_shifts.data.length; i++) {
                      if ((data_shifts.data[i].typeCode === 517) && (data_shifts.data[i].period < 4)) {playerOrder = playerIdArray.indexOf(data_shifts.data[i].playerId);
                        shiftStart = data_shifts.data[i].startTime; shiftStart1 = shiftStart.split(':'); minutes = Number(shiftStart1[0]);
                        seconds = Number(shiftStart1[1]); shiftStart2 = minutes * 60 + seconds;
                        shiftEnd = data_shifts.data[i].endTime; shiftEnd1 = shiftEnd.split(':'); minutes = Number(shiftEnd1[0]);
                        seconds = Number(shiftEnd1[1]); shiftEnd2 = minutes * 60 + seconds; playerIdArray[playerOrder + 1][data_shifts.data[i].period - 1].push(shiftStart2, shiftEnd2)}}
                    for (i = 0; i < playerIdArray.length / 2; i++) {currentKey = playerIdArray[2 * i]}

                    dArray = [[], []]; fArray = [[], []];
                    for (i = 0; i < playerIdArray.length / 2; i++) {for (j = 0; j < homeD.length / 3; j++) { if (playerIdArray[2 * i] === homeD[3 * j]) { dArray[0].push(playerIdArray[2 * i + 1]) } }
                      for (j = 0; j < awayD.length / 3; j++) { if (playerIdArray[2 * i] === awayD[3 * j]) { dArray[1].push(playerIdArray[2 * i + 1]) }}}
                    for (i = 0; i < playerIdArray.length / 2; i++) {for (j = 0; j < homeF.length / 3; j++) { if (playerIdArray[2 * i] === homeF[3 * j]) { fArray[0].push(playerIdArray[2 * i + 1]) } }
                      for (j = 0; j < awayF.length / 3; j++) { if (playerIdArray[2 * i] === awayF[3 * j]) { fArray[1].push(playerIdArray[2 * i + 1]) }}}                    
                    console.log('dArray', dArray, 'fArray', fArray); pairingsArray = [[], [], [], [], [], []]; linesArray = [[], [], [], [], [], []];
                    
                    dArrayTemp = [[[],[],[]],[[],[],[]]]; fArrayTemp = [[[],[],[]],[[],[],[]]];
                    for (i = 0; i < 2; i++) { for (j = 0; j < dArray[i].length; j++) { for (k = 0; k < 3; k++) {dArrayTemp[i][k] = dArrayTemp[i][k].concat(dArray[i][j][k])}}}
                    for (i = 0; i < 2; i++) { for (j = 0; j < fArray[i].length; j++) { for (k = 0; k < 3; k++) {fArrayTemp[i][k] = fArrayTemp[i][k].concat(fArray[i][j][k])}}}
                    console.log('dArrayTemp', dArrayTemp, 'fArrayTemp', fArrayTemp);
                     // new attempt to create 5x5 loop
                     dArrayTemp2 = [[[],[],[]],[[],[],[]]]; dArrayTemp3 = [[[],[],[]],[[],[],[]]]; fArrayTemp2 = [[[],[],[]],[[],[],[]]]; fArrayTemp3 = [[[],[],[]],[[],[],[]]]; 
                     for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) {for (k = 0; k < 1200; k++) {dArrayTemp2[i][j].push(0); fArrayTemp2[i][j].push(0)}}}
                     for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) for (k = 0; k < dArrayTemp[i][j].length/2; k++) {for (l = dArrayTemp[i][j][2*k]; l < dArrayTemp[i][j][2*k + 1]; l++) {dArrayTemp2[i][j][l] = dArrayTemp2[i][j][l] + 1}}}
                   for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) for (k = 0; k < fArrayTemp[i][j].length/2; k++) {for (l = fArrayTemp[i][j][2*k]; l < fArrayTemp[i][j][2*k + 1]; l++) {fArrayTemp2[i][j][l] = fArrayTemp2[i][j][l] + 1}}}
                   
                   for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) {for (k = 0; k < 1200; k++) {if (dArrayTemp2[i][j][k+1] === dArrayTemp2[i][j][k]) {delete dArrayTemp2[i][j][k]}}}} 
                   for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) {for (k = 0; k < 1200; k++) {if (fArrayTemp2[i][j][k+1] === fArrayTemp2[i][j][k]) {delete fArrayTemp2[i][j][k]}}}} 
                 
                 for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) {for (k = 0; k < 1200; k++) {if (!dArrayTemp2[i][j][k]) {} else {dArrayTemp3[i][j].push(dArrayTemp2[i][j][k], k)}}}}
                 for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) {for (k = 0; k < 1200; k++) {if (!fArrayTemp2[i][j][k]) {} else {fArrayTemp3[i][j].push(fArrayTemp2[i][j][k], k)}}}}
                   console.log(dArrayTemp3, fArrayTemp3);
                   fiveOnFive = [[[],[],[]],[[],[],[]]]; fiveOnFive2 = [[[],[],[]],[[],[],[]]]; fiveOnFive3 = [[[],[],[]],[[],[],[]]]; fiveOnFive4 = [[[],[],[]],[[],[],[]]]; fiveOnFive5 = [[[],[],[]],[[],[],[]]]; 
                   // fiveOnFive2 and fiveOnFive4 are used for comparison only not for script should be deleted later
                   // fiveOnFive is when team played with 2D but fiveOnFive3 is when team played with 3F. Player is allowed up to 3 seconds to make a change. fiveOnFive5 is when team played with 2D and 3F
                   for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) { if (dArrayTemp3[i][j][0] === 2) {fiveOnFive[i][j].push(0, dArrayTemp3[i][j][1]); fiveOnFive2[i][j].push(0, dArrayTemp3[i][j][1])}
                     for (k = 1; k < dArrayTemp3[i][j].length/2; k++) {if (dArrayTemp3[i][j][2*k] === 2) {fiveOnFive[i][j].push(dArrayTemp3[i][j][2*k-1], dArrayTemp3[i][j][2*k+1]); fiveOnFive2[i][j].push(dArrayTemp3[i][j][2*k-1], dArrayTemp3[i][j][2*k+1])}}}}
                   for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) {for (k = fiveOnFive[i][j].length/2-1; k > 0; k--) {if (fiveOnFive[i][j][2*k]-fiveOnFive[i][j][2*k-1]<4) {tempArray1=fiveOnFive[i][j].slice(0,2*k-1); tempArray2=fiveOnFive[i][j].slice(2*k+1);
                     fiveOnFive[i][j]=tempArray1.concat(tempArray2)
                     }}}}
                     for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) { if (fArrayTemp3[i][j][0] === 3) {fiveOnFive3[i][j].push(0, fArrayTemp3[i][j][1]); fiveOnFive4[i][j].push(0, fArrayTemp3[i][j][1])}
                     for (k = 1; k < fArrayTemp3[i][j].length/2; k++) {if (fArrayTemp3[i][j][2*k] === 3) {fiveOnFive3[i][j].push(fArrayTemp3[i][j][2*k-1], fArrayTemp3[i][j][2*k+1]); fiveOnFive4[i][j].push(fArrayTemp3[i][j][2*k-1], fArrayTemp3[i][j][2*k+1])}}}}
                   for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) {for (k = fiveOnFive3[i][j].length/2-1; k > 0; k--) {if (fiveOnFive3[i][j][2*k]-fiveOnFive3[i][j][2*k-1]<4) { // console.log('160', fiveOnFive3[i][j][2*k], fiveOnFive3[i][j][2*k-1] )
                     tempArray1=fiveOnFive3[i][j].slice(0,2*k-1); tempArray2=fiveOnFive3[i][j].slice(2*k+1); fiveOnFive3[i][j]=tempArray1.concat(tempArray2)
                     }}}}
                     for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) {for (k = 0; k < fiveOnFive[i][j].length/2; k++)  {for (l = 0; l < fiveOnFive3[i][j].length/2; l++) {
                       if ((fiveOnFive[i][j][2*k] >= fiveOnFive3[i][j][2*l])&&(fiveOnFive[i][j][2*k+1] <= fiveOnFive3[i][j][2*l+1])) {fiveOnFive5[i][j].push(fiveOnFive[i][j][2*k], fiveOnFive[i][j][2*k+1])}
                       else if ((fiveOnFive[i][j][2*k] <= fiveOnFive3[i][j][2*l])&&(fiveOnFive[i][j][2*k+1] >= fiveOnFive3[i][j][2*l+1])) {fiveOnFive5[i][j].push(fiveOnFive3[i][j][2*l], fiveOnFive3[i][j][2*l+1])}
                       else if ((fiveOnFive[i][j][2*k]>=fiveOnFive3[i][j][2*l])&&(fiveOnFive[i][j][2*k+1]>=fiveOnFive3[i][j][2*l+1])&&(fiveOnFive[i][j][2*k]<fiveOnFive3[i][j][2*l+1])) {fiveOnFive5[i][j].push(fiveOnFive[i][j][2*k], fiveOnFive3[i][j][2*l+1])}
                       else if ((fiveOnFive[i][j][2*k]<=fiveOnFive3[i][j][2*l])&&(fiveOnFive[i][j][2*k+1]<=fiveOnFive3[i][j][2*l+1])&&(fiveOnFive[i][j][2*k+1]>fiveOnFive3[i][j][2*l])) {fiveOnFive5[i][j].push(fiveOnFive3[i][j][2*l], fiveOnFive[i][j][2*k+1])}
                     }}}} 
                    console.log('fiveOnFive', fiveOnFive, 'fiveOnFive3', fiveOnFive3, 'fiveOnFive5', fiveOnFive5);

                    for (h=0; h<2; h++) { // h = 0 home team D, h = 1 away team D 
                      for (i=0; i<3; i++) { for (j = 0; j<dArray[h].length; j++) { for (k=j+1; k<dArray[h].length; k++) {tempTime=[]; tempTime2=[]; for (l=0; l<dArray[h][j][i].length/2; l++) {
                              for (m=0; m<dArray[h][k][i].length/2; m++) { if ((dArray[h][k][i][2*m] >= dArray[h][j][i][2*l])&&(dArray[h][k][i][2*m] <= dArray[h][j][i][2 * l + 1])) {
                                  if (dArray[h][k][i][2 * m + 1] >= dArray[h][j][i][2 * l + 1]) { tempTime.push(dArray[h][k][i][2 * m], dArray[h][j][i][2 * l + 1]) }
                                  else { tempTime.push(dArray[h][k][i][2 * m], dArray[h][k][i][2 * m + 1]) }}
                                  else if ((dArray[h][k][i][2 * m] <= dArray[h][j][i][2 * l]) && (dArray[h][k][i][2 * m + 1] >= dArray[h][j][i][2 * l])) {
                                  if (dArray[h][k][i][2 * m + 1] >= dArray[h][j][i][2 * l + 1]) { tempTime.push(dArray[h][j][i][2 * l], dArray[h][j][i][2 * l + 1]) }
                                  else {tempTime.push(dArray[h][j][i][2 * l], dArray[h][k][i][2 * m + 1])}
                                }}}   // end l, m loop
                                for (l = 0; l < fiveOnFive5[h][i].length/2; l++) { for (m = 0; m < tempTime.length/2; m++) {if ((tempTime[2*m]>=fiveOnFive5[h][i][2*l])&&(tempTime[2*m]<=fiveOnFive5[h][i][2*l+1])){
                                  if (tempTime[2*m+1] >= fiveOnFive5[h][i][2*l+1]) {tempTime2.push(fiveOnFive5[h][i][2*l+1]-tempTime[2*m])}
                                  else {tempTime2.push(tempTime[2*m+1]-tempTime[2*m])}
                                }
                                else if ((tempTime[2*m] <= fiveOnFive5[h][i][2*l])&&(tempTime[2*m+1] >= fiveOnFive5[h][i][2*l])) {
                                  if (tempTime[2*m+1] >= fiveOnFive5[h][i][2*l+1]) {tempTime2.push(fiveOnFive5[h][i][2*l+1]-fiveOnFive5[h][i][2*l])}
                                  else {tempTime2.push(tempTime[2*m+1] - fiveOnFive5[h][i][2*l])}
                                }}} // end second m,l loop to count only 5x5 plays
                            shifts = 0; const sum = tempTime2.reduce((partialSum, a) => partialSum + a, 0);
                            for (n = 0; n < tempTime2.length; n++) { if (tempTime2[n] >= 10) { shifts = shifts + 1 } }
                            pairingsArray[i + 3 * h].push(sum); pairingsArray[i + 3 * h].push(shifts); // console.log(h, i, j, k, tempTime, tempTime2);
                          }}}} // end k, j, i and h loop periods 
                    console.log(pairingsArray); tempTime2 = [];
                    
                     dArrayTemp2 = [[[],[],[]],[[],[],[]]]; dArrayTemp3 = [[[],[],[]],[[],[],[]]]; fArrayTemp2 = [[[],[],[]],[[],[],[]]]; fArrayTemp3 = [[[],[],[]],[[],[],[]]];

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
                        }} // end i and h loop periods

                        console.log('shiftsPair', shiftsPair, 'linesArray', linesArray);
                        tempArray3 = [homeF.length/3, awayF.length/3]; linesArray4 = [[],[]]; finalLineup2=[[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]]];
                        linesArray7 = [[[],[],[]],[[],[],[]],[],[],[],[]];
                          // If statement makes sure that linesArray7[h][i] is not empty even if no line played together for 101s or more
                          for (h=0;h<2;h++) {for (i=0;i<3;i++) {for (j=0;j<linesArray[3*h].length/5;j++) {if (linesArray[3*h+i][5*j]>100) {
                          linesArray7[h][i].push(linesArray[3*h+i][5*j], linesArray[3*h+i][5*j+1], linesArray[3*h+i][5*j+2], linesArray[3*h+i][5*j+3], linesArray[3*h+i][5*j+4])
                          }}
                          if ((j=linesArray[3*h].length/5-1)&&(linesArray7[h][i].length===0)) {tempIndex=Math.max(...linesArray[3*h+i])
                          tempIndex2=linesArray[3*h+i].indexOf(tempIndex)
                          console.log('linesarray7 is empty', 'h', h, 'i', i, linesArray7[h][i], tempIndex, tempIndex2)
                          linesArray7[h][i].push(linesArray[3*h+i][tempIndex2],linesArray[3*h+i][tempIndex2+1],linesArray[3*h+i][tempIndex2+2],linesArray[3*h+i][tempIndex2+3],linesArray[3*h+i][tempIndex2+4])
                          }}}
                          console.log('linesArray7', linesArray7);
            // also to add fiveonfive if goalie is pulled
            // finalLineup2 loop; index 0 and 1 are lines that spent 100s or more in a given period index 2 and 3 are players that appeared more than once in index 0 or 1 
            // and index 5 6 is to verify all players that actually played in lines from index 0 1 reason for that is PHI lines where #11 played on 2 lines leaving one partner behind...
            // currently lines 210-288 or so final goal is to create F lines
            for (h=0;h<2;h++) {for (i=0;i<3;i++) {for (j=0;j<linesArray7[h][i].length/5;j++) {finalLineup2[h][i].push(linesArray7[h][i][5*j+2], linesArray7[h][i][5*j+3], linesArray7[h][i][5*j+4])}}}
            for (h=0;h<2;h++) {for (i=0;i<3;i++) {for (j=0;j<finalLineup2[h][i].length;j++) {for (k=j+1;k<finalLineup2[h][i].length;k++) {
              if (finalLineup2[h][i][j]===finalLineup2[h][i][k]) { if (finalLineup2[h+2][i].includes(finalLineup2[h][i][j])) {}
            else {finalLineup2[h+2][i].push(finalLineup2[h][i][j])}}
          }}
          // next 2 lines of code determines if there are unique lines if finalLineup2[h+2] is not empty if it is, lines are pushed to finalLineup2[h+4]
          for (j=0;j<finalLineup2[h][i].length/3;j++) {if ((finalLineup2[h+2][i].includes(finalLineup2[h][i][3*j]))||(finalLineup2[h+2][i].includes(finalLineup2[h][i][3*j+1]))||(finalLineup2[h+2][i].includes(finalLineup2[h][i][3*j+2]))){}
          else {finalLineup2[h+4][i].push(finalLineup2[h][i][3*j], finalLineup2[h][i][3*j+1], finalLineup2[h][i][3*j+2])}}
          if (finalLineup2[h+4][i].length===12) {}
          else if (finalLineup2[h+4][i].length===9) {for (j=0;j<tempArray3[h];j++){
            if (finalLineup2[h][i].includes(j)){}
          else finalLineup2[h+4][i].push(j)}}
          else if (finalLineup2[h+4][i].length===6) { //console.log('Two lines', 'team', h, 'period', i, finalLineup2[h+4][i]); 
            linesArray4 = [[[],[],[]],[[],[],[]]];
          for (j=3*h;j<3+3*h;j++) {for (k=0;k<linesArray[j].length/5;k++) {
            if((finalLineup2[h+4][i].includes(linesArray[j][5*k+2]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+3]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+4]))) {}
            else {linesArray4[h][i].push(linesArray[j][5*k], linesArray[j][5*k+1], linesArray[j][5*k+2], linesArray[j][5*k+3], linesArray[j][5*k+4])}
            }}
          tempIndex6 = linesArray4[h][i].indexOf(Math.max(...linesArray4[h][i])); tempIndex2 = tempIndex6%(linesArray4[h][i].length/3);
          finalLineup2[h+4][i].push(linesArray4[h][i][tempIndex6+2], linesArray4[h][i][tempIndex6+3], linesArray4[h][i][tempIndex6+4]);
          //finalLineup2[h+4][i].push(linesArray4[h][tempIndex6+2], linesArray4[h][tempIndex6+3], linesArray4[h][tempIndex6+4]);
          for (j=0; j<tempArray3[h]; j++) {if (finalLineup2[h+4][i].includes(j)){} else {finalLineup2[h+4][i].push(j)}}
        }
        else if (finalLineup2[h+4][i].length===3) {console.log('One line', 'team', h, 'period', i, finalLineup2[h+4][i]); linesArray5 = [[[],[],[]],[[],[],[]]]; linesArray6 = [[[],[],[]],[[],[],[]]];
        for (j=3*h;j<3*h+3;j++) {for (k=0;k<linesArray[j].length/5;k++) {
          if((finalLineup2[h+4][i].includes(linesArray[j][5*k+2]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+3]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+4]))) {}
          else {linesArray5[h][i].push(linesArray[j][5*k], linesArray[j][5*k+1], linesArray[j][5*k+2], linesArray[j][5*k+3], linesArray[j][5*k+4])}
        }}
       tempIndex = linesArray5[h][i].indexOf(Math.max(...linesArray5[h][i])); tempIndex2 = tempIndex%(linesArray5[h][i].length/3);
        finalLineup2[h+4][i].push(linesArray5[h][i][tempIndex+2], linesArray5[h][i][tempIndex+3], linesArray5[h][i][tempIndex+4]);
        for (j=3*h;j<3+3*h;j++) {for (k=0;k<linesArray[j].length/5;k++) {if ((finalLineup2[h+4][i].includes(linesArray[j][5*k+2]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+3]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+4]))){}
        else (linesArray6[h][i].push(linesArray[j][5*k], linesArray[j][5*k+1], linesArray[j][5*k+2], linesArray[j][5*k+3], linesArray[j][5*k+4]))}}
        tempIndex = linesArray6[h][i].indexOf(Math.max(...linesArray6[h][i])); tempIndex2 = tempIndex%(linesArray6[h][i].length/3);
        finalLineup2[h+4][i].push(linesArray6[h][i][tempIndex+2], linesArray6[h][i][tempIndex+3], linesArray6[h][i][tempIndex+4]);
        for (j=0; j<tempArray3[h]; j++) {if (finalLineup2[h+4][i].includes(j)){} else finalLineup2[h+4][i].push(j)}
        console.log(finalLineup2[h][i], linesArray6[h][i][tempIndex+2], linesArray6[h][i][tempIndex+3], linesArray6[h][i][tempIndex+4]);
      }
      else if (finalLineup2[h+4][i].length===0) {  tempIndex9=i; tempIndex10=h; tempIndex=Math.max(...linesArray[3*h+i]); tempIndex2=linesArray[3*h+i].indexOf(tempIndex)
      // console.log('Zero lines', 'team', h, 'period', i, linesArray[3*h+i], 'tempIndex ', tempIndex, 'tempIndex2 ', tempIndex2)
    tempArray4=[];
      console.log(linesArray7[h][i]);
      for (j=0;j<linesArray7[h][i].length/5;j++)
        {tempArray4.push(linesArray7[h][i][5*j])}
        tempIndex3=Math.max(...tempArray4); tempIndex4=tempArray4.indexOf(tempIndex); 
        console.log('tempArray4 ', tempArray4, 'tempIndex3 ', tempIndex3, 'tempIndex4 ', tempIndex4);
        finalLineup2[h+4][i].push(linesArray7[h][i][5*tempIndex4+2], linesArray7[h][i][5*tempIndex4+3], linesArray7[h][i][5*tempIndex4+4])
        linesArray8 = []; linesArray9 = []; 
      for (j=3*h;j<3*h+3;j++) {for (k=0;k<linesArray[j].length/5;k++) {
          if((finalLineup2[h+4][i].includes(linesArray[j][5*k+2]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+3]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+4]))) {}
          else {linesArray8.push(linesArray[j][5*k], linesArray[j][5*k+1], linesArray[j][5*k+2], linesArray[j][5*k+3], linesArray[j][5*k+4])}
        }}
      const start = i*linesArray8.length/3; const end = (i+1)*linesArray8.length/3;
      tempIndex = Math.max(...linesArray8.slice(start,end)); tempIndex2 =linesArray8.indexOf(Math.max(...linesArray8.slice(start,end)));
      // console.log(linesArray8, 'tempIndex', tempIndex, 'tempIndex2', tempIndex2, 'i', i, 'h', h);
      finalLineup2[4+h][i].push(linesArray8[tempIndex2+2],linesArray8[tempIndex2+3],linesArray8[tempIndex2+4])
      for (j=3*h;j<3*h+3;j++) {for (k=0;k<linesArray[j].length/5;k++) { if((finalLineup2[h+4][i].includes(linesArray[j][5*k+2]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+3]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+4]))) {}
        else {linesArray9.push(linesArray[j][5*k], linesArray[j][5*k+1], linesArray[j][5*k+2], linesArray[j][5*k+3], linesArray[j][5*k+4])}}}
    linesArray9=linesArray9.slice(i*linesArray9.length/3, (i+1)*linesArray9.length/3)} // end if length === 0
      else {console.log('case to be added it is not 0 or 1 or 2 or 3 or 4 lines', 'h', h, 'i', i)}
      }} // i, h loops end finalLineup2
      if (typeof linesArray9!='undefined') { tempIndex7 = Math.max(...linesArray9); tempIndex8 =linesArray9.indexOf(Math.max(...linesArray9));
      console.log('linesArray9', linesArray9, 'tempIndex7', tempIndex7, 'tempIndex8', tempIndex8, 'i', tempIndex9, 'h', tempIndex10);
      linesArray10.push(linesArray9[tempIndex8+2],linesArray9[tempIndex8+3],linesArray9[tempIndex8+4]);
      console.log(linesArray10, 'finallineup6', finalLineup2[tempIndex10+4][tempIndex9]);
      if (finalLineup2[tempIndex10+4][tempIndex9].length===6) {finalLineup2[tempIndex10+4][tempIndex9].push(linesArray9[tempIndex8+2],linesArray9[tempIndex8+3],linesArray9[tempIndex8+4])}
      console.log('finallineup9', finalLineup2[tempIndex10+4][tempIndex9], finalLineup2[tempIndex10+4][tempIndex9].length, tempArray3);
      if (finalLineup2[tempIndex10+4][tempIndex9].length===9) { for (i=0;i<tempArray3[tempIndex10];i++) {if (finalLineup2[tempIndex10+4][tempIndex9].includes(i)) {}
        else  {finalLineup2[tempIndex10+4][tempIndex9].push(i)}}}}
      console.log('final lineup home', finalLineup2[4], 'final lineup away', finalLineup2[5]); oldLines=[[],[]]; newLines=[[],[],[],[]];
      for (h=4;h<6;h++) {for (j=0;j<finalLineup2[h][0].length/3;j++) {for(k=0;k<finalLineup2[h][0].length/3;k++) {if((finalLineup2[h][0][3*j]===finalLineup2[h][2][3*k])&&(finalLineup2[h][0][3*j+1]===finalLineup2[h][2][3*k+1])&&(finalLineup2[h][0][3*j+2]===finalLineup2[h][2][3*k+2]))
        { if (finalLineup2[h][0][3*j+2]) {oldLines[h-4].push(finalLineup2[h][0][3*j], finalLineup2[h][0][3*j+1], finalLineup2[h][0][3*j+2])}
        else {oldLines[h-4].push(finalLineup2[h][0][3*j], finalLineup2[h][0][3*j+1])}}}
      }} // this loop assumes that team played with either 12F or 11F, but there were at least 2 games last season when a team played with 13F
    for (h=4;h<6;h++) { for (j=0;j<finalLineup2[h][2].length;j++) { if (!oldLines[h-4].includes(finalLineup2[h][2][j])) {newLines[h-4].push(finalLineup2[h][2][j])}}
      for (j=0;j<newLines[h-4].length;j++) {for (k=0;k<finalLineup2[h][2].length/3;k++) {if (newLines[h-4][j]===finalLineup2[h][2][3*k]) {newLines[h-2].push(finalLineup2[h][2][3*k],finalLineup2[h][2][3*k+1],finalLineup2[h][2][3*k+2])}}}}
      console.log('old', oldLines, 'new',  newLines);

                    // this function will be deleted; f is line number 0,1,2,3, j is opposite team line number 0,1,2,3, h is 0 or 1 home away team; n is player in a F line but i is period
                    function lineByLine1(h,f,j,i) {shiftsLine1=[]; for (p=0;p<14;p++) {shiftsLine1.push([])} shiftsLine1[13]=[[],[]]
                    
                    for (n=0;n<3;n++) { for (l=0;l<fArray[h][finalLineup2[4+h][i][3*f]][n].length/2;l++) { 
                      for (m=0;m<fArray[h][finalLineup2[4+h][i][3*f+1]][n].length/2;m++) {if ((fArray[h][finalLineup2[4+h][i][3*f+1]][n][2*m]>=fArray[h][finalLineup2[4+h][i][3*f]][n][2*l]) && (fArray[h][finalLineup2[4+h][i][3*f+1]][n][2*m]<=fArray[h][finalLineup2[4+h][i][3*f]][n][2*l+1]))
                    {if (fArray[h][finalLineup2[4+h][i][3*f+1]][n][2*m+1]>=fArray[h][finalLineup2[4+h][i][3*f]][n][2*l+1]) {shiftsLine1[n].push(fArray[h][finalLineup2[4+h][i][3*f+1]][n][2*m], fArray[h][finalLineup2[4+h][i][3*f]][n][2*l+1]) }
                    else { shiftsLine1[n].push(fArray[h][finalLineup2[4+h][i][3*f+1]][n][2*m], fArray[h][finalLineup2[4+h][i][3*f+1]][n][2*m+1]) }}
                    else if ((fArray[h][finalLineup2[4+h][i][3*f+1]][n][2*m]<=fArray[h][finalLineup2[4+h][i][3*f]][n][2*l])&&(fArray[h][finalLineup2[4+h][i][3*f+1]][n][2*m+1]>=fArray[h][finalLineup2[4+h][i][3*f]][n][2*l])) {
                      if (fArray[h][finalLineup2[4+h][i][3*f+1]][n][2*m+1]>=fArray[h][finalLineup2[4+h][i][3*f]][n][2*l+1]) { shiftsLine1[n].push(fArray[h][finalLineup2[4+h][i][3*f]][n][2*l], fArray[h][finalLineup2[4+h][i][3*f]][n][2*l+1]) }
                      else {shiftsLine1[n].push(fArray[h][finalLineup2[4+h][i][3*f]][n][2*l], fArray[h][finalLineup2[4+h][i][3*f+1]][n][2*m+1])}}
                    }} // end first m,l loop 
                    // start second l,m loop
                    for (l=0;l<shiftsLine1[n].length/2;l++) { for (m=0;m<fArray[h][finalLineup2[4+h][i][3*f+2]][n].length/2;m++) {if ((fArray[h][finalLineup2[4+h][i][3*f+2]][n][2*m]>=shiftsLine1[n][2*l]) && (fArray[h][finalLineup2[4+h][i][3*f+2]][n][2*m]<=shiftsLine1[n][2*l+1]))
                    {if (fArray[h][finalLineup2[4+h][i][3*f+2]][n][2*m+1]>=shiftsLine1[n][2*l+1]) {shiftsLine1[n+3].push(fArray[h][finalLineup2[4+h][i][3*f+2]][n][2*m], shiftsLine1[n][2*l+1]) }
                      else { shiftsLine1[n+3].push(fArray[h][finalLineup2[4+h][i][3*f+2]][n][2*m], fArray[h][finalLineup2[4+h][i][3*f+2]][n][2*m+1]) }}
                      else if ((fArray[h][finalLineup2[4+h][i][3*f+2]][n][2*m]<=shiftsLine1[n][2*l])&&(fArray[h][finalLineup2[4+h][i][3*f+2]][n][2*m+1]>=shiftsLine1[n][2*l])) {
                      if (fArray[h][finalLineup2[4+h][i][3*f+2]][n][2*m+1]>=shiftsLine1[n][2*l+1]) { shiftsLine1[n+3].push(shiftsLine1[n][2*l], shiftsLine1[n][2*l+1]) }
                      else {shiftsLine1[n+3].push(shiftsLine1[n][2*l], fArray[h][finalLineup2[4+h][i][3*f+2]][n][2*m+1])}}
                    }} // end second m,l loop 
                    for (l=0;l<fArray[1-h][finalLineup2[5-h][i][3*j]][n].length/2;l++) { for (m=0;m<fArray[1-h][finalLineup2[5-h][i][3*j+1]][n].length/2;m++) {if ((fArray[1-h][finalLineup2[5-h][i][3*j+1]][n][2*m]>=fArray[1-h][finalLineup2[5-h][i][3*j]][n][2*l]) && (fArray[1-h][finalLineup2[5-h][i][3*j+1]][n][2*m]<=fArray[1-h][finalLineup2[5-h][i][3*j]][n][2*l+1]))
                    {if (fArray[1-h][finalLineup2[5-h][i][3*j+1]][n][2*m+1]>=fArray[1-h][finalLineup2[5-h][i][3*j]][n][2*l+1]) {shiftsLine1[6+n].push(fArray[1-h][finalLineup2[5-h][i][3*j+1]][n][2*m], fArray[1-h][finalLineup2[5-h][i][3*j]][n][2*l+1]) }
                    else { shiftsLine1[6+n].push(fArray[1-h][finalLineup2[5-h][i][3*j+1]][n][2*m], fArray[1-h][finalLineup2[5-h][i][3*j+1]][n][2*m+1]) }}
                    else if ((fArray[1-h][finalLineup2[5-h][i][3*j+1]][n][2*m]<=fArray[1-h][finalLineup2[5-h][i][3*j]][n][2*l])&&(fArray[1-h][finalLineup2[5-h][i][3*j+1]][n][2*m+1]>=fArray[1-h][finalLineup2[5-h][i][3*j]][n][2*l])) {
                    if (fArray[1-h][finalLineup2[5-h][i][3*j+1]][n][2*m+1]>=fArray[1-h][finalLineup2[5-h][i][3*j]][n][2*l+1]) { shiftsLine1[6+n].push(fArray[1-h][finalLineup2[5-h][i][3*j]][n][2*l], fArray[1-h][finalLineup2[5-h][i][3*j]][n][2*l+1]) }
                     else {shiftsLine1[6+n].push(fArray[1-h][finalLineup2[5-h][i][3*j]][n][2*l], fArray[1-h][finalLineup2[5-h][i][3*j+1]][n][2*m+1])}}
                    }} // end first m,l loop
                    // start second l,m loop 
                    for (l=0;l<shiftsLine1[6+n].length/2;l++) { for (m=0;m<fArray[1-h][finalLineup2[5-h][i][3*j+2]][n].length/2;m++) { // console.log(l, m, 'team', h, 'period', i, fArray[1-h][finalLineup2[5-h][i][3*j+2]][n][2*m], fArray[1-h][finalLineup2[5-h][i][3*j+2]], shiftsLine1[6+n][2*l], shiftsLine1[6+n][2*l+1])
                      if ((fArray[1-h][finalLineup2[5-h][i][3*j+2]][n][2*m]>=shiftsLine1[6+n][2*l]) && (fArray[1-h][finalLineup2[5-h][i][3*j+2]][n][2*m]<=shiftsLine1[6+n][2*l+1]))
                    {if (fArray[1-h][finalLineup2[5-h][i][3*j+2]][n][2*m+1]>=shiftsLine1[6+n][2*l+1]) {shiftsLine1[9+n].push(fArray[1-h][finalLineup2[5-h][i][3*j+2]][n][2*m], shiftsLine1[6+n][2*l+1]) }
                    else { shiftsLine1[9+n].push(fArray[1-h][finalLineup2[5-h][i][3*j+2]][n][2*m], fArray[1-h][finalLineup2[5-h][i][3*j+2]][n][2*m+1]) }}
                    else if ((fArray[1-h][finalLineup2[5-h][i][3*j+2]][n][2*m]<=shiftsLine1[6+n][2*l])&&(fArray[1-h][finalLineup2[5-h][i][3*j+2]][n][2*m+1]>=shiftsLine1[6+n][2*l])) {
                    if (fArray[1-h][finalLineup2[5-h][i][3*j+2]][n][2*m+1]>=shiftsLine1[6+n][2*l+1]) { shiftsLine1[9+n].push(shiftsLine1[6+n][2*l], shiftsLine1[6+n][2*l+1]) }
                      else {shiftsLine1[9+n].push(shiftsLine1[6+n][2*l], fArray[1-h][finalLineup2[5-h][i][3*j+2]][n][2*m+1])}}
                    }} // end second away m,l loop
                    shiftsLine1[12].push([]);
                    for (l=0;l<shiftsLine1[3+n].length/2;l++) {for (m=0;m<shiftsLine1[9+n].length/2;m++) {if ((shiftsLine1[9+n][2*m]>=shiftsLine1[3+n][2*l])&&(shiftsLine1[9+n][2*m]<=shiftsLine1[3+n][2*l+1])){
                    if (shiftsLine1[9+n][2*m+1]>=shiftsLine1[3+n][2*l+1]){shiftsLine1[12][n].push(shiftsLine1[9+n][2*m], shiftsLine1[3+n][2*l+1])}
                    else { shiftsLine1[12][n].push(shiftsLine1[9+n][2*m], shiftsLine1[9+n][2*m+1]) }}
                    else if ((shiftsLine1[9+n][2*m]<=shiftsLine1[3+n][2*l])&&(shiftsLine1[9+n][2*m+1]>=shiftsLine1[3+n][2*l])) {
                    if (shiftsLine1[9+n][2*m+1]>=shiftsLine1[3+n][2*l+1]) { shiftsLine1[12][n].push(shiftsLine1[3+n][2*l], shiftsLine1[3+n][2*l+1]) }
                      else {shiftsLine1[12][n].push(shiftsLine1[3+n][2*l], shiftsLine1[9+n][2*m+1])}}
                    }} // end m,l loop line vs line
                    lineVsLineTime=0; lineVsLineShifts=0;
                    for (k=0;k<shiftsLine1[12][n].length/2;k++) { lineVsLineTime=lineVsLineTime+shiftsLine1[12][n][2*k+1]-shiftsLine1[12][n][2*k];
                    if (shiftsLine1[12][n][2*k+1]-shiftsLine1[12][n][2*k]>=10) {lineVsLineShifts=lineVsLineShifts+1}}
                    shiftsLine1[13][0].push(lineVsLineTime, lineVsLineShifts);
                    lineVsLineTime=0; lineVsLineShifts=0;
                    for (k=0;k<shiftsLine1[3+n].length/2;k++) { lineVsLineTime=lineVsLineTime+shiftsLine1[3+n][2*k+1]-shiftsLine1[3+n][2*k];
                    if (shiftsLine1[3+n][2*k+1]-shiftsLine1[3+n][2*k]>=10) {lineVsLineShifts=lineVsLineShifts+1}}
                    shiftsLine1[13][1].push(lineVsLineTime, lineVsLineShifts)
                    } // end n loop
                    return shiftsLine1[13]} // end function lineByLine1 it will be deleted

                    // q,r,s are forwards on home team, t,u,v are forwards on away team values are 0...11 if 12F or 0...10 if 11F
                    function lineByLine2(q,r,s,t,u,v) { // created an array with 15 elements
                    shiftsLine2=[]; for (p=0;p<15;p++) {shiftsLine2.push([])} shiftsLine2[13]=[[],[],[]]             
                    for (n=0;n<3;n++) { for (l=0;l<fArray[0][q][n].length/2;l++) { for (m=0;m<fArray[0][r][n].length/2;m++) {if ((fArray[0][r][n][2*m]>=fArray[0][q][n][2*l])&&(fArray[0][r][n][2*m]<=fArray[0][q][n][2*l+1]))
                    {if (fArray[0][r][n][2*m+1]>=fArray[0][q][n][2*l+1]) {shiftsLine2[n].push(fArray[0][r][n][2*m], fArray[0][q][n][2*l+1]) }
                    else { shiftsLine2[n].push(fArray[0][r][n][2*m], fArray[0][r][n][2*m+1]) }}
                    else if ((fArray[0][r][n][2*m]<=fArray[0][q][n][2*l])&&(fArray[0][r][n][2*m+1]>=fArray[0][q][n][2*l])) {
                      if (fArray[0][r][n][2*m+1]>=fArray[0][q][n][2*l+1]) { shiftsLine2[n].push(fArray[0][q][n][2*l], fArray[0][q][n][2*l+1]) }
                      else {shiftsLine2[n].push(fArray[0][q][n][2*l], fArray[0][r][n][2*m+1])}}
                    }} // end first m,l loop
                    for (l=0;l<shiftsLine2[n].length/2;l++) { for (m=0;m<fArray[0][s][n].length/2;m++) { if ((fArray[0][s][n][2*m]>=shiftsLine2[n][2*l])&&(fArray[0][s][n][2*m]<=shiftsLine2[n][2*l+1]))
                    {if (fArray[0][s][n][2*m+1]>=shiftsLine2[n][2*l+1]) {shiftsLine2[n+3].push(fArray[0][s][n][2*m], shiftsLine2[n][2*l+1]) }
                      else { shiftsLine2[n+3].push(fArray[0][s][n][2*m], fArray[0][s][n][2*m+1]) }}
                      else if ((fArray[0][s][n][2*m]<=shiftsLine2[n][2*l])&&(fArray[0][s][n][2*m+1]>=shiftsLine2[n][2*l])) {
                      if (fArray[0][s][n][2*m+1]>=shiftsLine2[n][2*l+1]) { shiftsLine2[n+3].push(shiftsLine2[n][2*l], shiftsLine2[n][2*l+1]) }
                      else {shiftsLine2[n+3].push(shiftsLine2[n][2*l], fArray[0][s][n][2*m+1])}}
                    }} // end second m,l loop
                    for (l=0;l<fArray[1][t][n].length/2;l++) { // console.log('error0', fArray[1], 'n=', n, 'l=', l);
                      for (m=0;m<fArray[1][u][n].length/2;m++) {if ((fArray[1][u][n][2*m]>=fArray[1][t][n][2*l])&&(fArray[1][u][n][2*m]<=fArray[1][t][n][2*l+1]))
                    {if (fArray[1][u][n][2*m+1]>=fArray[1][t][n][2*l+1]) {shiftsLine2[6+n].push(fArray[1][u][n][2*m], fArray[1][t][n][2*l+1]) }
                    else { shiftsLine2[6+n].push(fArray[1][u][n][2*m], fArray[1][u][n][2*m+1]) }}
                    else if ((fArray[1][u][n][2*m]<=fArray[1][t][n][2*l])&&(fArray[1][u][n][2*m+1]>=fArray[1][t][n][2*l])) {
                    if (fArray[1][u][n][2*m+1]>=fArray[1][t][n][2*l+1]) { shiftsLine2[6+n].push(fArray[1][t][n][2*l], fArray[1][t][n][2*l+1]) }
                     else {shiftsLine2[6+n].push(fArray[1][t][n][2*l], fArray[1][u][n][2*m+1])}}
                    }} // end first m,l loop
                    // start second l,m loop
                    for (l=0;l<shiftsLine2[6+n].length/2;l++) { for (m=0;m<fArray[1][v][n].length/2;m++) { console.log('error', fArray[1], 'l=', l, 'm=', m, 'n=', n);
                      if ((fArray[1][v][n][2*m]>=shiftsLine2[6+n][2*l])&&(fArray[1][v][n][2*m]<=shiftsLine2[6+n][2*l+1]))
                    {if (fArray[1][v][n][2*m+1]>=shiftsLine2[6+n][2*l+1]) {shiftsLine2[9+n].push(fArray[1][v][n][2*m], shiftsLine2[6+n][2*l+1]) }
                    else { shiftsLine2[9+n].push(fArray[1][v][n][2*m], fArray[1][v][n][2*m+1]) }}
                    else if ((fArray[1][v][n][2*m]<=shiftsLine2[6+n][2*l])&&(fArray[1][v][n][2*m+1]>=shiftsLine2[6+n][2*l])) {
                    if (fArray[1][v][n][2*m+1]>=shiftsLine2[6+n][2*l+1]) { shiftsLine2[9+n].push(shiftsLine2[6+n][2*l], shiftsLine2[6+n][2*l+1]) }
                    else {shiftsLine2[9+n].push(shiftsLine2[6+n][2*l], fArray[1][v][n][2*m+1])}}
                    }} // end second away m,l loop
                    shiftsLine2[12].push([]); 
                    for (l=0;l<shiftsLine2[3+n].length/2;l++) {for (m=0;m<shiftsLine2[9+n].length/2;m++) {if ((shiftsLine2[9+n][2*m]>=shiftsLine2[3+n][2*l])&&(shiftsLine2[9+n][2*m]<=shiftsLine2[3+n][2*l+1])){
                    if (shiftsLine2[9+n][2*m+1]>=shiftsLine2[3+n][2*l+1]){shiftsLine2[12][n].push(shiftsLine2[9+n][2*m], shiftsLine2[3+n][2*l+1])}
                    else { shiftsLine2[12][n].push(shiftsLine2[9+n][2*m], shiftsLine2[9+n][2*m+1]) }}
                    else if ((shiftsLine2[9+n][2*m]<=shiftsLine2[3+n][2*l])&&(shiftsLine2[9+n][2*m+1]>=shiftsLine2[3+n][2*l])) {
                    if (shiftsLine2[9+n][2*m+1]>=shiftsLine2[3+n][2*l+1]) { shiftsLine2[12][n].push(shiftsLine2[3+n][2*l], shiftsLine2[3+n][2*l+1]) }
                      else {shiftsLine2[12][n].push(shiftsLine2[3+n][2*l], shiftsLine2[9+n][2*m+1])}}
                    }} // end m,l loop line vs line
                    lineVsLineTime=0; lineVsLineShifts=0;
                    for (k=0;k<shiftsLine2[12][n].length/2;k++) { lineVsLineTime=lineVsLineTime+shiftsLine2[12][n][2*k+1]-shiftsLine2[12][n][2*k];
                    if (shiftsLine2[12][n][2*k+1]-shiftsLine2[12][n][2*k]>=10) {lineVsLineShifts=lineVsLineShifts+1}}
                    shiftsLine2[13][0].push(lineVsLineTime, lineVsLineShifts);
                    lineVsLineTime=0; lineVsLineShifts=0;
                    for (k=0;k<shiftsLine2[3+n].length/2;k++) { lineVsLineTime=lineVsLineTime+shiftsLine2[3+n][2*k+1]-shiftsLine2[3+n][2*k];
                    if (shiftsLine2[3+n][2*k+1]-shiftsLine2[3+n][2*k]>=10) {lineVsLineShifts=lineVsLineShifts+1}}
                    shiftsLine2[13][1].push(lineVsLineTime, lineVsLineShifts)
                    lineVsLineTime=0; lineVsLineShifts=0;
                    for (k=0;k<shiftsLine2[9+n].length/2;k++) { lineVsLineTime=lineVsLineTime+shiftsLine2[9+n][2*k+1]-shiftsLine2[9+n][2*k];
                      if (shiftsLine2[9+n][2*k+1]-shiftsLine2[9+n][2*k]>=10) {lineVsLineShifts=lineVsLineShifts+1}}
                      shiftsLine2[13][2].push(lineVsLineTime, lineVsLineShifts)
                    } // end n loop
                    return shiftsLine2[13]} // end function lineByLine2 
                    console.log(// 'lineByLine1', lineByLine1(1,0,0,0),lineByLine1(1,0,0,1),lineByLine1(1,0,0,2),
                    'lineByLine2', lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11]))

                    // h is team playing with 12F h=0 home team h=1 away team, 1-h team playing with 11F qrs are 12H line but tu are 4th line on 11F team
                    function lineByLine3(h,q,r,s,t,u) {shiftsLine3=[]; for (p=0;p<12;p++) {shiftsLine3.push([])} shiftsLine3[10]=[[],[],[]];
                    for (n=0;n<3;n++) {// n is the period, h is 0 or 1 home away team
                    for (l=0;l<fArray[h][q][n].length/2;l++) { for (m=0;m<fArray[h][r][n].length/2;m++) {if ((fArray[h][r][n][2*m]>=fArray[h][q][n][2*l])&&(fArray[h][r][n][2*m]<=fArray[h][q][n][2*l+1]))
                    {if (fArray[h][r][n][2*m+1]>=fArray[h][q][n][2*l+1]) {shiftsLine3[n].push(fArray[h][r][n][2*m], fArray[h][q][n][2*l+1]) }
                    else { shiftsLine3[n].push(fArray[h][r][n][2*m], fArray[h][r][n][2*m+1]) }}
                    else if ((fArray[h][r][n][2*m]<=fArray[h][q][n][2*l])&&(fArray[h][r][n][2*m+1]>=fArray[h][q][n][2*l])) {
                      if (fArray[h][r][n][2*m+1]>=fArray[h][q][n][2*l+1]) { shiftsLine3[n].push(fArray[h][q][n][2*l], fArray[h][q][n][2*l+1]) }
                      else {shiftsLine3[n].push(fArray[h][q][n][2*l], fArray[h][r][n][2*m+1])}}
                    }} // end first m,l loop 
                    // start second l,m loop
                    for (l=0;l<shiftsLine3[n].length/2;l++) { for (m=0;m<fArray[h][s][n].length/2;m++) { if ((fArray[h][s][n][2*m]>=shiftsLine3[n][2*l])&&(fArray[h][s][n][2*m]<=shiftsLine3[n][2*l+1]))
                    {if (fArray[h][s][n][2*m+1]>=shiftsLine3[n][2*l+1]) {shiftsLine3[n+3].push(fArray[h][s][n][2*m], shiftsLine3[n][2*l+1]) }
                      else { shiftsLine3[n+3].push(fArray[h][s][n][2*m], fArray[h][s][n][2*m+1]) }}
                      else if ((fArray[h][s][n][2*m]<=shiftsLine3[n][2*l])&&(fArray[h][s][n][2*m+1]>=shiftsLine3[n][2*l])) {
                      if (fArray[h][s][n][2*m+1]>=shiftsLine3[n][2*l+1]) { shiftsLine3[n+3].push(shiftsLine3[n][2*l], shiftsLine3[n][2*l+1]) }
                      else {shiftsLine3[n+3].push(shiftsLine3[n][2*l], fArray[h][s][n][2*m+1])}}
                    }} // end second m,l loop 
                    for (l=0;l<fArray[1-h][t][n].length/2;l++) { for (m=0;m<fArray[1-h][u][n].length/2;m++) {if ((fArray[1-h][u][n][2*m]>=fArray[1-h][t][n][2*l])&&(fArray[1-h][u][n][2*m]<=fArray[1-h][t][n][2*l+1]))
                    {if (fArray[1-h][u][n][2*m+1]>=fArray[1-h][t][n][2*l+1]) {shiftsLine3[6+n].push(fArray[1-h][u][n][2*m], fArray[1-h][t][n][2*l+1]) }
                    else { shiftsLine3[6+n].push(fArray[1-h][u][n][2*m], fArray[1-h][u][n][2*m+1]) }}
                    else if ((fArray[1-h][u][n][2*m]<=fArray[1-h][t][n][2*l])&&(fArray[1-h][u][n][2*m+1]>=fArray[1-h][t][n][2*l])) {
                    if (fArray[1-h][u][n][2*m+1]>=fArray[1-h][t][n][2*l+1]) { shiftsLine3[6+n].push(fArray[1-h][t][n][2*l], fArray[1-h][t][n][2*l+1]) }
                     else {shiftsLine3[6+n].push(fArray[1-h][t][n][2*l], fArray[1-h][u][n][2*m+1])}}
                    }} // end first m,l loop
                    // start second l,m loop
                    shiftsLine3[9].push([]); // when qrs played against tu
                    for (l=0;l<shiftsLine3[3+n].length/2;l++) {for (m=0;m<shiftsLine3[6+n].length/2;m++) {if ((shiftsLine3[6+n][2*m]>=shiftsLine3[3+n][2*l])&&(shiftsLine3[6+n][2*m]<=shiftsLine3[3+n][2*l+1])){
                    if (shiftsLine3[6+n][2*m+1]>=shiftsLine3[3+n][2*l+1]){shiftsLine3[9][n].push(shiftsLine3[6+n][2*m], shiftsLine3[3+n][2*l+1])}
                    else { shiftsLine3[9][n].push(shiftsLine3[6+n][2*m], shiftsLine3[6+n][2*m+1]) }}
                    else if ((shiftsLine3[6+n][2*m]<=shiftsLine3[3+n][2*l])&&(shiftsLine3[6+n][2*m+1]>=shiftsLine3[3+n][2*l])) {
                    if (shiftsLine3[6+n][2*m+1]>=shiftsLine3[3+n][2*l+1]) { shiftsLine3[9][n].push(shiftsLine3[3+n][2*l], shiftsLine3[3+n][2*l+1]) }
                      else {shiftsLine3[9][n].push(shiftsLine3[3+n][2*l], shiftsLine3[6+n][2*m+1])}}
                    }} // end m,l loop line vs line
                    lineVsLineTime=0; lineVsLineShifts=0; // qrs played against tu
                    for (k=0;k<shiftsLine3[9][n].length/2;k++) { lineVsLineTime=lineVsLineTime+shiftsLine3[9][n][2*k+1]-shiftsLine3[9][n][2*k];
                    if (shiftsLine3[9][n][2*k+1]-shiftsLine3[9][n][2*k]>=10) {lineVsLineShifts=lineVsLineShifts+1}}
                    shiftsLine3[10][0].push(lineVsLineTime, lineVsLineShifts);
                    lineVsLineTime=0; lineVsLineShifts=0; // qrs played together
                    for (k=0;k<shiftsLine3[3+n].length/2;k++) { lineVsLineTime=lineVsLineTime+shiftsLine3[3+n][2*k+1]-shiftsLine3[3+n][2*k];
                    if (shiftsLine3[3+n][2*k+1]-shiftsLine3[3+n][2*k]>=10) {lineVsLineShifts=lineVsLineShifts+1}}
                    shiftsLine3[10][1].push(lineVsLineTime, lineVsLineShifts)
                    lineVsLineTime=0; lineVsLineShifts=0; // tu played together
                    for (k=0;k<shiftsLine3[6+n].length/2;k++) { lineVsLineTime=lineVsLineTime+shiftsLine3[6+n][2*k+1]-shiftsLine3[6+n][2*k];
                      if (shiftsLine3[6+n][2*k+1]-shiftsLine3[6+n][2*k]>=10) {lineVsLineShifts=lineVsLineShifts+1}}
                      shiftsLine3[10][2].push(lineVsLineTime, lineVsLineShifts)
                    } // end n loop 
                    return shiftsLine3[10]} // end function lineByLine3
             
                    lineByLine001.innerHTML='\\ '+'Away Team ->' +'<br>'+ 'Home Team'+'<br>'+'    |'; 
                    lineByLine041.innerHTML=awayF[1+3*finalLineup2[5][2][0]]+' '+awayF[2+3*finalLineup2[5][2][0]]+'<br>'+awayF[1+3*finalLineup2[5][2][1]]+' '+awayF[2+3*finalLineup2[5][2][1]]+'<br>'+awayF[1+3*finalLineup2[5][2][2]]+' '+awayF[2+3*finalLineup2[5][2][2]];
                    lineByLine051.innerHTML=awayF[1+3*finalLineup2[5][2][3]]+' '+awayF[2+3*finalLineup2[5][2][3]]+'<br>'+awayF[1+3*finalLineup2[5][2][4]]+' '+awayF[2+3*finalLineup2[5][2][4]]+'<br>'+awayF[1+3*finalLineup2[5][2][5]]+' '+awayF[2+3*finalLineup2[5][2][5]];
                    lineByLine061.innerHTML=awayF[1+3*finalLineup2[5][2][6]]+' '+awayF[2+3*finalLineup2[5][2][6]]+'<br>'+awayF[1+3*finalLineup2[5][2][7]]+' '+awayF[2+3*finalLineup2[5][2][7]]+'<br>'+awayF[1+3*finalLineup2[5][2][8]]+' '+awayF[2+3*finalLineup2[5][2][8]];
                    if (finalLineup2[5][0].length>=12)  {lineByLine071.innerHTML=awayF[1+3*finalLineup2[5][2][9]]+' '+awayF[2+3*finalLineup2[5][2][9]]+'<br>'+awayF[1+3*finalLineup2[5][2][10]]+' '+awayF[2+3*finalLineup2[5][2][10]]+'<br>'+awayF[1+3*finalLineup2[5][2][11]]+' '+awayF[2+3*finalLineup2[5][2][11]]}
                    else if (finalLineup2[5][0].length<12) {lineByLine071.innerHTML=awayF[1+3*finalLineup2[5][2][9]]+' '+awayF[2+3*finalLineup2[5][2][9]]+'<br>'+awayF[1+3*finalLineup2[5][2][10]]+' '+awayF[2+3*finalLineup2[5][2][10]]}
                    lineByLine141.innerHTML=lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[2][0]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[2][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[2][2]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[2][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[2][4]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[2][5];
                    lineByLine151.innerHTML=lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[2][0]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[2][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[2][2]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[2][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[2][4]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[2][5];
                    lineByLine161.innerHTML=lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[2][0]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[2][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[2][2]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[2][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[2][4]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[2][5];

                    if (finalLineup2[5][0].length>=12) {lineByLine171.innerHTML=lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[2][0]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[2][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[2][2]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[2][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[2][4]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[2][5]}
                    else if (finalLineup2[5][0].length<12) {lineByLine171.innerHTML=lineByLine3(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10])[2][0]+' '+lineByLine3(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10])[2][1]+'<br>'
                    +lineByLine3(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10])[2][2]+' '+lineByLine3(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10])[2][3]+'<br>'+
                    lineByLine3(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10])[2][4]+' '+lineByLine3(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10])[2][5]}

                    lineByLine201.innerHTML=homeF[1+3*finalLineup2[4][2][0]]+' '+homeF[2+3*finalLineup2[4][2][0]]+'<br>'+homeF[1+3*finalLineup2[4][2][1]]+' '+homeF[2+3*finalLineup2[4][2][1]]+'<br>'+homeF[1+3*finalLineup2[4][2][2]]+' '+homeF[2+3*finalLineup2[4][2][2]];
                    lineByLine221.innerHTML=lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][0]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][2]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][4]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][5];
                    
                    lineByLine241.innerHTML=lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][0]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][2]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][4]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][5];
                    lineByLine251.innerHTML=lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][0]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][2]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][4]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][5];
                    lineByLine261.innerHTML=lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][0]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][2]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][4]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][5];
                    if (finalLineup2[5][0].length>=12) {lineByLine271.innerHTML=lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][0]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][2]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][4]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][5]}
                    else if (finalLineup2[5][0].length<12) {lineByLine271.innerHTML=lineByLine3(0,finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][0]+' '+lineByLine3(0,finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][1]+'<br>'
                    +lineByLine3(0,finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][2]+' '+lineByLine3(0,finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][3]+'<br>'+
                    lineByLine3(0,finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][4]+' '+lineByLine3(0,finalLineup2[4][2][0],finalLineup2[4][2][1],finalLineup2[4][2][2],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][5]}

                    lineByLine301.innerHTML=homeF[1+3*finalLineup2[4][2][3]]+' '+homeF[2+3*finalLineup2[4][2][3]]+'<br>'+homeF[1+3*finalLineup2[4][2][4]]+' '+homeF[2+3*finalLineup2[4][2][4]]+'<br>'+homeF[1+3*finalLineup2[4][2][5]]+' '+homeF[2+3*finalLineup2[4][2][5]];
                    lineByLine321.innerHTML=lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][0]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][2]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][4]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][5];
                    lineByLine341.innerHTML=lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][0]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][2]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][4]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][5];
                    lineByLine351.innerHTML=lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][0]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][2]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][4]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][5];
                    lineByLine361.innerHTML=lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][0]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][2]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][4]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][5];
                    if (finalLineup2[5][0].length>=12) {lineByLine371.innerHTML=lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][0]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][2]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][4]+' '+lineByLine2(finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][5]}
                    else if (finalLineup2[5][0].length<12) {lineByLine371.innerHTML=
                    lineByLine3(0,finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][0]+' '+lineByLine3(0,finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][1]+'<br>'
                    +lineByLine3(0,finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][2]+' '+lineByLine3(0,finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][3]+'<br>'+
                    lineByLine3(0,finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][4]+' '+lineByLine3(0,finalLineup2[4][2][3],finalLineup2[4][2][4],finalLineup2[4][2][5],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][5]}
              
                    lineByLine401.innerHTML=homeF[1+3*finalLineup2[4][2][6]]+' '+homeF[2+3*finalLineup2[4][2][6]]+'<br>'+homeF[1+3*finalLineup2[4][2][7]]+' '+homeF[2+3*finalLineup2[4][2][7]]+'<br>'+homeF[1+3*finalLineup2[4][2][8]]+' '+homeF[2+3*finalLineup2[4][2][8]];
                    lineByLine421.innerHTML=lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][0]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][2]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][4]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][5]
                    lineByLine441.innerHTML=lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][0]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][2]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][4]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][5];
                    lineByLine451.innerHTML=lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][0]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][2]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][4]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][5];
                    lineByLine461.innerHTML=lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][0]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][2]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][4]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][5];
                    if (finalLineup2[5][0].length>=12) {lineByLine471.innerHTML=lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][0]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][2]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][4]+' '+lineByLine2(finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][5]}
                    else if (finalLineup2[5][0][2].length<12) {lineByLine471.innerHTML=lineByLine3(0,finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][0]+' '+lineByLine3(0,finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][1]+'<br>'
                    +lineByLine3(0,finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][2]+' '+lineByLine3(0,finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][3]+'<br>'+
                    lineByLine3(0,finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][4]+' '+lineByLine3(0,finalLineup2[4][2][6],finalLineup2[4][2][7],finalLineup2[4][2][8],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][5]}
      
                    if (finalLineup2[4][0].length>=12) { lineByLine501.innerHTML=homeF[1+3*finalLineup2[4][2][9]]+' '+homeF[2+3*finalLineup2[4][2][9]]+'<br>'+homeF[1+3*finalLineup2[4][2][10]]+' '+homeF[2+3*finalLineup2[4][2][10]]+'<br>'+homeF[1+3*finalLineup2[4][2][11]]+' '+homeF[2+3*finalLineup2[4][2][11]];
                    lineByLine521.innerHTML=lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][0]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][2]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][4]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[1][5];
                    lineByLine541.innerHTML=lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][0]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][2]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][4]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2])[0][5];
                    lineByLine551.innerHTML=lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][0]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][2]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][4]+' '+lineByLine2(finalLineup2[4][2][0],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5])[0][5];
                    lineByLine561.innerHTML=lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][0]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][2]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][4]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8])[0][5]
                    }
                    
                    if ((finalLineup2[4][0].length>=12)&&(finalLineup2[5][0].length>=12)) {lineByLine571.innerHTML=lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][0]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][2]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][4]+' '+lineByLine2(finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11])[0][5]
                  }
                    else if (finalLineup2[4][0].length<12) { lineByLine501.innerHTML=homeF[1+3*finalLineup2[4][2][9]]+' '+homeF[2+3*finalLineup2[4][2][9]]+'<br>'+homeF[1+3*finalLineup2[4][2][10]]+' '+homeF[2+3*finalLineup2[4][2][10]]
                    lineByLine521.innerHTML=lineByLine3(1,finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2],finalLineup2[4][2][9],finalLineup2[4][2][10])[2][0]+' '+lineByLine3(1,finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2],finalLineup2[4][2][9],finalLineup2[4][2][10])[2][1]+'<br>'
                    +lineByLine3(1,finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2],finalLineup2[4][2][9],finalLineup2[4][2][10])[2][2]+' '+lineByLine3(1,finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2],finalLineup2[4][2][9],finalLineup2[4][2][10])[2][3]+'<br>'+
                    lineByLine3(1,finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2],finalLineup2[4][2][9],finalLineup2[4][2][10])[2][4]+' '+lineByLine3(1,finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2],finalLineup2[4][2][9],finalLineup2[4][2][10])[2][5]
                    lineByLine541.innerHTML=lineByLine3(1,finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][0]+' '+lineByLine3(1,finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][1]+'<br>'
                    +lineByLine3(1,finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][2]+' '+lineByLine3(1,finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][3]+'<br>'+
                    lineByLine3(1,finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][4]+' '+lineByLine3(1,finalLineup2[5][2][0],finalLineup2[5][2][1],finalLineup2[5][2][2],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][5];
                    lineByLine551.innerHTML=lineByLine3(1,finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][0]+' '+lineByLine3(1,finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][1]+'<br>'
                    +lineByLine3(1,finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][2]+' '+lineByLine3(1,finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][3]+'<br>'+
                    lineByLine3(1,finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][4]+' '+lineByLine3(1,finalLineup2[5][2][3],finalLineup2[5][2][4],finalLineup2[5][2][5],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][5];
                    lineByLine561.innerHTML=lineByLine3(1,finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][0]+' '+lineByLine3(1,finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][1]+'<br>'
                    +lineByLine3(1,finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][2]+' '+lineByLine3(1,finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][3]+'<br>'+
                    lineByLine3(1,finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][4]+' '+lineByLine3(1,finalLineup2[5][2][6],finalLineup2[5][2][7],finalLineup2[5][2][8],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][5];
                    if (finalLineup2[5][0].length===12) {lineByLine571.innerHTML=lineByLine3(1,finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][0]+' '+lineByLine3(1,finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][1]+'<br>'
                    +lineByLine3(1,finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][2]+' '+lineByLine3(1,finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][3]+'<br>'+
                    lineByLine3(1,finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][4]+' '+lineByLine3(1,finalLineup2[5][2][9],finalLineup2[5][2][10],finalLineup2[5][2][11],finalLineup2[4][2][9],finalLineup2[4][2][10])[0][5];
                    }}

                    else if (finalLineup2[5][0].length<12) {lineByLine571.innerHTML=lineByLine3(0,finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][0]+' '+lineByLine3(0,finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][1]+'<br>'
                    +lineByLine3(0,finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][2]+' '+lineByLine3(0,finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][3]+'<br>'+
                    lineByLine3(0,finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][4]+' '+lineByLine3(0,finalLineup2[4][2][9],finalLineup2[4][2][10],finalLineup2[4][2][11],finalLineup2[5][2][9],finalLineup2[5][2][10])[0][5]}

                    lineByLine003.innerHTML='\\ '+'Away Team ->' +'<br>'+ 'Home Team'+'<br>'+'    |'; 
                    lineByLine043.innerHTML=awayF[1+3*finalLineup2[5][0][0]]+' '+awayF[2+3*finalLineup2[5][0][0]]+'<br>'+awayF[1+3*finalLineup2[5][0][1]]+' '+awayF[2+3*finalLineup2[5][0][1]]+'<br>'+awayF[1+3*finalLineup2[5][0][2]]+' '+awayF[2+3*finalLineup2[5][0][2]];
                    lineByLine053.innerHTML=awayF[1+3*finalLineup2[5][0][3]]+' '+awayF[2+3*finalLineup2[5][0][3]]+'<br>'+awayF[1+3*finalLineup2[5][0][4]]+' '+awayF[2+3*finalLineup2[5][0][4]]+'<br>'+awayF[1+3*finalLineup2[5][0][5]]+' '+awayF[2+3*finalLineup2[5][0][5]];
                    lineByLine063.innerHTML=awayF[1+3*finalLineup2[5][0][6]]+' '+awayF[2+3*finalLineup2[5][0][6]]+'<br>'+awayF[1+3*finalLineup2[5][0][7]]+' '+awayF[2+3*finalLineup2[5][0][7]]+'<br>'+awayF[1+3*finalLineup2[5][0][8]]+' '+awayF[2+3*finalLineup2[5][0][8]];
                    if (finalLineup2[5][0].length>=12)  {lineByLine073.innerHTML=awayF[1+3*finalLineup2[5][0][9]]+' '+awayF[2+3*finalLineup2[5][0][9]]+'<br>'+awayF[1+3*finalLineup2[5][0][10]]+' '+awayF[2+3*finalLineup2[5][0][10]]+'<br>'+awayF[1+3*finalLineup2[5][0][11]]+' '+awayF[2+3*finalLineup2[5][0][11]];}
                    else {lineByLine073.innerHTML=awayF[1+3*finalLineup2[5][0][9]]+' '+awayF[2+3*finalLineup2[5][0][9]]+'<br>'+awayF[1+3*finalLineup2[5][0][10]]+' '+awayF[2+3*finalLineup2[5][0][10]]}
                    lineByLine143.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[2][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[2][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[2][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[2][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[2][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[2][5];
                   
                    lineByLine153.innerHTML=lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[2][0]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[2][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[2][2]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[2][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[2][4]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[2][5]; 
                   
                    lineByLine163.innerHTML=lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[2][0]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[2][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[2][2]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[2][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[2][4]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[2][5];

                    if (finalLineup2[5][0].length>=12) {lineByLine173.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[2][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[2][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[2][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[2][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[2][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[2][5]}
                    else if (finalLineup2[5][0].length<12) {lineByLine173.innerHTML=lineByLine3(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10])[2][0]+' '+lineByLine3(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10])[2][1]+'<br>'
                    +lineByLine3(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10])[2][2]+' '+lineByLine3(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10])[2][3]+'<br>'+
                    lineByLine3(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10])[2][4]+' '+lineByLine3(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10])[2][5]}

                    lineByLine203.innerHTML=homeF[1+3*finalLineup2[4][0][0]]+' '+homeF[2+3*finalLineup2[4][0][0]]+'<br>'+homeF[1+3*finalLineup2[4][0][1]]+' '+homeF[2+3*finalLineup2[4][0][1]]+'<br>'+homeF[1+3*finalLineup2[4][0][2]]+' '+homeF[2+3*finalLineup2[4][0][2]];
                    lineByLine223.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][5];
                    lineByLine243.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][5];
                    lineByLine253.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][5],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][5];
                    lineByLine263.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][5];

                    if (finalLineup2[5][0].length>=12) {lineByLine273.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][5]}
                    else if (finalLineup2[5][0].length<12) {lineByLine273.innerHTML=lineByLine3(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][0]+' '+lineByLine3(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][1]+'<br>'
                    +lineByLine3(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][2]+' '+lineByLine3(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][3]+'<br>'+
                    lineByLine3(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][4]+' '+lineByLine3(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][5]}

                    lineByLine303.innerHTML=homeF[1+3*finalLineup2[4][0][3]]+' '+homeF[2+3*finalLineup2[4][0][3]]+'<br>'+homeF[1+3*finalLineup2[4][0][4]]+' '+homeF[2+3*finalLineup2[4][0][4]]+'<br>'+homeF[1+3*finalLineup2[4][0][5]]+' '+homeF[2+3*finalLineup2[4][0][5]];
                    lineByLine323.innerHTML=lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][0]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][2]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][4]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][5];
                    lineByLine343.innerHTML=lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][0]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][2]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][4]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][5];
                    lineByLine353.innerHTML=lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][0]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][2]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][4]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][5],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][5];
                    lineByLine363.innerHTML=lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][0]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][2]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][4]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][5];

                    if (finalLineup2[5][0].length>=12) {lineByLine373.innerHTML=lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][0]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][2]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][4]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][5]}
                    else if (finalLineup2[5][0].length<12) {lineByLine373.innerHTML=lineByLine3(0,finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][0]+' '+lineByLine3(0,finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][1]+'<br>'
                    +lineByLine3(0,finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][2]+' '+lineByLine3(0,finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][3]+'<br>'+
                    lineByLine3(0,finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][4]+' '+lineByLine3(0,finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][5]}

                    lineByLine403.innerHTML=homeF[1+3*finalLineup2[4][0][6]]+' '+homeF[2+3*finalLineup2[4][0][6]]+'<br>'+homeF[1+3*finalLineup2[4][0][7]]+' '+homeF[2+3*finalLineup2[4][0][7]]+'<br>'+homeF[1+3*finalLineup2[4][0][8]]+' '+homeF[2+3*finalLineup2[4][0][8]];
                    // lineByLine403.innerHTML=homeF[1+3*finalLineup2[4][0][6]]+' '+homeF[2+3*finalLineup2[4][0][6]]+'<br>'+homeF[1+3*finalLineup2[4][0][7]]+' '+homeF[2+3*finalLineup2[4][0][7]]+'<br>'+homeF[1+3*finalLineup2[4][0][8]]+' '+homeF[2+3*finalLineup2[4][0][8]];
                    // lineByLine403.innerHTML=homeF[1+3*finalLineup2[4][0][6]]+' '+homeF[2+3*finalLineup2[4][0][6]]+'<br>'+homeF[1+3*finalLineup2[4][0][7]]+' '+homeF[2+3*finalLineup2[4][0][7]]+'<br>'+homeF[1+3*finalLineup2[4][0][8]]+' '+homeF[2+3*finalLineup2[4][0][8]];
                    // lineByLine423.innerHTML=lineByLine1(0,2,0,0)[1][0]+' '+lineByLine1(0,2,0,0,0)[1][1]+'<br>'+lineByLine1(0,2,0,1)[1][2]+' '+lineByLine1(0,2,0,1)[1][3]+'<br>'+lineByLine1(0,2,0,2)[1][4]+' '+lineByLine1(0,2,0,2)[1][5];
                    // lineByLine443.innerHTML=lineByLine1(0,2,0,0)[0][0]+' '+lineByLine1(0,2,0,0)[0][1]+'<br>'+lineByLine1(0,2,0,1)[0][2]+' '+lineByLine1(0,2,0,1)[0][3]+' '+'<br>'+lineByLine1(0,2,0,2)[0][4]+' '+lineByLine1(0,2,0,2)[0][5];
                    // lineByLine453.innerHTML=lineByLine1(0,2,1,0)[0][0]+' '+lineByLine1(0,2,1,0)[0][1]+'<br>'+lineByLine1(0,2,1,1)[0][2]+' '+lineByLine1(0,2,1,1)[0][3]+' '+'<br>'+lineByLine1(0,2,1,2)[0][4]+' '+lineByLine1(0,2,1,2)[0][5];
                    // lineByLine463.innerHTML=lineByLine1(0,2,2,0)[0][0]+' '+lineByLine1(0,2,2,0)[0][1]+'<br>'+lineByLine1(0,2,2,1)[0][2]+' '+lineByLine1(0,2,2,1)[0][3]+' '+'<br>'+lineByLine1(0,2,2,2)[0][4]+' '+lineByLine1(0,2,2,2)[0][5];
                    lineByLine423.innerHTML=lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][0]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][2]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][4]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][5];
                    lineByLine443.innerHTML=lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][0]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][2]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][4]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][5];
                    lineByLine453.innerHTML=lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][0]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][2]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][4]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][5];
                    lineByLine463.innerHTML=lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][0]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][2]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][4]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][5]
                    
                    if (finalLineup2[5][0].length>=12) {lineByLine473.innerHTML=lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][0]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][2]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][4]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][5]}
                    else if (finalLineup2[5][0].length<12) {lineByLine473.innerHTML=lineByLine3(0,finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][0]+' '+lineByLine3(0,finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][1]+'<br>'
                    +lineByLine3(0,finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][2]+' '+lineByLine3(0,finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][3]+'<br>'+
                    lineByLine3(0,finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][4]+' '+lineByLine3(0,finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10])[0][5]}
                    // if (finalLineup2[5][0].length>=12) {lineByLine473.innerHTML=lineByLine1(0,2,3,0)[0][0]+' '+lineByLine1(0,2,3,0)[0][1]+' '+'<br>'+lineByLine1(0,2,3,1)[0][2]+' '+lineByLine1(0,2,3,1)[0][3]+' '+'<br>'+lineByLine1(0,2,3,2)[0][4]+' '+lineByLine1(0,2,3,2)[0][5]+' '}

                    if (finalLineup2[4][0].length>=12) { lineByLine503.innerHTML=homeF[1+3*finalLineup2[4][0][9]]+' '+homeF[2+3*finalLineup2[4][0][9]]+'<br>'+homeF[1+3*finalLineup2[4][0][10]]+' '+homeF[2+3*finalLineup2[4][0][10]]+'<br>'+homeF[1+3*finalLineup2[4][0][11]]+' '+homeF[2+3*finalLineup2[4][0][11]];
                    lineByLine523.innerHTML=lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][0]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][2]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][4]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[1][5];
                    lineByLine543.innerHTML=lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][0]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][2]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][4]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][5];
                    lineByLine553.innerHTML=lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][0]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][2]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][4]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][5];
                    lineByLine563.innerHTML=lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][0]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][2]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][4]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][5]
                    }
                  if ((finalLineup2[4][0].length>=12)&&(finalLineup2[5][0].length>=12)) {lineByLine573.innerHTML=lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][0]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][1]+'<br>'
                    +lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][2]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][4]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][5]
                  }                                                        
                  
                  else if (finalLineup2[4][0].length<12) { lineByLine503.innerHTML=homeF[1+3*finalLineup2[4][0][9]]+' '+homeF[2+3*finalLineup2[4][0][9]]+'<br>'+homeF[1+3*finalLineup2[4][0][10]]+' '+homeF[2+3*finalLineup2[4][0][10]]
                    lineByLine523.innerHTML=lineByLine3(1,finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2],finalLineup2[4][0][9],finalLineup2[4][0][10])[2][0]+' '+lineByLine3(1,finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2],finalLineup2[4][0][9],finalLineup2[4][0][10])[2][1]+'<br>'
                    +lineByLine3(1,finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2],finalLineup2[4][0][9],finalLineup2[4][0][10])[2][2]+' '+lineByLine3(1,finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2],finalLineup2[4][0][9],finalLineup2[4][0][10])[2][3]+'<br>'+
                    lineByLine3(1,finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2],finalLineup2[4][0][9],finalLineup2[4][0][10])[2][4]+' '+lineByLine3(1,finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2],finalLineup2[4][0][9],finalLineup2[4][0][10])[2][5]
                    lineByLine543.innerHTML=lineByLine3(1,finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][0]+' '+lineByLine3(1,finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][1]+'<br>'
                    +lineByLine3(1,finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][2]+' '+lineByLine3(1,finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][3]+'<br>'+
                    lineByLine3(1,finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][4]+' '+lineByLine3(1,finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][5];
                    lineByLine553.innerHTML=lineByLine3(1,finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][0]+' '+lineByLine3(1,finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][1]+'<br>'
                    +lineByLine3(1,finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][2]+' '+lineByLine3(1,finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][3]+'<br>'+
                    lineByLine3(1,finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][4]+' '+lineByLine3(1,finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][5];
                    lineByLine563.innerHTML=lineByLine3(1,finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][0]+' '+lineByLine3(1,finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][1]+'<br>'
                    +lineByLine3(1,finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][2]+' '+lineByLine3(1,finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][3]+'<br>'+
                    lineByLine3(1,finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][4]+' '+lineByLine3(1,finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][5];
                    if (finalLineup2[5][0].length===12) {lineByLine573.innerHTML=lineByLine3(1,finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][0]+' '+lineByLine3(1,finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][1]+'<br>'
                    +lineByLine3(1,finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][2]+' '+lineByLine3(1,finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][3]+'<br>'+
                    lineByLine3(1,finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][4]+' '+lineByLine3(1,finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11],finalLineup2[4][0][9],finalLineup2[4][0][10])[0][5];
                    }}
                  }); // end second .then shifts
              }); // end second .then standings;
          }); // end second .then gamecenter;
      } // end displayGameData 
    } // end second .then from getinputvalue
    ); 
} // end getInput Value function 
