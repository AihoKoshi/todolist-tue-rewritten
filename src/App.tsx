import React, {useState} from 'react';
import './App.module.css';
import {v1} from "uuid";
import {TaskType, Todolist} from "./Todolist";
import s from './App.module.css'

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let todolistTitle = 'What to learn';
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML & CSS', isDone: false},
        {id: v1(), title: 'JS & TS', isDone: true},
        {id: v1(), title: 'React & Redux', isDone: false},
    ]);

    const addTask = (newTaskTitle: string) => {
        const newTask = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    };

    const deleteTask = (taskID: string) => {
        setTasks(tasks.filter((task) => task.id !== taskID))
    };

    let [filter, setFilter] = useState<FilterValuesType>('all');
    const changeFilter = (filterValue: FilterValuesType) => setFilter(filterValue);
    let filteredTasks = tasks.filter(task => filter === 'active' ? !task.isDone
        : filter === 'completed' ? task.isDone : 'all');


    return (
        <div className={s.App}>
            <Todolist
                todolistTitle={todolistTitle}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                addTask={addTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
