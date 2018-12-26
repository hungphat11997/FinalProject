import { UPDATE_FOLLOWNEWSFEEDHEIGHT} from '../actions/updateFollowNewsfeedHeight';
export default function follownewsfeedheightReducer(state = {newsfeedheight: []}, action) {

    switch(action.type) {
        case UPDATE_FOLLOWNEWSFEEDHEIGHT:
        return action.follownewsfeedheight;
        default: 
        return state;
    }
}