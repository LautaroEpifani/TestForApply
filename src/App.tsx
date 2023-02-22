import { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import NewPost from "./components/NewPost";
import { Post } from './types'

const INITIAL_STATE = {
    title: "",
    body: "",
    userId: 1,
    id: undefined,
}

function App() {
  const [postsData, setPostsData] = useState<Post[]>([INITIAL_STATE]);
  const [active, setActive] = useState(false);
  const [newPost, setNewPost] = useState<Post>(INITIAL_STATE)
 

  const deletePost = (postId: number | undefined) => {
    const filteredPosts = postsData?.filter((post: Post) => post.id !== postId);
    setPostsData(filteredPosts);
  };

  useEffect(() => {
    const getData: Promise<void> = axios
      .get("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => setPostsData(response.data.splice(90, 100)))
      .catch(function (error) {
        console.log(error);
      });
   
  }, []);

   useEffect(() => {
    if (newPost) {
        setPostsData([...postsData, newPost])  
    }
  }, [newPost]);

  return (
    <div className="">
      <h1 className="text-center mt-2 font-bold text-gray-600 underline">
        Posts
      </h1>
      <div className="lg:w-1/2 mx-auto grid grid-cols-1 gap-2 p-10">
        {postsData.map((post, index) => (
          <div key={post.id} className="flex justify-between gap-2 ">
            <div className="flex h-20 lg:h-auto w-full gap-4 font-semibold text-gray-500 justify-left items-center border border-gray-400 rounded py-2 px-8">
              <p>{post.id}</p>
              <p>{post.title}</p>
            </div>
            <button
              className="w-10 border bg-blue-500 rounded font-semibold text-white uppercase flex justify-center items-center"
              onClick={() => deletePost(post.id)}
            
          
            >
              <MdDeleteOutline />
            </button>
          </div>
        ))}
        <button
          onClick={() => setActive(!active)}
          className="w-44 border bg-blue-500 rounded font-semibold text-white uppercase flex justify-center items-center py-2 mt-2"
        >
          New Post
        </button>
        <div className={active ? `` : `hidden`}>
          <NewPost setNewPost={setNewPost}/>
        </div>
      </div>
     
    </div>
  );
}

export default App;
