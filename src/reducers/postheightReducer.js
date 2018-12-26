import { UPDATE_POSTHEIGHT} from '../actions/updatePostHeight';
export default function postheightReducer(state = null, action) {

    switch(action.type) {
        case UPDATE_POSTHEIGHT:
        return action.postheight;
        default: 
        return state;
    }
}