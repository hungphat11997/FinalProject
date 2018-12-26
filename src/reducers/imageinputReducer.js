import { UPDATE_IMAGEINPUT} from '../actions/updateImageInput';
export default function imageinputReducer(state = null, action) {

    switch(action.type) {
        case UPDATE_IMAGEINPUT:
        return action.imageinput;
        default: 
        return state;
    }
}