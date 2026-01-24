import Navbar from "./ui/Navbar.tsx";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Navbar />

      <div className="bg-black/5 rounded-2xl p-10">
        <h2 className="text-lg font-bold">Notes</h2>
        <p>This is a sample note</p>
      </div>
    </div>
  );
}
