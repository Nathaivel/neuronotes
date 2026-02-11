import { useState, useEffect, useRef } from "react";
import { save_note, fetch_note, update_note } from "../utils/api";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function NoteEdit() {
  let id = useParams().id;
  let timer = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (id != undefined) {
      if (title === "" && content === "") {
        fetch_note(id).then((r) => {
          setTitle(r.title);
          setContent(r.content);
        });
      }
    }
  }, [title, id, content]);

  async function upload_note() {
    if (id != undefined) {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        console.log("Saving...");
        update_note(id, title, content);
      }, 1500);
    } else {
      save_note(title, content).then((r) => {
        if (r.id != undefined) {
          navigate(`/note/${r.id}`);
        }
      });
    }
  }
  async function changeNote(e, hook) {
    hook(e.target.value);
    upload_note();
  }

  return (
    <div>
      <div className="w-full flex space-x-2 border-b dark:border-dark-soft border-light-soft border-solid">
        <input
          value={title}
          onChange={async (e) => {
            changeNote(e, setTitle);
          }}
          placeholder="Title"
          className="w-11/12  p-2 text-3xl focus:outline-none"
        ></input>
        <Link
          className="p-2 flex justify-center items-center dark:bg-dark-accent dark:text-dark-soft bg-light-accent w-1/12 rounded-sm"
          to="/"
          onClick={() => upload_note()}
        >
          OK
        </Link>
      </div>
      <textarea
        value={content}
        onChange={async (e) => {
          changeNote(e, setContent);
        }}
        placeholder="Write here..."
        className="w-full p-2 text-md border-none focus:outline-none h-screen"
      ></textarea>
    </div>
  );
}
