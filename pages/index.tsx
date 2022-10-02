import type { NextPage } from "next";
import Head from "next/head";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";
import { PlayListContextProvider } from "../contexts/PlayListContext";
import SongContextProvider from "../contexts/SongContext";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <PlayListContextProvider>
        <SongContextProvider>
          <Head>
            <title>Spotify Clone</title>
            <meta name="description" content="Spotify by Nam" />
            <link rel="icon" href="/fabicon.ico" />
          </Head>
          <main className="flex">
            <Sidebar />
            <Center />
          </main>
          <div className="sticky bottom-0 text-white">
            <Player />
          </div>
        </SongContextProvider>
      </PlayListContextProvider>
    </div>
  );
};

export default Home;
