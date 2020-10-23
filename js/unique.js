
// Array.prototype.unique = function () {   // 2986.575ms
//     const newArray = [];
//     let isRepeat;
//     for (let i = 0; i < this.length; i++) {
//       isRepeat = false;
//       for (let j = 0; j < newArray.length; j++) {
//         if (this[i] === newArray[j]) {
//           isRepeat = true;
//           break;
//         }
//       }
//       if (!isRepeat) {
//         newArray.push(this[i]);
//       }
//     }
//     return newArray;
// }
// Array.prototype.unique = function(){   // 3474.817ms
//   const newArray = []
//   let isRepeat
//   for(let i=0;i<this.length;i++){
//     isRepeat = false
//     for(let j=i+1;j<this.length;j++){
//       if(this[i] === this[j]){
//         isRepeat = true
//         break
//       }
//     }
//     if(!isRepeat){
//       newArray.push(this[i])
//     }
//   }
//   return newArray
// }
// Array.prototype.unique = function () {   //  4692.494ms
//   const newArray = [];   
  
//   for (let i = 0; i < this.length; i++) {
//     for (let j = i + 1; j < this.length; j++) {
//       if (this[i] === this[j]) {
//         j = ++i;
//       }
//     }
//     newArray.push(this[i]);
//   }
//   return newArray;
// }

// Array.prototype.unique = function () {   4550.956ms
//   return this.filter((item, index) => {
//     return this.indexOf(item) === index;
//   })
// }


// Array.prototype.unique = function () {  // 3706.442ms
//   const newArray = [];
//   this.forEach(item => {
//     if (newArray.indexOf(item) === -1) {
//       newArray.push(item);
//     }
//   });
//   return newArray;
// }


// Array.prototype.unique = function () {
//   const newArray = [];
//   this.sort();
//   for (let i = 0; i < this.length; i++) {
//     if (this[i] !== this[i + 1]) {
//       newArray.push(this[i]);
//     }
//   }
//   return newArray;
// }

// Array.prototype.unique = function () {  // 3507.407ms
//   const newArray = [];
//   this.forEach(item => {
//     if (!newArray.includes(item)) {
//       newArray.push(item);
//     }
//   });
//   return newArray;
// }
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// }
// Array.prototype.unique = function () {
//   const set = new Set(this);
//   return Array.from(set);
// }

Array.prototype.unique = function () {
  const tmp = new Map();
  return this.filter(item => {
    return !tmp.has(item) && tmp.set(item, 1);
  })
}


const arr  = []

for(let i=0; i<100000; i++){
    arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()))
}
console.time('test')
arr.unique()
console.timeEnd('test')