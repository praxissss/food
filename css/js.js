// const arr = [
//     {
//         name: 'Alex',
//         salary: 500
//     },
//     {
//         name: 'Ann',
//         salary: 1500
//     },
//     {
//         name: 'John',
//         salary: 2500
//     },
// ];
 
// const result = arr.map(item => Object.entries(item)[1][1]).reduce((sum, curr) => sum + curr);
// console.log(0 || NaN || false || null);



// const promisify = (item, delay) =>
//     new Promise(resolve => setTimeout(() => resolve(item), delay));
 
// const a = () => promisify('a', 100);
// const b = () => promisify('b', 5000);
// const c = () => promisify('c', 3000);
 
// async function one() {
//     const promises = [a(), b(), c()];
//     const [outpu1, outpu2, outpu3] = await Promise.all(promises);
//     return `one is done: ${outpu1} ${outpu2} ${outpu3}`;
// }
 
// async function two() {
//     const promises = [a(), b(), c()];
//     const outpu1 = await Promise.race(promises);
//     return `two is done: ${outpu1}`;
// }
 
// async function three() {
//     const outpu1 = await a();
//     const outpu2 = await b();
//     const outpu3 = await c();
//     return `three is done: ${outpu1} ${outpu2} ${outpu3}`;
// }
 
// one().then(console.log);
// two().then(console.log);
// three().then(console.log);

// let c = 4;
// function addX(x) {
//     console.log(x);
//   return function(n) {
//       console.log(n);
//      return n + x;
//   };
// }
 
// const addThree = addX(3);
 
// let d = addThree(c);
// let res = addThree(c);
 
// console.log(res);

// function foo(a,b) {
//     const [first, second] = a;
//     const {eng, ru} = b;
 
//     return `${second}, ${ru}`;
// }
 
// const result = foo(['Hello', 'Привет'], {ru: 'Мир', eng: 'World'});
// console.log(result);

// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('foo');
//     }, 1000);
//     setTimeout(() => {
//         reject('bar');
//     }, 900);
// });
  
// promise.then((value) => {
//     console.log(value);
// }).catch((e) => console.log(e));

// let y = 1; 
// let x = y = 2; 
// alert(x);

// function getSum(a, b) {
//     function sum() {
//         console.log(this.a);
//         return a + b;
//     }
 
//     console.log(sum());
// }
 
// getSum(4, 5);

const msg = 'My number +12345678, name: Oleg';
 
function transformMsg(str) {
 
    let a = str.replace(/\+\d{8}/, '******');
    let b = a.replace(/\w{4}:\s\w{1,}/, "hidden");
 
    return b;
}
 
console.log(
transformMsg(msg)

);