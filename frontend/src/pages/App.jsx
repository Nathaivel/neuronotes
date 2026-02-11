import { NoteFeed } from "../components/Notes.jsx";
import NotePost from "../components/Notes.jsx";
import { useState } from "react";
import search_notes from "../utils/search.js";
import fetch_notes from "../utils/api.js";

let data = [
  {
    id: 1,
    title: "Hello world",
    description: "This is the first piece of app",
  },
  {
    id: 2,
    title: "Lorem ipsum",
    description: "Lorem ipsum solum donet amet",
  },
];

data = await fetch_notes();

function ControlPanel({ setNotes }) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex space-x-1 m-2.5 mb-5">
      <div className="navsearch">
        <div className="navsearchinner">
          <input
            type="text"
            placeholder="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setNotes(search_notes(e.target.value, data));
            }}
          />
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <style>
          {`
          .navsearch {
            display: flex;
            justify-content: center;
            width: 100%;
            position: relative;
          }

          .navsearchinner {
            position: relative;
            width: 88%;
            background-color: #2d394b;
            border-radius: 10px;
          }

          .navsearch input {
            width: 100%;
            padding: 10px 40px 10px 12px;
            background-color: transparent;
            border: none;
            outline: none;
            color: #dde8ff;
          }

          .navsearchinner svg {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #dde8ff;
            pointer-events: none;
          }
        `}
        </style>
      </div>
      {/*
      <a
        href="/note"
        className="flex justify-center items-center dark:bg-dark-accent dark:text-dark-soft bg-light-accent px-2.5 rounded-sm text-white w-2/12"
      >
        +
      </a>
      */}
    </div>
  );
}

export default function Home() {
  const [notes, setNotes] = useState(data);
  console.log(data);
  return (
    <div className="block min-h-screen font-sans">
      <div className="flex justify-center w-full">
        <div className="block lg:w-7/12 sm:w-10/12">
          <ControlPanel setNotes={setNotes} />
          <NoteFeed nlist={notes} />
        </div>
      </div>
    </div>
  );
}
