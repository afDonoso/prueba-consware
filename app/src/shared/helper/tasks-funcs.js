import { USERS_KEY } from "../constants/keys"
import getAuthedUser from "./get-authed-user"
import {v4 as uuid} from "uuid"

export function createTask({title, description, done}) {
    const user = getAuthedUser()
    const users = JSON.parse(localStorage.getItem(USERS_KEY))

    users.find(u => u.username = user.username).tasks.push({id: uuid(), title, description, done})

    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function updateTask({id, title, description, done}) {
    const user = getAuthedUser()
    const users = JSON.parse(localStorage.getItem(USERS_KEY))

    const task = users.find(u => u.username === user.username).tasks.find(task => task.id === id)
    task.title = title
    task.description = description
    task.done = done

    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function deleteTask(id) {
    let user = getAuthedUser()
    const users = JSON.parse(localStorage.getItem(USERS_KEY))
    user = users.find(u => u.username === user.username)

    const tasks = user.tasks.filter(task => task.id !== id)
    user.tasks = tasks

    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}