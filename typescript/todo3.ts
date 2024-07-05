// todo3.ts
// 원격서버의 JSON 사용

interface Todo3 {
    id: number;
    title: string;
    completed: boolean;
}

let todos3: Todo3[] = [];

async function fetchJson(): Promise<Todo3[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) {
        throw new Error('Error : ' + response.statusText);
    } else {
        return await response.json();
    }
}

fetchJson()
    .then(async function (response) {
        todos3 = await response;
        todos3 = todos3.map(todo3 =>
            todo3 = { 'id': todo3.id, 'title': todo3.title, 'completed': todo3.completed }
        ).slice(0, 5);
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

function getTodos3(): Todo3[] {
    return todos3;
}

function getTodo3(paramId: number): Todo3 {
    return (todos3.filter(todo => todo.id === paramId))[0];
}

function registTodo3(paramTodo: Todo3): void {
    if (!isExistedTodo3(paramTodo.id)) {
        todos3.push(paramTodo);
    }
}

function updateTodo3(paramTodo: Todo3): Todo3[] {
    const id = paramTodo.id;
    if (isExistedTodo3(id)) {
        todos3 = [...deleteTodo3(id), paramTodo];
    }
    return todos3;
}

function deleteTodo3(paramId: number): Todo3[] {
    if (isExistedTodo3(paramId)) {
        todos3 = todos3.filter(todo => todo.id != paramId);
    }
    return todos3;
}

function isExistedTodo3(paramId: number): boolean {
    return todos3.some(todo => todo.id === paramId);
}

fetchJson();