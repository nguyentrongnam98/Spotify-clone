import { GetServerSideProps } from "next";
import React from "react";
import { getProviders, ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";
import spotifyLogo from "../assets/Spotify-logo.png";
export default function Login({ providers }: Props) {
  const { name: providersName, id: providersId } =
    providers?.spotify as ClientSafeProvider;
  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen">
      <div className="mb-6">
        <Image
          src={spotifyLogo}
          alt="spotify logo"
          height={"200px"}
          width={"200px"}
        />
      </div>
      <button
        className="bg-[#18D860] text-white p-5 rounded-full"
        onClick={() => {
          signIn(providersId, { callbackUrl: "/" });
        }}
      >
        Login with {providersName}
      </button>
    </div>
  );
}
interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
}
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
