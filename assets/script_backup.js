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
            document.getElementById('gameInfo').appendChild(gameTitle);
            shiftsArray = [];

            console.log(data.playerByGameStats.homeTeam);

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
                  for (j=0;j<shiftsArray.length;j++) {if ((data_shifts.data[i].playerId===shiftsArray[j].playerId)&&(data_shifts.data[i].period===1)) {shiftsArray[j].shiftsObject.startTime[0] = shiftsArray[j].shiftsObject.startTime[0] + ', ' + data_shifts.data[i].startTime, shiftsArray[j].shiftsObject.endTime[0] = shiftsArray[j].shiftsObject.endTime[0] + ', ' + data_shifts.data[i].endTime}
                  else if ((data_shifts.data[i].playerId===shiftsArray[j].playerId)&&(data_shifts.data[i].period===2)) {shiftsArray[j].shiftsObject.startTime[1] = shiftsArray[j].shiftsObject.startTime[1] + ', ' + data_shifts.data[i].startTime, shiftsArray[j].shiftsObject.endTime[1] = shiftsArray[j].shiftsObject.endTime[1] + ', ' + data_shifts.data[i].endTime}
                  else if ((data_shifts.data[i].playerId===shiftsArray[j].playerId)&&(data_shifts.data[i].period===3)) {shiftsArray[j].shiftsObject.startTime[2] = shiftsArray[j].shiftsObject.startTime[2] + ', ' + data_shifts.data[i].startTime, shiftsArray[j].shiftsObject.endTime[2] = shiftsArray[j].shiftsObject.endTime[2] + ', ' + data_shifts.data[i].endTime}
                  // else (console.log ('only three periods count, now it is period ', data_shifts.data[i].period))
                }
                }}
                console.log(shiftsArray, shiftsArray[0].shiftsObject);
                // attempting to write code but not a lot of time today checking lines before 102 and then before 116
                // reading old script it is quite difficult. ok I have analog of dArray and fArray. Then I created dArrayTemp and fArayTemp in lines 100, 101. Just combined all d shifts and all f shifts. 
                // then I created an array of 3 x 1200 0s. that was dArrayTemp2 and fArrayTemp2 in line 105. 
                // then I add 1 for each second of the shift. So in the end I know when it was 2D + 3F
                // then I ran cycle to eliminate end shift start shift pairs ???
                // next cycle to be deleted two lines
                // for (i=1;i<4;i++) { startTimeX='startTime'+i; tempObject = shiftsArray[4].shiftsObject
                //   console.log(typeof startTimeX, startTimeX, tempObject.startTimeX, shiftsArray[4].shiftsObject.startTime1)}
                  tempArrayDH=[[],[],[]]; tempArrayFH=[[],[],[]];tempArrayGH=[[],[],[]];tempArrayDA=[[],[],[]];tempArrayFA=[[],[],[]];tempArrayGA=[[],[],[]];tempArrayGH1=[[],[],[]];tempArrayDH1=[[],[],[]];tempArrayFH1=[[],[],[]];tempArrayDA1=[[],[],[]];tempArrayFA1=[[],[],[]];tempArrayGA1=[[],[],[]];
                  for (i=0;i<1200;i++) { for (j=0;j<3;j++) {
                    tempArrayFH[j].push(0); tempArrayDH[j].push(0); tempArrayGH[j].push(1); tempArrayDA[j].push(0); tempArrayFA[j].push(0); tempArrayGA[j].push(1)
                  }}
                  // start DH
                  for (i=0;i<shiftsArray.length;i++) {if ((shiftsArray[i].position==='D')&&(shiftsArray[i].team==='H')) 
                    {startTimeArray=shiftsArray[i].shiftsObject.startTime[0].split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime[0].split(',');
                  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {tempArrayDH[0][k]=tempArrayDH[0][k]+1}}
                    startTimeArray=shiftsArray[i].shiftsObject.startTime[1].split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime[1].split(',');
                  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {tempArrayDH[1][k]=tempArrayDH[1][k]+1}}
                    startTimeArray=shiftsArray[i].shiftsObject.startTime[2].split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime[2].split(',');
                  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {tempArrayDH[2][k]=tempArrayDH[2][k]+1}}}                    
                    //start FH 
                  else if ((shiftsArray[i].position==='F')&&(shiftsArray[i].team==='H')) 
                  {startTimeArray=shiftsArray[i].shiftsObject.startTime[0].split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime[0].split(',');
                  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {tempArrayFH[0][k]=tempArrayFH[0][k]+1}}
                    startTimeArray=shiftsArray[i].shiftsObject.startTime[1].split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime[1].split(',');
                  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {tempArrayFH[1][k]=tempArrayFH[1][k]+1}}
                    startTimeArray=shiftsArray[i].shiftsObject.startTime[2].split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime[2].split(',');
                  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {tempArrayFH[2][k]=tempArrayFH[2][k]+1}}
                  }
                    //start GH 
                  else if ((shiftsArray[i].position==='G')&&(shiftsArray[i].team==='H')) 
                  {
                    if (shiftsArray[i].shiftsObject.startTime[0].length>0) {
                    startTimeArray=shiftsArray[i].shiftsObject.startTime[0].split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime[0].split(',')
                  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {tempArrayGH[0][k]=tempArrayGH[0][k]+1}}}
                    if(shiftsArray[i].shiftsObject.startTime[1].length>0) {
                    startTimeArray=shiftsArray[i].shiftsObject.startTime[1].split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime[1].split(',');
                  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {tempArrayGH[1][k]=tempArrayGH[1][k]+1}}}
                    if (shiftsArray[i].shiftsObject.startTime[2].length>0) {
                    startTimeArray=shiftsArray[i].shiftsObject.startTime[2].split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime[2].split(',');
                  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {tempArrayGH[2][k]=tempArrayGH[2][k]+1}}}
                  }
                  // start DA
                    if ((shiftsArray[i].position==='D')&&(shiftsArray[i].team==='A')) 
                      {startTimeArray=shiftsArray[i].shiftsObject.startTime[0].split(',');
                        endTimeArray=shiftsArray[i].shiftsObject.endTime[0].split(',');
                      for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                        endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                        for (k=startSeconds;k<endSeconds;k++) {tempArrayDA[0][k]=tempArrayDA[0][k]+1}}
                        startTimeArray=shiftsArray[i].shiftsObject.startTime[1].split(',');
                        endTimeArray=shiftsArray[i].shiftsObject.endTime[1].split(',');
                      for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                        endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                        for (k=startSeconds;k<endSeconds;k++) {tempArrayDA[1][k]=tempArrayDA[1][k]+1}}
                        startTimeArray=shiftsArray[i].shiftsObject.startTime[2].split(',');
                        endTimeArray=shiftsArray[i].shiftsObject.endTime[2].split(',');
                      for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                        endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                        for (k=startSeconds;k<endSeconds;k++) {tempArrayDA[2][k]=tempArrayDA[2][k]+1}}} 
                  //start FA
                  else if ((shiftsArray[i].position==='F')&&(shiftsArray[i].team==='A')) {startTimeArray=shiftsArray[i].shiftsObject.startTime[0].split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime[0].split(',');
                  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {tempArrayFA[k]=tempArrayFA[k]+1;                      
                    }}}
                    //start GA
                    else if ((shiftsArray[i].position==='G')&&(shiftsArray[i].team==='A')) {if (shiftsArray[i].shiftsObject.startTime[0].length>1) {startTimeArray=shiftsArray[i].shiftsObject.startTime[0].split(',');
                      endTimeArray=shiftsArray[i].shiftsObject.endTime[0].split(',');
                    for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                      endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                      for (k=startSeconds;k<endSeconds;k++) {tempArrayGA[k]=tempArrayGA[k]+1}
                    }}
                    else if (shiftsArray[i].shiftsObject.startTime[0].length===0) {}
                    else {tempIndex1=shiftsArray[i].shiftsObject.startTime[0][0].slice(1); tempIndex2=shiftsArray[i].shiftsObject.endTime[0][0].slice(1);
                      startSeconds=Number(tempIndex1.split(':')[0])*60+tempIndex.split(':')[1];
                      endSeconds=Number(tempIndex2.split(':')[0])*60+tempIndex.split(':')[1];
                      for (k=startSeconds;k<endSeconds;k++) {tempArrayGA[k]=tempArrayGA[k]+1}
                    }}
                } // end i cycle
                
                  for (i=0;i<1200;i++) { for (j=0;j<3;j++) {if (tempArrayDH[j][i]===tempArrayDH[j][i+1]) {delete(tempArrayDH[j][i])}
                  if (tempArrayFH[j][i]===tempArrayFH[j][i+1]) {delete(tempArrayFH[j][i])}
                  if (tempArrayGH[j][i]===tempArrayGH[j][i+1]) {delete(tempArrayGH[j][i])}
                  if (tempArrayDA[j][i]===tempArrayDA[i+1]) {delete(tempArrayDA[j][i])}
                  if (tempArrayFA[i]===tempArrayFA[i+1]) {delete(tempArrayFA[i])}
                  if (tempArrayGA[i]===tempArrayGA[i+1]) {delete(tempArrayGA[i])}
                }}
                console.log(tempArrayGH, tempArrayDH)
                  for (i=0;i<1200;i++) { for (j=0;j<3;j++) {if (!tempArrayDH[j][i]) {} else {tempArrayDH1[j].push(tempArrayDH[j][i],i)}
                  if (!tempArrayFH[j][i]) {} else {tempArrayFH1[j].push(tempArrayFH[j][i],i)}
                  if (!tempArrayGH[j][i]) {} else {tempArrayGH1[j].push(tempArrayGH[j][i],i)}
                  if (!tempArrayDA[j][i]) {} else {tempArrayDA1[0].push(tempArrayDA[j][i],i)}
                  if (!tempArrayFA[i]) {} else {tempArrayFA1[0].push(tempArrayFA[i],i)}
                  if (!tempArrayGA[i]) {} else {tempArrayGA1[0].push(tempArrayGA[i],i)}
                }}
                console.log(tempArrayDH1, tempArrayFH1, tempArrayGH1, tempArrayDA1, tempArrayFA1, tempArrayGA1)
                // for (i=0;i<tempArrayFH1.length/2;i++) {if (tempArrayFH1[2*i+2]-tempArrayFH1[2*i]<4 {})}
              }); // end second .then shifts
          }); // end second .then gamecenter;
      } // end displayGameData 
    } // end second .then from getinputvalue
    );
} // end getInput Value function 