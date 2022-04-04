import React from "react";
import classes from './TodoItem.module.css';

const TodoItem: React.FC<{ item: string; onRemoveTodo: () => void }> = (props) => {
    return (
        <li onClick={props.onRemoveTodo} className={classes.item}>{props.item}</li>
    );
};

export default TodoItem;