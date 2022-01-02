const initialState = {
  clips: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CLIP":
      return {
        //旧clipの状態を展開
        ...state,
        //追加した新clip
        clips: [...state.clips, action.clip],
      };
    case "DELETE_CLIP":
      return {
        //旧clipの状態を展開
        ...state,
        //渡されたclipを除いた新clip
        clips: state.clips.filter((clip) => clip.url !== action.clip.url),
      };
    default:
      return state;
  }
};

export default reducer;
