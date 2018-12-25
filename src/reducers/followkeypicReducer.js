import { UPDATE_FOLLOWKEYPIC} from '../actions/updateFollowKeyPic';
export default function followkeypicReducer(state = {followkeypic: []}, action) {

    switch(action.type) {
        case UPDATE_FOLLOWKEYPIC:
        return action.followkeypic;
        default: 
        return state;
    }
}