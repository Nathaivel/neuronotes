import { useState } from "react";
import { save_note } from "../utils/api";

export default function NoteEdit() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div>
      <div className="w-full flex space-x-2 border-b dark:border-dark-soft border-light-soft border-solid">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-11/12  p-2 text-3xl focus:outline-none"
        ></input>
        <a
          className="p-2 flex justify-center items-center bg-dark-accent w-1/12 rounded-sm"
          href="/"
          onClick={() => save_note(title, content)}
        >
          OK
        </a>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write here..."
        className="w-full p-2 text-md border-none focus:outline-none h-screen"
      ></textarea>
    </div>
  );
}
