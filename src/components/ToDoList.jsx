import { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    }

    const addTask = () => {
        if (newTask !== '') {
            setTasks(t => {
                const updatedTasks = [...t, newTask];
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                return updatedTasks;
            });
            toast.success('Task added!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            setNewTask('');
        }
        else {
            toast.error('Task is empty!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    }

    const deleteTask = (index) => {
        setTasks(() => {
            const updatedTasks = tasks.filter((_, filterIndex) => filterIndex !== index);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
        toast.success('Task deleted!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    }

    const moveTaskUp = (index) => {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            toast.info('Task moved up!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            setTasks(updatedTasks);
        }
        else{
            toast.error('Task is already at top!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    }

    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            toast.info('Task moved down!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            setTasks(updatedTasks);
        }
        else{
            toast.error('Task is already at bottom!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    }

    const fetchTasks = () => {
        const storedTasks = localStorage.getItem('tasks');
        if(storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
        else{
            setTasks([]);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div id="to-do-list">
            <div id="header">
                <h1>To-Do-Pal</h1>
                <p><i>&quot;Streamline Your Day, One Task at a Time.&quot;</i></p>
            </div>
            <div id="input">
                <input type="text" placeholder="Add a task" value={newTask} onChange={handleInputChange} />
                <button id="add-button" onClick={addTask}>Add Task</button>
            </div>
            {tasks.length > 0 &&
                <div id="tasks">
                    {
                        tasks.map((task, index) =>
                            <div className="task" key={index}>
                                <div className="task-left">
                                    <p>{task}</p>
                                </div>
                                <div className="task-right">
                                    <div className="btn delete-button" onClick={() => deleteTask(index)}><MdDelete /></div>
                                    <div className="btn up-down-button" onClick={() => moveTaskUp(index)}><FaArrowUp /></div>
                                    <div className="btn up-down-button" onClick={() => moveTaskDown(index)}><FaArrowDown /></div>
                                </div>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default ToDoList;
