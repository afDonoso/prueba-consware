import { AUTHED_USER_KEY, USERS_KEY } from "../constants/keys";

export default function getAuthedUser() {
    const username = localStorage.getItem(AUTHED_USER_KEY)
    const users = JSON.parse(localStorage.getItem(USERS_KEY))

    return users.find(user => user.username === username) 
}

export function userAuthed() {
    console.log(typeof localStorage.getItem(AUTHED_USER_KEY) !== "undefined" 
    && localStorage.getItem(AUTHED_USER_KEY) !== null)
    return typeof localStorage.getItem(AUTHED_USER_KEY) !== "undefined" 
        && localStorage.getItem(AUTHED_USER_KEY) !== null
}