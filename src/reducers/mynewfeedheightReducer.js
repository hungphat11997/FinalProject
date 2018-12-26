import { UPDATE_MYNEWFEEDHEIGHT} from '../actions/updateMyNewfeedHeight';
export default function mynewfeedheightReducer(state = {newfeedheight: []}, action) {

    switch(action.type) {
        case UPDATE_MYNEWFEEDHEIGHT:
        return action.mynewfeedheight;
        default: 
        return state;
    }
}