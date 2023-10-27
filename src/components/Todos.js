import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { addTodos, removeTodos, updateTodos, completeTodos } from '../redux/reducer';
import { GoPlus } from 'react-icons/go';
import { motion } from "framer-motion";
const mapStateToProps = (state) => {

    return {
        todos: state,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        addTodos: (obj) => dispatch(addTodos(obj)),
        removeTodos: (id) => dispatch(removeTodos(id)),
        updateTodos: (obj) => dispatch(updateTodos(obj)),
        completeTodos: (id) => dispatch(completeTodos(id)),
    };
}
const Todos = (props) => {
    const [todo, setTodo] = useState("");

    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    const add = () => {
        if (todo === "") { alert("Input is empty") }
        else {
            props.addTodos({
                id: Math.floor(Math.random() * 1000),
                item: todo,
                completed: false
            })
            setTodo("");
        }

    }
    return (
        <div className="addTodos">
            <input
                type="text"
                onChange={(e) => handleChange(e)}
                className="todo-input"
                value={todo}
            />
            <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="add-btn"
                onClick={() => add()}
            >
                <GoPlus />
            </motion.button>
            <br />

        </div>
    );
};
//we can use connect method to connect this component with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Todos);