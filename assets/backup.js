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
    // 
  }); // end second .then shifts