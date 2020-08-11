import React, { useState } from 'react';
// import { Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import NewTodod from './components/NewTodo';
import { Todo } from './todo.model';

// function App() {
//     return (
//         <div className="App"></div>
//     );
// }

// React.FCはReact.FunctionComponentと同値
const App: React.FC = () => {
    // useStateでstateとstateのsetterが返ってくる、戻り値をgenericsで指定
    const [todos, setTodos] = useState<Todo[]>([]);
    const todoAddHandler = (text: string) => {
        // stateは非同期処理なので...todosで得られるものが最新のものとは場合によっては限らないので、関数で得られるprevStateを使用する
        setTodos(prevTodos => [
            ...prevTodos,
            { id: Math.random().toString(), text },
        ]);
    };
    const todoDeleteHandler = (todoId: string) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    };
    return (
        <div className="App">
            <NewTodod onAddTodo={todoAddHandler} />
            <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
        </div>
    );
};

export default App;
