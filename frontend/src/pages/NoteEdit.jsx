import { useState, useEffect, useRef } from "react";
import { save_note, fetch_note, update_note } from "../utils/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import "./Editor.css";
import Backicon from "../assets/back.svg?react";
import Saveicon from "../assets/save.svg?react";
import { marked } from "marked"

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

  async function upload_note(val) {
    if (id != undefined) {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        console.log("Saving...");
        update_note(id, title, val);
      }, 1500);
    } else {
      save_note(title, val).then((r) => {
        if (r.id != undefined) {
          navigate(`/note/${r.id}`);
        }
      });
    }
  }
  async function changeNote(val) {
    //hook(e.target.value);
    upload_note(val);
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
  handlePaste(view, event) {
    const text = event.clipboardData?.getData("text/plain")

    if (!text) return false

    const looksLikeMarkdown =
      /^#{1,6}\s|^- |\d+\. |```/.test(text)

    if (looksLikeMarkdown) {
      event.preventDefault()

      const html = marked.parse(text)

      editor.commands.insertContent(html)

      return true
    }

    return false
      }
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      changeNote(html);
    },
  });

  useEffect(() => {
    if (content && editor) {
      editor.commands.setContent(content, false);
    }
  }, [editor, content]);

  return (
    <div className="h-screen flex flex-col">
      <div className="editor-topbar">
        <button
          className="note-editor-back-btn"
          onClick={() => navigate(-1)}
        >
          <Backicon />
        </button>

        <div className="editor-title-wrapper">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              changeNote(editor.getHTML());
            }}
            placeholder="Title"
            className="editortitle"
          />
        </div>

        <Link
          className="editor-save-btn"
          to="/"
          onClick={() => upload_note()}
        >
          <Saveicon />
        </Link>
      </div>
      <NoteEditorBar />
      <div className="editor-container">
      <EditorContent editor={editor} placeholder="Write here..." />
      </div>
      <style>
        {`
          .editor-save-btn svg {
            width: 20px;
            height: 20px;
            color: #C1F6FF;
          }
          .editor-save-btn{
            cursor: pointer;
          }
          .note-editor-back-btn{
            width: 35px;
            height: 35px;
            font-size: 35px;
            cursor: pointer;
          }
          .note-editor-back-btn svg {
            width: 25px;
            height: 25px;
            color: #C1F6FF;
          }
          .editor-title-wrapper {
            flex: 1;          /* takes all available space */
            display: flex;
            min-width: 0;
          }
          .editor-topbar {
            width: 100%;
            display: flex;
            gap: 0.5rem;
            border-bottom: 1px solid;
            position: relative;
            background-color: #0f141f;
            align-items: center;
            padding: 10px 40px 10px 20px;

            /* default light mode border */
            border-color: var(--light-soft, #283A50);
          }
          .dark .editor-topbar {
            border-color: var(--dark-soft, #283A50);
          }
          .editortitle {
            padding: 0.5rem;
            padding-left: 0rem;
            font-size: 2rem;
            font-weight: bold;
            border: none;
            outline: none;
          }

          .editortitle:focus {
            outline: none;       /* focus:outline-none */
          }
          .ProseMirror {
            padding: 1rem 2.5rem; /* same as pl-10 */
          }
          .ProseMirror h1 {
            font-size: 2.2rem;
            font-weight: bold;
            margin: 0.5em 0;
            font-family: "IBM Plex";
          }

          .ProseMirror h2 {
            font-size: 1.9rem;
            font-weight: bold;
            margin: 0.5em 0;
            font-family: "IBM Plex";
          }

          .ProseMirror h3 {
            font-size: 1.5rem;
            font-weight: bold;
            font-family: "IBM Plex";
          }
          .ProseMirror p {
            font-family: "Manrope";
            font-size: 1.1rem;
          }
        `}
      </style>
    </div>
  );
}

function NoteEditorBar() {
  return (
    <div className="note-editor-bar">
      <div className="note-editor-bar-buttons">
        <button type="button">H1</button>
        <button type="button">
          <b>B</b>
        </button>
        <button type="button">
          <u>U</u>
        </button>

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

      <div className="note-editor-word-count">364 words</div>
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
          z-index: 1;
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
