import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodos, removeTodos, updateTodos, completeTodos } from '../redux/reducer';
import TodoItem from './TodoItem';
import { AnimatePresence, motion } from "framer-motion";
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
const DisplayTodos = (props) => {
    const [sort, setSort] = useState("active");
    return (
        <div className='displaytodos'>
            <div className='buttons'>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { setSort("active") }} >ACTIVE</motion.button>

                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { setSort("completed") }} >COMPLETED</motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { setSort("all") }} >ALL</motion.button>
            </div>
            <ul>
                <AnimatePresence>
                    {props.todos.length > 0 && sort === "active" ?
                        props.todos.map((item) => {
                            return (
                                item.completed === false &&
                                <TodoItem key={item.id} item={item} removeTodos={props.removeTodos} updateTodos={props.updateTodos} completeTodos={props.completeTodos} />

                            )
                        })
                        : null}

                    {props.todos.length > 0 && sort === "completed" ?
                        props.todos.map((item) => {
                            return (
                                item.completed === true &&
                                <TodoItem key={item.id} item={item} removeTodos={props.removeTodos} updateTodos={props.updateTodos} completeTodos={props.completeTodos} />

                            )
                        })
                        : null}

                    {props.todos.length > 0 && sort === "all" ?
                        props.todos.map((item) => {
                            return (

                                <TodoItem key={item.id} item={item} removeTodos={props.removeTodos} updateTodos={props.updateTodos} completeTodos={props.completeTodos} />

                            )
                        })
                        : null}
                </AnimatePresence>
            </ul>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);