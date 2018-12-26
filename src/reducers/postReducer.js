import { UPDATE_POST} from '../actions/updatePost';
export default function postReducer(state = "", action) {

    switch(action.type) {
        case UPDATE_POST:
        return action.post;
        default: 
        return state;
    }
}