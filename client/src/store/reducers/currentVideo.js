import * as type from '../actions/actionTypes';

//the current video is one object, based on what the user clicked
const currentVideo = (state = {}, action) => {
    switch (action.type) {
        case type.CURRENT_VIDEO:
            return action.payload;
        default:
            return state;
    }
}

export default currentVideo;