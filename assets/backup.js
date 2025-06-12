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

  else if ((shiftsArray[i].position==='G')&&(shiftsArray[i].team==='H')) {if (shiftsArray[i].shiftsObject.startTime1.length>1) {startTimeArray=shiftsArray[i].shiftsObject.startTime1.split(',');
    endTimeArray=shiftsArray[i].shiftsObject.endTime1.split(',');
  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
    for (k=startSeconds;k<endSeconds;k++) {tempArrayGH[k]=tempArrayGH[k]+1}
  }}
  else {tempIndex1=shiftsArray[i].shiftsObject.startTime1[0].slice(2); tempIndex2=shiftsArray[i].shiftsObject.endTime1[0].slice(2);
    startSeconds=Number(tempIndex1.split(':')[0])*60+tempIndex.split(':')[1];
    endSeconds=Number(tempIndex2.split(':')[0])*60+tempIndex.split(':')[1];
    for (k=startSeconds;k<endSeconds;k++) {tempArrayGH[k]=tempArrayGH[k]+1}
  }}