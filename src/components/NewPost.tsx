import React, {Dispatch} from "react";
import { ChangeEvent, FormEvent, useState, useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const initialPost = {
  title: "",
  body: "",
  userId: 1,
  id: undefined,
};

interface Post {
  title: string;
  body: string;
  userId: number;
  id: undefined | number;
}

interface Props {
  setNewPost: React.Dispatch<React.SetStateAction<Post>>
}

const NewPost = ({ setNewPost }: Props) => {
  const [post, setPost] = useState(initialPost);


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPost({ ...post, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("https://jsonplaceholder.typicode.com/posts", post)
      .then((res) => {
        console.log(res.data);
        setNewPost(res.data)
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
    </div>
  );
};

export default NewPost;
