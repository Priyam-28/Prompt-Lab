'use client'

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PrompCardList = ({ data, handleTagClick }) => {
  return (
  <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick} />
      ))}

    </div>

  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState();
  const [allPosts, setAllPosts] = useState([]);
  const handleSearchChange = (e) => {

  }
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt')
    const data = await response.json();
    console.log(data)
    setAllPosts(data)


  }
  useEffect(() => {
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
        data={allPosts}
        handleTagClick={() => {

        }} />

    </section>
  )
}



export default Feed
