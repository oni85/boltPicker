//---------------GLOBAL DATA---------------//
const rBs = {
  '5.6': 21,
  '5.8': 21,
  '8.8': 32,
  '10.9': 40,
  '12.9': 42
};

const rBt = {
  '5.6': 37.5,
  '5.8': 37.5,
  '8.8': 54.4,
  '10.9': 60,
  '12.9': 60
};

const aBs = {
  'M12': 0.88,
  'M16': 1.57,
  'M20': 2.45,
  'M24': 3.53,
  'M27': 4.59,
  'M30': 5.61
};

const rUnA = {
  '36': 56,
  '37': 58,
  '38': 59,
  '46': 72,
  '47': 73.5,
  '49': 76.5
};

const rUnBC = {
  '36': 47.5,
  '37': 48.5,
  '38': 50,
  '46': 60.5,
  '47': 62,
  '49': 64.5
};

const dB = {
  'M12': 1.2,
  'M16': 1.6,
  'M20': 2.0,
  'M24': 2.4,
  'M27': 2.7,
  'M30': 3.0
};

//----------CLICK ON CALCULATE BUTTON-----------------------//

document.getElementById('calcBtn').addEventListener('click', function calculate() {

//----------INIT VARIABLES FROM INPUTS AND SELECTS----------//
let boltDiametr = document.getElementById('boltDiametr').value;
let strenghtClass = document.getElementById('strenghtClass').value;
let accuracyClass = document.getElementById('accuracyClass').value;
let steelOfTheElements = document.getElementById('steelOfTheElements').value;
let nS = document.getElementById('nS').value;
let tMin = document.getElementById('tMin').value;
let gammaBs = document.getElementById('gammaBs').value;
let gammaBc = document.getElementById('gammaBs').value;
let a = document.getElementById('aIn').value;
let s = document.getElementById('sIn').value;
let d = document.getElementById('dIn').value;
rBsCase = rBs[document.getElementById('strenghtClass').value];
aBsCase = aBs[document.getElementById('boltDiametr').value];
rBtcase = rBt[document.getElementById('strenghtClass').value];
console.log('steelOfTheElements = ' + steelOfTheElements);
console.log('aBsCase = ' + aBsCase);
console.log('rBsCase = ' + rBsCase);
console.log('nS = ' + nS);
console.log('gammaBs = ' + gammaBs);
console.log('gammaBc = ' + gammaBc);
console.log('tMin = ' + tMin);
console.log('accuracyClass =' + accuracyClass);

//----------NBS CALCULATION FUNCTION-----------------------//
  function nbsCalculation() {
    let nbsResult = Math.floor((rBsCase * aBsCase * nS * gammaBs * gammaBc) * 10)/10;
    document.getElementById('nBs').textContent = nbsResult;
  };
//----------GAMMA BP CALCULATION---------------------------//
let gammaBpCase1;
if ((steelOfTheElements === 'C235' || steelOfTheElements === 'C245' || steelOfTheElements === 'C255') && ((a / d >= 1.5) && (a / d <= 2))) {
  gammaBpCase1 = Math.floor((0.4 * (a / d) + 0.2) * 100) / 100;
} else if ((steelOfTheElements === 'C345') && ((a / d >= 1.5) && (a / d <= 2)) ) {
  gammaBpCase1 = Math.floor((0.5 * (a / d)) * 100) / 100;
} else {
  gammaBpCase1 = 1;
};
console.log(gammaBpCase1);
let gammaBpCase2;
if ((steelOfTheElements === 'C235' || steelOfTheElements === 'C245' || steelOfTheElements === 'C255') && ((s / d >= 2) && (s / d <= 2.5))) {
  gammaBpCase2 = Math.floor((0.4 * (s / d)) * 100) / 100;
} else if ((steelOfTheElements === 'C345') && ((s / d >= 2) && (s / d <= 2.5)) ) {
  gammaBpCase2 = Math.floor((0.5 * (s / d) - 0.25) * 100) / 100;
} else {
  gammaBpCase2 = 1;
};
console.log(gammaBpCase2);

gammaBp = Math.min(gammaBpCase1, gammaBpCase2);
document.getElementById('gammaBp').textContent = gammaBp;
console.log('gammaBp = ' + gammaBp);

//----------RUN CALCULATION---------------------------//
let rUn;
if ((steelOfTheElements === 'C235') && ((tMin >= 2) && (tMin <= 100))) {
  rUn = 36;
} else if ((steelOfTheElements === 'C245') && ((tMin >= 2) && (tMin <= 200))) {
  rUn = 37;
} else if ((steelOfTheElements === 'C255') && ((tMin >= 2) && (tMin < 10))) {
  rUn = 38;
} else if ((steelOfTheElements === 'C255') && ((tMin >= 10) && (tMin <= 40))) {
  rUn = 37;
} else if ((steelOfTheElements === 'C345') && ((tMin >= 2) && (tMin < 10))) {
  rUn = 49;
} else if ((steelOfTheElements === 'C345') && ((tMin >= 10) && (tMin < 20))) {
  rUn = 47;
} else if ((steelOfTheElements === 'C345') && ((tMin >= 20) && (tMin <= 40))) {
  rUn = 46;
} else {
  rUn = 'Validation Needed';
};
console.log('rUn = ' + rUn);
//----------RBP CALCULATION----------------------------//
let rBp;
if (accuracyClass === 'A') {
  rBp = rUnA[rUn];
} else if (accuracyClass === 'B') {
  rBp = rUnB[rUn];
} else {
  console.log('Interpolation Needed');
};
console.log('rBp = ' + rBp);
//----------DB CALCULATION-----------------------------//
dBcase = dB[document.getElementById('boltDiametr').value];
console.log('dBcase = ' + dBcase);
//----------NBP CALCULATION FUNCTION-------------------//
function nbpCalculation() {
  let nbpResult = Math.floor((rBp * dBcase * (tMin / 10) * gammaBp * gammaBc) * 10)/10;
  document.getElementById('nBp').textContent = nbpResult;
}

//----------NBT CALCULATION FUNCTION-------------------//
function nbtCalculation() {
  let nbtResult = Math.floor((rBtcase * aBsCase * gammaBc) * 10)/10;
  document.getElementById('nBt').textContent = nbtResult;
}

nbsCalculation();
nbpCalculation();
nbtCalculation();
}
);

//----------CLICK ON CANCEL BUTTON-------------------//
document.getElementById('resetBtn').addEventListener('click', function reset() {
  document.getElementById('boltDiametr').options[0].selected = true;
  document.getElementById('strenghtClass').options[0].selected = true;
  document.getElementById('accuracyClass').options[0].selected = true;
  document.getElementById('steelOfTheElements').options[0].selected = true;
  document.getElementById('nS').options[0].selected = true;
  document.getElementById('tMin').value = '10';
  document.getElementById('gammaBs').value = '0.9';
  document.getElementById('gammaBp').textContent = '';
  document.getElementById('gammaBc').value = '0.9';
  document.getElementById('aIn').value = '';
  document.getElementById('sIn').value = '';
  document.getElementById('dIn').value = '';
  document.getElementById('nBs').textContent = '';
  document.getElementById('nBp').textContent = '';
  document.getElementById('nBt').textContent = '';
}
);
