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

                    lineByLine223.innerHTML=lineByLine2(finalLineup3[0][0],finalLineup3[0][1],finalLineup3[0][2],finalLineup3[1][0],finalLineup3[1][1],finalLineup3[1][2])[1][0]+' '+lineByLine2(finalLineup3[0][0],finalLineup3[0][1],finalLineup3[0][2],finalLineup3[1][0],finalLineup3[1][1],finalLineup3[1][2])[1][1]+'<br>'
                    +lineByLine2(finalLineup3[0][0],finalLineup3[0][1],finalLineup3[0][2],finalLineup3[1][0],finalLineup3[1][1],finalLineup3[1][2])[1][2]+' '+lineByLine2(finalLineup3[0][0],finalLineup3[0][1],finalLineup3[0][2],finalLineup3[1][0],finalLineup3[1][1],finalLineup3[1][2])[1][3]+'<br>'+
                    lineByLine2(finalLineup3[0][0],finalLineup3[0][1],finalLineup3[0][2],finalLineup3[1][0],finalLineup3[1][1],finalLineup3[1][2])[1][4]+' '+lineByLine2(finalLineup3[0][0],finalLineup3[0][1],finalLineup3[0][2],finalLineup3[1][0],finalLineup3[1][1],finalLineup3[1][2])[1][5];
                    lineByLine223.innerHTML=lineByLine2(finalLineup3[0][0],finalLineup3[0][1],finalLineup3[0][2],finalLineup3[1][0],finalLineup3[1][1],finalLineup3[1][2])[1][0]+' '+lineByLine2(finalLineup3[0][0],finalLineup3[0][1],finalLineup3[0][2],finalLineup3[1][0],finalLineup3[1][1],finalLineup3[1][2])[1][1]+'<br>'
                    +lineByLine2(finalLineup3[0][0],finalLineup3[0][1],finalLineup3[0][2],finalLineup3[1][0],finalLineup3[1][1],finalLineup3[1][2])[1][2]+' '+lineByLine2(finalLineup3[0][0],finalLineup3[0][1],finalLineup3[0][2],finalLineup3[1][0],finalLineup3[1][1],finalLineup3[1][2])[1][3]+'<br>'+
                    lineByLine2(finalLineup3[0][0],finalLineup3[0][1],finalLineup3[0][2],finalLineup3[1][0],finalLineup3[1][1],finalLineup3[1][2])[1][4]+' '+lineByLine2(finalLineup3[0][0],finalLineup3[0][1],finalLineup3[0][2],finalLineup2[1][0],finalLineup3[1][1],finalLineup3[1][2])[1][5];
                    // lineByLine243.innerHTML=lineByLine1(0,0,0,0)[0][0]+' '+lineByLine1(0,0,0,0)[0][1]+' '+'<br>'+lineByLine1(0,0,0,1)[0][2]+' '+lineByLine1(0,0,0,1)[0][3]+' '+'<br>'+lineByLine1(0,0,0,2)[0][4]+' '+lineByLine1(0,0,0,2)[0][5]+' ';

// add 5x5 array if possible

                    function lineByLine2(q,r,s,t,u,v) {shiftsLine2=[]; for (p=0;p<15;p++) {shiftsLine2.push([])} shiftsLine2[13]=[[],[],[]]
                    
                    for (n=0;n<3;n++) {// console.log(fArray[0][r][n], fArray[0][q][n], 'q=', q, 'r=', r, 'n=', n); // n is the period, h is 0 or 1 home away team 
                    for (l=0;l<fArray[0][q][n].length/2;l++) { for (m=0;m<fArray[0][r][n].length/2;m++) {if ((fArray[0][r][n][2*m]>=fArray[0][q][n][2*l])&&(fArray[0][r][n][2*m]<=fArray[0][q][n][2*l+1]))
                    {if (fArray[0][r][n][2*m+1]>=fArray[0][q][n][2*l+1]) {shiftsLine2[n].push(fArray[0][r][n][2*m], fArray[0][q][n][2*l+1]) }
                    else { shiftsLine2[n].push(fArray[0][r][n][2*m], fArray[0][r][n][2*m+1]) }}
                    else if ((fArray[0][r][n][2*m]<=fArray[0][q][n][2*l])&&(fArray[0][r][n][2*m+1]>=fArray[0][q][n][2*l])) {
                      if (fArray[0][r][n][2*m+1]>=fArray[0][q][n][2*l+1]) { shiftsLine2[n].push(fArray[0][q][n][2*l], fArray[0][q][n][2*l+1]) }
                      else {shiftsLine2[n].push(fArray[0][q][n][2*l], fArray[0][r][n][2*m+1])}}
                    }} // end first m,l loop
                    // start second l,m loop
                    for (l=0;l<shiftsLine2[n].length/2;l++) { for (m=0;m<fArray[0][s][n].length/2;m++) { if ((fArray[0][s][n][2*m]>=shiftsLine2[n][2*l])&&(fArray[0][s][n][2*m]<=shiftsLine2[n][2*l+1]))
                    {if (fArray[0][s][n][2*m+1]>=shiftsLine2[n][2*l+1]) {shiftsLine2[n+3].push(fArray[0][s][n][2*m], shiftsLine2[n][2*l+1]) }
                      else { shiftsLine2[n+3].push(fArray[0][s][n][2*m], fArray[0][s][n][2*m+1]) }}
                      else if ((fArray[0][s][n][2*m]<=shiftsLine2[n][2*l])&&(fArray[0][s][n][2*m+1]>=shiftsLine2[n][2*l])) {
                      if (fArray[0][s][n][2*m+1]>=shiftsLine2[n][2*l+1]) { shiftsLine2[n+3].push(shiftsLine2[n][2*l], shiftsLine2[n][2*l+1]) }
                      else {shiftsLine2[n+3].push(shiftsLine2[n][2*l], fArray[0][s][n][2*m+1])}}
                    }} // end second m,l loop 
                    console.log(fArray[1])
                    for (l=0;l<fArray[1][t][n].length/2;l++) { // console.log('t=',t,'u=',u,'n=',n,'length=',fArray[1][t][n].length/2,fArray[1][u][n],fArray[1][v][n])
                      for (m=0;m<fArray[1][u][n].length/2;m++) {if ((fArray[1][u][n][2*m]>=fArray[1][t][n][2*l])&&(fArray[1][u][n][2*m]<=fArray[1][t][n][2*l+1]))
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