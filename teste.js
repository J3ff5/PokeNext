
let arr = [{a:"6",b:"5",c:'4'},{a:"1",b:"2",c:'3'}]
let arra = [{a:"6",b:"5",c:'4'},{a:"1",b:"2",c:'3'},[]]
let asd= [{a:"a",b:"b",c:'c'}, {a:"d",b:"e",c:'f'}, arr]


console.log(asd.map((e) => Object.keys(e).length))
console.log(asd.map((e) => Array.isArray(e)))

let i = 0;
while (true) {
  if (Array.isArray(asd)) {
    console.log("is Array");
  }
  Show(asd[i])
  i++
  if (i >= asd.length) {
    break;
  }
}

function Show(a) {
  if (Array.isArray(a)) {
    a.map((e)=> Show(e))
    // Showb(a)
  } else {
     console.log(a.a)
  }
}

function Showb (b) {
  Show(b)
}