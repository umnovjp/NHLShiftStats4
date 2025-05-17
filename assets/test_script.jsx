function lineByLine2(h,q,r,s,t,u,v) {shiftsLine2=[]; for (p=0;p<14;p++) {shiftsLine2.push([])} shiftsLine2[13]=[[],[]]
                    
for (n=0;n<3;n++) {// n is the period but i is period
 //f is line number 0,1,2,3, j is opposite team line number 0,1,2,3, h is 0 or 1 home away team 
for (l=0;l<fArray[h][q][n].length/2;l++) { for (m=0;m<fArray[h][r][n].length/2;m++) {if ((fArray[h][r][n][2*m]>=fArray[h][q][n][2*l])&&(fArray[h][r][n][2*m]<=fArray[h][q][n][2*l+1]))
{if (fArray[h][r][n][2*m+1]>=fArray[h][q][n][2*l+1]) {shiftsLine2[n].push(fArray[h][r][n][2*m], fArray[h][q][n][2*l+1]) }
else { shiftsLine2[n].push(fArray[h][r][n][2*m], fArray[h][r][n][2*m+1]) }}
else if ((fArray[h][r][n][2*m]<=fArray[h][q][n][2*l])&&(fArray[h][r][n][2*m+1]>=fArray[h][q][n][2*l])) {
  if (fArray[h][r][n][2*m+1]>=fArray[h][q][n][2*l+1]) { shiftsLine2[n].push(fArray[h][q][n][2*l], fArray[h][q][n][2*l+1]) }
  else {shiftsLine2[n].push(fArray[h][q][n][2*l], fArray[h][r][n][2*m+1])}}
}} // end first m,l loop 
// start second l,m loop
for (l=0;l<shiftsLine2[n].length/2;l++) { for (m=0;m<fArray[h][s][n].length/2;m++) {if ((fArray[h][s][n][2*m]>=shiftsLine2[n][2*l])&&(fArray[h][s][n][2*m]<=shiftsLine2[n][2*l+1]))
{if (fArray[h][s][n][2*m+1]>=shiftsLine2[n][2*l+1]) {shiftsLine2[n+3].push(fArray[h][s][n][2*m], shiftsLine2[n][2*l+1]) }
  else { shiftsLine2[n+3].push(fArray[h][s][n][2*m], fArray[h][s][n][2*m+1]) }}
  else if ((fArray[h][s][n][2*m]<=shiftsLine2[n][2*l])&&(fArray[h][s][n][2*m+1]>=shiftsLine2[n][2*l])) {
  if (fArray[h][s][n][2*m+1]>=shiftsLine2[n][2*l+1]) { shiftsLine2[n+3].push(shiftsLine2[n][2*l], shiftsLine2[n][2*l+1]) }
  else {shiftsLine2[n+3].push(shiftsLine2[n][2*l], fArray[h][s][n][2*m+1])}}
}} // end second m,l loop 
for (l=0;l<fArray[1-h][t][n].length/2;l++) { for (m=0;m<fArray[1-h][u][n].length/2;m++) {if ((fArray[1-h][u][n][2*m]>=fArray[1-h][t][n][2*l])&&(fArray[1-h][u][n][2*m]<=fArray[1-h][t][n][2*l+1]))
{if (fArray[1-h][u][n][2*m+1]>=fArray[1-h][t][n][2*l+1]) {shiftsLine2[6+n].push(fArray[1-h][u][n][2*m], fArray[1-h][t][n][2*l+1]) }
else { shiftsLine2[6+n].push(fArray[1-h][u][n][2*m], fArray[1-h][u][n][2*m+1]) }}
else if ((fArray[1-h][u][n][2*m]<=fArray[1-h][t][n][2*l])&&(fArray[1-h][u][n][2*m+1]>=fArray[1-h][t][n][2*l])) {
if (fArray[1-h][u][n][2*m+1]>=fArray[1-h][t][n][2*l+1]) { shiftsLine2[6+n].push(fArray[1-h][t][n][2*l], fArray[1-h][t][n][2*l+1]) }
 else {shiftsLine2[6+n].push(fArray[1-h][t][n][2*l], fArray[1-h][u][n][2*m+1])}}
}} // end first m,l loop
// start second l,m loop
for (l=0;l<shiftsLine2[6+n].length/2;l++) { for (m=0;m<fArray[1-h][v][n].length/2;m++) {if ((fArray[1-h][v][n][2*m]>=shiftsLine2[6+n][2*l])&&(fArray[1-h][v][n][2*m]<=shiftsLine2[6+n][2*l+1]))
{if (fArray[1-h][v][n][2*m+1]>=shiftsLine2[6+n][2*l+1]) {shiftsLine2[9+n].push(fArray[1-h][v][n][2*m], shiftsLine2[6+n][2*l+1]) }
else { shiftsLine2[9+n].push(fArray[1-h][v][n][2*m], fArray[1-h][v][n][2*m+1]) }}
else if ((fArray[1-h][v][n][2*m]<=shiftsLine2[6+n][2*l])&&(fArray[1-h][v][n][2*m+1]>=shiftsLine2[6+n][2*l])) {
if (fArray[1-h][v][n][2*m+1]>=shiftsLine2[6+n][2*l+1]) { shiftsLine2[9+n].push(shiftsLine2[6+n][2*l], shiftsLine2[6+n][2*l+1]) }
  else {shiftsLine2[9+n].push(shiftsLine2[6+n][2*l], fArray[1-h][v][n][2*m+1])}}
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
} // end n loop
return shiftsLine2[13]} // end function lineByLine2