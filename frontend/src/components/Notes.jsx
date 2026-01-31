import { delete_note } from "../utils/api";

export default function NotePost({ id, title, description }) {
  return (
    <div className="dark:bg-dark-soft bg-light-soft rounded-2xl p-10 hover:scale-90 m-2.5">
      <a href={`/note/${id}`}>
        <h2 className="text-lg font-bold">{title}</h2>
      </a>
      <div className="flex justify-between">
        <p>{description}</p>

        <a
          href="/"
          className="p-2 dark:bg-dark-accent bg-light-accent flex justify-center items-center rounded-sm"
          onClick={() => delete_note(id)}
        >
          Delete
        </a>
      </div>
    </div>
  );
}

export function NoteFeed({ nlist }) {
  let notes = nlist.map((note) => (
    <NotePost
      key={note.id}
      id={note.id}
      title={note.title}
      description={note.content}
    />
  ));

  return <>{notes}</>;
}
