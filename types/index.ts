import { JWT } from "next-auth/jwt";
import { Session, User } from 'next-auth';
export enum TokenError {
    refreshAccessToken =  'refreshAccessToken'
}
export interface ExtendsToken extends JWT {
    accessToken : string,
    refreshToken: string,
    accessTokenExpiresAt: number,
    user: User,
    error?: TokenError
}
export interface ExtendsSession extends Session {
    accessToken: ExtendsToken['accessToken'],
    error: ExtendsToken['error']
}

export interface PlayList {
    playlist:SpotifyApi.PlaylistObjectSimplified[],
    selectedPlayListId: string | null,
    selectedPlayList: SpotifyApi.SinglePlaylistResponse | null
}

export interface IPlayList {
    playlistContextState: PlayList,
    updatePlayListContextState: (update:Partial<PlayList>) => void 
}

export interface SONG {
    selectedSongId?: string,
    selectedSong: SpotifyApi.TrackObjectFull | null,
    isPlaying: boolean,
    volume: number,
    deviceId: string | null
}

export interface ISONG {
    songContextState: SONG,
    dispatch: any
}

export enum SongReducerActionType {
    SetDevice = 'SetDevice',
    toggleIsPlaying = 'toggleIsPlaying',
    setCurrentPlayingSong = 'setCurrentPlayingSong',
    setVolume = 'setVolume'
}
export interface SongReducerAction {
    type: SongReducerActionType.SetDevice,
    payload: Pick<SONG,'deviceId' | 'volume'>
} 
export interface SongReducerActionToggleIsPlaying{
    type: SongReducerActionType.toggleIsPlaying,
    payload: boolean
}
export interface SongReducerActionSetCurrentPlaying{
    type: SongReducerActionType.setCurrentPlayingSong,
    payload: Pick<SONG,'selectedSongId'| 'selectedSong' | 'isPlaying'>
}

export interface SongReducerActionSetVolume{
    type: SongReducerActionType.setVolume,
    payload: number
}