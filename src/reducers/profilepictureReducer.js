import { UPDATE_PROFILEPICTURE} from '../actions/updateProfilePicture';
export default function profilepictureReducer(state = "", action) {

    switch(action.type) {
        case UPDATE_PROFILEPICTURE:
        return action.profilepicture;
        default: 
        return state;
    }
}