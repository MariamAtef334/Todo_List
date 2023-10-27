import React, { useRef } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { IoCheckmarkDoneSharp, IoClose } from 'react-icons/io5';
import { motion } from "framer-motion";
const TodoItem = (props) => {
    const { item, removeTodos, updateTodos, completeTodos } = props;
    const inputRef = useRef(true);
    const changeFocus = () => {
        inputRef.current.disabled = false;
        inputRef.current.focus();
    }
    const update = (id, value, e) => {
        //13 is the key_id
        if (e.which === 13) {
            updateTodos({ id, item: value, })
            inputRef.current.disabled = true;
        }
    };
    return (
        <motion.li

            initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
            animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
            whileHover={{
                scale: 0.9,
                transition: { type: "spring", duration: 0.1 },
            }}
            exit={{
                x: "-60vw",
                scale: [1, 0],
                transition: { duration: 0.5 },
                backgroundColor: "rgba(255,0,0,1)",
            }}
            key={item.id} className='card'>
            <textarea ref={inputRef} disabled={inputRef} defaultValue={item.item} onKeyDown={(e) => update(item.id, inputRef.current.value, e)} />
            <div className='btns'>

                <motion.button whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }} onClick={() => { changeFocus() }}><AiFillEdit /></motion.button>
                {item.completed === false && <motion.button whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                    className='complete' onClick={() => completeTodos(item.id)}><IoCheckmarkDoneSharp /></motion.button>}

                <motion.button whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                    className='close' onClick={() => removeTodos(item.id)}><IoClose /></motion.button>
                    
            </div>
            {item.completed && <span className='completed'>THIS TASK IS DONE</span>}
        </motion.li>
    )
}

export default TodoItem