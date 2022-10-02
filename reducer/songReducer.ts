import {
  SONG,
  SongReducerAction,
  SongReducerActionSetCurrentPlaying,
  SongReducerActionSetVolume,
  SongReducerActionToggleIsPlaying,
  SongReducerActionType,
} from "../types";

export const songReducer = (
  state: SONG,
  action:
    | SongReducerAction
    | SongReducerActionToggleIsPlaying
    | SongReducerActionSetCurrentPlaying
    | SongReducerActionSetVolume
) => {
  switch (action.type) {
    case SongReducerActionType.SetDevice:
      return {
        ...state,
        deviceId: action.payload.deviceId,
        volume: action.payload.volume,
      };
    case SongReducerActionType.toggleIsPlaying:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case SongReducerActionType.setCurrentPlayingSong:
      return {
        ...state,
        selectedSongId: action.payload.selectedSongId,
        selectedSong: action.payload.selectedSong,
        isPlaying: action.payload.isPlaying,
      };
      case SongReducerActionType.setVolume:
        return {
            ...state,
            volume:action.payload
        }
    default:
      return state;
  }
};
