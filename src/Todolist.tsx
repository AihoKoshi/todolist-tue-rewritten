import React, {KeyboardEvent, ChangeEvent, FC, useState} from 'react';
import TasksList from "./TasksList";
import s from './App.module.css'
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    todoListId: string
    todolistTitle: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeFilter: (filterValue: FilterValuesType, todoListId: string) => void
    addTask: (inputValue: string, todoListId: string) => void
    filterValue: FilterValuesType
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListId: string) => void
}

const Todolist: FC<TodolistPropsType> = (props): React.ReactElement | null => {

    const {
        todoListId,
        todolistTitle,
        tasks,
        removeTask,
        removeTodoList,
        changeFilter,
        addTask,
        filterValue,
        changeTaskStatus,
    } = props

    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const addTaskOnClickHandler = () => {
        addTaskBtnDisabled ? setError(true) : addTask(inputValue.trim(), todoListId)
        setInputValue('')
    };
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setInputValue(e.currentTarget.value);
    }
    const inputOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        inputValueEmptyWarning && setError(true)
        !inputValueLengthRestriction && e.key === 'Enter' && addTaskOnClickHandler()
    };
    const erase = () => {
        setInputValue(inputValue.slice(0, -1))
    };
    const clearInput = () => {
        setInputValue('')
    }
    const removeTodoListOnClickHandler = () => {
        removeTodoList(todoListId)
    }
    const filterOnClickHandlerCreator = (filter: FilterValuesType): () => void => (): void => changeFilter(filter, todoListId);
    const filterAllBtnStyleController = filterValue === 'all' ? s.filterBtnActive : s.filterBtn;
    const filterActiveBtnStyleController = filterValue === 'active' ? s.filterBtnActive : s.filterBtn;
    const filterCompletedBtnStyleController = filterValue === 'completed' ? s.filterBtnActive : s.filterBtn;

    const inputValueEmptyWarning = !inputValue.trim().length;
    const inputValueLengthRestriction = inputValue.trim().length > 10;
    const addTaskBtnDisabled = inputValueEmptyWarning || inputValueLengthRestriction;
    const taskTitleRequiredWarning = error && <span className={s.warning}>Task title is required</span>;
    const taskTitleLengthRestrictionWarning = inputValueLengthRestriction &&
        <span className={s.warning}>Task title shouldn't exceed 10 characters</span>

    return (
        <div className={s.Todolist}>
            <h2>{todolistTitle}</h2>
            <button
                onClick={removeTodoListOnClickHandler}
            >DELETE TODOLIST
            </button>
            <div>
                <input
                    className={error || inputValueLengthRestriction ? s.inputWarningTextBox : undefined}
                    placeholder={'Please type your task title'}
                    value={inputValue}
                    onChange={inputOnChangeHandler}
                    onKeyDown={inputOnKeyDownHandler}
                />
                <button
                    disabled={addTaskBtnDisabled}
                    onClick={addTaskOnClickHandler}
                >+
                </button>
                <button
                    disabled={!inputValue}
                    onClick={erase}
                >erase
                </button>
                <button
                    disabled={!inputValue}
                    onClick={clearInput}
                >delete
                </button>
            </div>
            {taskTitleRequiredWarning}
            {taskTitleLengthRestrictionWarning}
            <TasksList
                tasks={tasks}
                todoListId={todoListId}
                removeTask={removeTask}
                filterValue={filterValue}
                changeTaskStatus={changeTaskStatus}
            />
            <div className={s.filterBtnWrapper}>
                <button
                    className={filterAllBtnStyleController}
                    onClick={filterOnClickHandlerCreator('all')}>All
                </button>
                <button
                    className={filterActiveBtnStyleController}
                    onClick={filterOnClickHandlerCreator('active')}>Active
                </button>
                <button
                    className={filterCompletedBtnStyleController}
                    onClick={filterOnClickHandlerCreator('completed')}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;

// let isAllTasksIsDone = true;
// for(let i = 0; i < tasks.length; i++) {
//     if (tasks[i].isDone){
//         isAllTasksIsDone = false
//         break
//     }
// }
// const todoClasses = isAllTasksIsDone ? s.todolistEmpty : s.Todolist;

// const filterHandlerCreator = (filterValue: FilterValuesType): () => void => () : void => changeFilter(filterValue)
// <div className={s.Todolist}>
//     <h3>{todolistTitle}</h3>
//     <div>
//         <input/>
//         <button>+</button>
//     </div>
//     <TasksList tasks={tasks} removeTask={removeTask}/>
//     <div>
//         <button onClick={filterHandlerCreator('all')}>All</button>
//         <button onClick={filterHandlerCreator('active')}>Active</button>
//         <button onClick={filterHandlerCreator('completed')}>Completed</button>
//     </div>
// </div>