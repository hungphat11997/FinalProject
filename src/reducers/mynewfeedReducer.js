import { UPDATE_MYNEWFEED} from '../actions/updateMyNewfeed';
export default function mynewfeedReducer(state = {newfeed: []}, action) {

    switch(action.type) {
        case UPDATE_MYNEWFEED:
        return action.mynewfeed;
        default: 
        return state;
    }
}