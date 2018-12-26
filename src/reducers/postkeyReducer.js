import { UPDATE_POSTKEY} from '../actions/updatePostKey';
export default function postkeyReducer(state = "", action) {

    switch(action.type) {
        case UPDATE_POSTKEY:
        return action.postkey;
        default: 
        return state;
    }
}