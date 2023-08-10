import React, {useState} from 'react';
import './App.module.css';
import {v1} from "uuid";
import Todolist, {TaskType} from "./Todolist";
import s from './App.module.css'

export type FilterValuesType = 'all' | 'completed' | 'active';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App(): React.JSX.Element {

    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const [todoLists, setTodoLists] = React.useState<Array<TodolistType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ]);
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'Ice cream', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Water', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'HTML & CSS', isDone: false},
            {id: v1(), title: 'JS & TS', isDone: true},
            {id: v1(), title: 'React & Redux', isDone: false},
        ]
    });

    const changeTodoListFilter = (filterValue: FilterValuesType, todoListId: string) => {
        // const updatedTodoLists: Array<TodolistType>
        //     = todoLists.map((tl) => tl.id === todoListId ? {...tl, filter: filterValue} : tl)
        // setTodoLists(updatedTodoLists)
        setTodoLists(todoLists.map((tl) => tl.id === todoListId ? {...tl, filter: filterValue} : tl))
    };
    const removeTask = (taskID: string, todoListId: string) => {
        // const tasksForTodoList: Array<TaskType> = tasks[todoListId] // нашли массив
        // const updatedTasks: Array<TaskType> = tasksForTodoList.filter((t) => t.id !== taskID) // отфильтровали его
        // const copyTasks: TasksStateType = {...tasks} // сделали копию объекта
        // copyTasks[todoListId] = updatedTasks // и в этот объект подсунули вместо старого новый массив, который отличается тем, что в нем нет одной таски
        // setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((t) => t.id !== taskID)})
    };

    const addTask = (inputValue: string, todoListId: string) => {
        // разжеванный вариант
        // const tasksForTodoList: Array<TaskType> = tasks[todoListId]
        // const updatedTasks: Array<TaskType> = [newTask, ...tasksForTodoList]
        // const copyTask: TasksStateType = {...tasks}
        // copyTask[todoListId] = updatedTasks
        // setTasks(copyTask)
        const newTask: TaskType = {id: v1(), title: inputValue, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
        // старый код
        // const newTask = {id: v1(), title: inputValue, isDone: false}
        // setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskID: string, newIsDoneValue: boolean, todoListId: string) => {
        // разжеванный вариант
        // const tasksForTodolist: Array<TaskType> = tasks[todoListId]
        // const updatedTasks: Array<TaskType> = tasksForTodolist.map((t) => t.id === taskID ? {...t, isDone: newIsDoneValue}: t)
        // const copyTasks: TasksStateType = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        // короткий вариант
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        })
        // старый код
        // setTasks(tasks.map((task) =>
        //     task.id === taskID ? {...task, isDone: newIsDoneValue} : task))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter((tl) => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const getFilteredTasks =
        (allTasks: Array<TaskType>, currentFilterValue: FilterValuesType): Array<TaskType> => {
            switch (currentFilterValue) {
                case 'completed':
                    return allTasks.filter(t => t.isDone)
                case "active":
                    return allTasks.filter(t => !t.isDone)
                default:
                    return allTasks
            }
        }

        const buttonToAddTodoListFunction = () => {
        return <button>+</button>
        }
        const buttonAddTodoList = buttonToAddTodoListFunction()

    const todoListsComponents: Array<JSX.Element> | JSX.Element = todoLists.length
        ? todoLists.map((tl) => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <Todolist
                key={tl.id}
                todoListId={tl.id}
                todolistTitle={tl.title}
                filterValue={tl.filter}
                tasks={filteredTasks}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        )
    }) : <span className={s.warning}>{`No todo lists found. Press ${buttonAddTodoList} to create new todo list`.toUpperCase()}</span>

    return (
        <div className={s.App}>
            {todoListsComponents}
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
// const filteredTasks = tasks.filter((task) => {
//     return filter === 'active' ? !task.isDone : filter === 'completed' ? task.isDone : tasks
// })

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

// const todolistTitle = 'What to learn';
// const [filter, setFilter] = useState<FilterValuesType>('all')
