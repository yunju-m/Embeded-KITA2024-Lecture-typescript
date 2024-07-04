/* 타입 추론 (type inference) */
// - TS에서 개발자가 타입을 명시하지 않아도 트랜스컴파일러가
//   타입을 추론할 수 있는 경우에는 타입을 명시하지 않아도 됨
// - 타입추론을 사용하면 타입선언 코드가 줄어서 가독성이 높아질 수 있음
// - 변수 초기화, 함수의 매개변수 기본값 설정, 함수의 값 반환시에 타입추론 발생

// 변수 초기화 시 타입 추론
let str1; // any 타입으로 추론됨
let str2 = 'hello'; // string 타입으로 추론됨
let number1 = 100; // number 타입으로 추론됨

// 함수 반환값 타입 추론
// 반환되는 a + b의 결과값이 number인 것이 명확하므로 반환타입(number)로 추론
function add(a: number, b: number) {
    return a + b;
}
// 반환 값을 저장하는 result1 변수의 타입도 당연히 number이므로 타입지정 생략
let result1 = add(1, 2);

// 함수 매개변수 기본값으로 타입 추론
function add2(a = 1, b = 2) {
    return a + b;
}
let result2 = add2(3, 4);

// 인터페이스에서 타입 추론
interface Person3<T> {
    name: string;
    hobby: T;
}
const person: Person3<string[]> = {
    name: '홍길동',
    hobby: ['축구', '농구']
};

/* 타입 단언(type assertion) */
// - TS의 타입 추론을 사용하는 대신 개발자가 직접 타입을 명시
// - as 키워드를 사용하여 개발자가 직접 타입을 선언
// - 이미 개발된 JS코드를 어쩔 수 없이 수정해야 하는 경우에만 사용하자!

// hong의 타입을 string타입으로 지정
const hong = '홍길동' as string;

interface Human {
    name: string;
    age: number;
}

// Human 타입은 name과 age 프라퍼티를 정의해야한다!
// let human: Human = {};
// human은 앞으로 name과 age 프라퍼티를 가질 Human타입의 객체로 지정
let human = {} as Human;

function getId(id) {
    return id;
}
// getId 함수는 number타입의 값을 반환할 것이다!
const myId = getId('hong') as string;

// 타입단언 중첩
// 10이라는 값을 any타입으로 하고 다시 number 타입으로 단언
const number2 = (10 as any) as number;

// ?. (옵셔널체이닝) : null이나 undefined이면 undefined
interface Books {
    shuffle: Function;
}
function shuffleBooks(books: Books | null) {
    const result = books?.shuffle();
    // const result = books!.shuffle(); // 트랜스파일시 노에러, 실행시 에러
    return result;
}
shuffleBooks(null);

/* 타입 가드 (type guard) */
// 여러개의 타입으로 지정된 값을 특정 위치에서 원하는 타입으로 구분
// typeof, instanceof, in연산자를 통해서 타입범위를 좁히는 것

const v1: string | number | boolean = 'hello';
if (typeof v1 === 'string') { // 타입을 string으로 한정(타입 가드)
    console.log(v1.toUpperCase());
}

// 타입 단언을 이용해서 타입을 number로 한정(타입 가드)
function func1(param1: string | number | boolean): void {
    console.log((param1 as number).toFixed(2));
}
func1(3.1415);

// instanceof를 활용한 타입가드
interface Bird {
    name: string;
}

function Bird(name: string): void {
    this.name = name;
}

interface Mammal {
    name: string;
    breastfeed: true;
}

function Mammal(name: string, breastfeed: boolean): void {
    this.name = name;
    this.breastfeed = breastfeed;
}

const bird: Bird | Mammal = new Bird('독수리');
// instanceof 연산자를 활용한 타입가드
if (bird instanceof Bird) {
    console.log(bird.name);
}
if (bird instanceof Mammal) {
    console.log(bird.name);
}

// in 연산자를 활용한 타입가드
interface Book {
    name: string;
    author: string;
}
interface Lecture {
    name: string;
    tutor: string;
}
const book: Book | Lecture = { name: '타입스크립트', author: '마소' };
if ('author' in book) { // Book 타입
    console.log(book);
}
if ('tutor' in book) { // Lecture 타입
    console.log(book);
}

// 타입가드 함수 (is 사용)
// 두개 이상의 타입이 같은 프로퍼티를 가지고 있으면 in 연산자로
// 타입가들르 할 수 없으므로 타입가드 함수를 사용한다.
interface Hong {
    name: string;
    age: number;
}
interface Park {
    name: string;
    address: string;
}
// somone을 Hong으로 강제
function isHongOrPark(someone: Hong | Park): someone is Hong {
    return (someone as Hong).age != undefined;
}

// 구별된 유니언 타입 (discriminated unions)
// 두개이상의 타입이 같은 이름의 프라퍼티만 가지고 있을 때
// 프라퍼티 값으로 타입가드
interface Designer {
    name: string,
    age: number,
    jobName: 'designer'
}

const designer: Designer = {
    name: '홍길순',
    age: 20,
    jobName: 'designer'
};

interface Programmer {
    name: string;
    age: number;
    jobName: 'programmer'
}

const programmer: Programmer = {
    name: '홍길동',
    age: 30,
    jobName: 'programmer'
};

// 두 타입의 프라퍼티명이 모두 같으므로 특정 프라퍼티의 값으로
// 두 타입을 구분(타입가드)한다.
if (designer.jobName === 'designer') {
    console.log(designer.jobName);
}

if (programmer.jobName === 'programmer') {
    console.log(designer.jobName);
}