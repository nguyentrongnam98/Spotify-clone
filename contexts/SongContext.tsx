import { useSession } from "next-auth/react"
import { createContext, ReactNode, useContext, useEffect, useReducer } from "react"
import useSpotify from "../hooks/useSpotify"
import { songReducer } from "../reducer/songReducer"
import { ISONG, SONG, SongReducerActionType } from "../types"

const defaultSongContextState: SONG = {
    deviceId:null,
    isPlaying:false,
    selectedSong: null,
    volume:50,
    selectedSongId: undefined
  }
  export const SongContext = createContext<ISONG>({
      songContextState:defaultSongContextState,
      dispatch: () => {}
  })
  
  export const useSongContext = () => useContext(SongContext)

  const SongContextProvider = ({children}:{children:ReactNode}) => {
    const spotifyApi = useSpotify();
    const {data:session} = useSession();
    const [state, dispatch] = useReducer(songReducer,defaultSongContextState)
    const songContextProviderData : ISONG = {
        songContextState:state,
        dispatch
    }
    useEffect(() => {
      const setCurrentDevice = async () => {
         const avaliable = await spotifyApi.getMyDevices()
         if (avaliable.body.devices.length === 0) return
         const { id, volume_percent } = avaliable.body.devices[0]
         dispatch({
            type:SongReducerActionType.SetDevice,
            payload: {
                deviceId: id,
                volume: volume_percent as number
            }
         })
         await spotifyApi.transferMyPlayback([id as string])
      }
      if (spotifyApi.getAccessToken()) {
        setCurrentDevice()
      }
    },[spotifyApi,session])
    useEffect(() => {
       const getCurrentPlaySong = async () => {
        const songInfor = await spotifyApi.getMyCurrentPlayingTrack()
        if (!songInfor.body) return
        dispatch({
            type:SongReducerActionType.setCurrentPlayingSong,
            payload:{
                selectedSong:songInfor.body.item as SpotifyApi.TrackObjectFull,
                selectedSongId:songInfor.body.item?.id,
                isPlaying: songInfor.body.is_playing
            }
        })
       }
       if (spotifyApi.getAccessToken()) {
        getCurrentPlaySong()
      }
    },[session,spotifyApi])
      return (
        <SongContext.Provider value={songContextProviderData}>
            {children}
        </SongContext.Provider>
      )
  }

  export default SongContextProvider;