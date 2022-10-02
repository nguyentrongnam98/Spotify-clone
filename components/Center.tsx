import { signOut, useSession } from "next-auth/react";
import { usePlayListContext } from "../contexts/PlayListContext";
import Image from "next/image";
import UserIcon from "../assets/CLGT.png";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { pickRandom } from "../utils/pickRandom";
import Songs from "./Songs";
export default function Center() {
  const { playlistContextState: {selectedPlayListId,selectedPlayList} } = usePlayListContext();
  const { data: session } = useSession();
  const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
  ];
  const [fromColor,setFromColor] = useState<string | null>(null)
  useEffect(() => {
     setFromColor(pickRandom(colors))
  },[selectedPlayListId])
  console.log('selectedPlayList',selectedPlayList);
  
  return (
    <div className="text-white flex-grow relative h-screen overflow-y-scroll scrollbar-hidden">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full py-1 pl-1 pr-2"
          onClick={() => signOut()}
        >
          <Image
            src={session?.user?.image || UserIcon}
            alt="user avatar"
            height="40px"
            width="40px"
            className="rounded-full object-cover"
          />
          <h2>{session?.user?.name}</h2>
          <CheckCircleIcon className="icon" />
        </div>
      </header>
      <section className={`flex items-end space-x-7 bg-gradient-to-b ${fromColor}  to-black h-80 p-8`}>
        {
          selectedPlayList && (
            <>
             <Image src={selectedPlayList.images[0]?.url} alt="Playlist image" height={'176px'} width={'176px'} className="shadow-2xl"/>
             <div>
              <p>Play list</p>
              <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
                {selectedPlayList.name}
              </h1>
             </div>
            </>
          )
          }
      </section>
      <div>
        <Songs/>
      </div>
    </div>
  );
}
