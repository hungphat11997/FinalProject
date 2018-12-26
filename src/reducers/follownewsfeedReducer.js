import { UPDATE_FOLLOWNEWSFEED} from '../actions/updateFollowNewsfeed';
const initState = {
    name: [],
    pic: [],
    news: []
}
export default function follownewsfeedReducer(state = initState, action) {

    switch(action.type) {
        case UPDATE_FOLLOWNEWSFEED:
        return action.follownewsfeed;
        default: 
        return state;
    }
}