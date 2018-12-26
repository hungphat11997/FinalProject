import { UPDATE_POSTNAME} from '../actions/updatePostName';
export default function postnameReducer(state = "", action) {

    switch(action.type) {
        case UPDATE_POSTNAME:
        return action.postname;
        default: 
        return state;
    }
}