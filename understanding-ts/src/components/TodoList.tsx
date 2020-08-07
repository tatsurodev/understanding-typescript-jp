import React from 'react';

// propsの型
interface TodoListProps {
    items: { id: string, text: string }[];
}

// genericsでpropsの型を指定
const TodoList: React.FC<TodoListProps> = props => {
    return (
        <ul>
            {props.items.map(todo => <li key={todo.id}>{todo.text}</li>)}
        </ul>
    );
};

export default TodoList;