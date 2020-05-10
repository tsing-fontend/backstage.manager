import { INCREMENT, DECREMENT } from '../action-type/counter';

export function increment (number) {
    return {
        type : INCREMENT,
        number
    }
}

export function decrement (number) {
    return {
        type : DECREMENT,
        number
    }
}