import React, {useContext} from "react";
import Todo from "../models/todo";
import TodoItem from "./TodoItem";
import classes from './Todos.module.css';
import {TodosContext} from "../store/todos-context";

const Todos: React.FC = () => {
    const ctx = useContext(TodosContext);
    return (
        <ul className={classes.todos}>
            {ctx.items.map(item =>
                <TodoItem onRemoveTodo={ctx.removeTodo.bind(null, item.id)}
                          key={item.id} item={item.text}/>)}
        </ul>
    );
};

export default Todos;