console.log(1 + '1');

console.log('1' + 1);

console.log('2' - 1)

console.log(2 - '1')

console.log(1 == '1');

console.log(1 === '1');

console.log('a' + 1);

console.log('a' * 1)

console.log(1 + +'1')

console.log('b' + 'a' + +'a' + 'a')

console.log(0.2 + 0.1 === 0.3)

var a = {
    b: 1,
    c: 2
}

var aa = a;

console.log(aa === a);

var aaa = {
    b: 1,
    c: 2
}

console.log(aaa === a);

console.log(a === { b: 1, c: 2 })

console.log([1,2,3] === [1,2,3])

var arr = [ 1, 'asdf', { b: 1, c: 2 }, a, 5.5 ]

console.log(arr.includes({ b: 1, c: 2 }));

console.log(arr[5])
arr.length = 8
arr[7] = 5
console.log(arr)

delete arr[3]
console.log(arr)

console.log(new Array(3) == ",,");

console.log([1, 2, 3] + [4, 5, 6])

function foo() {
    return
    {
       foo: 'bar'
    }
 }
 
 function bar() {
    return {
       foo: 'bar'
    }
 }
 
 console.log(typeof foo() === typeof bar());

 console.log(d = 2);

 var d = 5;

 function asdf() {
     for(i = 0; i < 10; i++) {
         var c = i;
     }

     c += 10;
 }