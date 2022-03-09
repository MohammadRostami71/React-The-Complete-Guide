import React, {Component} from "react";
// import { Button } from 'react-bootstrap';

// import ContentEditable from "react-contenteditable";
// const {React, ReactDOM} = window;

export default class Todoform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editModeEnabled: false,
            input: '',
            todos: [{
                value: '',
                id: null,
                edit: false

            }],
        };
    }

    componentDidMount() {
        this.todoInput.focus();
    }

    componentDidUpdate() {
        // this.todoInput.value = '';
    }

    addTodo = () => {
        const newTodo = {
            value: this.state.input,
            id: Math.floor(Math.random() * 100)

        };
        console.log(this.state)

        this.setState({
            todos: [...this.state.todos, newTodo],
            input: ''
        });
    }

    handleInput = (e) => {
        if (e.nativeEvent.key === "Enter") {
            this.addTodo();
        } else {
            this.setState({
                input: e.target.value
            });
        }
    }

    removeTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(item => item.id !== id)
        });
    }
    editItem = id => {
        console.log(id)
        // console.log(this.state.todos.find(item => item.id === id));
        const selectedItem = this.state.todos.find(item => item.id === id);
        console.log(selectedItem)
        if (this.state.todos.find(item => item.id === id)) {
            alert('sssssssss')
            this.setState({
                edit: true,
                id: selectedItem.id
            })
        }

    }


    render() {


        return (
            <div>

                {this.state.todos.map(t => <Todolist key={t.id} {...t}
                                                     onClick={() => this.removeTodo(t.id)}
                                                     editItem={() => this.editItem(t.id)}
                                                     edit={this.state.edit}

                />)}
                <div>
                    <input type="text" name="intodo"
                           value={this.state.input}
                           onChange={this.handleInput}
                           onKeyDown={this.handleInput}
                           ref={(input) => {
                               this.todoInput = input;
                           }}/>
                    <button onClick={this.addTodo}>Add</button>
                </div>
            </div>
        )
    }
}


class Todolist extends Component {
    render() {
        // console.log(this.props.todos.edit)

        return (
            <div>
                <button className="remove" onClick={this.props.onClick}>×</button>
                <button className="edit" onClick={this.props.editItem}>edit</button>
                <div suppressContentEditableWarning={true} id={this.props.id}
                     contentEditable={this.props.edit}>{this.props.value}</div>


            </div>
        )
    }
}