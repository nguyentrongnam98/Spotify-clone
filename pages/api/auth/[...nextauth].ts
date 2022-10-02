import { CallbacksOptions } from "next-auth";
import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import { scopes, spotifyApi } from "../../../config/spotify";
import { ExtendsToken, TokenError } from "../../../types";

const refreshAccessToken = async (token:ExtendsToken): Promise<ExtendsToken> => {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)
    const {body:rfToken} = await spotifyApi.refreshAccessToken()
    return {
      ...token,
      accessToken: rfToken.access_token,
      refreshToken: rfToken.refresh_token || token.refreshToken,
      accessTokenExpiresAt: Date.now() + rfToken.expires_in * 1000
    }
  } catch (error) {
    return {
      ...token,
      error: TokenError.refreshAccessToken
    }
  }
} 
const jwtCallback : CallbacksOptions['jwt'] = ({token,account,user}) => {
  let extendedToken : ExtendsToken;
  if (account && user) {
    extendedToken = {
      ...token,
      user,
      accessToken: account.access_token as string,
      refreshToken: account.refresh_token as string,
      accessTokenExpiresAt: (account.expires_at as number) * 1000
    }
    return extendedToken
  }
  if (Date.now() + 5000 < (token as ExtendsToken).accessTokenExpiresAt) {
    return token
  }
   return token
}

const sessionCallback: CallbacksOptions['session'] = async ({session,token,user}) => {
   session.accessToken = (token as ExtendsToken).accessToken
   session.error = (token as ExtendsToken).error
   return session 
}
export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        url:'https://accounts.spotify.com/authorize',
        params: {
            scope: scopes
        }
      }
    }),
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback
  }
});
