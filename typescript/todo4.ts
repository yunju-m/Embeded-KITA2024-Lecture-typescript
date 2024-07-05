// todo4.ts
// todo4의 패키지 버전

interface Todo4 {
    id: number;
    title: string;
    completed: boolean;
}

let todos4: Todo4[] = [];

async function fetchJson2(): Promise<Todo4[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) {
        throw new Error('Error : ' + response.statusText);
    } else {
        return await response.json();
    }
}

fetchJson2()
    .then(async function (response) {
        todos4 = await response;
        todos4 = todos4.map(todo4 =>
            todo4 = { 'id': todo4.id, 'title': todo4.title, 'completed': todo4.completed }
        ).slice(0, 5);
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
    getTodos4(): Todo4[] {
        return todos4;
    },

    getTodo4(paramId: number): Todo4 {
        return (todos4.filter(todo => todo.id === paramId))[0];
    },

    registTodo4(paramTodo: Todo4): void {
        if (!this.isExistedTodo4(paramTodo.id)) {
            todos4.push(paramTodo);
        }
    },
    updateTodo4(paramTodo: Todo4): Todo4[] {
        const id = paramTodo.id;
        if (this.isExistedTodo4(id)) {
            todos4 = [...this.deleteTodo4(id), paramTodo];
        }
        return todos4;
    },

    deleteTodo4(paramId: number): Todo4[] {
        if (this.isExistedTodo4(paramId)) {
            todos4 = todos4.filter(todo => todo.id != paramId);
        }
        return todos4;
    },

    isExistedTodo4(paramId: number): boolean {
        return todos4.some(todo => todo.id === paramId);
    }
};

fetchJson2();
