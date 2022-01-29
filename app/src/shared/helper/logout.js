import { AUTHED_USER_KEY } from "../constants/keys";

export function logout() {
    localStorage.removeItem(AUTHED_USER_KEY)
}