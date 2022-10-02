import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { IPlayList, PlayList } from '../types';
const defaultPlayListContextState: PlayList = {
  playlist: [],
  selectedPlayListId: null,
  selectedPlayList: null
}
export const PlayListContext = createContext<IPlayList>({
    playlistContextState: defaultPlayListContextState,
    updatePlayListContextState: () => {}
})

export const usePlayListContext = () => useContext(PlayListContext)

export const PlayListContextProvider = ({children}:{children:ReactNode}) => {
  const [playlistContextState, setPlayListContextState] = useState(defaultPlayListContextState)
  const {data:session} = useSession()
  const spotifyApi = useSpotify()
  const updatePlayListContextState = (update:Partial<PlayList>) => {
     setPlayListContextState((prev) => ({
      ...prev,
      ...update
     }))
  } 
  const playListData = {
    playlistContextState,
    updatePlayListContextState
  }
  useEffect(() => {
   const getUserpLAYlIST = async () => {
    const res = await spotifyApi.getUserPlaylists()
    updatePlayListContextState({
      playlist:res.body.items
    })
   }
   if (spotifyApi.getAccessToken()) {
    getUserpLAYlIST()
   }
  },[session,spotifyApi])
   return <PlayListContext.Provider value={playListData}>{children}</PlayListContext.Provider>
}
