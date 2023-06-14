import React from "react";
import {TaskType} from "./Todolist";

export type TasksListPropsType = {
    tasks: Array<TaskType>
    deleteTask: (taskID: string) => void
};

export const TasksList: React.FC<TasksListPropsType> = (props) => {
    const {
        tasks,
        deleteTask
    } = props;

    const tasksListItems: JSX.Element[] | JSX.Element = tasks.length
        ? tasks.map((task) => {
            const deleteTaskOnClickHandler = () => {
                deleteTask(task.id)
            };
            return (
                <li key={task.id}>
                    <button
                        onClick={deleteTaskOnClickHandler}
                    >x
                    </button>
                    <input type={'checkbox'} checked={task.isDone}/>
                    <span>{task.title}</span>
                </li>
            )
        }) : <span>Task list is empty</span>;

    return (
        <ul>{tasksListItems}</ul>
    );
};