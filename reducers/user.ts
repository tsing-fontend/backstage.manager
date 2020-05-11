import { SAVE_USER } from '../action-type/user';

const user = (state = {}, action) => {
    switch (action.type) {
        case SAVE_USER:
            state = action.user;
            return state;
        default:
            return state;
    }
}

export default user;