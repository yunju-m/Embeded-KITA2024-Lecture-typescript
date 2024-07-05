// todo4.ts
// todo4의 패키지 버전
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let todos4 = [];
function fetchJson2() {
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
fetchJson2()
    .then(function (response) {
    return __awaiter(this, void 0, void 0, function* () {
        todos4 = yield response;
        todos4 = todos4.map(todo4 => todo4 = { 'id': todo4.id, 'title': todo4.title, 'completed': todo4.completed }).slice(0, 5);
    });
})
    .then(() => {
    // 목록
    console.log(todoJsonPKG.getTodos4());
    // 등록
    todoJsonPKG.registTodo4({ 'id': 6, 'title': 'titl6', 'completed': false });
    console.log(todoJsonPKG.getTodos4());
    // 수정
    todoJsonPKG.updateTodo4({ 'id': 6, 'title': 'up_titl6', 'completed': false });
    console.log(todoJsonPKG.getTodos4());
    // 조회
    console.log(todoJsonPKG.getTodo4(6));
    // 삭제
    todoJsonPKG.deleteTodo4(6);
    console.log(todoJsonPKG.getTodos4());
});
const todoJsonPKG = {
    getTodos4() {
        return todos4;
    },
    getTodo4(paramId) {
        return (todos4.filter(todo => todo.id === paramId))[0];
    },
    registTodo4(paramTodo) {
        if (!this.isExistedTodo4(paramTodo.id)) {
            todos4.push(paramTodo);
        }
    },
    updateTodo4(paramTodo) {
        const id = paramTodo.id;
        if (this.isExistedTodo4(id)) {
            todos4 = [...this.deleteTodo4(id), paramTodo];
        }
        return todos4;
    },
    deleteTodo4(paramId) {
        if (this.isExistedTodo4(paramId)) {
            todos4 = todos4.filter(todo => todo.id != paramId);
        }
        return todos4;
    },
    isExistedTodo4(paramId) {
        return todos4.some(todo => todo.id === paramId);
    }
};
fetchJson2();
