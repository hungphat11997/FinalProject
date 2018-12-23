import { UPDATE_PROFILE} from '../actions/updateProfile';
export default function profileReducer(state = {name: "", seq: 0, balance: 0}, action) {

    switch(action.type) {
        case UPDATE_PROFILE:
        return action.profile;
        default: 
        return state;
    }
}