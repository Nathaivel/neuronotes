import { NoteFeed } from "./ui/Notes.jsx";
import NotePost from "./ui/Notes.jsx";

function ControlPanel() {
  return (
    <div className="flex space-x-1 m-2.5 mb-5">
      <input
        placeholder="Search"
        className="px-5 py-2.5 border-2 border-stone-300 border-solid rounded-sm focus:outline-blue-300 w-10/12"
      ></input>
      <a className="flex justify-center items-center bg-black/75 px-2.5 rounded-sm text-white w-2/12">
        +
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <div className="block min-h-screen   bg-zinc-50 font-sans dark:bg-black">
      <div className="flex justify-center w-full">
        <div className="block lg:w-7/12 sm:w-10/12">
          <ControlPanel />
          <NoteFeed
            nlist={[
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
            ]}
          />
        </div>
      </div>
    </div>
  );
}
