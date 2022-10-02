import React from 'react'
import { usePlayListContext } from '../contexts/PlayListContext'
import Song from './Song'

function Songs() {
    const {playlistContextState:{selectedPlayList}} = usePlayListContext()
    if (!selectedPlayList) {
       return null
    }
  return (
    <div className='flex flex-col space-y-1 px-8 pb-28'>
       {
        selectedPlayList.tracks.items.map((item,index) =>(
            <Song key={item.track?.id} item={item} itemIndex={index}/>
        ))
       }
    </div>
  )
}

export default Songs