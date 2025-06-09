var scheduleContent = document.getElementById('schedule'); var gameId; var inputVal = '2021'; standingsArray = []; linesArray10=[]
// lines below will allow user to select date then to select game on that date
function getInputValue() {
  var inputVal = document.getElementById('datepicker').value; var date = inputVal.split('/');
  var formatted = date[2]+'-'+date[0]+'-'+date[1]; 
  var requestURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/schedule/' + formatted;
  fetch(requestURL, {"method": "GET", "headers": {}
  })
    .then(function (response) {return response.json()})
    .then(function (data) {console.log('I am in schedule then');
      var numberOfGames = data.gameWeek[0].games.length; scheduleContent.textContent = '';
      for (var i = 0; i < numberOfGames; i++) {
        var gameName = document.createElement('button');
        gameName.setAttribute('id', 'game' + i); var idx = gameName.getAttribute('id');
        gameName.innerHTML = 'Game ' + i + ': ' + data.gameWeek[0].games[i].awayTeam.abbrev + ' vs ' + data.gameWeek[0].games[i].homeTeam.abbrev;
        document.getElementById('schedule').appendChild(gameName); gameName.addEventListener('click', displayGameData);
      }

      function displayGameData(event) {idx = event.currentTarget; idxString = event.currentTarget.textContent;
        idxArray = idxString.split(':'); idxNumber = idxArray[0].split(' '); gameNumber = idxNumber[1];
        const gameId = data.gameWeek[0].games[gameNumber].id; console.log(gameId);
        var requestURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/gamecenter/' + gameId + '/boxscore';
        fetch(requestURL, {
          "method": "GET", "headers": {}
        })
          .then(function (response) { return response.json() })
          .then(function (data) {const gameInfo = document.createElement('section'); gameInfo.setAttribute('id', 'gameInfo');
            document.getElementById('schedule').appendChild(gameInfo);
            var standingsURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/standings/' + formatted;
            fetch(standingsURL, {
              "method": "GET", "headers": {}
            })
              .then(function (response) { return response.json() })
              .then(function (data_standings) { console.log(data_standings.standings);
                for (i = 0; i < data_standings.standings.length; i++) { if (data_standings.standings[i].teamAbbrev.default === data.awayTeam.abbrev) {
                    standingsArray.push(data_standings.standings[i].wins, data_standings.standings[i].losses, data_standings.standings[i].otLosses)
                    console.log(i, data.awayTeam.abbrev, data_standings.standings[i].wins, data_standings.standings[i].losses, data_standings.standings[i].otLosses)}
                  else if (data_standings.standings[i].teamAbbrev.default === data.homeTeam.abbrev) {
                    standingsArray.push(data.homeTeam.abbrev, data_standings.standings[i].wins, data_standings.standings[i].losses, data_standings.standings[i].otLosses)
                    console.log(i, data.homeTeam.abbrev, data_standings.standings[i].wins, data_standings.standings[i].losses, data_standings.standings[i].otLosses)
                  }
                  else (console.log('No Such Abbrev'))}
                var gameTitle = document.createElement('h2'); gameTitle.textContent = '';
                gameTitle.innerHTML = 'You are watching stats for ' + data.awayTeam.abbrev + standingsArray[0] + ' W ' + standingsArray[1] + ' L ' + standingsArray[2] + ' O at ' + data.homeTeam.abbrev + standingsArray[3] + ' W ' + standingsArray[4] + ' L ' + standingsArray[5] + ' O game';
                document.getElementById('gameInfo').appendChild(gameTitle);
                const homeF = []; const awayF = []; const homeD = []; const awayD = []; const homeG = []; const awayG = []; const playerIdArray = []; // let playerIdeObject = {a: 1}; const hasKeyId = true;
                var obj = data.playerByGameStats.homeTeam.forwards; var keys = Object.keys(obj); playerIdeObject = {};
                for (i = 0; i < keys.length; i++) {
                  var val = obj[keys[i]]; homeF.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []]);
                  keyId = val.playerId; playerIdeObject[keyId] = []}
                var obj = data.playerByGameStats.homeTeam.defense; var keys = Object.keys(obj);
                for (i = 0; i < keys.length; i++) {
                  var val = obj[keys[i]]; homeD.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []])
                  keyId = val.playerId; playerIdeObject[keyId] = []}
                var obj = data.playerByGameStats.homeTeam.goalies; var keys = Object.keys(obj);
                for (i = 0; i < keys.length; i++) {
                  var val = obj[keys[i]]; homeG.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []])
                  keyId = val.playerId; playerIdeObject[keyId] = []}
                var obj = data.playerByGameStats.awayTeam.forwards; var keys = Object.keys(obj);
                for (i = 0; i < keys.length; i++) {var val = obj[keys[i]]; awayF.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []])
                  keyId = val.playerId; playerIdeObject[keyId] = []}
                var obj = data.playerByGameStats.awayTeam.defense; var keys = Object.keys(obj);
                for (i = 0; i < keys.length; i++) {var val = obj[keys[i]]; awayD.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []]);
                  keyId = val.playerId; playerIdeObject[keyId] = []}
                var obj = data.playerByGameStats.awayTeam.goalies; var keys = Object.keys(obj);
                for (i = 0; i < keys.length; i++) {var val = obj[keys[i]]; awayG.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []]);
                  keyId = val.playerId; playerIdeObject[keyId] = []}
                // console.log(homeF, homeD, homeG, awayF, awayD, awayG, playerIdArray)

                var shiftsURL = 'https://cors-anywhere.herokuapp.com/https://api.nhle.com/stats/rest/en/shiftcharts?cayenneExp=gameId=' + gameId;
                fetch(shiftsURL, { "method": "GET", "headers": {} })
                  .then(function (response) {return response.json()})
                  .then(function (data_shifts) {
                    console.log('I am in second shift then', data_shifts);
                    for (i = 0; i < data_shifts.data.length; i++) {
                      if ((data_shifts.data[i].typeCode === 517) && (data_shifts.data[i].period < 4)) {playerOrder = playerIdArray.indexOf(data_shifts.data[i].playerId);
                        shiftStart = data_shifts.data[i].startTime; shiftStart1 = shiftStart.split(':'); minutes = Number(shiftStart1[0]);
                        seconds = Number(shiftStart1[1]); shiftStart2 = minutes * 60 + seconds;
                        shiftEnd = data_shifts.data[i].endTime; shiftEnd1 = shiftEnd.split(':'); minutes = Number(shiftEnd1[0]);
                        seconds = Number(shiftEnd1[1]); shiftEnd2 = minutes * 60 + seconds;
                        playerIdArray[playerOrder + 1][data_shifts.data[i].period - 1].push(shiftStart2, shiftEnd2)}}
                    for (i = 0; i < playerIdArray.length / 2; i++) {currentKey = playerIdArray[2 * i]; playerIdeObject[currentKey] = playerIdArray[2 * i + 1]}
                    // console.log(playerIdArray, playerIdeObject);

                    dArray = [[], []];
                    for (i = 0; i < playerIdArray.length / 2; i++) {for (j = 0; j < homeD.length / 3; j++) { if (playerIdArray[2 * i] === homeD[3 * j]) { dArray[0].push(playerIdArray[2 * i + 1]) } }
                      for (j = 0; j < awayD.length / 3; j++) { if (playerIdArray[2 * i] === awayD[3 * j]) { dArray[1].push(playerIdArray[2 * i + 1]) }}}
                    dArray2 = [[],[]]; // dArray2 is not used yet but will be used later as I switch to object instead of array
                    for (i = 0; i < Object.keys(playerIdeObject).length; i++) {for (j = 0; j < homeD.length/3; j++){if (Object.keys(playerIdeObject)[i]==homeD[3*j]){//console.log(i, j, Object.keys(playerIdeObject)[i]);
                        dArray2[0].push(Object.values(playerIdeObject)[i])}}
                      for (j = 0; j < awayD.length/3; j++){if (Object.keys(playerIdeObject)[i]==awayD[3*j]){console.log(i, j, Object.keys(playerIdeObject)[i]);
                        dArray2[1].push(Object.values(playerIdeObject)[i])}}} 
                        
                        fArray = [[], []];
                    for (i = 0; i < playerIdArray.length / 2; i++) {for (j = 0; j < homeF.length / 3; j++) { if (playerIdArray[2 * i] === homeF[3 * j]) { fArray[0].push(playerIdArray[2 * i + 1]) } }
                      for (j = 0; j < awayF.length / 3; j++) { if (playerIdArray[2 * i] === awayF[3 * j]) { fArray[1].push(playerIdArray[2 * i + 1]) }}}                    
                    console.log('dArray', dArray, 'dArray2', dArray2, 'fArray', fArray); pairingsArray = [[], [], [], [], [], []]; linesArray = [[], [], [], [], [], []];
                    
                    dArrayTemp = [[[],[],[]],[[],[],[]]]; fArrayTemp = [[[],[],[]],[[],[],[]]];
                    for (i = 0; i < 2; i++) { for (j = 0; j < dArray[i].length; j++) { for (k = 0; k < 3; k++) {dArrayTemp[i][k] = dArrayTemp[i][k].concat(dArray[i][j][k])}}}
                    for (i = 0; i < 2; i++) { for (j = 0; j < fArray[i].length; j++) { for (k = 0; k < 3; k++) {fArrayTemp[i][k] = fArrayTemp[i][k].concat(fArray[i][j][k])}}}
                    console.log(dArrayTemp, fArrayTemp);
                     // new attempt to create 5x5 loop
                     dArrayTemp2 = [[[],[],[]],[[],[],[]]]; dArrayTemp3 = [[[],[],[]],[[],[],[]]]; fArrayTemp2 = [[[],[],[]],[[],[],[]]]; fArrayTemp3 = [[[],[],[]],[[],[],[]]]; 
                     for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) {for (k = 0; k < 1200; k++) {dArrayTemp2[i][j].push(0); fArrayTemp2[i][j].push(0)}}}
                     for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) for (k = 0; k < dArrayTemp[i][j].length/2; k++) 
                   {for (l = dArrayTemp[i][j][2*k]; l < dArrayTemp[i][j][2*k + 1]; l++) {dArrayTemp2[i][j][l] = dArrayTemp2[i][j][l] + 1}}}
                   for (i = 0; i < 2; i++) {for (j = 0; j < 3; j++) for (k = 0; k < fArrayTemp[i][j].length/2; k++) 
                   {for (l = fArrayTemp[i][j][2*k]; l < fArrayTemp[i][j][2*k + 1]; l++) {fArrayTemp2[i][j][l] = fArrayTemp2[i][j][l] + 1}}}
                   
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
                     tempArray1=fiveOnFive3[i][j].slice(0,2*k-1); tempArray2=fiveOnFive3[i][j].slice(2*k+1);
                     fiveOnFive3[i][j]=tempArray1.concat(tempArray2)
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
                                // console.log(h,i,j,k,tempTime);
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
                        }} // end k, j, i and h loop periods

                        console.log('shiftsPair', shiftsPair, 'linesArray', linesArray); // linesArray2 = [[],[],[],[],[],[]]; 
                        linesArray7 = [[[],[],[]],[[],[],[]],[],[],[],[]]
      
                          // h is team i is period
                          // linesArray2 was for 1st period only but linesArray7 for 3 periods line 232 or 233 has console. If statement makes sure that linesArray7[h][i] is not empty even if no line played together for 101s or more
                          for (h=0;h<2;h++) {for (i=0;i<3;i++) {for (j=0;j<linesArray[3*h].length/5;j++) {if (linesArray[3*h+i][5*j]>100) {
                          linesArray7[h][i].push(linesArray[3*h+i][5*j], linesArray[3*h+i][5*j+1], linesArray[3*h+i][5*j+2], linesArray[3*h+i][5*j+3], linesArray[3*h+i][5*j+4])
                          }}
                      if ((j=linesArray[3*h].length/5-1)&&(linesArray7[h][i].length===0)) {tempIndex=Math.max(...linesArray[3*h+i])                        
                        tempIndex2=linesArray[3*h+i].indexOf(tempIndex)
                        console.log('linesarray7 is empty', 'h', h, 'i', i, linesArray7[h][i], tempIndex, tempIndex2)
                        linesArray7[h][i].push(linesArray[3*h+i][tempIndex2],linesArray[3*h+i][tempIndex2+1],linesArray[3*h+i][tempIndex2+2],linesArray[3*h+i][tempIndex2+3],linesArray[3*h+i][tempIndex2+4])
                      }
                      }}
                          console.log('linesArray7', linesArray7);
                          // to add condition above to make sure linesarray7 has something

                    // adding home team defense to screen 
                    firstDNumber.innerHTML = homeD[1] + ' ' + homeD[2]; secondDNumber.innerHTML = homeD[4] + ' ' + homeD[5]; thirdDNumber.innerHTML = homeD[7] + ' ' + homeD[8];
                    firstD1.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X'; secondD2.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X'; thirdD3.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X'; forthD4.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X';
                    var firstD2 = document.createElement('p3'); var firstD3 = document.createElement('p2'); var firstD4 = document.createElement('p3'); var firstD5 = document.createElement('p2');
                    firstD2.innerHTML = pairingsArray[0][1] + ' sh ' + pairingsArray[0][0] + ' sec ' + '<br>' + pairingsArray[1][1] + ' sh ' + pairingsArray[1][0] + ' sec ' + '<br>' + pairingsArray[2][1] + ' sh ' + pairingsArray[2][0] + ' sec ';
                    firstD3.innerHTML = pairingsArray[0][3] + ' sh ' + pairingsArray[0][2] + ' sec ' + '<br>' + pairingsArray[1][3] + ' sh ' + pairingsArray[1][2] + ' sec ' + '<br>' + pairingsArray[2][3] + ' sh ' + pairingsArray[2][2] + ' sec ';
                    firstD4.innerHTML = pairingsArray[0][5] + ' sh ' + pairingsArray[0][4] + ' sec ' + '<br>' + pairingsArray[1][5] + ' sh ' + pairingsArray[1][4] + ' sec ' + '<br>' + pairingsArray[2][5] + ' sh ' + pairingsArray[2][4] + ' sec ';
                    firstD5.innerHTML = pairingsArray[0][7] + ' sh ' + pairingsArray[0][6] + ' sec ' + '<br>' + pairingsArray[1][7] + ' sh ' + pairingsArray[1][6] + ' sec ' + '<br>' + pairingsArray[2][7] + ' sh ' + pairingsArray[2][6] + ' sec ';
                    document.getElementById('firstD2').appendChild(firstD2); document.getElementById('firstD3').appendChild(firstD3); document.getElementById('firstD4').appendChild(firstD4); document.getElementById('firstD5').appendChild(firstD5);
                    secondD1.innerHTML = pairingsArray[0][1] + ' sh ' + pairingsArray[0][0] + ' sec ' + '<br>' + pairingsArray[1][1] + ' sh ' + pairingsArray[1][0] + ' sec ' + '<br>' + pairingsArray[2][1] + ' sh ' + pairingsArray[2][0] + ' sec ';
                    var secondD3 = document.createElement('p3'); var secondD4 = document.createElement('p2'); var secondD5 = document.createElement('p3');
                    secondD3.innerHTML = pairingsArray[0][2 * homeD.length / 3 - 1] + ' sh ' + pairingsArray[0][2 * homeD.length / 3 - 2] + ' sec ' + '<br>' + pairingsArray[1][2 * homeD.length / 3 - 1] + ' sh ' + pairingsArray[1][2 * homeD.length / 3 - 2] + ' sec ' + '<br>' + pairingsArray[2][2 * homeD.length / 3 - 1] + ' sh ' + pairingsArray[2][2 * homeD.length / 3 - 2] + ' sec ';
                    secondD4.innerHTML = pairingsArray[0][2 * homeD.length / 3 + 1] + ' sh ' + pairingsArray[0][2 * homeD.length / 3] + ' sec ' + '<br>' + pairingsArray[1][2 * homeD.length / 3 + 1] + ' sh ' + pairingsArray[1][2 * homeD.length / 3] + ' sec ' + '<br>' + pairingsArray[2][2 * homeD.length / 3 + 1] + ' sh ' + pairingsArray[2][2 * homeD.length / 3] + ' sec ';
                    secondD5.innerHTML = pairingsArray[0][2 * homeD.length / 3 + 3] + ' sh ' + pairingsArray[0][2 * homeD.length / 3 + 2] + ' sec ' + '<br>' + pairingsArray[1][2 * homeD.length / 3 + 3] + ' sh ' + pairingsArray[1][2 * homeD.length / 3 + 2] + ' sec ' + '<br>' + pairingsArray[2][2 * homeD.length / 3 + 3] + ' sh ' + pairingsArray[2][2 * homeD.length / 3 + 2] + ' sec ';
                    thirdD1.innerHTML = pairingsArray[0][3] + ' sh ' + pairingsArray[0][2] + ' sec ' + '<br>' + pairingsArray[1][3] + ' sh ' + pairingsArray[1][2] + ' sec ' + '<br>' + pairingsArray[2][3] + ' sh ' + pairingsArray[2][2] + ' sec ';
                    thirdD2.innerHTML = secondD3.innerHTML; var thirdD4 = document.createElement('p3'); var thirdD5 = document.createElement('p2');
                    thirdD4.innerHTML = pairingsArray[0][4 * homeD.length / 3 - 5] + ' sh ' + pairingsArray[0][4 * homeD.length / 3 - 6] + ' sec ' + '<br>' + pairingsArray[1][4 * homeD.length / 3 - 5] + ' sh ' + pairingsArray[1][4 * homeD.length / 3 - 6] + ' sec ' + '<br>' + pairingsArray[2][4 * homeD.length / 3 - 5] + ' sh ' + pairingsArray[2][4 * homeD.length / 3 - 6] + ' sec ';
                    thirdD5.innerHTML = pairingsArray[0][4 * homeD.length / 3 - 3] + ' sh ' + pairingsArray[0][4 * homeD.length / 3 - 4] + ' sec ' + '<br>' + pairingsArray[1][4 * homeD.length / 3 - 3] + ' sh ' + pairingsArray[1][4 * homeD.length / 3 - 4] + ' sec ' + '<br>' + pairingsArray[2][4 * homeD.length / 3 - 3] + ' sh ' + pairingsArray[2][4 * homeD.length / 3 - 4] + ' sec ';
                    forthDNumber.innerHTML = homeD[10] + ' ' + homeD[11]; forthD2.innerHTML = secondD4.innerHTML; forthD3.innerHTML = thirdD4.innerHTML; forthD1.innerHTML = firstD4.innerHTML; var forthD5 = document.createElement('p3');
                    forthD5.innerHTML = pairingsArray[0][6 * homeD.length / 3 - 11] + ' sh ' + pairingsArray[0][6 * homeD.length / 3 - 12] + ' sec ' + '<br>' + pairingsArray[1][6 * homeD.length / 3 - 11] + ' sh ' + pairingsArray[1][6 * homeD.length / 3 - 12] + ' sec ' + '<br>' + pairingsArray[2][6 * homeD.length / 3 - 11] + ' sh ' + pairingsArray[2][6 * homeD.length / 3 - 12] + ' sec ';
                    fifthDNumber.innerHTML = homeD[13] + ' ' + homeD[14];
                    fifthD1.innerHTML = firstD5.innerHTML; fifthD2.innerHTML = secondD5.innerHTML; fifthD3.innerHTML = thirdD5.innerHTML; fifthD4.innerHTML = forthD5.innerHTML; fifthD5.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X';
                    document.getElementById('secondD3').appendChild(secondD3); document.getElementById('secondD4').appendChild(secondD4); document.getElementById('secondD5').appendChild(secondD5); document.getElementById('thirdD4').appendChild(thirdD4);
                    document.getElementById('thirdD5').appendChild(thirdD5); document.getElementById('forthD5').appendChild(forthD5);

                    if (homeD.length >= 18) { 
                      var firstD6 = document.createElement('p3'); var secondD6 = document.createElement('p2'); var thirdD6 = document.createElement('p3'); var forthD6 = document.createElement('p2'); var fifthD6 = document.createElement('p3');
                      sixthD6.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X'; sixthDNumber.innerHTML = homeD[16] + ' ' + homeD[17];
                      firstD6.innerHTML = pairingsArray[0][9] + ' sh ' + pairingsArray[0][8] + ' sec ' + '<br>' + pairingsArray[1][9] + ' sh ' + pairingsArray[1][8] + ' sec ' + '<br>' + pairingsArray[2][9] + ' sh ' + pairingsArray[2][8] + ' sec ';
                      secondD6.innerHTML = pairingsArray[0][2 * homeD.length / 3 + 5] + ' sh ' + pairingsArray[0][2 * homeD.length / 3 + 4] + ' sec ' + '<br>' + pairingsArray[1][2 * homeD.length / 3 + 5] + ' sh ' + pairingsArray[1][2 * homeD.length / 3 + 4] + ' sec ' + '<br>' + pairingsArray[2][2 * homeD.length / 3 + 5] + ' sh ' + pairingsArray[2][2 * homeD.length / 3 + 4] + ' sec ';
                      thirdD6.innerHTML = pairingsArray[0][4 * homeD.length / 3 - 1] + ' sh ' + pairingsArray[0][4 * homeD.length / 3 - 2] + ' sec ' + '<br>' + pairingsArray[1][4 * homeD.length / 3 - 1] + ' sh ' + pairingsArray[1][4 * homeD.length / 3 - 2] + ' sec ' + '<br>' + pairingsArray[2][4 * homeD.length / 3 - 1] + ' sh ' + pairingsArray[2][4 * homeD.length / 3 - 2] + ' sec ';
                      forthD6.innerHTML = pairingsArray[0][6 * homeD.length / 3 - 9] + ' sh ' + pairingsArray[0][6 * homeD.length / 3 - 10] + ' sec ' + '<br>' + pairingsArray[1][6 * homeD.length / 3 - 9] + ' sh ' + pairingsArray[1][6 * homeD.length / 3 - 10] + ' sec ' + '<br>' + pairingsArray[2][6 * homeD.length / 3 - 9] + ' sh ' + pairingsArray[2][6 * homeD.length / 3 - 10] + ' sec ';
                      fifthD6.innerHTML = pairingsArray[0][8 * homeD.length / 3 - 19] + ' sh ' + pairingsArray[0][8 * homeD.length / 3 - 20] + ' sec ' + '<br>' + pairingsArray[1][8 * homeD.length / 3 - 19] + ' sh ' + pairingsArray[1][8 * homeD.length / 3 - 20] + ' sec ' + '<br>' + pairingsArray[2][8 * homeD.length / 3 - 19] + ' sh ' + pairingsArray[2][8 * homeD.length / 3 - 20] + ' sec ';
                      sixthD1.innerHTML = firstD6.innerHTML; sixthD2.innerHTML = secondD6.innerHTML; sixthD3.innerHTML = thirdD6.innerHTML; sixthD4.innerHTML = forthD6.innerHTML; sixthD5.innerHTML = fifthD6.innerHTML;
                      document.getElementById('firstD6').appendChild(firstD6); document.getElementById('secondD6').appendChild(secondD6); document.getElementById('thirdD6').appendChild(thirdD6); document.getElementById('forthD6').appendChild(forthD6); document.getElementById('fifthD6').appendChild(fifthD6);
                    } // end if six D men 

                    if (homeD.length == 21) {
                      var firstD7 = document.createElement('p2'); var secondD7 = document.createElement('p3'); var thirdD7 = document.createElement('p2'); var forthD7 = document.createElement('p3'); var fifthD7 = document.createElement('p2'); var sixthD7 = document.createElement('p3');
                      seventhD7.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X'; seventhDNumber.innerHTML = homeD[19] + ' ' + homeD[20];
                      firstD7.innerHTML = pairingsArray[0][11] + ' sh ' + pairingsArray[0][10] + ' sec ' + '<br>' + pairingsArray[1][11] + ' sh ' + pairingsArray[1][10] + ' sec ' + '<br>' + pairingsArray[2][9] + ' sh ' + pairingsArray[2][8] + ' sec ';
                      secondD7.innerHTML = pairingsArray[0][21] + ' sh ' + pairingsArray[0][20] + ' sec ' + '<br>' + pairingsArray[1][21] + ' sh ' + pairingsArray[1][20] + ' sec ' + '<br>' + pairingsArray[2][21] + ' sh ' + pairingsArray[2][20] + ' sec ';
                      thirdD7.innerHTML = pairingsArray[0][29] + ' sh ' + pairingsArray[0][28] + ' sec ' + '<br>' + pairingsArray[1][29] + ' sh ' + pairingsArray[1][28] + ' sec ' + '<br>' + pairingsArray[2][29] + ' sh ' + pairingsArray[2][28] + ' sec ';
                      forthD7.innerHTML = pairingsArray[0][35] + ' sh ' + pairingsArray[0][34] + ' sec ' + '<br>' + pairingsArray[1][35] + ' sh ' + pairingsArray[1][34] + ' sec ' + '<br>' + pairingsArray[2][35] + ' sh ' + pairingsArray[2][34] + ' sec ';
                      fifthD7.innerHTML = pairingsArray[0][39] + ' sh ' + pairingsArray[0][38] + ' sec ' + '<br>' + pairingsArray[1][39] + ' sh ' + pairingsArray[1][38] + ' sec ' + '<br>' + pairingsArray[2][39] + ' sh ' + pairingsArray[2][38] + ' sec ';
                      sixthD7.innerHTML = pairingsArray[0][41] + ' sh ' + pairingsArray[0][40] + ' sec ' + '<br>' + pairingsArray[1][41] + ' sh ' + pairingsArray[1][40] + ' sec ' + '<br>' + pairingsArray[2][41] + ' sh ' + pairingsArray[2][40] + ' sec ';
                      seventhD1.innerHTML = firstD7.innerHTML; seventhD2.innerHTML = secondD7.innerHTML; seventhD3.innerHTML = thirdD7.innerHTML; seventhD4.innerHTML = forthD7.innerHTML; seventhD5.innerHTML = fifthD7.innerHTML; seventhD6.innerHTML = sixthD7.innerHTML;
                      document.getElementById('firstD7').appendChild(firstD7); document.getElementById('secondD7').appendChild(secondD7); document.getElementById('thirdD7').appendChild(thirdD7); document.getElementById('forthD7').appendChild(forthD7); document.getElementById('fifthD7').appendChild(fifthD7); document.getElementById('sixthD7').appendChild(sixthD7);
                    } // end if seven D men

                    // adding away team defense to screen
                    firstDNumberA.innerHTML = awayD[1] + ' ' + awayD[2]; secondDNumberA.innerHTML = awayD[4] + ' ' + awayD[5]; thirdDNumberA.innerHTML = awayD[7] + ' ' + awayD[8];
                    firstD1A.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X'; secondD2A.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X'; thirdD3A.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X'; forthD4A.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X';
                    var firstD2A = document.createElement('p3'); var firstD3A = document.createElement('p2'); var firstD4A = document.createElement('p3'); var firstD5A = document.createElement('p2');
                    firstD2A.innerHTML = pairingsArray[3][1] + ' sh ' + pairingsArray[3][0] + ' sec ' + '<br>' + pairingsArray[4][1] + ' sh ' + pairingsArray[4][0] + ' sec ' + '<br>' + pairingsArray[5][1] + ' sh ' + pairingsArray[5][0] + ' sec ';
                    firstD3A.innerHTML = pairingsArray[3][3] + ' sh ' + pairingsArray[3][2] + ' sec ' + '<br>' + pairingsArray[4][3] + ' sh ' + pairingsArray[4][2] + ' sec ' + '<br>' + pairingsArray[5][3] + ' sh ' + pairingsArray[5][2] + ' sec ';
                    firstD4A.innerHTML = pairingsArray[3][5] + ' sh ' + pairingsArray[3][4] + ' sec ' + '<br>' + pairingsArray[4][5] + ' sh ' + pairingsArray[4][4] + ' sec ' + '<br>' + pairingsArray[5][5] + ' sh ' + pairingsArray[5][4] + ' sec ';
                    firstD5A.innerHTML = pairingsArray[3][7] + ' sh ' + pairingsArray[3][6] + ' sec ' + '<br>' + pairingsArray[4][7] + ' sh ' + pairingsArray[4][6] + ' sec ' + '<br>' + pairingsArray[5][7] + ' sh ' + pairingsArray[5][6] + ' sec ';
                    document.getElementById('firstD2A').appendChild(firstD2A); document.getElementById('firstD3A').appendChild(firstD3A); document.getElementById('firstD4A').appendChild(firstD4A); document.getElementById('firstD5A').appendChild(firstD5A);
                    secondD1A.innerHTML = firstD2A.innerHTML;
                    var secondD3A = document.createElement('p3'); var secondD4A = document.createElement('p2'); var secondD5A = document.createElement('p3');
                    secondD3A.innerHTML = pairingsArray[3][2 * awayD.length / 3 - 1] + ' sh ' + pairingsArray[3][2 * awayD.length / 3 - 2] + ' sec ' + '<br>' + pairingsArray[4][2 * awayD.length / 3 - 1] + ' sh ' + pairingsArray[4][2 * awayD.length / 3 - 2] + ' sec ' + '<br>' + pairingsArray[5][2 * awayD.length / 3 - 1] + ' sh ' + pairingsArray[5][2 * awayD.length / 3 - 2] + ' sec ';
                    secondD4A.innerHTML = pairingsArray[3][2 * awayD.length / 3 + 1] + ' sh ' + pairingsArray[3][2 * awayD.length / 3] + ' sec ' + '<br>' + pairingsArray[4][2 * awayD.length / 3 + 1] + ' sh ' + pairingsArray[4][2 * awayD.length / 3] + ' sec ' + '<br>' + pairingsArray[5][2 * awayD.length / 3 + 1] + ' sh ' + pairingsArray[5][2 * awayD.length / 3] + ' sec ';
                    secondD5A.innerHTML = pairingsArray[3][2 * awayD.length / 3 + 3] + ' sh ' + pairingsArray[3][2 * awayD.length / 3 + 2] + ' sec ' + '<br>' + pairingsArray[4][2 * awayD.length / 3 + 3] + ' sh ' + pairingsArray[4][2 * awayD.length / 3 + 2] + ' sec ' + '<br>' + pairingsArray[5][2 * awayD.length / 3 + 3] + ' sh ' + pairingsArray[5][2 * awayD.length / 3 + 2] + ' sec ';
                    thirdD1A.innerHTML = firstD3A.innerHTML; thirdD2A.innerHTML = secondD3A.innerHTML; var thirdD4A = document.createElement('p3'); var thirdD5A = document.createElement('p2');
                    thirdD4A.innerHTML = pairingsArray[3][4 * awayD.length / 3 - 5] + ' sh ' + pairingsArray[3][4 * awayD.length / 3 - 6] + ' sec ' + '<br>' + pairingsArray[4][4 * awayD.length / 3 - 5] + ' sh ' + pairingsArray[4][4 * awayD.length / 3 - 6] + ' sec ' + '<br>' + pairingsArray[5][4 * awayD.length / 3 - 5] + ' sh ' + pairingsArray[5][4 * awayD.length / 3 - 6] + ' sec ';
                    thirdD5A.innerHTML = pairingsArray[3][4 * awayD.length / 3 - 3] + ' sh ' + pairingsArray[3][4 * awayD.length / 3 - 4] + ' sec ' + '<br>' + pairingsArray[4][4 * awayD.length / 3 - 3] + ' sh ' + pairingsArray[4][4 * awayD.length / 3 - 4] + ' sec ' + '<br>' + pairingsArray[5][4 * awayD.length / 3 - 3] + ' sh ' + pairingsArray[5][4 * awayD.length / 3 - 4] + ' sec ';
                    forthDNumberA.innerHTML = awayD[10] + ' ' + awayD[11]; forthD2A.innerHTML = secondD4A.innerHTML; forthD3A.innerHTML = thirdD4A.innerHTML; forthD1A.innerHTML = firstD4A.innerHTML; var forthD5A = document.createElement('p3');
                    forthD5A.innerHTML = pairingsArray[3][6 * awayD.length / 3 - 11] + ' sh ' + pairingsArray[3][6 * awayD.length / 3 - 12] + ' sec ' + '<br>' + pairingsArray[4][6 * awayD.length / 3 - 11] + ' sh ' + pairingsArray[4][6 * awayD.length / 3 - 12] + ' sec ' + '<br>' + pairingsArray[5][6 * awayD.length / 3 - 11] + ' sh ' + pairingsArray[5][6 * awayD.length / 3 - 12] + ' sec ';
                    fifthDNumberA.innerHTML = awayD[13] + ' ' + awayD[14];
                    fifthD1A.innerHTML = firstD5A.innerHTML; fifthD2A.innerHTML = secondD5A.innerHTML; fifthD3A.innerHTML = thirdD5A.innerHTML; fifthD4A.innerHTML = forthD5A.innerHTML; fifthD5A.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X';
                    document.getElementById('secondD3A').appendChild(secondD3A); document.getElementById('secondD4A').appendChild(secondD4A); document.getElementById('secondD5A').appendChild(secondD5A); document.getElementById('thirdD4A').appendChild(thirdD4A);
                    document.getElementById('thirdD5A').appendChild(thirdD5A); document.getElementById('forthD5A').appendChild(forthD5A);

                    if (awayD.length >= 18) {
                      var firstD6A = document.createElement('p3'); var secondD6A = document.createElement('p2'); var thirdD6A = document.createElement('p3'); var forthD6A = document.createElement('p2'); var fifthD6A = document.createElement('p3');
                      sixthD6A.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X'; sixthDNumberA.innerHTML = awayD[16] + ' ' + awayD[17];
                      firstD6A.innerHTML = pairingsArray[3][9] + ' sh ' + pairingsArray[3][8] + ' sec ' + '<br>' + pairingsArray[4][9] + ' sh ' + pairingsArray[4][8] + ' sec ' + '<br>' + pairingsArray[5][9] + ' sh ' + pairingsArray[5][8] + ' sec ';
                      secondD6A.innerHTML = pairingsArray[3][2 * awayD.length / 3 + 5] + ' sh ' + pairingsArray[3][2 * awayD.length / 3 + 4] + ' sec ' + '<br>' + pairingsArray[4][2 * awayD.length / 3 + 5] + ' sh ' + pairingsArray[4][2 * awayD.length / 3 + 4] + ' sec ' + '<br>' + pairingsArray[5][2 * awayD.length / 3 + 5] + ' sh ' + pairingsArray[5][2 * awayD.length / 3 + 4] + ' sec ';
                      thirdD6A.innerHTML = pairingsArray[3][4 * awayD.length / 3 - 1] + ' sh ' + pairingsArray[3][4 * awayD.length / 3 - 2] + ' sec ' + '<br>' + pairingsArray[4][4 * awayD.length / 3 - 1] + ' sh ' + pairingsArray[4][4 * awayD.length / 3 - 2] + ' sec ' + '<br>' + pairingsArray[5][4 * awayD.length / 3 - 1] + ' sh ' + pairingsArray[5][4 * awayD.length / 3 - 2] + ' sec ';
                      forthD6A.innerHTML = pairingsArray[3][6 * awayD.length / 3 - 9] + ' sh ' + pairingsArray[3][6 * awayD.length / 3 - 10] + ' sec ' + '<br>' + pairingsArray[4][6 * awayD.length / 3 - 9] + ' sh ' + pairingsArray[4][6 * awayD.length / 3 - 10] + ' sec ' + '<br>' + pairingsArray[5][6 * awayD.length / 3 - 9] + ' sh ' + pairingsArray[5][6 * awayD.length / 3 - 10] + ' sec ';
                      fifthD6A.innerHTML = pairingsArray[3][8 * awayD.length / 3 - 19] + ' sh ' + pairingsArray[3][8 * awayD.length / 3 - 20] + ' sec ' + '<br>' + pairingsArray[4][8 * awayD.length / 3 - 19] + ' sh ' + pairingsArray[4][8 * awayD.length / 3 - 20] + ' sec ' + '<br>' + pairingsArray[5][8 * awayD.length / 3 - 19] + ' sh ' + pairingsArray[5][8 * awayD.length / 3 - 20] + ' sec ';
                      sixthD1A.innerHTML = firstD6A.innerHTML; sixthD2A.innerHTML = secondD6A.innerHTML; sixthD3A.innerHTML = thirdD6A.innerHTML; sixthD4A.innerHTML = forthD6A.innerHTML; sixthD5A.innerHTML = fifthD6A.innerHTML;
                      document.getElementById('firstD6A').appendChild(firstD6A); document.getElementById('secondD6A').appendChild(secondD6A); document.getElementById('thirdD6A').appendChild(thirdD6A); document.getElementById('forthD6A').appendChild(forthD6A); document.getElementById('fifthD6A').appendChild(fifthD6A);
                    } // end if six D men away 

                    if (awayD.length == 21) {
                      var firstD7A = document.createElement('p2'); var secondD7A = document.createElement('p3'); var thirdD7A = document.createElement('p2'); var forthD7A = document.createElement('p3'); var fifthD7A = document.createElement('p2'); var sixthD7A = document.createElement('p3');
                      seventhD7A.innerHTML = 'X' + '<br>' + 'X' + '<br>' + 'X'; seventhDNumberA.innerHTML = awayD[19] + ' ' + awayD[20];
                      firstD7A.innerHTML = pairingsArray[3][11] + ' sh ' + pairingsArray[3][10] + ' sec ' + '<br>' + pairingsArray[4][11] + ' sh ' + pairingsArray[4][10] + ' sec ' + '<br>' + pairingsArray[5][9] + ' sh ' + pairingsArray[5][8] + ' sec ';
                      secondD7A.innerHTML = pairingsArray[3][21] + ' sh ' + pairingsArray[3][20] + ' sec ' + '<br>' + pairingsArray[4][21] + ' sh ' + pairingsArray[4][20] + ' sec ' + '<br>' + pairingsArray[5][21] + ' sh ' + pairingsArray[5][20] + ' sec ';
                      thirdD7A.innerHTML = pairingsArray[3][29] + ' sh ' + pairingsArray[3][28] + ' sec ' + '<br>' + pairingsArray[4][29] + ' sh ' + pairingsArray[4][28] + ' sec ' + '<br>' + pairingsArray[5][29] + ' sh ' + pairingsArray[5][28] + ' sec ';
                      forthD7A.innerHTML = pairingsArray[3][35] + ' sh ' + pairingsArray[3][34] + ' sec ' + '<br>' + pairingsArray[4][35] + ' sh ' + pairingsArray[4][34] + ' sec ' + '<br>' + pairingsArray[5][35] + ' sh ' + pairingsArray[5][34] + ' sec ';
                      fifthD7A.innerHTML = pairingsArray[3][39] + ' sh ' + pairingsArray[3][38] + ' sec ' + '<br>' + pairingsArray[4][39] + ' sh ' + pairingsArray[4][38] + ' sec ' + '<br>' + pairingsArray[5][39] + ' sh ' + pairingsArray[5][38] + ' sec ';
                      sixthD7A.innerHTML = pairingsArray[3][41] + ' sh ' + pairingsArray[3][40] + ' sec ' + '<br>' + pairingsArray[4][41] + ' sh ' + pairingsArray[4][40] + ' sec ' + '<br>' + pairingsArray[5][41] + ' sh ' + pairingsArray[5][40] + ' sec ';
                      seventhD1A.innerHTML = firstD7A.innerHTML; seventhD2A.innerHTML = secondD7A.innerHTML; seventhD3A.innerHTML = thirdD7A.innerHTML; seventhD4A.innerHTML = forthD7A.innerHTML; seventhD5A.innerHTML = fifthD7A.innerHTML; seventhD6A.innerHTML = sixthD7A.innerHTML;
                      document.getElementById('firstD7A').appendChild(firstD7A); document.getElementById('secondD7A').appendChild(secondD7A); document.getElementById('thirdD7A').appendChild(thirdD7A); document.getElementById('forthD7A').appendChild(forthD7A); document.getElementById('fifthD7A').appendChild(fifthD7A); document.getElementById('sixthD7A').appendChild(sixthD7A);
                    } // end if seven D men away and end of adding DMen to display cycles
                     tempArray3 = [homeF.length/3, awayF.length/3]; linesArray4 = [[],[]]; finalLineup2=[[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]],[[],[],[]]];                  

            // finalLineup2 loop; index 0 and 1 are lines that spent 100s or more in a given period index 2 and 3 are players that appeared more than once in index 0 or 1 
            // and index 5 6 is to verify all players that actually played in lines from index 0 1 reason for that is PHI lines where #11 played on 2 lines leaving one partner behind...
            for (h=0;h<2;h++) {for (i=0;i<3;i++) {for (j=0;j<linesArray7[h][i].length/5;j++) {finalLineup2[h][i].push(linesArray7[h][i][5*j+2], linesArray7[h][i][5*j+3], linesArray7[h][i][5*j+4])}}}
            for (h=0;h<2;h++) {for (i=0;i<3;i++) {for (j=0;j<finalLineup2[h][i].length;j++) {for (k=j+1;k<finalLineup2[h][i].length;k++) {
              if (finalLineup2[h][i][j]===finalLineup2[h][i][k]) { if (finalLineup2[h+2][i].includes(finalLineup2[h][i][j])) {}
            else {finalLineup2[h+2][i].push(finalLineup2[h][i][j])}}
          }}
          // next 2 lines of code determines if there are unique lines if finalLineup2[h+2] is not empty if it is, lines are pushed to finalLineup2[h+4]
          for (j=0;j<finalLineup2[h][i].length/3;j++) {if ((finalLineup2[h+2][i].includes(finalLineup2[h][i][3*j]))||(finalLineup2[h+2][i].includes(finalLineup2[h][i][3*j+1]))||(finalLineup2[h+2][i].includes(finalLineup2[h][i][3*j+2]))){}
          else {finalLineup2[h+4][i].push(finalLineup2[h][i][3*j], finalLineup2[h][i][3*j+1], finalLineup2[h][i][3*j+2])}}
          if (finalLineup2[h+4][i].length===12) {}
          // .length?          
          else if (finalLineup2[h+4][i].length===9) {for (j=0;j<tempArray3[h];j++){
            if (finalLineup2[h][i].includes(j)){}
          else finalLineup2[h+4][i].push(j)}}
          else if (finalLineup2[h+4][i].length===6) {console.log('Two lines', 'team', h, 'period', i, finalLineup2[h+4][i]); linesArray4 = [[[],[],[]],[[],[],[]]];
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
        // console.log(linesArray5[h][i], Math.max(...linesArray5[h][i]), tempIndex, tempIndex2, linesArray5[h][i][tempIndex+2]);
        finalLineup2[h+4][i].push(linesArray5[h][i][tempIndex+2], linesArray5[h][i][tempIndex+3], linesArray5[h][i][tempIndex+4]);
        for (j=3*h;j<3+3*h;j++) {for (k=0;k<linesArray[j].length/5;k++) {if ((finalLineup2[h+4][i].includes(linesArray[j][5*k+2]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+3]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+4]))){}
        else (linesArray6[h][i].push(linesArray[j][5*k], linesArray[j][5*k+1], linesArray[j][5*k+2], linesArray[j][5*k+3], linesArray[j][5*k+4]))}}
        tempIndex = linesArray6[h][i].indexOf(Math.max(...linesArray6[h][i])); tempIndex2 = tempIndex%(linesArray6[h][i].length/3); 
        // console.log(linesArray6[h][i], Math.max(...linesArray6[h][i]), tempIndex, tempIndex2);
        finalLineup2[h+4][i].push(linesArray6[h][i][tempIndex+2], linesArray6[h][i][tempIndex+3], linesArray6[h][i][tempIndex+4]);
        for (j=0; j<tempArray3[h]; j++) {if (finalLineup2[h+4][i].includes(j)){} else finalLineup2[h+4][i].push(j)}
        console.log(finalLineup2[h][i], linesArray6[h][i][tempIndex+2], linesArray6[h][i][tempIndex+3], linesArray6[h][i][tempIndex+4]);
      }
      else if (finalLineup2[h+4][i].length===0) {  tempIndex9=i; tempIndex10=h;
     tempIndex=Math.max(...linesArray[3*h+i]); tempIndex2=linesArray[3*h+i].indexOf(tempIndex)
      console.log('Zero lines', 'team', h, 'period', i, linesArray[3*h+i], 'tempIndex ', tempIndex, 'tempIndex2 ', tempIndex2)
    tempArray4=[];
      console.log(linesArray7[h][i]);
      for (j=0;j<linesArray7[h][i].length/5;j++)
              {tempArray4.push(linesArray7[h][i][5*j])}
              tempIndex3=Math.max(...tempArray4);
              tempIndex4=tempArray4.indexOf(tempIndex); 
              console.log('tempArray4 ', tempArray4, 'tempIndex3 ', tempIndex3, 'tempIndex4 ', tempIndex4);
              finalLineup2[h+4][i].push(linesArray7[h][i][5*tempIndex4+2], linesArray7[h][i][5*tempIndex4+3], linesArray7[h][i][5*tempIndex4+4])
               linesArray8 = []; linesArray9 = []; 
        for (j=3*h;j<3*h+3;j++) {for (k=0;k<linesArray[j].length/5;k++) {
          if((finalLineup2[h+4][i].includes(linesArray[j][5*k+2]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+3]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+4]))) {}
          else {linesArray8.push(linesArray[j][5*k], linesArray[j][5*k+1], linesArray[j][5*k+2], linesArray[j][5*k+3], linesArray[j][5*k+4])}
        }}
      const start = i*linesArray8.length/3; const end = (i+1)*linesArray8.length/3;
      tempIndex = Math.max(...linesArray8.slice(start,end)); tempIndex2 =linesArray8.indexOf(Math.max(...linesArray8.slice(start,end)));
      console.log(linesArray8, 'tempIndex', tempIndex, 'tempIndex2', tempIndex2, 'i', i, 'h', h);
      finalLineup2[4+h][i].push(linesArray8[tempIndex2+2],linesArray8[tempIndex2+3],linesArray8[tempIndex2+4])
      for (j=3*h;j<3*h+3;j++) {for (k=0;k<linesArray[j].length/5;k++) {
        if((finalLineup2[h+4][i].includes(linesArray[j][5*k+2]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+3]))||(finalLineup2[h+4][i].includes(linesArray[j][5*k+4]))) {}
        else {linesArray9.push(linesArray[j][5*k], linesArray[j][5*k+1], linesArray[j][5*k+2], linesArray[j][5*k+3], linesArray[j][5*k+4])}
      }}
    linesArray9=linesArray9.slice(i*linesArray9.length/3, (i+1)*linesArray9.length/3);
    } // end if length === 0
      else {console.log('case to be added it is not 0 or 1 or 2 or 3 or 4 lines', 'h', h, 'i', i)}
      }} // i, h loops end finalLineup2      
      
      if (typeof linesArray9 != 'undefined') {
      tempIndex7 = Math.max(...linesArray9); tempIndex8 =linesArray9.indexOf(Math.max(...linesArray9));
      console.log('linesArray9', linesArray9, 'tempIndex7', tempIndex7, 'tempIndex8', tempIndex8, 'i', tempIndex9, 'h', tempIndex10);
      linesArray10.push(linesArray9[tempIndex8+2],linesArray9[tempIndex8+3],linesArray9[tempIndex8+4]);
      console.log(linesArray10, 'finallineup6', finalLineup2[tempIndex10+4][tempIndex9]);
      if (finalLineup2[tempIndex10+4][tempIndex9].length===6) {finalLineup2[tempIndex10+4][tempIndex9].push(linesArray9[tempIndex8+2],linesArray9[tempIndex8+3],linesArray9[tempIndex8+4])}
      console.log('finallineup9', finalLineup2[tempIndex10+4][tempIndex9], finalLineup2[tempIndex10+4][tempIndex9].length, tempArray3);
      if (finalLineup2[tempIndex10+4][tempIndex9].length===9) {
        for (i=0;i<tempArray3[tempIndex10];i++) {if (finalLineup2[tempIndex10+4][tempIndex9].includes(i)) {}
        else  {finalLineup2[tempIndex10+4][tempIndex9].push(i)}}}
      }
      console.log('finalLineup2', finalLineup2);

      // did not use i because i is for periods not currently used
      oldLines=[[],[]]; newLines=[[],[]];
      for (h=4;h<6;h++) {for (j=0;j<finalLineup2[h][0].length/3;j++) 
        {for(k=j;k<finalLineup2[h][0].length/3;k++) {if(finalLineup2[h][0][3*j]===finalLineup2[h][2][3*j])
          { if(finalLineup2[h][0][3*j]===finalLineup2[h][2][3*k]) { if ((finalLineup2[h][0][3*j+1]===finalLineup2[h][2][3*k+1])&&(finalLineup2[h][0][3*j+2]===finalLineup2[h][2][3*k+2])) {oldLines[h-4].push(finalLineup2[h][0][3*j])}
          else {newLines[h-4].push(finalLineup2[h][2][3*k], finalLineup2[h][2][3*k+1], finalLineup2[h][2][3*k+2])}
        }}}
    }}
      console.log(oldLines, newLines);
            
            tempArray3=[]; // home
            for (i=0;i<finalLineup2[4][0].length/3;i++) {tempArray3.push(finalLineup2[4][0][3*i])}
            console.log('tempArray3 home', tempArray3)
            for (i=0;i<finalLineup2[4][0].length/3;i++) {if (tempArray3.includes(finalLineup2[4][2][3*i])) { tempIndex5=finalLineup2[4][0].indexOf(finalLineup2[4][2][3*i]);
              console.log(tempIndex5, finalLineup2[4][2][3*i]);
              if ((finalLineup2[4][2][3*i+1]===finalLineup2[4][0][tempIndex5+1])&&(finalLineup2[4][2][3*i+2]===finalLineup2[4][0][tempIndex5+2])) {console.log('old line home', i, finalLineup2[4][2].indexOf(finalLineup2[4][2][3*i]))}
              else {console.log('new line home',finalLineup2[4][2][3*i], finalLineup2[4][2][3*i+1], finalLineup2[4][2][3*i+2])}  }
             else {console.log('new line home as well', finalLineup2[4][2][3*i], finalLineup2[4][2][3*i+1], finalLineup2[4][2][3*i+2])}
            }

            tempArray3=[]; const newLines1=[]; // away
            for (i=0;i<finalLineup2[5][0].length/3;i++) {tempArray3.push(finalLineup2[5][0][3*i])}
            console.log('tempArray3 away', tempArray3)
            for (i=0;i<finalLineup2[5][0].length/3;i++) {if (tempArray3.includes(finalLineup2[5][2][3*i])) { tempIndex55=finalLineup2[5][0].indexOf(finalLineup2[5][2][3*i]);
              if ((finalLineup2[5][2][3*i+1]===finalLineup2[5][0][tempIndex55+1])&&(finalLineup2[5][2][3*i+2]===finalLineup2[5][0][tempIndex55+2])) {console.log('old line away', i, finalLineup2[5][2].indexOf(finalLineup2[5][2][3*i]))}
              else {console.log('new line away',finalLineup2[5][2][3*i], finalLineup2[5][2][3*i+1], finalLineup2[5][2][3*i+2])
            newLines1[i]=new Object();
              newLines1[i].lineNumber=i;
            newLines1[i].line=[finalLineup2[5][2][3*i], finalLineup2[5][2][3*i+1], finalLineup2[5][2][3*i+2]]}  }
             else {console.log('new line away as well', finalLineup2[5][2][3*i], finalLineup2[5][2][3*i+1], finalLineup2[5][2][3*i+2])
             newLines1[i]=new Object();
             newLines1[i].lineNumber=i;
             newLines1[i].line=[finalLineup2[5][2][3*i], finalLineup2[5][2][3*i+1], finalLineup2[5][2][3*i+2]]
            }
            console.log(newLines1)
            if (typeof newLines1[i]==='object') {
              if (i===0) { lineByLine081.innerHTML=awayF[1+3*finalLineup2[5][2][0]]+' '+awayF[2+3*finalLineup2[5][2][0]]+'<br>'+awayF[1+3*finalLineup2[5][2][1]]+' '+awayF[2+3*finalLineup2[5][2][1]]+'<br>'+awayF[1+3*finalLineup2[5][2][2]]+' '+awayF[2+3*finalLineup2[5][2][2]]}
              else if (i===1) { lineByLine091.innerHTML=awayF[1+3*finalLineup2[5][2][3]]+' '+awayF[2+3*finalLineup2[5][2][3]]+'<br>'+awayF[1+3*finalLineup2[5][2][4]]+' '+awayF[2+3*finalLineup2[5][2][4]]+'<br>'+awayF[1+3*finalLineup2[5][2][5]]+' '+awayF[2+3*finalLineup2[5][2][5]]}
              else if (i===2) { lineByLine091a.innerHTML=awayF[1+3*finalLineup2[5][2][6]]+' '+awayF[2+3*finalLineup2[5][2][6]]+'<br>'+awayF[1+3*finalLineup2[5][2][7]]+' '+awayF[2+3*finalLineup2[5][2][7]]+'<br>'+awayF[1+3*finalLineup2[5][2][8]]+' '+awayF[2+3*finalLineup2[5][2][8]]}
              else if (i===3) {lineByLine091b.innerHTML=awayF[1+3*finalLineup2[5][2][9]]+' '+awayF[2+3*finalLineup2[5][2][9]]+'<br>'+awayF[1+3*finalLineup2[5][2][10]]+' '+awayF[2+3*finalLineup2[5][2][10]]+'<br>'+awayF[1+3*finalLineup2[5][2][11]]+' '+awayF[2+3*finalLineup2[5][2][11]]}
            }
          }
          for (i=0;i<finalLineup2[5][0].length/3;i++) {console.log(newLines1[i], typeof newLines1[i])}

          linesNewAndOld=[[],[]]; tempArray3=[[],[]];
          for (h=0;h<2;h++) {for (i=0;i<finalLineup2[h+4][0].length/3;i++) {tempArray3[h].push(finalLineup2[h+4][0][3*i])
          newLine2=new Object();
          newLine2.lineNumber=i;
          newLine2.line=[finalLineup2[h+4][0][3*i], finalLineup2[h+4][0][3*i+1], finalLineup2[5][0][3*i+2]]
          linesNewAndOld[h].push(newLine2)
          }}
          console.log(linesNewAndOld, tempArray3)
          
          for (h=0;h<2;h++) {
          for (i=0;i<finalLineup2[h+4][0].length/3;i++) {if (tempArray3[h].includes(finalLineup2[h+4][2][3*i])) {
            tempIndex56=finalLineup2[h+4][0].indexOf(finalLineup2[h+4][2][3*i]);
            if ((finalLineup2[h+4][2][3*i+1]===finalLineup2[h+4][0][tempIndex56+1])&&(finalLineup2[h+4][2][3*i+2]===finalLineup2[h+4][0][tempIndex56+2])) 
            {console.log('old line again', tempIndex56, h);
            linesNewAndOld[h][tempIndex56/3].position='old'}
            else { console.log('tempIndex56', tempIndex56, finalLineup2[h+4][2][3*i])
              newLine2=new Object();
              newLine2.line=[finalLineup2[h+4][2][3*i], finalLineup2[h+4][2][3*i+1], finalLineup2[h+4][2][3*i+2]];
              newLine2.position='new';
              linesNewAndOld[h].push(newLine2)
              linesNewAndOld[h][tempIndex56/3].position='updated'
            }
          }
        else if (!tempArray3[h].includes(finalLineup2[h+4][2][3*i])) 
        {console.log('to update', finalLineup2[h+4][2][3*i])
        // temporary deleted lines from next to 481
        //   newLine2=new Object();
        // // newLine2.lineNumber=i;
        // newLine2.line=[finalLineup2[h+4][2][3*i], finalLineup2[h+4][2][3*i+1], finalLineup2[h+4][2][3*i+2]];
        // newLine2.position='new';
        // linesNewAndOld[h].push(newLine2)
        // linesNewAndOld[h][tempIndex56/3].position='updated'
        // for (j=0;j<finalLineup2[h+4][0].length;j++) {
        //   tempIndex57=finalLineup2[h+4][0].indexOf(finalLineup2[h+4][2][3*i])
        //   tempIndex58=Math.floor(tempIndex57/3);
        //   console.log(tempIndex57, tempIndex58);
        //   linesNewAndOld[h][tempIndex58].position='updated'          
        // }
      }
        }}
        console.log(linesNewAndOld);
            
            // script to be added here to plot only new lines in 3rd to monitor 5 is away team 4 is home team
            for (i=0;i<finalLineup2[5][0].length/3;i++) {for (j=0;j<finalLineup2[5][0].length/3;j++) {if((finalLineup2[5][0][3*i]===finalLineup2[5][0][3*j])&&(finalLineup2[5][0][3*i+1]===finalLineup2[5][0][3*j+1])&&(finalLineup2[5][0][3*i+2]===finalLineup2[5][0][3*j+2])) {}
          else (console.log('to update line away'))}}
          for (i=0;i<finalLineup2[4][0].length/3;i++) {for (j=0;j<finalLineup2[4][0].length/3;j++) {if((finalLineup2[4][0][3*i]===finalLineup2[4][0][3*j])&&(finalLineup2[4][0][3*i+1]===finalLineup2[4][0][3*j+1])&&(finalLineup2[4][0][3*i+2]===finalLineup2[4][0][3*j+2])) {}
          else (console.log('to update line home'))}}

                    function lineNumber(h,i,j,k) {topFLimit = (1-h)*(homeF.length)/3 + h*(awayF.length)/3; // h may be 0 or 1 only!
                    if (topFLimit===12) {firstPart=[0,55,100,136,164,185,200,210,216,219]}
                    else if (topFLimit===11) {firstPart=[0,45,81,109,130,145,155,161,164]}
                    secondPart = (topFLimit-1-i)*(j-1-i); sum=0;
                    for (l=0;l<j-i;l++) {sum=sum+l}
                      return firstPart[i]+secondPart-sum+k-1-j} // end function lineNumber it is never used but planned to check is line is new
                  
                      console.log('fArray', fArray)
                      // shiftsLine1 structure: index 0,1,2 is for two players out of line for h team, 3,4,5 is entire line together for this line; 6,7,8 is for two players then 9,10,11 for entire line of 1-h team 
                      // this function is being replaced by lineByLine2
                    function lineByLine1(h,f,j,i) {shiftsLine1=[]; for (p=0;p<14;p++) {shiftsLine1.push([])} shiftsLine1[13]=[[],[]]
                    
                    for (n=0;n<3;n++) {// n is player in a line but i is period
                     //f is line number 0,1,2,3, j is opposite team line number 0,1,2,3, h is 0 or 1 home away team 
                    // console.log(finalLineup2[4+h][i][3*f])
                    for (l=0;l<fArray[h][finalLineup2[4+h][i][3*f]][n].length/2;l++) { for (m=0;m<fArray[h][finalLineup2[4+h][i][3*f+1]][n].length/2;m++) {if ((fArray[h][finalLineup2[4+h][i][3*f+1]][n][2*m]>=fArray[h][finalLineup2[4+h][i][3*f]][n][2*l]) && (fArray[h][finalLineup2[4+h][i][3*f+1]][n][2*m]<=fArray[h][finalLineup2[4+h][i][3*f]][n][2*l+1]))
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
                    for (l=0;l<shiftsLine1[6+n].length/2;l++) { for (m=0;m<fArray[1-h][finalLineup2[5-h][i][3*j+2]][n].length/2;m++) {if ((fArray[1-h][finalLineup2[5-h][i][3*j+2]][n][2*m]>=shiftsLine1[6+n][2*l]) && (fArray[1-h][finalLineup2[5-h][i][3*j+2]][n][2*m]<=shiftsLine1[6+n][2*l+1]))
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
                    return shiftsLine1[13]} // end function lineByLine1
              
                    // h is team, i is period number qrs are players on h team tuv are players on 1-h team
                    // shiftsLine2 structure: [0...2] F pair q,r, [3...5] F line q,r,s played together time for home team over 3 periods, [6...8] F pair t,u, [9...11] F line t,u,v away team played together away team
                    // [12] shifts by period line q,r,s played against line t,u,v, [13] total time and number of shifts
                    function lineByLine2(q,r,s,t,u,v) {shiftsLine2=[]; for (p=0;p<15;p++) {shiftsLine2.push([])} shiftsLine2[13]=[[],[],[]]
                    
                    for (n=0;n<3;n++) {// n is the period but i is period
                     //f is line number 0,1,2,3, j is opposite team line number 0,1,2,3, h is 0 or 1 home away team 
                    for (l=0;l<fArray[0][q][n].length/2;l++) { for (m=0;m<fArray[0][r][n].length/2;m++) {if ((fArray[0][r][n][2*m]>=fArray[0][q][n][2*l])&&(fArray[0][r][n][2*m]<=fArray[0][q][n][2*l+1]))
                    {if (fArray[0][r][n][2*m+1]>=fArray[0][q][n][2*l+1]) {shiftsLine2[n].push(fArray[0][r][n][2*m], fArray[0][q][n][2*l+1]) }
                    else { shiftsLine2[n].push(fArray[0][r][n][2*m], fArray[0][r][n][2*m+1]) }}
                    else if ((fArray[0][r][n][2*m]<=fArray[0][q][n][2*l])&&(fArray[0][r][n][2*m+1]>=fArray[0][q][n][2*l])) {
                      if (fArray[0][r][n][2*m+1]>=fArray[0][q][n][2*l+1]) { shiftsLine2[n].push(fArray[0][q][n][2*l], fArray[0][q][n][2*l+1]) }
                      else {shiftsLine2[n].push(fArray[0][q][n][2*l], fArray[0][r][n][2*m+1])}}
                    }} // end first m,l loop 
                    // start second l,m loop
                    for (l=0;l<shiftsLine2[n].length/2;l++) { for (m=0;m<fArray[0][s][n].length/2;m++) {if ((fArray[0][s][n][2*m]>=shiftsLine2[n][2*l])&&(fArray[0][s][n][2*m]<=shiftsLine2[n][2*l+1]))
                    {if (fArray[0][s][n][2*m+1]>=shiftsLine2[n][2*l+1]) {shiftsLine2[n+3].push(fArray[0][s][n][2*m], shiftsLine2[n][2*l+1]) }
                      else { shiftsLine2[n+3].push(fArray[0][s][n][2*m], fArray[0][s][n][2*m+1]) }}
                      else if ((fArray[0][s][n][2*m]<=shiftsLine2[n][2*l])&&(fArray[0][s][n][2*m+1]>=shiftsLine2[n][2*l])) {
                      if (fArray[0][s][n][2*m+1]>=shiftsLine2[n][2*l+1]) { shiftsLine2[n+3].push(shiftsLine2[n][2*l], shiftsLine2[n][2*l+1]) }
                      else {shiftsLine2[n+3].push(shiftsLine2[n][2*l], fArray[0][s][n][2*m+1])}}
                    }} // end second m,l loop 
                    for (l=0;l<fArray[1][t][n].length/2;l++) { for (m=0;m<fArray[1][u][n].length/2;m++) {if ((fArray[1][u][n][2*m]>=fArray[1][t][n][2*l])&&(fArray[1][u][n][2*m]<=fArray[1][t][n][2*l+1]))
                    {if (fArray[1][u][n][2*m+1]>=fArray[1][t][n][2*l+1]) {shiftsLine2[6+n].push(fArray[1][u][n][2*m], fArray[1][t][n][2*l+1]) }
                    else { shiftsLine2[6+n].push(fArray[1][u][n][2*m], fArray[1][u][n][2*m+1]) }}
                    else if ((fArray[1][u][n][2*m]<=fArray[1][t][n][2*l])&&(fArray[1][u][n][2*m+1]>=fArray[1][t][n][2*l])) {
                    if (fArray[1][u][n][2*m+1]>=fArray[1][t][n][2*l+1]) { shiftsLine2[6+n].push(fArray[1][t][n][2*l], fArray[1][t][n][2*l+1]) }
                     else {shiftsLine2[6+n].push(fArray[1][t][n][2*l], fArray[1][u][n][2*m+1])}}
                    }} // end first m,l loop
                    // start second l,m loop
                    for (l=0;l<shiftsLine2[6+n].length/2;l++) { for (m=0;m<fArray[1][v][n].length/2;m++) {if ((fArray[1][v][n][2*m]>=shiftsLine2[6+n][2*l])&&(fArray[1][v][n][2*m]<=shiftsLine2[6+n][2*l+1]))
                    {if (fArray[1][v][n][2*m+1]>=shiftsLine2[6+n][2*l+1]) {shiftsLine2[9+n].push(fArray[1][v][n][2*m], shiftsLine2[6+n][2*l+1]) }
                    else { shiftsLine2[9+n].push(fArray[1][v][n][2*m], fArray[1][v][n][2*m+1]) }}
                    else if ((fArray[1][v][n][2*m]<=shiftsLine2[6+n][2*l])&&(fArray[1][v][n][2*m+1]>=shiftsLine2[6+n][2*l])) {
                    if (fArray[1][v][n][2*m+1]>=shiftsLine2[6+n][2*l+1]) { shiftsLine2[9+n].push(shiftsLine2[6+n][2*l], shiftsLine2[6+n][2*l+1]) }
                      else {shiftsLine2[9+n].push(shiftsLine2[6+n][2*l], fArray[1][v][n][2*m+1])}}
                    }} // end second away m,l loop
                    shiftsLine2[12].push([]); // away team
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

                    // console.log(finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2], fArray[0])
                    console.log(lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2]))
                    console.log(shiftsLine2)
         
                    lineByLine001.innerHTML='\\ '+'Away Team ->' +'<br>'+ 'Home Team'+'<br>'+'    |'
                    lineByLine041.innerHTML=awayF[1+3*finalLineup2[5][0][0]]+' '+awayF[2+3*finalLineup2[5][0][0]]+'<br>'+awayF[1+3*finalLineup2[5][0][1]]+' '+awayF[2+3*finalLineup2[5][0][1]]+'<br>'+awayF[1+3*finalLineup2[5][0][2]]+' '+awayF[2+3*finalLineup2[5][0][2]];
                    lineByLine051.innerHTML=awayF[1+3*finalLineup2[5][0][3]]+' '+awayF[2+3*finalLineup2[5][0][3]]+'<br>'+awayF[1+3*finalLineup2[5][0][4]]+' '+awayF[2+3*finalLineup2[5][0][4]]+'<br>'+awayF[1+3*finalLineup2[5][0][5]]+' '+awayF[2+3*finalLineup2[5][0][5]];
                    lineByLine061.innerHTML=awayF[1+3*finalLineup2[5][0][6]]+' '+awayF[2+3*finalLineup2[5][0][6]]+'<br>'+awayF[1+3*finalLineup2[5][0][7]]+' '+awayF[2+3*finalLineup2[5][0][7]]+'<br>'+awayF[1+3*finalLineup2[5][0][8]]+' '+awayF[2+3*finalLineup2[5][0][8]];
                    if (finalLineup2[5][0].length>=12)  {lineByLine071.innerHTML=awayF[1+3*finalLineup2[5][0][9]]+' '+awayF[2+3*finalLineup2[5][0][9]]+'<br>'+awayF[1+3*finalLineup2[5][0][10]]+' '+awayF[2+3*finalLineup2[5][0][10]]+'<br>'+awayF[1+3*finalLineup2[5][0][11]]+' '+awayF[2+3*finalLineup2[5][0][11]];}
                    else {lineByLine071.innerHTML=awayF[1+3*finalLineup2[5][0][9]]+' '+awayF[2+3*finalLineup2[5][0][9]]+'<br>'+awayF[1+3*finalLineup2[5][0][10]]+' '+awayF[2+3*finalLineup2[5][0][10]]}
                    lineByLine141.innerHTML=lineByLine1(1,0,0,0)[1][0]+' '+lineByLine1(1,0,0,0)[1][1]+'<br>'+lineByLine1(1,0,0,1)[1][2]+' '+lineByLine1(1,0,0,1)[1][3]+'<br>'+lineByLine1(1,0,0,2)[1][4]+' '+lineByLine1(1,0,0,2)[1][5];
                    lineByLine151.innerHTML=lineByLine1(1,1,0,0)[1][0]+' '+lineByLine1(1,1,0,0)[1][1]+'<br>'+lineByLine1(1,1,0,1)[1][2]+' '+lineByLine1(1,1,0,1)[1][3]+'<br>'+lineByLine1(1,1,0,2)[1][4]+' '+lineByLine1(1,1,0,2)[1][5];
                    lineByLine161.innerHTML=lineByLine1(1,2,0,0)[1][0]+' '+lineByLine1(1,2,0,0)[1][1]+'<br>'+lineByLine1(1,2,0,1)[1][2]+' '+lineByLine1(1,2,0,0)[1][3]+'<br>'+lineByLine1(1,2,0,0)[1][4]+' '+lineByLine1(1,2,0,0)[1][5];
                    
                    if (finalLineup2[5][0].length>=12) {lineByLine171.innerHTML=lineByLine1(1,3,0,0)[1][0]+' '+lineByLine1(1,3,0,0)[1][1]+'<br>'+lineByLine1(1,3,0,0)[1][2]+' '+lineByLine1(1,3,0,0)[1][3]+'<br>'+lineByLine1(1,3,0,0)[1][4]+' '+lineByLine1(1,3,0,0)[1][5];}
                    lineByLine201.innerHTML=homeF[1+3*finalLineup2[4][0][0]]+' '+homeF[2+3*finalLineup2[4][0][0]]+'<br>'+homeF[1+3*finalLineup2[4][0][1]]+' '+homeF[2+3*finalLineup2[4][0][1]]+'<br>'+homeF[1+3*finalLineup2[4][0][2]]+' '+homeF[2+3*finalLineup2[4][0][2]];
                    lineByLine221.innerHTML=lineByLine1(0,0,0,0)[1][0]+' '+lineByLine1(0,0,0,0)[1][1]+'<br>'+lineByLine1(0,0,0,1)[1][2]+' '+lineByLine1(0,0,0,1)[1][3]+'<br>'+lineByLine1(0,0,0,2)[1][4]+' '+lineByLine1(0,0,0,2)[1][5];
                    lineByLine241.innerHTML=lineByLine1(0,0,0,0)[0][0]+' '+lineByLine1(0,0,0,0)[0][1]+' '+'<br>'+lineByLine1(0,0,0,1)[0][2]+' '+lineByLine1(0,0,0,1)[0][3]+' '+'<br>'+lineByLine1(0,0,0,2)[0][4]+' '+lineByLine1(0,0,0,2)[0][5]+' ';
                    lineByLine251.innerHTML=lineByLine1(0,0,1,0)[0][0]+' '+lineByLine1(0,0,1,0)[0][1]+' '+'<br>'+lineByLine1(0,0,1,1)[0][2]+' '+lineByLine1(0,0,1,1)[0][3]+' '+'<br>'+lineByLine1(0,0,1,0)[0][4]+' '+lineByLine1(0,0,1,0)[0][5]+' ';
                    lineByLine261.innerHTML=lineByLine1(0,0,2,0)[0][0]+' '+lineByLine1(0,0,2,0)[0][1]+' '+'<br>'+lineByLine1(0,0,2,1)[0][2]+' '+lineByLine1(0,0,2,1)[0][3]+' '+'<br>'+lineByLine1(0,0,2,2)[0][4]+' '+lineByLine1(0,0,2,2)[0][5]+' ';
                    if (finalLineup2[5][0].length>=12) {lineByLine271.innerHTML=lineByLine1(0,0,3,0)[0][0]+' '+lineByLine1(0,0,3,0)[0][1]+' '+'<br>'+lineByLine1(0,0,3,1)[0][2]+' '+lineByLine1(0,0,3,1)[0][3]+' '+'<br>'+lineByLine1(0,0,3,2)[0][4]+' '+lineByLine1(0,0,3,2)[0][5]+' '}

                    lineByLine301.innerHTML=homeF[1+3*finalLineup2[4][0][3]]+' '+homeF[2+3*finalLineup2[4][0][3]]+'<br>'+homeF[1+3*finalLineup2[4][0][4]]+' '+homeF[2+3*finalLineup2[4][0][4]]+'<br>'+homeF[1+3*finalLineup2[4][0][5]]+' '+homeF[2+3*finalLineup2[4][0][5]];
                    lineByLine321.innerHTML=lineByLine1(0,1,0,0)[1][0]+' '+lineByLine1(0,1,0,0,0)[1][1]+'<br>'+lineByLine1(0,1,0,1)[1][2]+' '+lineByLine1(0,1,0,1)[1][3]+'<br>'+lineByLine1(0,1,0,2)[1][4]+' '+lineByLine1(0,1,0,2)[1][5];
                    lineByLine341.innerHTML=lineByLine1(0,1,0,0)[0][0]+' '+lineByLine1(0,1,0,0)[0][1]+'<br>'+lineByLine1(0,1,0,1)[0][2]+' '+lineByLine1(0,1,0,1)[0][3]+' '+'<br>'+lineByLine1(0,1,0,2)[0][4]+' '+lineByLine1(0,1,0,2)[0][5];
                    lineByLine351.innerHTML=lineByLine1(0,1,1,0)[0][0]+' '+lineByLine1(0,1,1,0)[0][1]+'<br>'+lineByLine1(0,1,1,1)[0][2]+' '+lineByLine1(0,1,1,1)[0][3]+' '+'<br>'+lineByLine1(0,1,1,2)[0][4]+' '+lineByLine1(0,1,1,2)[0][5];
                    lineByLine361.innerHTML=lineByLine1(0,1,2,0)[0][0]+' '+lineByLine1(0,1,2,0)[0][1]+'<br>'+lineByLine1(0,1,2,1)[0][2]+' '+lineByLine1(0,1,2,1)[0][3]+' '+'<br>'+lineByLine1(0,1,2,2)[0][4]+' '+lineByLine1(0,1,2,2)[0][5];
                    if (finalLineup2[5][0].length>=12) {lineByLine371.innerHTML=lineByLine1(0,1,3,0)[0][0]+' '+lineByLine1(0,1,3,0)[0][1]+' '+'<br>'+lineByLine1(0,1,3,1)[0][2]+' '+lineByLine1(0,1,3,1)[0][3]+' '+'<br>'+lineByLine1(0,1,3,2)[0][4]+' '+lineByLine1(0,1,3,2)[0][5]+' '}

                    lineByLine401.innerHTML=homeF[1+3*finalLineup2[4][0][6]]+' '+homeF[2+3*finalLineup2[4][0][6]]+'<br>'+homeF[1+3*finalLineup2[4][0][7]]+' '+homeF[2+3*finalLineup2[4][0][7]]+'<br>'+homeF[1+3*finalLineup2[4][0][8]]+' '+homeF[2+3*finalLineup2[4][0][8]];
                    lineByLine421.innerHTML=lineByLine1(0,2,0,0)[1][0]+' '+lineByLine1(0,2,0,0)[1][1]+'<br>'+lineByLine1(0,2,0,1)[1][2]+' '+lineByLine1(0,2,0,1)[1][3]+'<br>'+lineByLine1(0,2,0,2)[1][4]+' '+lineByLine1(0,2,0,2)[1][5];
                    lineByLine441.innerHTML=lineByLine1(0,2,0,0)[0][0]+' '+lineByLine1(0,2,0,0)[0][1]+'<br>'+lineByLine1(0,2,0,1)[0][2]+' '+lineByLine1(0,2,0,1)[0][3]+' '+'<br>'+lineByLine1(0,2,0,2)[0][4]+' '+lineByLine1(0,2,0,2)[0][5];
                    lineByLine451.innerHTML=lineByLine1(0,2,1,0)[0][0]+' '+lineByLine1(0,2,1,0)[0][1]+'<br>'+lineByLine1(0,2,1,1)[0][2]+' '+lineByLine1(0,2,1,1)[0][3]+' '+'<br>'+lineByLine1(0,2,1,2)[0][4]+' '+lineByLine1(0,2,1,2)[0][5];
                    lineByLine461.innerHTML=lineByLine1(0,2,2,0)[0][0]+' '+lineByLine1(0,2,2,0)[0][1]+'<br>'+lineByLine1(0,2,2,1)[0][2]+' '+lineByLine1(0,2,2,1)[0][3]+' '+'<br>'+lineByLine1(0,2,2,2)[0][4]+' '+lineByLine1(0,2,2,2)[0][5]+' ';
                    if (finalLineup2[5][0].length>=12) {lineByLine471.innerHTML=lineByLine1(0,2,3,0)[0][0]+' '+lineByLine1(0,2,3,0)[0][1]+'<br>'+lineByLine1(0,2,3,1)[0][2]+' '+lineByLine1(0,2,3,1)[0][3]+' '+'<br>'+lineByLine1(0,2,3,2)[0][4]+' '+lineByLine1(0,2,3,2)[0][5]+' '}

                    if (finalLineup2[4][2].length>=12){
                    lineByLine501.innerHTML=homeF[1+3*finalLineup2[4][0][9]]+' '+homeF[2+3*finalLineup2[4][0][9]]+'<br>'+homeF[1+3*finalLineup2[4][0][10]]+' '+homeF[2+3*finalLineup2[4][0][10]]+'<br>'+homeF[1+3*finalLineup2[4][0][11]]+' '+homeF[2+3*finalLineup2[4][0][11]];
                    lineByLine521.innerHTML=lineByLine1(0,3,0,0)[1][0]+' '+lineByLine1(0,3,0,0)[1][1]+'<br>'+lineByLine1(0,3,0,1)[1][2]+' '+lineByLine1(0,3,0,1)[1][3]+'<br>'+lineByLine1(0,3,0,2)[1][4]+' '+lineByLine1(0,3,0,2)[1][5];
                    lineByLine541.innerHTML=lineByLine1(0,3,0,0)[0][0]+' '+lineByLine1(0,3,0,0)[0][1]+'<br>'+lineByLine1(0,3,0,1)[0][2]+' '+lineByLine1(0,3,0,1)[0][3]+' '+'<br>'+lineByLine1(0,3,0,2)[0][4]+' '+lineByLine1(0,3,0,2)[0][5]+' ';
                    lineByLine551.innerHTML=lineByLine1(0,3,1,0)[0][0]+' '+lineByLine1(0,3,1,0)[0][1]+'<br>'+lineByLine1(0,3,1,1)[0][2]+' '+lineByLine1(0,3,1,1)[0][3]+' '+'<br>'+lineByLine1(0,3,1,2)[0][4]+' '+lineByLine1(0,3,1,2)[0][5]+' ';
                    lineByLine561.innerHTML=lineByLine1(0,3,2,0)[0][0]+' '+lineByLine1(0,3,2,0)[0][1]+'<br>'+lineByLine1(0,3,2,1)[0][2]+' '+lineByLine1(0,3,2,1)[0][3]+' '+'<br>'+lineByLine1(0,3,2,2)[0][4]+' '+lineByLine1(0,3,2,2)[0][5]+' ';
                    if (finalLineup2[5][2].length>=12) {lineByLine571.innerHTML=lineByLine1(0,3,3,0)[0][0]+' '+lineByLine1(0,3,3,0)[0][1]+'<br>'+lineByLine1(0,3,3,1)[0][2]+' '+lineByLine1(0,3,3,1)[0][3]+' '+'<br>'+lineByLine1(0,3,3,2)[0][4]+' '+lineByLine1(0,3,3,2)[0][5]+' '}}
                    else {lineByLine501.innerHTML=homeF[1+3*finalLineup2[4][0][9]]+' '+homeF[2+3*finalLineup2[4][0][9]]+'<br>'+homeF[1+3*finalLineup2[4][0][10]]+' '+homeF[2+3*finalLineup2[4][0][10]];}

                    lineByLine043.innerHTML=awayF[1+3*finalLineup2[5][0][0]]+' '+awayF[2+3*finalLineup2[5][0][0]]+'<br>'+awayF[1+3*finalLineup2[5][0][1]]+' '+awayF[2+3*finalLineup2[5][0][1]]+'<br>'+awayF[1+3*finalLineup2[5][0][2]]+' '+awayF[2+3*finalLineup2[5][0][2]];
                    lineByLine053.innerHTML=awayF[1+3*finalLineup2[5][0][3]]+' '+awayF[2+3*finalLineup2[5][0][3]]+'<br>'+awayF[1+3*finalLineup2[5][0][4]]+' '+awayF[2+3*finalLineup2[5][0][4]]+'<br>'+awayF[1+3*finalLineup2[5][0][5]]+' '+awayF[2+3*finalLineup2[5][0][5]];
                    lineByLine063.innerHTML=awayF[1+3*finalLineup2[5][0][6]]+' '+awayF[2+3*finalLineup2[5][0][6]]+'<br>'+awayF[1+3*finalLineup2[5][0][7]]+' '+awayF[2+3*finalLineup2[5][0][7]]+'<br>'+awayF[1+3*finalLineup2[5][0][8]]+' '+awayF[2+3*finalLineup2[5][0][8]];
                    if (finalLineup2[5][0].length>=12)  {lineByLine073.innerHTML=awayF[1+3*finalLineup2[5][0][9]]+' '+awayF[2+3*finalLineup2[5][0][9]]+'<br>'+awayF[1+3*finalLineup2[5][0][10]]+' '+awayF[2+3*finalLineup2[5][0][10]]+'<br>'+awayF[1+3*finalLineup2[5][0][11]]+' '+awayF[2+3*finalLineup2[5][0][11]];}
                    else {lineByLine073.innerHTML=awayF[1+3*finalLineup2[5][0][9]]+' '+awayF[2+3*finalLineup2[5][0][9]]+'<br>'+awayF[1+3*finalLineup2[5][0][10]]+' '+awayF[2+3*finalLineup2[5][0][10]]}
                    lineByLine143.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[2][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[2][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[2][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[2][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[2][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[2][5];
                    // lineByLine143.innerHTML=lineByLine1(1,0,0,0)[1][0]+' '+lineByLine1(1,0,0,0)[1][1]+'<br>'+lineByLine1(1,0,0,1)[1][2]+' '+lineByLine1(1,0,0,1)[1][3]+'<br>'+lineByLine1(1,0,0,0)[1][4]+' '+lineByLine1(1,0,0,0)[1][5];
                    lineByLine153.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[2][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[2][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[2][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[2][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[2][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[2][5];
                    // lineByLine153.innerHTML=lineByLine1(1,1,0,0)[1][0]+' '+lineByLine1(1,1,0,0)[1][1]+'<br>'+lineByLine1(1,1,0,1)[1][2]+' '+lineByLine1(1,1,0,1)[1][3]+'<br>'+lineByLine1(1,1,0,2)[1][4]+' '+lineByLine1(1,1,0,2)[1][5];
                    lineByLine163.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[2][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[2][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[2][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[2][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[2][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[2][5];
                    // lineByLine163.innerHTML=lineByLine1(1,2,0,0)[1][0]+' '+lineByLine1(1,2,0,0)[1][1]+'<br>'+lineByLine1(1,2,0,1)[1][2]+' '+lineByLine1(1,2,0,1)[1][3]+'<br>'+lineByLine1(1,2,0,2)[1][4]+' '+lineByLine1(1,2,0,2)[1][5];
                    if (finalLineup2[5][0].length>=12) {
                      lineByLine173.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[2][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[2][1]+'<br>'+
                      lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[2][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[2][3]+'<br>'+
                      lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[2][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[2][5];
                      // lineByLine173.innerHTML=lineByLine1(1,3,0,0)[1][0]+' '+lineByLine1(1,3,0,0)[1][1]+'<br>'+lineByLine1(1,3,0,1)[1][2]+' '+lineByLine1(1,3,0,1)[1][3]+'<br>'+lineByLine1(1,3,0,2)[1][4]+' '+lineByLine1(1,3,0,2)[1][5];
                    }

                    lineByLine203.innerHTML=homeF[1+3*finalLineup2[4][0][0]]+' '+homeF[2+3*finalLineup2[4][0][0]]+'<br>'+homeF[1+3*finalLineup2[4][0][1]]+' '+homeF[2+3*finalLineup2[4][0][1]]+'<br>'+homeF[1+3*finalLineup2[4][0][2]]+' '+homeF[2+3*finalLineup2[4][0][2]];
                    
                    lineByLine223.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][5];
                    // lineByLine223.innerHTML=lineByLine1(0,0,0,0)[1][0]+' '+lineByLine1(0,0,0,0)[1][1]+'<br>'+lineByLine1(0,0,0,1)[1][2]+' '+lineByLine1(0,0,0,0)[1][3]+'<br>'+lineByLine1(0,0,0,2)[1][4]+' '+lineByLine1(0,0,0,2)[1][5];
                    lineByLine243.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][5];
                    // lineByLine243.innerHTML=lineByLine1(0,0,0,0)[0][0]+' '+lineByLine1(0,0,0,0)[0][1]+' '+'<br>'+lineByLine1(0,0,0,1)[0][2]+' '+lineByLine1(0,0,0,1)[0][3]+' '+'<br>'+lineByLine1(0,0,0,2)[0][4]+' '+lineByLine1(0,0,0,2)[0][5]+' ';
                    lineByLine253.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][5];
                    // lineByLine253.innerHTML=lineByLine1(0,0,1,0)[0][0]+' '+lineByLine1(0,0,1,0)[0][1]+' '+'<br>'+lineByLine1(0,0,1,1)[0][2]+' '+lineByLine1(0,0,1,1)[0][3]+' '+'<br>'+lineByLine1(0,0,1,2)[0][4]+' '+lineByLine1(0,0,1,2)[0][5]+' ';
                    lineByLine263.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][5];
                    // lineByLine263.innerHTML=lineByLine1(0,0,2,0)[0][0]+' '+lineByLine1(0,0,2,0)[0][1]+' '+'<br>'+lineByLine1(0,0,2,1)[0][2]+' '+lineByLine1(0,0,2,1)[0][3]+' '+'<br>'+lineByLine1(0,0,2,2)[0][4]+' '+lineByLine1(0,0,2,2)[0][5]+' ';
                    if (finalLineup2[5][0].length>=12) {
                      lineByLine273.innerHTML=lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][0]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][1]+'<br>'+
                      lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][2]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][3]+'<br>'+
                      lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][4]+' '+lineByLine2(finalLineup2[4][0][0],finalLineup2[4][0][1],finalLineup2[4][0][2],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][5];
                      // lineByLine273.innerHTML=lineByLine1(0,0,3,0)[0][0]+' '+lineByLine1(0,0,3,0)[0][1]+' '+'<br>'+lineByLine1(0,0,3,1)[0][2]+' '+lineByLine1(0,0,3,1)[0][3]+' '+'<br>'+lineByLine1(0,0,3,2)[0][4]+' '+lineByLine1(0,0,3,2)[0][5]+' '
                    }

                    lineByLine303.innerHTML=homeF[1+3*finalLineup2[4][0][3]]+' '+homeF[2+3*finalLineup2[4][0][3]]+'<br>'+homeF[1+3*finalLineup2[4][0][4]]+' '+homeF[2+3*finalLineup2[4][0][4]]+'<br>'+homeF[1+3*finalLineup2[4][0][5]]+' '+homeF[2+3*finalLineup2[4][0][5]];
                    lineByLine323.innerHTML=lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][0]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][2]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][4]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][5];
                    // lineByLine323.innerHTML=lineByLine1(0,1,0,0)[1][0]+' '+lineByLine1(0,1,0,0)[1][1]+'<br>'+lineByLine1(0,1,0,1)[1][2]+' '+lineByLine1(0,1,0,1)[1][3]+'<br>'+lineByLine1(0,1,0,2)[1][4]+' '+lineByLine1(0,1,0,2)[1][5];
                    lineByLine343.innerHTML=lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][0]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][2]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][4]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][5];
                    // lineByLine343.innerHTML=lineByLine1(0,1,0,0)[0][0]+' '+lineByLine1(0,1,0,0)[0][1]+'<br>'+lineByLine1(0,1,0,1)[0][2]+' '+lineByLine1(0,1,0,1)[0][3]+' '+'<br>'+lineByLine1(0,1,0,2)[0][4]+' '+lineByLine1(0,1,0,2)[0][5];
                    lineByLine353.innerHTML=lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][0]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][2]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][4]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][5];
                    // lineByLine353.innerHTML=lineByLine1(0,1,1,0)[0][0]+' '+lineByLine1(0,1,1,0)[0][1]+'<br>'+lineByLine1(0,1,1,1)[0][2]+' '+lineByLine1(0,1,1,1)[0][3]+' '+'<br>'+lineByLine1(0,1,1,2)[0][4]+' '+lineByLine1(0,1,1,2)[0][5];
                    lineByLine363.innerHTML=lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][0]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][2]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][4]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][5];
                    // lineByLine363.innerHTML=lineByLine1(0,1,2,0)[0][0]+' '+lineByLine1(0,1,2,0)[0][1]+'<br>'+lineByLine1(0,1,2,1)[0][2]+' '+lineByLine1(0,1,2,1)[0][3]+' '+'<br>'+lineByLine1(0,1,2,2)[0][4]+' '+lineByLine1(0,1,2,2)[0][5];
                    if (finalLineup2[5][2].length>=12) {
                      lineByLine373.innerHTML=lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][0]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][1]+'<br>'+
                      lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][2]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][3]+'<br>'+
                      lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][4]+' '+lineByLine2(finalLineup2[4][0][3],finalLineup2[4][0][4],finalLineup2[4][0][5],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][5];
                      // lineByLine373.innerHTML=lineByLine1(0,1,3,0)[0][0]+' '+lineByLine1(0,1,3,0)[0][1]+' '+'<br>'+lineByLine1(0,1,3,1)[0][2]+' '+lineByLine1(0,1,3,1)[0][3]+' '+'<br>'+lineByLine1(0,1,3,2)[0][4]+' '+lineByLine1(0,1,3,2)[0][5]+' '
                    }
                    lineByLine403.innerHTML=homeF[1+3*finalLineup2[4][0][6]]+' '+homeF[2+3*finalLineup2[4][0][6]]+'<br>'+homeF[1+3*finalLineup2[4][0][7]]+' '+homeF[2+3*finalLineup2[4][0][7]]+'<br>'+homeF[1+3*finalLineup2[4][0][8]]+' '+homeF[2+3*finalLineup2[4][0][8]];
                    lineByLine423.innerHTML=lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][0]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][2]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][4]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][5];
                    // lineByLine423.innerHTML=lineByLine1(0,2,0,0)[1][0]+' '+lineByLine1(0,2,0,0)[1][1]+'<br>'+lineByLine1(0,2,0,1)[1][2]+' '+lineByLine1(0,2,0,1)[1][3]+'<br>'+lineByLine1(0,2,0,2)[1][4]+' '+lineByLine1(0,2,0,2)[1][5];
                    lineByLine443.innerHTML=lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][0]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][2]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][4]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][5];
                    // lineByLine443.innerHTML=lineByLine1(0,2,0,0)[0][0]+' '+lineByLine1(0,2,0,0)[0][1]+'<br>'+lineByLine1(0,2,0,1)[0][2]+' '+lineByLine1(0,2,0,1)[0][3]+' '+'<br>'+lineByLine1(0,2,0,0)[0][4]+' '+lineByLine1(0,2,0,2)[0][5];
                    lineByLine453.innerHTML=lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][0]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][2]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][4]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][3],finalLineup2[5][0][4],finalLineup2[5][0][5])[0][5];
                    // lineByLine453.innerHTML=lineByLine1(0,2,1,0)[0][0]+' '+lineByLine1(0,2,1,0)[0][1]+'<br>'+lineByLine1(0,2,1,1)[0][2]+' '+lineByLine1(0,2,1,1)[0][3]+' '+'<br>'+lineByLine1(0,2,1,2)[0][4]+' '+lineByLine1(0,2,1,2)[0][5];
                    lineByLine463.innerHTML=lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][0]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][2]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][4]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[0][5];
                    // lineByLine463.innerHTML=lineByLine1(0,2,2,0)[0][0]+' '+lineByLine1(0,2,2,0)[0][1]+'<br>'+lineByLine1(0,2,2,1)[0][2]+' '+lineByLine1(0,2,2,1)[0][3]+' '+'<br>'+lineByLine1(0,2,2,2)[0][4]+' '+lineByLine1(0,2,2,2)[0][5]+' ';
                   if (finalLineup2[5][0].length>=12) {
                    lineByLine473.innerHTML=lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][0]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][2]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][4]+' '+lineByLine2(finalLineup2[4][0][6],finalLineup2[4][0][7],finalLineup2[4][0][8],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][5];
                    // lineByLine473.innerHTML=lineByLine1(0,2,3,0)[0][0]+' '+lineByLine1(0,2,3,0)[0][1]+'<br>'+lineByLine1(0,2,3,1)[0][2]+' '+lineByLine1(0,2,3,1)[0][3]+' '+'<br>'+lineByLine1(0,2,3,1)[0][4]+' '+lineByLine1(0,2,3,2)[0][5]+' '
                  }
                    if (finalLineup2[4][0].length>=12){
                    lineByLine503.innerHTML=homeF[1+3*finalLineup2[4][0][9]]+' '+homeF[2+3*finalLineup2[4][0][9]]+'<br>'+homeF[1+3*finalLineup2[4][0][10]]+' '+homeF[2+3*finalLineup2[4][0][10]]+'<br>'+homeF[1+3*finalLineup2[4][0][11]]+' '+homeF[2+3*finalLineup2[4][0][11]];
                    lineByLine523.innerHTML=lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][0]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][2]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][4]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][6],finalLineup2[5][0][7],finalLineup2[5][0][8])[1][5];
                    // lineByLine523.innerHTML=lineByLine1(0,3,0,0)[1][0]+' '+lineByLine1(0,3,0,0)[1][1]+'<br>'+lineByLine1(0,3,0,1)[1][2]+' '+lineByLine1(0,3,0,1)[1][3]+'<br>'+lineByLine1(0,3,0,2)[1][4]+' '+lineByLine1(0,3,0,2)[1][5];
                    lineByLine543.innerHTML=lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][0]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][1]+'<br>'+
                    lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][2]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][3]+'<br>'+
                    lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][4]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][0],finalLineup2[5][0][1],finalLineup2[5][0][2])[0][5];
                    // lineByLine543.innerHTML=lineByLine1(0,3,0,0)[0][0]+' '+lineByLine1(0,3,0,0)[0][1]+'<br>'+lineByLine1(0,3,0,1)[0][2]+' '+lineByLine1(0,3,0,1)[0][3]+' '+'<br>'+lineByLine1(0,3,0,2)[0][4]+' '+lineByLine1(0,3,0,2)[0][5]+' ';
                    lineByLine553.innerHTML=lineByLine1(0,3,1,0)[0][0]+' '+lineByLine1(0,3,1,0)[0][1]+'<br>'+lineByLine1(0,3,1,1)[0][2]+' '+lineByLine1(0,3,1,1)[0][3]+' '+'<br>'+lineByLine1(0,3,1,2)[0][4]+' '+lineByLine1(0,3,1,2)[0][5]+' ';
                    lineByLine563.innerHTML=lineByLine1(0,3,2,0)[0][0]+' '+lineByLine1(0,3,2,0)[0][1]+'<br>'+lineByLine1(0,3,2,1)[0][2]+' '+lineByLine1(0,3,2,1)[0][3]+' '+'<br>'+lineByLine1(0,3,2,2)[0][4]+' '+lineByLine1(0,3,2,2)[0][5]+' ';
                    if (finalLineup2[5][0].length>=12) {
                      lineByLine573.innerHTML=lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][0]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][1]+'<br>'+
                      lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][2]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][3]+'<br>'+
                      lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][4]+' '+lineByLine2(finalLineup2[4][0][9],finalLineup2[4][0][10],finalLineup2[4][0][11],finalLineup2[5][0][9],finalLineup2[5][0][10],finalLineup2[5][0][11])[0][5];
                      // lineByLine573.innerHTML=lineByLine1(0,3,3,0)[0][0]+' '+lineByLine1(0,3,3,0)[0][1]+'<br>'+lineByLine1(0,3,3,1)[0][2]+' '+lineByLine1(0,3,3,1)[0][3]+' '+'<br>'+lineByLine1(0,3,3,2)[0][4]+' '+lineByLine1(0,3,3,2)[0][5]+' '
                    }
                  }
                    else {lineByLine503.innerHTML=homeF[1+3*finalLineup2[4][0][9]]+' '+homeF[2+3*finalLineup2[4][0][9]]+'<br>'+homeF[1+3*finalLineup2[4][0][10]]+' '+homeF[2+3*finalLineup2[4][0][10]];}
                  }); // end second .then shifts
              }); // end second .then standings;
          }); // end second .then gamecenter;
      } // end displayGameData 
    } // end second .then from getinputvalue
    ); 
} // end getInput Value function 
