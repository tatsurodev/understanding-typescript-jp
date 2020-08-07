import React from 'react';
import TodoList from './components/TodoList';
import NewTodod from './components/NewTodo';

// function App() {
//     return (
//         <div className="App"></div>
//     );
// }

// React.FCはReact.FunctionComponentと同値
const App: React.FC = () => {
    const todos = [
        { id: 't1', text: 'TypeScriptコースの完了' },
    ];
    const todoAddHandler = (text: string) => {
        console.log(text);
    };
    return (
        <div className="App">
            <NewTodod onAddTodo={todoAddHandler} />
            <TodoList items={todos} />
        </div>
    );
};

export default App;
