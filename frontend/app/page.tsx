import NotePost from "./ui/NotePost.tsx";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <NotePost title="Note" description="this is a new note"></NotePost>
      <NotePost title="Note" description="this is an old note"></NotePost>
    </div>
  );
}
