export const UPDATE_IMAGEINPUT = 'updateImageInput';

export function updateImageInput(newImageInput) {
    return {
        type: UPDATE_IMAGEINPUT,
        imageinput: newImageInput
    };
}