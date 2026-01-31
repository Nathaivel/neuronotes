import { useState, useEffect } from "react";
import { save_note, fetch_note, update_note } from "../utils/api";

export default function NoteEdit({ id }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id != undefined && title === "") {
      fetch_note(id).then((r) => {
        setTitle(r.title);
        setContent(r.content);
      });
    }
  }, [title, id, content]);
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
          onClick={() =>
            id != undefined
              ? update_note(id, title, content)
              : save_note(title, content)
          }
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
