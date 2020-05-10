import { INCREMENT, DECREMENT } from '../action-type/counter';


const counter  = (state = 0,action) => {
    console.log(action);
    switch (action.type) {
        case INCREMENT:
            state = state + action.number;
            return state;
        case DECREMENT:
            state = state - action.number;
            return state;
        default:
            return state;
    }
}

export default counter;