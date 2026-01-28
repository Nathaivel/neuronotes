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
        className="flex justify-center items-center dark:bg-dark-accent bg-light-accent px-2.5 rounded-sm text-white w-2/12"
      >
        +
      </a>
    </div>
  );
}

export default function Home() {
  const [notes, setNotes] = useState(data);
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
