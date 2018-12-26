import { UPDATE_POSTPIC} from '../actions/updatePostPic';
export default function postpicReducer(state = "", action) {

    switch(action.type) {
        case UPDATE_POSTPIC:
        return action.postpic;
        default: 
        return state;
    }
}