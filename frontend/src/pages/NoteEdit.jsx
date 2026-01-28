export default function NoteEdit() {
  return (
    <div>
      <input
        placeholder="Title"
        className="w-full  p-2 text-3xl focus:outline-none border-b dark:border-dark-soft border-light-soft border-solid"
      ></input>
      <textarea
        placeholder="Write here..."
        className="w-full p-2 text-md border-none focus:outline-none h-screen"
      ></textarea>
    </div>
  );
}
