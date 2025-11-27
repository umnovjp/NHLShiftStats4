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

                    // q,r,s are forwards on home team, t,u,v are forwards on away team values are 0...11 if 12F or 0...10 if 11F will modify this function on the flight tomorrow
                    function lineByLine2(q,r,s,t,u,v) { // created an array with 15 elements to add new element
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
                    for (l=0;l<shiftsLine2[6+n].length/2;l++) { for (m=0;m<fArray[1][v][n].length/2;m++) { // console.log('error', fArray[1], 'l=', l, 'm=', m, 'n=', n);
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

                                for (l=0;l<shiftsLine2[9+n].length/2;l++) {for (m=0;m<fiveOnFive6[n].length/2;m++) {
                    if ((fiveOnFive6[n][2*m]>=shiftsLine2[9+n][2*l])&&(fiveOnFive6[n][2*m]<=shiftsLine2[9+n][2*l+1]))
                    {if (fiveOnFive6[n][2*m+1]>=shiftsLine2[9+n][2*l+1]) {shiftsLine2[12+n].push(fiveOnFive6[n][2*m], shiftsLine2[9+n][2*l+1]) }
                    else { shiftsLine2[12+n].push(fiveOnFive6[n][2*m], fiveOnFive6[n][2*m+1]) }}
                    else if ((fiveOnFive6[n][2*m]<=shiftsLine2[9+n][2*l])&&(fiveOnFive6[n][2*m+1]>=shiftsLine2[9+n][2*l])) {
                    if (fiveOnFive6[n][2*m+1]>=shiftsLine2[9+n][2*l+1]) { shiftsLine2[12+n].push(shiftsLine2[9+n][2*l], shiftsLine2[9+n][2*l+1]) }
                    else {shiftsLine2[12+n].push(shiftsLine2[9+n][2*l], fiveOnFive6[n][2*m+1])}}
                    }} // end fiveOnFive6 m,l loop