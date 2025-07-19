var scheduleContent = document.getElementById('schedule'); var gameId; var inputVal = '2021'; standingsArray = []; linesArray10 = []; lineUpCount=[0,0,0,0,0,0]
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
        fetch(requestURL, { "method": "GET", "headers": {}})
          .then(function (response) { return response.json() })
          .then(function (data) {
            const gameInfo = document.createElement('section'); gameInfo.setAttribute('id', 'gameInfo');
            document.getElementById('schedule').appendChild(gameInfo);
            var gameTitle = document.createElement('h2'); gameTitle.textContent = '';
            gameTitle.innerHTML = 'You are watching analysis for ' + data.awayTeam.abbrev + ' at ' + data.homeTeam.abbrev + ' game' + ' on ' + formatted;
            document.getElementById('gameInfo').appendChild(gameTitle); shiftsArray = [];

            function Shifts(playerId, jerseyNumber, name, position, team, shiftsObject) {
              this.playerId = playerId; this.jerseyNumber = jerseyNumber; this.name = name; this.position = position;
              this.team = team; this.shiftsObject = {startTime: [[],[],[]], endTime: [[],[],[]]}}
            for (i = 0; i < data.playerByGameStats.homeTeam.goalies.length; i++) { const CurrentPlayer = new Shifts(data.playerByGameStats.homeTeam.goalies[i].playerId, data.playerByGameStats.homeTeam.goalies[i].sweaterNumber, data.playerByGameStats.homeTeam.goalies[i].name, 'G', 'H');
              shiftsArray.push(CurrentPlayer); lineUpCount[0]=lineUpCount[0]+1}
            for (i = 0; i < data.playerByGameStats.homeTeam.defense.length; i++) { const CurrentPlayer = new Shifts(data.playerByGameStats.homeTeam.defense[i].playerId, data.playerByGameStats.homeTeam.defense[i].sweaterNumber, data.playerByGameStats.homeTeam.defense[i].name, 'D', 'H');
              shiftsArray.push(CurrentPlayer); lineUpCount[1]=lineUpCount[1]+1}
            for (i = 0; i < data.playerByGameStats.homeTeam.forwards.length; i++) { const CurrentPlayer = new Shifts(data.playerByGameStats.homeTeam.forwards[i].playerId, data.playerByGameStats.homeTeam.forwards[i].sweaterNumber, data.playerByGameStats.homeTeam.forwards[i].name, 'F', 'H');
              shiftsArray.push(CurrentPlayer); lineUpCount[2]=lineUpCount[2]+1}
            for (i = 0; i < data.playerByGameStats.awayTeam.goalies.length; i++) { const CurrentPlayer = new Shifts(data.playerByGameStats.awayTeam.goalies[i].playerId, data.playerByGameStats.awayTeam.goalies[i].sweaterNumber, data.playerByGameStats.awayTeam.goalies[i].name, 'G', 'A');
              shiftsArray.push(CurrentPlayer); lineUpCount[3]=lineUpCount[3]+1}
            for (i = 0; i < data.playerByGameStats.homeTeam.defense.length; i++) { const CurrentPlayer = new Shifts(data.playerByGameStats.awayTeam.defense[i].playerId, data.playerByGameStats.awayTeam.defense[i].sweaterNumber, data.playerByGameStats.awayTeam.defense[i].name, 'D', 'A');
              shiftsArray.push(CurrentPlayer); lineUpCount[4]=lineUpCount[4]+1}
            for (i = 0; i < data.playerByGameStats.homeTeam.forwards.length; i++) { const CurrentPlayer = new Shifts(data.playerByGameStats.awayTeam.forwards[i].playerId, data.playerByGameStats.awayTeam.forwards[i].sweaterNumber, data.playerByGameStats.awayTeam.forwards[i].name, 'F', 'A');
              shiftsArray.push(CurrentPlayer); lineUpCount[5]=lineUpCount[5]+1}
           // var shiftsURL = 'https://corsproxy.io/?key=2ddedfd8&url=https://api.nhle.com/stats/rest/en/shiftcharts?cayenneExp=gameId=' + gameId;
           // var requestURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/gamecenter/' + gameId + '/boxscore';
           var shiftsURL = 'https://cors-anywhere.herokuapp.com/https://api.nhle.com/stats/rest/en/shiftcharts?cayenneExp=gameId=' + gameId;
            fetch(shiftsURL, { "method": "GET", "headers": {} })
              .then(function (response) { return response.json() })
              .then(function (data_shifts) { console.log('I am in second shift then', data_shifts.data, shiftsArray[0]);
                for (i=0;i<data_shifts.data.length;i++) {if (data_shifts.data[i].typeCode===517) {
                  for (j=0;j<shiftsArray.length;j++) { for (k=0;k<3;k++) {
                    if ((data_shifts.data[i].playerId===shiftsArray[j].playerId)&&(data_shifts.data[i].period===k+1)) {shiftsArray[j].shiftsObject.startTime[k] = shiftsArray[j].shiftsObject.startTime[k] + ', ' + data_shifts.data[i].startTime, shiftsArray[j].shiftsObject.endTime[k] = shiftsArray[j].shiftsObject.endTime[k] + ', ' + data_shifts.data[i].endTime}}
                      }}}
                console.log(shiftsArray, shiftsArray[2].shiftsObject);
                // then I ran cycle to eliminate end shift start shift pairs ???
                  tempArrayD=[[],[],[],[],[],[]]; tempArrayF=[[],[],[],[],[],[]];tempArrayG=[[],[],[],[],[],[]];tempArrayG1=[[],[],[],[],[],[]];tempArrayD1=[[],[],[],[],[],[]];tempArrayF1=[[],[],[],[],[],[]];tempArrayDA3=[[],[],[]]; 
                  for (i=0;i<1200;i++) { for (j=0;j<3;j++) { tempArrayDA3[j].push(0) }}
                  for (i=0;i<1200;i++) { for (j=0;j<6;j++) { tempArrayF[j].push(0); tempArrayD[j].push(0); tempArrayG[j].push(1) }}
                  // start DH, FH, GA, GH, DA, FA
                  for (i=0;i<shiftsArray.length;i++) { for (h=0;h<3;h++) { // i is players should be 40 on two teams but h is 3 periods                    
                    {if (shiftsArray[i].shiftsObject.startTime[h].length>0) { startTimeArray=shiftsArray[i].shiftsObject.startTime[h].split(',');
                    endTimeArray=shiftsArray[i].shiftsObject.endTime[h].split(',');
                    for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
                    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
                    for (k=startSeconds;k<endSeconds;k++) { if ((shiftsArray[i].position==='D')&&(shiftsArray[i].team==='H')) {tempArrayD[h][k]=tempArrayD[h][k]+1}
                      else if ((shiftsArray[i].position==='F')&&(shiftsArray[i].team==='H')) {tempArrayF[h][k]=tempArrayF[h][k]+1}
                      else if ((shiftsArray[i].position==='G')&&(shiftsArray[i].team==='H')) {tempArrayG[h][k]=tempArrayG[h][k]+1}
                      else if ((shiftsArray[i].position==='D')&&(shiftsArray[i].team==='A')) {tempArrayD[3+h][k]=tempArrayD[3+h][k]+1}
                      else if ((shiftsArray[i].position==='F')&&(shiftsArray[i].team==='A')) {tempArrayF[3+h][k]=tempArrayF[3+h][k]+1}
                      else if ((shiftsArray[i].position==='G')&&(shiftsArray[i].team==='A')) {tempArrayG[3+h][k]=tempArrayG[3+h][k]+1}
                    }}}}
                }} // end i,h cycle
                
                for (i=0;i<1200;i++) { for (j=0;j<6;j++) {if (tempArrayD[j][i]===tempArrayD[j][i+1]) {delete(tempArrayD[j][i])}
                  if (tempArrayF[j][i]===tempArrayF[j][i+1]) {delete(tempArrayF[j][i])}
                  if (tempArrayG[j][i]===tempArrayG[j][i+1]) {delete(tempArrayG[j][i])}
                }} 
                for (i=0;i<1200;i++) { for (j=0;j<6;j++) {if (!tempArrayD[j][i]) {} else {tempArrayD1[j].push(tempArrayD[j][i],i)}
                if (!tempArrayF[j][i]) {} else {tempArrayF1[j].push(tempArrayF[j][i],i)}
                if (!tempArrayG[j][i]) {} else {tempArrayG1[j].push(tempArrayG[j][i],i)}
              }}
                // fiveOnFive3 is when team played with 2D; fiveOnFive4 is when team played with 3F; fiveOnFive5 is when team played with 1G; 
                fiveOnFive=[[],[],[],[],[],[]]; fiveOnFive3=tempArrayD1; fiveOnFive4=tempArrayF1; fiveOnFive5=tempArrayG1; 
                fiveOnFive6=[[],[],[],[],[],[]]; fiveOnFive7=[[],[],[],[],[],[]]; fiveOnFive8=[[],[],[],[],[],[]]; fiveOnFive9=[[],[],[],[],[],[]]; fiveOnFive10=[[],[],[],[],[],[]]; fiveOnFive11=[[],[],[]];
               
              for (i=0;i<6;i++) { // first three periods home team then 3 periods away team total 6
                for (j=tempArrayD1[i].length/2-1; j>0; j--) {if (fiveOnFive3[i][2*j+1]-fiveOnFive3[i][2*j-1]<4) {
                  tempArray1=fiveOnFive3[i].slice(0,2*j-2); tempArray2=fiveOnFive3[i].slice(2*j+2);
                     fiveOnFive3[i]=tempArray1.concat(tempArray2)
                }}
              for (j=tempArrayF1[i].length/2-1; j>0; j--) {if (fiveOnFive4[i][2*j+1]-fiveOnFive4[i][2*j-1]<4) {
                tempArray1=fiveOnFive4[i].slice(0,2*j-2); tempArray2=fiveOnFive4[i].slice(2*j+2);
                   fiveOnFive4[i]=tempArray1.concat(tempArray2) }}
              for (j=tempArrayG1[i].length/2-1; j>0; j--) {if (fiveOnFive5[i][2*j+1]-fiveOnFive5[i][2*j-1]<4) {
                tempArray1=fiveOnFive5[i].slice(0,2*j-2); tempArray2=fiveOnFive5[i].slice(2*j+2);
                   fiveOnFive5[i]=tempArray1.concat(tempArray2) }}
              // fiveOnFive6, fiveOnFive7, fiveOnFive8 are arrays when team played with 2D, 3F, 1G. Index 0-2 for home team in 3 periods, index 3-5 for away team in 3 periods 
              // then fiveOnFive9 is when a team played with 2D and 3F, fiveOnFive10 is when a team played with 1G 2D 3F. 
              // will add condition if a team started period with 1D or with 2F or with 4F. Other numbers are unlikelys
              if (fiveOnFive3[i][0]===2) {fiveOnFive6[i].push(0, fiveOnFive3[i][1])}
              if (fiveOnFive4[i][0]===3) {fiveOnFive7[i].push(0, fiveOnFive4[i][1])}
              if (fiveOnFive5[i][0]===2) {fiveOnFive8[i].push(0, fiveOnFive5[i][1])}
              for (j=1;j<fiveOnFive3[i].length/2;j++) { if (fiveOnFive3[i][2*j]===2) {fiveOnFive6[i].push(fiveOnFive3[i][2*j-1],fiveOnFive3[i][2*j+1])} }
              for (j=1;j<fiveOnFive4[i].length/2;j++) { if (fiveOnFive4[i][2*j]===3) {fiveOnFive7[i].push(fiveOnFive4[i][2*j-1],fiveOnFive4[i][2*j+1])} }
              for (j=1;j<fiveOnFive5[i].length/2;j++) { if (fiveOnFive5[i][2*j]===2) {fiveOnFive8[i].push(fiveOnFive5[i][2*j-1],fiveOnFive5[i][2*j+1])} }
              for (j=0;j<fiveOnFive6[i].length/2;j++) {for (k=0;k<fiveOnFive7[i].length/2;k++) {
                if ((fiveOnFive6[i][2*j]>=fiveOnFive7[i][2*k])&&(fiveOnFive6[i][2*j+1]<=fiveOnFive7[i][2*k+1])) {fiveOnFive9[i].push(fiveOnFive6[i][2*j],fiveOnFive6[i][2*j+1]) }
                else if ((fiveOnFive6[i][2*j]<=fiveOnFive7[i][2*k])&&(fiveOnFive6[i][2*j+1]>=fiveOnFive7[i][2*k+1])) {fiveOnFive9[i].push(fiveOnFive7[i][2*k],fiveOnFive7[i][2*k+1]) }
                else if ((fiveOnFive6[i][2*j]<=fiveOnFive7[i][2*k])&&(fiveOnFive6[i][2*j+1]>=fiveOnFive7[i][2*k+1])&&(fiveOnFive6[i][2*j]<fiveOnFive7[i][2*k+1])) {fiveOnFive9[i].push(fiveOnFive6[i][2*j],fiveOnFive7[i][2*k+1])}
                else if ((fiveOnFive6[i][2*j]<=fiveOnFive7[i][2*k])&&(fiveOnFive6[i][2*j+1]<=fiveOnFive7[i][2*k+1])&&(fiveOnFive6[i][2*j+1]>fiveOnFive7[i][2*k])) {fiveOnFive9[i].push(fiveOnFive7[i][2*k],fiveOnFive6[i][2*j+1])
                }}}
                for (j=0;j<fiveOnFive9[i].length/2;j++) {for (k=0;k<fiveOnFive8[i].length/2;k++) {
                  if ((fiveOnFive9[i][2*j]>=fiveOnFive8[i][2*k])&&(fiveOnFive9[i][2*j+1]<=fiveOnFive8[i][2*k+1])) {fiveOnFive10[i].push(fiveOnFive9[i][2*j],fiveOnFive9[i][2*j+1])}
                  else if ((fiveOnFive9[i][2*j]<=fiveOnFive8[i][2*k])&&(fiveOnFive9[i][2*j+1]>=fiveOnFive8[i][2*k+1])) {fiveOnFive10[i].push(fiveOnFive8[i][2*k],fiveOnFive8[i][2*k+1])}
                  else if ((fiveOnFive9[i][2*j]<=fiveOnFive8[i][2*k])&&(fiveOnFive9[i][2*j+1]>=fiveOnFive8[i][2*k+1])&&(fiveOnFive9[i][2*j]<fiveOnFive8[i][2*k+1])) { fiveOnFive10[i].push(fiveOnFive9[i][2*j],fiveOnFive8[i][2*k+1])}
                  else if ((fiveOnFive9[i][2*j]<=fiveOnFive8[i][2*k])&&(fiveOnFive9[i][2*j+1]<=fiveOnFive8[i][2*k+1])&&(fiveOnFive9[i][2*j+1]>fiveOnFive8[i][2*k])) {fiveOnFive9[i].push(fiveOnFive8[i][2*k],fiveOnFive9[i][2*j+1])
                  }}}            
            } // end i=0; i<6 loop
            for (i=0;i<3;i++) {
              for (j=0;j<fiveOnFive10[i].length/2;j++) {for (k=0;k<fiveOnFive10[i+3].length/2;k++) {
                if ((fiveOnFive10[i][2*j]>=fiveOnFive10[i+3][2*k])&&(fiveOnFive10[i][2*j+1]<=fiveOnFive10[i+3][2*k+1])) {fiveOnFive11[i].push(fiveOnFive10[i][2*j],fiveOnFive10[i][2*j+1])
                  console.log('case1',i,j,k,fiveOnFive10[i][2*j],fiveOnFive10[i][2*j+1])
                }
                else if ((fiveOnFive10[i][2*j]<=fiveOnFive10[i+3][2*k])&&(fiveOnFive10[i][2*j+1]>=fiveOnFive10[i+3][2*k+1])) {fiveOnFive11[i].push(fiveOnFive10[i+3][2*k],fiveOnFive10[i+3][2*k+1])
                  console.log('case2',i,j,k,fiveOnFive10[i+3][2*k],fiveOnFive10[i+3][2*k+1])
                }
                else if ((fiveOnFive10[i][2*j]<=fiveOnFive10[i+3][2*k])&&(fiveOnFive10[i][2*j+1]>=fiveOnFive10[i+3][2*k+1])&&(fiveOnFive10[i][2*j]<fiveOnFive10[i+3][2*k+1])) { console.log('case3',i,j,k,fiveOnFive10[i][2*j],fiveOnFive10[i+3][2*k+1])
                  fiveOnFive11[i].push(fiveOnFive10[i][2*j],fiveOnFive10[i+3][2*k+1])}                
                else if ((fiveOnFive10[i][2*j]<=fiveOnFive10[i+3][2*k])&&(fiveOnFive10[i][2*j+1]<=fiveOnFive10[i+3][2*k+1])&&(fiveOnFive10[i][2*j+1]>fiveOnFive10[i+3][2*k])) {fiveOnFive11[i].push(fiveOnFive10[i+3][2*k],fiveOnFive10[i][2*j+1])
                  console.log('case4',i,j,k,fiveOnFive11[i][2*k],fiveOnFive11[i][2*j+1])
                }}}        
            }
                 console.log(fiveOnFive6, fiveOnFive7, fiveOnFive8, fiveOnFive10, fiveOnFive11, lineUpCount);
                 for (i=0;i<2;i++) {for (j=20*i+(lineUpCount[3*i+0]+lineUpCount[3*i+1]+1);j<20*(i+1);j++) {}}
              
              }); // end second .then shifts
          }); // end second .then gamecenter;
      } // end displayGameData 
    } // end second .then from getinputvalue
    );
} // end getInput Value function 