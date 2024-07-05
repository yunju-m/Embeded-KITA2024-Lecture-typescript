// todo2.ts
// 패키지개념(객체 생성)을 도입해서 함수들을 메소드화
// 전역함수는 최소한으로 사용

interface Todo2 {
    id: number;
    title: string;
    completed: boolean;
}

let todos2: Todo2[] = [
    { id: 1, title: '아침먹기', completed: true },
    { id: 2, title: 'TS공부', completed: true },
    { id: 3, title: '점심먹기', completed: false }
];

// 패키지로 사용할 객체를 생성
const todoPKG = {
    getTodos(): Todo2[] {
        return todos2;
    },

    getTodo(paramId: number): Todo2 {
        return (todos2.filter(todo => todo.id === paramId))[0];
    },

    registTodo(paramTodo: Todo2): void {
        if (!this.isExistedTodo(paramTodo.id)) {
            todos2.push(paramTodo);
        }
    },

    updateTodo(paramTodo: Todo2): Todo2[] {
        const id = paramTodo.id;
        if (this.isExistedTodo(id)) {
            todos2 = [...this.deleteTodo(id), paramTodo];
        }
        return todos2;
    },

    deleteTodo(paramId: number): Todo2[] {
        if (this.isExistedTodo(paramId)) {
            todos2 = todos2.filter(todo => todo.id != paramId);
        }
        return todos2;
    },

    isExistedTodo(paramId: number): boolean {
        return todos2.some(todo => todo.id === paramId);
    }
};

// 목록
console.log(todoPKG.getTodos());

// 등록
todoPKG.registTodo({ id: 4, title: '저녁먹기', completed: false });
console.log(todoPKG.getTodos());

// 수정
console.log(todoPKG.updateTodo({ id: 4, title: '야식먹기', completed: false }));

// 조회
console.log(todoPKG.getTodo(4));

// 삭제
console.log(todoPKG.deleteTodo(4));