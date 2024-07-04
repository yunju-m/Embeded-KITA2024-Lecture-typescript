/* 타입 호환(type compatability) */
// 좁은 타입의 값이 넓은 타입의 값이 되는 것이 OK
// 넓은 타입의 값이 좁은 타입의 값이 되는 것은 ERROR
// 타입 호환의 범위
// string타입안에 'hello'타입이 존재
let s1 = 'hi';
let s2 = 'hello';
s1 = s2; // string타입이 'hello'타입보다 넓으므로 ok
let i4 = { name: '홍길동' };
let i5 = { name: '강감찬' };
i4 = i5;
i5 = i4;
let i6 = { name: 10 };
let animal5 = { name: '동물' };
let dog5 = { name: '강아지', sound: '멍멍' };
let bird5 = { name: '새', leg: 2 };
// dog5 = bird5; // Dog5는 sound가 있어야한다.
// bird5 = dog5 // Bird5는 leg가 있어야한다.
// dog5 = animal5 // Animal5는 sound가 있어야한다.
// bird5 = animal5 // Animal5는 leg가 있어야한다.
animal5 = dog5;
animal5 = bird5;
let dog6 = { name: '강아지', sound: '멍멍' };
let bird6 = { name: '새', leg: 2 };
dog6 = bird6;
bird6 = dog6;
// 함수타입의 타입 호환
let func6 = function (a, b) {
    return a + b;
};
let func7 = function (a) {
    return a;
};
func6 = func7; // func7의 a파라미터를 잃지않음
// func7 = func6; // func6의 b파라미터를 읽어버림 => Error
// enum 타입의 타입호환
// enum 타입은 같은 프로퍼티를 가져도 호환되지 않음!!
var Enum1;
(function (Enum1) {
    Enum1[Enum1["A"] = 0] = "A";
    Enum1[Enum1["B"] = 1] = "B";
    Enum1[Enum1["C"] = 2] = "C";
})(Enum1 || (Enum1 = {}));
;
var Enum2;
(function (Enum2) {
    Enum2[Enum2["A"] = 0] = "A";
    Enum2[Enum2["B"] = 1] = "B";
    Enum2[Enum2["C"] = 2] = "C";
})(Enum2 || (Enum2 = {}));
;
let e1 = Enum1.A;
let e2 = Enum2.A;
let in1 = 'in1';
let in2 = 10;
in1 = in2;
in2 = in1;
let in3 = { data: 'in3' };
let in4 = { data: 30 };
// 데이터가 정해지면 타입 호환이 불가능하다!
// in3 = in4; // data : number > string (x)
// in4 = in3; // data : string > number (x)
