// todo3.ts
// 원격서버의 JSON 사용
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let todos3 = [];
function fetchJson() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
            throw new Error('Error : ' + response.statusText);
        }
        else {
            return yield response.json();
        }
    });
}
fetchJson()
    .then(function (response) {
    return __awaiter(this, void 0, void 0, function* () {
        todos3 = yield response;
        todos3 = todos3.map(todo3 => todo3 = { 'id': todo3.id, 'title': todo3.title, 'completed': todo3.completed }).slice(0, 5);
    });
})
    .then(() => {
    // 목록
    console.log(getTodos3());
    // 등록
    registTodo3({ 'id': 6, 'title': 'titl6', 'completed': false });
    console.log(getTodos3());
    // 수정
    updateTodo3({ 'id': 6, 'title': 'up_titl6', 'completed': false });
    console.log(getTodos3());
    // 조회
    console.log(getTodo3(6));
    // 삭제
    deleteTodo3(6);
    console.log(getTodos3());
});
function getTodos3() {
    return todos3;
}
function getTodo3(paramId) {
    return (todos3.filter(todo => todo.id === paramId))[0];
}
function registTodo3(paramTodo) {
    if (!isExistedTodo3(paramTodo.id)) {
        todos3.push(paramTodo);
    }
}
function updateTodo3(paramTodo) {
    const id = paramTodo.id;
    if (isExistedTodo3(id)) {
        todos3 = [...deleteTodo3(id), paramTodo];
    }
    return todos3;
}
function deleteTodo3(paramId) {
    if (isExistedTodo3(paramId)) {
        todos3 = todos3.filter(todo => todo.id != paramId);
    }
    return todos3;
}
function isExistedTodo3(paramId) {
    return todos3.some(todo => todo.id === paramId);
}
fetchJson();
