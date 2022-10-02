import React from 'react'
import Image from 'next/image'
import { convertDuration } from '../utils/durationConverter'
import useSpotify from '../hooks/useSpotify'
import { useSongContext } from '../contexts/SongContext'
import { SongReducerActionType } from '../types'
import { usePlayListContext } from '../contexts/PlayListContext'
interface Props {
    item:SpotifyApi.PlaylistTrackObject,
    itemIndex:number
}
export default function Song({item,itemIndex}:Props) {
  const spotifyApi = useSpotify();
  const { songContextState: {deviceId}, dispatch } = useSongContext();
  const { playlistContextState: {selectedPlayList}} = usePlayListContext()
  const playSong = async () => {
    if (!deviceId) return
    dispatch({
      type:SongReducerActionType.setCurrentPlayingSong,
      payload: {
        selectedSongId: item.track?.id,
        selectedSong: item.track,
        isPlaying: true,
      }
    })
    await spotifyApi.play({
      device_id:deviceId,
      context_uri: selectedPlayList?.uri,
      offset: {
        uri: item.track?.uri as string
      } 
    })
  }
  return (
    <div className='grid grid-cols-2 text-gray-500 px-5 py-4 hover:bg-gray-900 rounded-lg cursor-pointer'>
         <div className='flex items-center space-x-4'>
            <p>{itemIndex + 1}</p>
            <div>
                <Image src={item.track?.album.images[0].url || ''} alt="Song name" width="40px" height="40px"/>
            </div>
            <div>
                <p className='w-36 lg:w-72 truncate text-white'>{item.track?.name}</p>
                <p className='w-40'>{item.track?.artists[0]?.name}</p>
            </div>
         </div>
         <div className='flex justify-between items-center ml-auto md:ml-0'>
            <p className='hidden md:block w-40'>{item.track?.album.name}</p>
            <p>{convertDuration(item.track?.duration_ms)}</p>
         </div>
    </div>
  )
}
