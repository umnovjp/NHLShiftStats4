var scheduleContent = document.getElementById('schedule'); var gameId; var inputVal = '2021'; standingsArray = []; linesArray10 = []
// lines below will allow user to select date then to select game on that date
function getInputValue() {
  var inputVal = document.getElementById('datepicker').value; var date = inputVal.split('/');
  var formatted = date[2] + '-' + date[0] + '-' + date[1];
  var requestURL = 'https://corsproxy.io/?key=2ddedfd8&url=https://api-web.nhle.com/v1/schedule/' + formatted;
  // var requestURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/schedule/' + formatted;
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
        var requestURL = 'https://corsproxy.io/?key=2ddedfd8&url=https://api-web.nhle.com/v1/gamecenter/' + gameId + '/boxscore';
        // var requestURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/gamecenter/' + gameId + '/boxscore';
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
            // console.log(data.playerByGameStats.homeTeam);

            function Shifts(playerId, jerseyNumber, name, position, team, shiftsObject) {
              this.playerId = playerId;
              this.jerseyNumber = jerseyNumber;
              this.name = name;
              this.position = position;
              this.team = team;
              this.shiftsObject = {startTime: [[],[],[]], endTime: [[],[],[]]}
            }

            for (i = 0; i < data.playerByGameStats.homeTeam.goalies.length; i++) {
              const CurrentPlayer = new Shifts(data.playerByGameStats.homeTeam.goalies[i].playerId, data.playerByGameStats.homeTeam.goalies[i].sweaterNumber, data.playerByGameStats.homeTeam.goalies[i].name, 'G', 'H');
              shiftsArray.push(CurrentPlayer)
            }
            for (i = 0; i < data.playerByGameStats.homeTeam.defense.length; i++) {
              const CurrentPlayer = new Shifts(data.playerByGameStats.homeTeam.defense[i].playerId, data.playerByGameStats.homeTeam.defense[i].sweaterNumber, data.playerByGameStats.homeTeam.defense[i].name, 'D', 'H');
              shiftsArray.push(CurrentPlayer)
            }
            for (i = 0; i < data.playerByGameStats.homeTeam.forwards.length; i++) {
              const CurrentPlayer = new Shifts(data.playerByGameStats.homeTeam.forwards[i].playerId, data.playerByGameStats.homeTeam.forwards[i].sweaterNumber, data.playerByGameStats.homeTeam.forwards[i].name, 'F', 'H');
              shiftsArray.push(CurrentPlayer)
            }
            for (i = 0; i < data.playerByGameStats.awayTeam.goalies.length; i++) {
              const CurrentPlayer = new Shifts(data.playerByGameStats.awayTeam.goalies[i].playerId, data.playerByGameStats.awayTeam.goalies[i].sweaterNumber, data.playerByGameStats.awayTeam.goalies[i].name, 'G', 'A');
              shiftsArray.push(CurrentPlayer)
            }
            for (i = 0; i < data.playerByGameStats.homeTeam.defense.length; i++) {
              const CurrentPlayer = new Shifts(data.playerByGameStats.awayTeam.defense[i].playerId, data.playerByGameStats.awayTeam.defense[i].sweaterNumber, data.playerByGameStats.awayTeam.defense[i].name, 'D', 'A');
              shiftsArray.push(CurrentPlayer)
            }
            for (i = 0; i < data.playerByGameStats.homeTeam.forwards.length; i++) {
              const CurrentPlayer = new Shifts(data.playerByGameStats.awayTeam.forwards[i].playerId, data.playerByGameStats.awayTeam.forwards[i].sweaterNumber, data.playerByGameStats.awayTeam.forwards[i].name, 'F', 'A');
              shiftsArray.push(CurrentPlayer)
            }

           var shiftsURL = 'https://corsproxy.io/?key=2ddedfd8&url=https://api.nhle.com/stats/rest/en/shiftcharts?cayenneExp=gameId=' + gameId;
            fetch(shiftsURL, { "method": "GET", "headers": {} })
              .then(function (response) { return response.json() })
              .then(function (data_shifts) { console.log('I am in second shift then', data_shifts.data, shiftsArray[0]);
                for (i=0;i<data_shifts.data.length;i++) {if (data_shifts.data[i].typeCode===517) {
                  for (j=0;j<shiftsArray.length;j++) { for (k=0;k<3;k++) {
                    if ((data_shifts.data[i].playerId===shiftsArray[j].playerId)&&(data_shifts.data[i].period===k+1)) {shiftsArray[j].shiftsObject.startTime[k] = shiftsArray[j].shiftsObject.startTime[k] + ', ' + data_shifts.data[i].startTime, shiftsArray[j].shiftsObject.endTime[k] = shiftsArray[j].shiftsObject.endTime[k] + ', ' + data_shifts.data[i].endTime}}
                      }
                }}
                console.log(shiftsArray, shiftsArray[2].shiftsObject);
                // ok I have analog of dArray and fArray. Then I created dArrayTemp and fArayTemp in lines 100, 101. Just combined all d shifts and all f shifts. 
                // then I created an array of 3 x 1200 0s. that was dArrayTemp2 and fArrayTemp2 in line 105. 
                // then I add 1 for each second of the shift. So in the end I know when it was 2D + 3F
                // then I ran cycle to eliminate end shift start shift pairs ???
                  tempArrayDH=[[],[],[]]; tempArrayFH=[[],[],[]];tempArrayGH=[[],[],[]];tempArrayDA=[[],[],[]];tempArrayFA=[[],[],[]];tempArrayGA=[[],[],[]];tempArrayGH1=[[],[],[]];tempArrayDH1=[[],[],[]];tempArrayFH1=[[],[],[]];tempArrayDA1=[[],[],[]];tempArrayFA1=[[],[],[]];tempArrayGA1=[[],[],[]];
                  for (i=0;i<1200;i++) { for (j=0;j<3;j++) {
                    tempArrayFH[j].push(0); tempArrayDH[j].push(0); tempArrayGH[j].push(1); tempArrayDA[j].push(0); tempArrayFA[j].push(0); tempArrayGA[j].push(1)
                  }}
                  // start DH, FH, GA, GH, DA, FA
                  for (i=0;i<shiftsArray.length;i++) { for (h=0;h<3;h++) { // i is players but h is 3 periods                    
                    {if (shiftsArray[i].shiftsObject.startTime[h].length>0) {
                      startTimeArray=shiftsArray[i].shiftsObject.startTime[h].split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime[h].split(',');
                    for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {
                      if ((shiftsArray[i].position==='D')&&(shiftsArray[i].team==='H')) {tempArrayDH[h][k]=tempArrayDH[h][k]+1}
                      else if ((shiftsArray[i].position==='F')&&(shiftsArray[i].team==='H')) {tempArrayFH[h][k]=tempArrayFH[h][k]+1}
                      else if ((shiftsArray[i].position==='G')&&(shiftsArray[i].team==='H')) {tempArrayGH[h][k]=tempArrayGH[h][k]+1}
                      else if ((shiftsArray[i].position==='D')&&(shiftsArray[i].team==='A')) {tempArrayDA[h][k]=tempArrayDA[h][k]+1}
                      else if ((shiftsArray[i].position==='F')&&(shiftsArray[i].team==='A')) {tempArrayFA[h][k]=tempArrayFA[h][k]+1}
                      else if ((shiftsArray[i].position==='G')&&(shiftsArray[i].team==='A')) {tempArrayGA[h][k]=tempArrayGA[h][k]+1}
                    }}}}
                }} // end i,h cycle
                
                  for (i=0;i<1200;i++) { for (j=0;j<3;j++) {if (tempArrayDH[j][i]===tempArrayDH[j][i+1]) {delete(tempArrayDH[j][i])}
                  if (tempArrayFH[j][i]===tempArrayFH[j][i+1]) {delete(tempArrayFH[j][i])}
                  if (tempArrayGH[j][i]===tempArrayGH[j][i+1]) {delete(tempArrayGH[j][i])}
                  if (tempArrayDA[j][i]===tempArrayDA[j][i+1]) {delete(tempArrayDA[j][i])}
                  if (tempArrayFA[j][i]===tempArrayFA[j][i+1]) {delete(tempArrayFA[j][i])}
                  if (tempArrayGA[j][i]===tempArrayGA[j][i+1]) {delete(tempArrayGA[j][i])}
                }}
                // console.log(tempArrayDA, tempArrayFA)
                  for (i=0;i<1200;i++) { for (j=0;j<3;j++) {if (!tempArrayDH[j][i]) {} else {tempArrayDH1[j].push(tempArrayDH[j][i],i)}
                  if (!tempArrayFH[j][i]) {} else {tempArrayFH1[j].push(tempArrayFH[j][i],i)}
                  if (!tempArrayGH[j][i]) {} else {tempArrayGH1[j].push(tempArrayGH[j][i],i)}
                  if (!tempArrayDA[j][i]) {} else {tempArrayDA1[j].push(tempArrayDA[j][i],i)}
                  if (!tempArrayFA[j][i]) {} else {tempArrayFA1[j].push(tempArrayFA[j][i],i)}
                  if (!tempArrayGA[j][i]) {} else {tempArrayGA1[j].push(tempArrayGA[j][i],i)}
                }}
                console.log(tempArrayDH1, tempArrayFH1, tempArrayGH1, tempArrayDA1, tempArrayFA1, tempArrayGA1);
                fiveOnFive=[[],[],[]]
                for (i=0;i<3;i++) {
                  if (tempArrayDH1[i][0]===2) {fiveOnFive[i].push(0)}
                  // else condition is not really clean because 2 may be 2nd second as well but for D it is unlikely that penalty expires on 2nd second and they started with 4F and 1D
                  else {tempIndex=tempArrayDH1[i].indexOf(2)
                    fiveOnFive[i].push(tempArrayDA1[tempIndex+1])
                  }
                  for (j=0;j<tempArrayDA1[i].length/2-1;j++) {
                    if (tempArrayDA1[i][2*j+3]-tempArrayDA1[i][2*j+1]<4) {}
                      else {fiveOnFive[i].push(tempArrayDA1[i][2*j+1])}
                  }
                }
                console.log(fiveOnFive);
              }); // end second .then shifts
          }); // end second .then gamecenter;
      } // end displayGameData 
    } // end second .then from getinputvalue
    );
} // end getInput Value function 