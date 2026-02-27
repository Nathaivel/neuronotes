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
      <div className="w-full flex space-x-2 border-b dark:border-dark-soft border-light-soft border-solid relative">
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
      <NoteEditorBar />
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

function NoteEditorBar() {
  return (
    <div className="note-editor-bar">
      <div className="note-editor-bar-buttons">
        <button type="button">H1</button>
        <button type="button"><b>B</b></button>
        <button type="button"><u>U</u></button>

        {/* Highlight Icon */}
        <button type="button" aria-label="Highlight">
          <svg viewBox="0 0 30 30">
            <path
              d="M5 3c4.145 3.809 5.001 6 5 11h10c-.001-5-1.855-7.192 3-11H15zm6 13v10l8-6.154V16z"
              fill="currentColor"
            />
          </svg>
        </button>

        {/* Bullet List Icon */}
        <button type="button" aria-label="Bullet List">
          <svg viewBox="0 -3.5 29 29">
            <path
              d="M27 14h-16a2 2 0 0 0 0 4h16a2 2 0 0 0 0-4zm0-8h-16a2 2 0 0 0 0 4h16a2 2 0 0 0 0-4zm-16-8h16a2 2 0 0 0 0 4h-16a2 2 0 0 0 0-4zM3 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className="note-editor-word-count">
        364 words
      </div>
      <style>{`
        .note-editor-bar {
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 90%;
          max-width: 900px;
          padding: 12px 20px;
          background: rgba(24, 43, 62, 0.7);
          backdrop-filter: blur(12px);
          border-radius: 14px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
          color: #aee9ff;
        }

        .note-editor-bar-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .note-editor-bar button {
          background: transparent;
          color: #e2e8f0;
          font-size: 15px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: bold;
        }

        .note-editor-bar button:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .note-editor-bar button:active {
          transform: scale(0.92);
          background: rgba(255, 255, 255, 0.2);
        }

        .note-editor-bar svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        .note-editor-word-count {
          font-size: 14px;
          font-weight: bold;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}