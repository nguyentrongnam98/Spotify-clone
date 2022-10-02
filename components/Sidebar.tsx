import { HomeIcon, HeartIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon } from "@heroicons/react/outline";
import IconButton from "./IconButton";
import { usePlayListContext } from "../contexts/PlayListContext";
import useSpotify from "../hooks/useSpotify";
const Divider = () => <hr className="border-t-[0.1px] border-gray-900"/>
export default function Sidebar() {
  const spotifyApi = useSpotify()
  const { playlistContextState:playListSpotify, updatePlayListContextState } = usePlayListContext();
  const selectedPlayList = async (id:string) => {
    const res = await spotifyApi.getPlaylist(id)
    updatePlayListContextState({
      selectedPlayListId: id,
      selectedPlayList: res.body
    })
  }
  return (
    <div className="text-gray-500 px-5 pt-5 pb-36 text-xs lg:text-sm border-r border-gray-900 h-screen scrollbar-hidden sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block">
      <div className="space-y-4">
        <IconButton icon={HomeIcon} label="Home"/>
        <IconButton icon={SearchIcon} label="Search"/>
        <IconButton icon={LibraryIcon} label="Library"/>
        <Divider/>
        <IconButton icon={PlusCircleIcon} label="Create Playlist"/>
        <IconButton icon={HeartIcon} label="Liked Song"/>
        <IconButton icon={RssIcon} label="Your Episodes"/>
        <Divider/>
        {
          playListSpotify.playlist.map(({id,name}) => (
            <p key={id} className='cursor-pointer hover:text-white' onClick={() => selectedPlayList(id)}>{name}</p>
          ))
        }
      </div>
    </div>
  );
}
