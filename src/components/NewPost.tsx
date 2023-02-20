import React from "react";
import { ChangeEvent, FormEvent, useState, useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const initialPost = {
  title: "",
  body: "",
  userId: 1,
  id: null,
};

interface IPosts {
  title: string;
  body: string;
  userId: number;
  id: undefined | number;
}

const NewPost = () => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [post, setPost] = useState(initialPost);

  const deletePost = (postId: number | undefined) => {
    const filteredPosts = posts.filter((post: IPosts) => post.id !== postId);
    setPosts(filteredPosts);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPost({ ...post, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/posts", post)
      .then((res) => {
        console.log(res.data);
        setPosts([...posts, res.data]);
      });
    setPost(initialPost);
  };

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

        <button className="bg-blue-500 px-3 py-2 rounded-md text-white">
          Save
        </button>
      </form>
      {posts.map((post: IPosts, index) => (
        <div key={post.id} className="flex justify-between gap-2 mt-4">
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
    </div>
  );
};

export default NewPost;
