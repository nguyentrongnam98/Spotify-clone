import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { spotifyApi } from '../config/spotify';
import { ExtendsSession, TokenError } from '../types';

const useSpotify = () => {
    const {data:session} = useSession()
    useEffect(() => {
      if (!session) return
      if ((session as ExtendsSession).error === TokenError.refreshAccessToken) {
         signIn()
      }
      spotifyApi.setAccessToken((session as ExtendsSession).accessToken)
    },[session])
    return spotifyApi
}

export default useSpotify;
