'use client'

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PrompCardList = ({ data, handleTagClick }) => {
  return (

    <div className="mt-16 prompt_layout">
      {data.map((post)=>{
        <PromptCard
        key={post.id}
        post={post}
        handleTagClick={handleTagClick}/>
      })}
      Prompt Card

    </div>

  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState();
  const [posts,setPosts]=useState([]);
  const handleSearchChange = (e) => {

  }
  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt')
      const data = await response.json();
      console.log(data)
      setPosts(data)


    }
    fetchPosts();

  }, [])
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text"
          placeholder="Search For a Tag or Username"
          value={searchText}
          onChange={
            handleSearchChange
          }
          required
          className="search_input peer"
        />
      </form>
      <PrompCardList
        data={[]}
        handleTagClick={() => {

        }} />

    </section>
  )
}



export default Feed
