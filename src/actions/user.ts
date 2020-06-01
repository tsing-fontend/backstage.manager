import { SAVE_USER } from '../action-type/user';

export function saveUser (user) {
    return {
        type : SAVE_USER,
        user
    }
}
