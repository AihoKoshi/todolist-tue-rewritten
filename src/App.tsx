import React, {useState} from 'react';
import './App.module.css';
import {v1} from "uuid";
import Todolist, {TaskType} from "./Todolist";
import s from './App.module.css'

export type FilterValuesType = 'all' | 'completed' | 'active';

function App(): React.JSX.Element {

    const todolistTitle = 'What to learn';
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML & CSS', isDone: false},
        {id: v1(), title: 'JS & TS', isDone: true},
        {id: v1(), title: 'React & Redux', isDone: false},
    ]);

    const addTask = (inputValue: string) => {
        const newTask = {id: v1(), title: inputValue, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter((task) => task.id !== taskID))
    };

    const changeTaskStatus = (taskID: string, newIsDoneValue: boolean) => {
        setTasks(tasks.map((task) =>
            task.id === taskID ? {...task, isDone: newIsDoneValue} : task))
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')
    const changeFilter = (filterValue: FilterValuesType) => {
        setFilter(filterValue)
    };
    const filteredTasks = tasks.filter((task) => {
        return filter === 'active' ? !task.isDone : filter === 'completed' ? task.isDone : tasks
    })

    return (
        <div className={s.App}>
            <Todolist
                todolistTitle={todolistTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filterValue={filter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;

// const [filter, setFilter] = useState('all')
// const filteredTasks = tasks.filter((task) => filter === 'active'
//     ? !task.isDone : filter === 'completed' ? task.isDone : 'all')
// const changeFilter = (filterValue: FilterValuesType) => {
//     setFilter(filterValue)
// }

// const changeFilter = (tasks: Array<TaskType>, filterValue: FilterValuesType) => {
//     switch (filterValue) {
//         case 'active':
//             return tasks.filter(t => t.isDone)
//         case 'completed':
//             return tasks.filter(t => !t.isDone)
//         default:
//             return tasks
//     }
// }
// const filteredTasks = changeFilter(tasks, filter)