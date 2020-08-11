import React from 'react';
import './TodoList.css';

// propsの型
interface TodoListProps {
    items: { id: string, text: string }[];
    onDeleteTodo: (id: string) => void;
}

// genericsでpropsの型を指定
const TodoList: React.FC<TodoListProps> = props => {
    return (
        <ul>
            {props.items.map(todo => (
                <li key={todo.id}>
                    <span>{todo.text}</span>
                    <button onClick={props.onDeleteTodo.bind(null, todo.id)}>削除</button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;