export const UPDATE_MYNEWFEEDHEIGHT = 'updateMyNewfeedHeight';

export function updateMyNewfeedHeight(newMyNewfeedHeight) {
    return {
        type: UPDATE_MYNEWFEEDHEIGHT,
        mynewfeedheight: newMyNewfeedHeight
    };
}