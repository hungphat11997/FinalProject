export const UPDATE_MYNEWFEED = 'updateMyNewfeed';

export function updateMyNewfeed(newMyNewfeed) {
    return {
        type: UPDATE_MYNEWFEED,
        mynewfeed: newMyNewfeed
    };
}