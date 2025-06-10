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
              this.shiftsObject = {startTime1: [], endTime1: [], startTime2: [], endTime2: [], startTime3: [], endTime3: []}
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
                  for (j=0;j<shiftsArray.length;j++) {if ((data_shifts.data[i].playerId===shiftsArray[j].playerId)&&(data_shifts.data[i].period===1)) {shiftsArray[j].shiftsObject.startTime1 = shiftsArray[j].shiftsObject.startTime1 + ', ' + data_shifts.data[i].startTime, shiftsArray[j].shiftsObject.endTime1 = shiftsArray[j].shiftsObject.endTime1 + ', ' + data_shifts.data[i].endTime}
                  else if ((data_shifts.data[i].playerId===shiftsArray[j].playerId)&&(data_shifts.data[i].period===2)) {shiftsArray[j].shiftsObject.startTime2 = shiftsArray[j].shiftsObject.startTime2 + ', ' + data_shifts.data[i].startTime, shiftsArray[j].shiftsObject.endTime2 = shiftsArray[j].shiftsObject.endTime2 + ', ' + data_shifts.data[i].endTime}
                  else if ((data_shifts.data[i].playerId===shiftsArray[j].playerId)&&(data_shifts.data[i].period===3)) {shiftsArray[j].shiftsObject.startTime3 = shiftsArray[j].shiftsObject.startTime3 + ', ' + data_shifts.data[i].startTime, shiftsArray[j].shiftsObject.endTime3 = shiftsArray[j].shiftsObject.endTime3 + ', ' + data_shifts.data[i].endTime}
                  // else (console.log ('only three periods count, now it is period ', data_shifts.data[i].period))
                }
                }}
                console.log(shiftsArray, shiftsArray[2].shiftsObject);
                // attempting to write code but not a lot of time today checking lines before 102 and then before 116
                // reading old script it is quite difficult. ok I have analog of dArray and fArray. Then I created dArrayTemp and fArayTemp in lines 100, 101. Just combined all d shifts and all f shifts. 
                // then I created an array of 3 x 1200 0s. that was dArrayTemp2 and fArrayTemp2 in line 105. 
                // then I add 1 for each second of the shift. So in the end I know when it was 2D + 3F
                // then I ran cycle to eliminate end shift start shift pairs ???
                // next cycle to be deleted two lines
                for (i=1;i<4;i++) { startTimeX='startTime'+i;
                  console.log(typeof startTimeX, startTimeX, shiftsArray[4].shiftsObject.startTimeX, shiftsArray[4].shiftsObject.startTime1)}
                  tempArrayDH=[]; tempArrayFH=[];tempArrayGH=[];tempArrayDA=[];tempArrayFA=[];tempArrayGA=[];tempArrayGH1=[];tempArrayDH1=[];tempArrayFH1=[];tempArrayDA1=[];tempArrayFA1=[];tempArrayGA1=[];
                  for (i=0;i<1200;i++) {tempArrayFH.push(0); tempArrayDH.push(0); tempArrayGH.push(0); tempArrayDA.push(0); tempArrayFA.push(0)}
                  // start DH
                  for (i=0;i<shiftsArray.length;i++) {if ((shiftsArray[i].position==='D')&&(shiftsArray[i].team==='H')) {startTimeArray=shiftsArray[i].shiftsObject.startTime1.split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime1.split(',');
                  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {tempArrayDH[k]=tempArrayDH[k]+1;                      
                    }}}
                    //start FH 
                  else if ((shiftsArray[i].position==='F')&&(shiftsArray[i].team==='H')) {startTimeArray=shiftsArray[i].shiftsObject.startTime1.split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime1.split(',');
                  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {tempArrayFH[k]=tempArrayFH[k]+1;                      
                    }}}
                    //start GH 
                  else if ((shiftsArray[i].position==='G')&&(shiftsArray[i].team==='H')) {startTimeArray=shiftsArray[i].shiftsObject.startTime1.split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime1.split(',');
                  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) {tempArrayGH[k]=tempArrayGH[k]+1;  
                    }}}
                    if ((shiftsArray[i].position==='D')&&(shiftsArray[i].team==='A')) {startTimeArray=shiftsArray[i].shiftsObject.startTime1.split(',');
                      endTimeArray=shiftsArray[i].shiftsObject.endTime1.split(',');
                    for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                      endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                      for (k=startSeconds;k<endSeconds;k++) {tempArrayDA[k]=tempArrayDA[k]+1;                      
                      }}}
                  
                // console.log(tempArrayDH)
                } // end i cycle 
                // tempArrayDH1=tempArrayDH1.push(tempArrayDH[0],0)
                  for (i=0;i<1200;i++) {if (tempArrayDH[i]===tempArrayDH[i+1]) {delete(tempArrayDH[i])}
                  if (tempArrayFH[i]===tempArrayFH[i+1]) {delete(tempArrayFH[i])}
                  if (tempArrayGH[i]===tempArrayGH[i+1]) {delete(tempArrayGH[i])}
                  if (tempArrayDA[i]===tempArrayDA[i+1]) {delete(tempArrayDA[i])}
                }
                  for (i=0;i<1200;i++) {if (!tempArrayDH[i]) {} else {tempArrayDH1.push(tempArrayDH[i],i)}
                  if (!tempArrayFH[i]) {} else {tempArrayFH1.push(tempArrayFH[i],i)}
                  if (!tempArrayGH[i]) {} else {tempArrayGH1.push(tempArrayGH[i],i)}
                  if (!tempArrayDA[i]) {} else {tempArrayDA1.push(tempArrayDA[i],i)}
                }
                  // tempArrayDH1.unshift(0,tempArrayDH[0])
                console.log(tempArrayDH1, tempArrayFH1, tempArrayGH1)
              }); // end second .then shifts

          }); // end second .then gamecenter;
      } // end displayGameData 
    } // end second .then from getinputvalue
    );
} // end getInput Value function 