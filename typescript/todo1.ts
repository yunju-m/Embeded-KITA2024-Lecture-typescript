// todo1.ts
// 함수 사용해서 만든 todo

// Todo 인터페이스
// TS에서 인터페이스는 객체의 타입 역할
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

// Todo타입 객체 3개를 가진 배열
let todos: Todo[] = [
    { id: 1, title: '아침먹기', completed: true },
    { id: 2, title: 'TS공부', completed: true },
    { id: 3, title: '점심먹기', completed: false }
];

// 목록
function getTodos(): Todo[] {
    return todos;
}

// 조회
function getTodo(paramId: number): Todo {
    // id에 해당하는 Todo객체를 추출하여 리턴
    return (todos.filter(todo => todo.id === paramId))[0];
}

// 등록
function registTodo(paramTodo: Todo): void {
    if (!isExistedTodo(paramTodo.id)) {
        todos.push(paramTodo);
    }
}

// 수정
function updateTodo(paramTodo: Todo): Todo[] {
    const id = paramTodo.id;
    // id에 해당하는 todo가 존재하면
    if (isExistedTodo(id)) {
        // id에 해당하는 todo가 삭제된 배열과 수정할 데이터가 담긴
        // todo를 합친 새로운 배열을 리턴
        todos = [...deleteTodo(id), paramTodo];
    }
    return todos;
}

// 삭제
function deleteTodo(paramId: number): Todo[] {
    // id가 해당하는 todo가 존재하면
    if (isExistedTodo(paramId)) {
        // id가 해당되지 않는 todo들만 가진 배열을 리턴
        todos = todos.filter(todo => todo.id != paramId);
    }
    return todos;
}

// id 존재여부 확인
function isExistedTodo(paramId: number): boolean {
    // id에 해당하는 todo가 있는지 여부를 리턴
    return todos.some(todo => todo.id === paramId);
}

// 목록
console.log(getTodos());

// 등록
registTodo({ id: 4, title: '저녁먹기', completed: false });
console.log(getTodos());

// 수정
console.log(updateTodo({ id: 4, title: '야식먹기', completed: false }));

// 조회
console.log(getTodo(4));

// 삭제
console.log(deleteTodo(4));