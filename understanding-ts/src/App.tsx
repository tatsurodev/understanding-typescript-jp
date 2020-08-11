import React, { useState } from 'react';
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
        setTodos([
            { id: Math.random().toString(), text },
        ]);
    };
    return (
        <div className="App">
            <NewTodod onAddTodo={todoAddHandler} />
            <TodoList items={todos} />
        </div>
    );
};

export default App;
