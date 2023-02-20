import React from 'react'
import { ChangeEvent, FormEvent, useState, useRef } from 'react'
import axios from 'axios'

const initialPost = {
  title: "",
  body: "",
  userId: 1,
  
};

interface IPosts {
      title: string;
      body: string;
      userId: number;
      
}

const NewPost = () => {

  const [posts, setPosts] = useState<IPosts[]>([])
  const [post, setPost] = useState(initialPost);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPost({ ...post, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/posts", post)
      .then((res) => {
        console.log(res);
      });
    setPosts([...posts, post])
    setPost(initialPost)
}
console.log(posts)
  return (
    <div>
        <form onSubmit={handleSubmit} className=" rounded-md">
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={post.title}
            className="border border-gray-500 px-3 py-2 block w-full rounded-md mb-3"
          />
          <textarea
            placeholder="Body"
            name="body"
            onChange={handleChange}
            value={post.body}
            className="border border-gray-500 px-3 py-2 block w-full rounded-md mb-3"
            rows={3}
          />

          <button
            className="bg-blue-500 px-3 py-2 rounded-md text-white"
          >Save</button>
        </form>
        {posts.map((item, index) => (
              <div key={item.userId} className="flex w-full gap-4 font-semibold text-gray-500 justify-center border border-gray-400 rounded py-2 px-8 mt-4">
                <p>{item.userId}</p><p>{item.title}</p>
             </div>
        ))}
      </div>
  )
}

export default NewPost