const homeF = []; const awayF = []; const homeD = []; const awayD = []; const homeG = []; const awayG = []; const playerIdArray = []; // let playerIdeObject = {a: 1}; const hasKeyId = true;
var obj = data.playerByGameStats.homeTeam.forwards; var keys = Object.keys(obj); playerIdeObject = {};
for (i = 0; i < keys.length; i++) {
  var val = obj[keys[i]]; homeF.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []]);
  keyId = val.playerId; playerIdeObject[keyId] = []
}
var obj = data.playerByGameStats.homeTeam.defense; var keys = Object.keys(obj);
for (i = 0; i < keys.length; i++) {
  var val = obj[keys[i]]; homeD.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []])
  keyId = val.playerId; playerIdeObject[keyId] = []
}
var obj = data.playerByGameStats.homeTeam.goalies; var keys = Object.keys(obj);
for (i = 0; i < keys.length; i++) {
  var val = obj[keys[i]]; homeG.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []])
  keyId = val.playerId; playerIdeObject[keyId] = []
}
var obj = data.playerByGameStats.awayTeam.forwards; var keys = Object.keys(obj);
for (i = 0; i < keys.length; i++) {
  var val = obj[keys[i]]; awayF.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []])
  keyId = val.playerId; playerIdeObject[keyId] = []
}
var obj = data.playerByGameStats.awayTeam.defense; var keys = Object.keys(obj);
for (i = 0; i < keys.length; i++) {
  var val = obj[keys[i]]; awayD.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []]);
  keyId = val.playerId; playerIdeObject[keyId] = []
}
var obj = data.playerByGameStats.awayTeam.goalies; var keys = Object.keys(obj);
for (i = 0; i < keys.length; i++) {
  var val = obj[keys[i]]; awayG.push(val.playerId, val.sweaterNumber, val.name.default); playerIdArray.push(val.playerId, [[], [], []]);
  keyId = val.playerId; playerIdeObject[keyId] = []
}
// console.log(homeF, homeD, homeG, awayF, awayD, awayG, playerIdArray)