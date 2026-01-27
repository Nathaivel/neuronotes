import NotePost from "./ui/NotePost.tsx";

export default function Home() {
  return (
    <div className="block min-h-screen   bg-zinc-50 font-sans dark:bg-black">
      <div className="flex justify-center w-full">
        <div className="block w-7/12">
          <NotePost title="Note" description="thisis a new note"></NotePost>
          <NotePost title="Note" description="this is an old note"></NotePost>
        </div>
      </div>

      <a
        className="fixed bottom-0 right-0 bg-black/75 px-7 py-5 text-white text-1xl font-black rounded-4xl"
        href="/note"
      >
        +
      </a>
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <NotePost title="Note" description="this is a new note"></NotePost>
      <NotePost title="Note" description="this is an old note"></NotePost>
    </div>
    </div>
  );
}
