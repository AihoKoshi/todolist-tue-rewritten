import React, {ChangeEvent} from 'react';
import {JSX} from 'react'
import {TaskType} from "./Todolist";
import s from './App.module.css'
import {FilterValuesType} from "./App";

export type TasksListProps = {
    tasks: Array<TaskType>
    todoListId: string
    removeTask: (taskID: string, todoListId: string) => void
    filterValue: FilterValuesType
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListId: string) => void
}

const TasksList: React.FC<TasksListProps> = (props): JSX.Element => {

    const {
        tasks,
        todoListId,
        removeTask,
        filterValue,
        changeTaskStatus,
    } = props

    const tasksItems: JSX.Element[] | JSX.Element = tasks.length
        ? tasks.map((task) => {
            const removeTaskOnClickHandler = () => removeTask(task.id, todoListId);
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(task.id, e.currentTarget.checked, todoListId)
            };
            const taskClasses = task.isDone ? s.taskIsDone : s.task;
            return (
                <li key={task.id}>
                    <div>
                        <input
                            type={'checkbox'}
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler}
                        />
                        <span className={taskClasses}>{task.title}</span>
                    </div>
                    <button
                        onClick={removeTaskOnClickHandler}
                    >x
                    </button>
                </li>
            )
        })
        : <span className={s.warning}>{`${filterValue} tasks list is empty`.toUpperCase()}</span>

    return (
        <ul>{tasksItems}</ul>
    );
};

export default TasksList;