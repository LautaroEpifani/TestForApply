import { useEffect, useState } from 'react'
import Posts from './components/Posts'
import axios from 'axios'
import {MdDeleteOutline} from 'react-icons/md'
import NewPost from './components/NewPost';

interface IPost {
    body: string;
    id: number;
    title: string;
    userId: number;
}


function App() {
  const [postsData, setPostsData] = useState([])
  const [active, setActive] = useState(false)

  const deletePost = (postId: number) => {
    const filteredPosts = postsData.filter((post: IPost) => post.id !== postId)
    setPostsData(filteredPosts)
  }

  

  useEffect(() => {
    const getData = axios.get('https://jsonplaceholder.typicode.com/posts/')
    .then((response) => setPostsData(response.data.splice(0,10)))
    .catch(function (error) {
      console.log(error);
    });
  }, [])
  
  return (
    <div className="">
    <h1 className="text-center mb-10 font-bold text-gray-600 underline">Posts</h1>
     {/* <Posts postsData={postsData}/> */}
      <div className="w-1/2 mx-auto grid grid-cols-1 gap-2 p-10">
        {postsData.map((post: IPost, index) => (
          <div className="flex justify-between gap-2">
            <div key={post.id} className="flex w-full gap-4 font-semibold text-gray-500 justify-center border border-gray-400 rounded py-2 px-8">
              <p>{post.id}</p><p>{post.title}</p>
            </div>
            <button className="w-10 border bg-blue-500 rounded font-semibold text-white uppercase flex justify-center items-center" onClick={() => deletePost(post.id)}><MdDeleteOutline/></button>
          </div>
        ))}
        <button onClick={() => setActive(!active)} className="w-44 border bg-blue-500 rounded font-semibold text-white uppercase flex justify-center items-center py-2 mt-2">New Post</button>
        <div className={active ? `` : `hidden`}>
          <NewPost/>
        </div>
      </div>
      
    </div>
  )
}

export default App
