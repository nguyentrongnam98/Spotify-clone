import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import React from "react";
import { useSongContext } from "../contexts/SongContext";
import useSpotify from "../hooks/useSpotify";
import { SongReducerActionType } from "../types";
import Image from 'next/image';
import { useDebouncedCallback } from "use-debounce";

export default function Player() {
  const spotifyApi = useSpotify();
  const { dispatch , songContextState : {isPlaying,selectedSong, deviceId, volume}} = useSongContext();
  const handlePlayPause = async () => {
    const res = await spotifyApi.getMyCurrentPlaybackState();
    if (!res.body) return;
    if (res.body.is_playing) {
      await spotifyApi.pause();
      dispatch({
        type: SongReducerActionType.toggleIsPlaying,
        payload: false,
      });
    } else {
      await spotifyApi.play();
      dispatch({
        type: SongReducerActionType.toggleIsPlaying,
        payload: true,
      });
    }
  };
  const handleSkipSong = async (skipTo: 'previous' | 'next') => {
     if (!deviceId) {
       return
     }
     if (skipTo === 'previous') {
        await spotifyApi.skipToPrevious() 
     } else {
        await spotifyApi.skipToNext()
     }
     const songInfor = await spotifyApi.getMyCurrentPlayingTrack()
     if (!songInfor) return
     dispatch({
        type: SongReducerActionType.setCurrentPlayingSong,
        payload:{
            selectedSongId: songInfor.body.item?.id,
            selectedSong: songInfor.body.item,
            isPlaying: songInfor.body.is_playing
        }
     })
  }
  const handleVolumeChange = useDebouncedCallback((volume:number) => {
      spotifyApi.setVolume(volume)
  },500)
  const volumeChange : React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const volume = Number(event.target.value)
      if (!deviceId) return
      handleVolumeChange(volume)
      dispatch({
        type:SongReducerActionType.setVolume,
        payload:volume
      })
  }
  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
         {selectedSong ? (
            <>
            <div className="hidden md:block">
               <Image src={selectedSong.album.images[0].url} alt="album" width="40px" height="40px"/>
            </div>
            <div>
                <h3>{selectedSong.name}</h3>
                <p>{selectedSong.artists[0].name}</p>
            </div>
            </>
         ) : 'selected song'}
      </div>
      <div className="flex justify-evenly items-center">
        <SwitchHorizontalIcon className="icon-playback" />
        <RewindIcon className="icon-playback" onClick={() => handleSkipSong('previous')}/>
        {isPlaying ? (
          <PauseIcon className="icon-playback" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="icon-playback" onClick={handlePlayPause} />
        )}
        <FastForwardIcon className="icon-playback" onClick={() => handleSkipSong('next')}/>
        <ReplyIcon className="icon-playback" />
      </div>
      <div className="flex justify-end items-center pr-5 space-x-3 md:space-x-4">
        <VolumeUpIcon className="icon-playback" />
        <input type={"range"} min={0} max={100} className="w-20 md:w-auto" onChange={volumeChange} value={volume}/>
      </div>
    </div>
  );
}
