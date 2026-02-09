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
      <input
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setNotes(search_notes(e.target.value, data));
        }}
        className="px-5 py-2.5 border-2 dark:border-stone-500 border-stone-300 border-solid rounded-sm focus:outline-blue-300 w-10/12"
      ></input>
      <a
        href="/note"
        className="flex justify-center items-center dark:bg-dark-accent dark:text-dark-soft bg-light-accent px-2.5 rounded-sm text-white w-2/12"
      >
        +
      </a>
    </div>
  );
}

function FloatBtn() {
  return (
    <div className="FloatBtnContainer">
      <a
        href="/note"
        className="flex justify-center z-50 items-center dark:bg-dark-accent dark:text-dark-soft bg-light-accent px-2.5 rounded-sm text-white w-2/12"
      >
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"
            fill="currentColor"
          />
          <path
            d="M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
            fill="#1C274C"
          />
        </svg>
      </a>
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
