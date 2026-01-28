export default function NotePost({ title, description }) {
  return (
    <div className="bg-black/5 rounded-2xl p-10 hover:scale-90 m-2.5">
      <h2 className="text-lg font-bold">{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export function NoteFeed({ nlist }) {
  let notes = nlist.map((note) => (
    <NotePost key={note.id} title={note.title} description={note.description} />
  ));

  return <>{notes}</>;
}
