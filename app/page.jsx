'use client'
import Feed from "@components/Feed"
import {  useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <section className="w-full flex-center flex-col">
      <span className="orange_gradient text-center text-6xl ">Hello {session?.user.name}</span>
      <h1 className="head_text text-center">
        Discover and Share

        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI Powered Prompts</span>
      </h1>

      <p className="desc text-center">
        Prompt Lab is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  )
}


export default Home
