{startTimeArray=shiftsArray[i].shiftsObject.startTime1.split(',');
    endTimeArray=shiftsArray[i].shiftsObject.endTime1.split(',');
  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
    for (k=startSeconds;k<endSeconds;k++) {tempArrayDH[0][k]=tempArrayDH[0][k]+1}}
    startTimeArray=shiftsArray[i].shiftsObject.startTime2.split(',');
    endTimeArray=shiftsArray[i].shiftsObject.endTime2.split(',');
  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
    for (k=startSeconds;k<endSeconds;k++) {tempArrayDH[1][k]=tempArrayDH[1][k]+1}}
    startTimeArray=shiftsArray[i].shiftsObject.startTime3.split(',');
    endTimeArray=shiftsArray[i].shiftsObject.endTime3.split(',');
    console.log(startTimeArray, endTimeArray)
  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
    for (k=startSeconds;k<endSeconds;k++) {tempArrayDH[2][k]=tempArrayDH[2][k]+1
    }}}   
{startTimeArray=shiftsArray[i].shiftsObject.startTime1.split(',');
    endTimeArray=shiftsArray[i].shiftsObject.endTime1.split(',');
  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
    for (k=startSeconds;k<endSeconds;k++) {tempArrayFH[0][k]=tempArrayFH[0][k]+1}}
    startTimeArray=shiftsArray[i].shiftsObject.startTime2.split(',');
    endTimeArray=shiftsArray[i].shiftsObject.endTime2.split(',');
  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
    for (k=startSeconds;k<endSeconds;k++) {tempArrayFH[1][k]=tempArrayFH[1][k]+1}}
    startTimeArray=shiftsArray[i].shiftsObject.startTime3.split(',');
    endTimeArray=shiftsArray[i].shiftsObject.endTime3.split(',');
  for (j=1;j<startTimeArray.length;j++) {startSeconds=Number(startTimeArray[j].split(':')[0])*60+Number(startTimeArray[j].split(':')[1]);
    endSeconds=Number(endTimeArray[j].split(':')[0])*60+Number(endTimeArray[j].split(':')[1]);
    for (k=startSeconds;k<endSeconds;k++) {tempArrayFH[2][k]=tempArrayFH[2][k]+1}}
  }