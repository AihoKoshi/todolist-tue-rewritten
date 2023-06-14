import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TasksList} from "./TasksList";
import {FilterValuesType} from "./App";
import s from './App.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

export type TodolistPropsType = {
    todolistTitle: string
    tasks: Array<TaskType>
    deleteTask: (taskID: string) => void
    addTask: (newTaskTitle: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
};

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {
        todolistTitle,
        tasks,
        deleteTask,
        addTask,
        changeFilter
    } = props;

    let [newTaskTitle, setNewTaskTitle] = useState<string>('');
    let [error, setError] = useState<boolean>(false);

    const addTaskOnClickHandler = () => {
        !addTaskBtnDisabled && addTask(newTaskTitle.trim())
        error && setError(!error)
        setNewTaskTitle('')
    };

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewTaskTitle(e.currentTarget.value)
    };

    const inputOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTaskOnClickHandler()
    };

    const newTaskTitleLengthRestriction: number = 10;
    const titleLengthRestrictionError: boolean = newTaskTitle.length > newTaskTitleLengthRestriction;
    const titleRequiredError = newTaskTitle.trim().length < 1 && <div>Task title cannot be empty</div>;
    const addTaskBtnDisabled = !newTaskTitle.trim().length || titleLengthRestrictionError;
    const titleLengthExceededError = titleLengthRestrictionError &&
        <div>Title shouldn't exceed 10 characters</div>;
    const changeFilterCreator = (filter: FilterValuesType): () => void => (): void => changeFilter(filter);

    return (
        <div className={s.Todolist}>
            <h3>{todolistTitle}</h3>
            <div>
                <input
                    placeholder={'Add new task'}
                    value={newTaskTitle}
                    onChange={inputOnChangeHandler}
                    onKeyDown={inputOnKeyDownHandler}
                />
                <button
                    disabled={addTaskBtnDisabled}
                    onClick={addTaskOnClickHandler}
                >+
                </button>
                {titleRequiredError} {titleLengthExceededError}
            </div>
            <TasksList
                tasks={tasks}
                deleteTask={deleteTask}
            />
            <div>
                <button onClick={changeFilterCreator('all')}>ALL</button>
                <button onClick={changeFilterCreator('active')}>Active</button>
                <button onClick={changeFilterCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};