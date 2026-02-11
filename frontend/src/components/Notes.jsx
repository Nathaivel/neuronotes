import { delete_note, log_note_review } from "../utils/api";
import { NavLink } from "react-router-dom";

export default function NotePost({ id, title, description }) {
  return (
    <div className="dark:bg-dark-soft bg-light-soft rounded-2xl p-10 hover:scale-97 m-2.5 transition duration-50 cursor-pointer">
      <NavLink to={`/note/${id}`} onClick={async () => log_note_review(id)}>
        <h2 className="text-lg font-bold">{title}</h2>
      </NavLink>
      <div className="flex justify-between">
        <p>{description.slice(0, 20)}...</p>

        <NavLink
          to="/notes"
          className="p-2 dark:bg-dark-accent dark:text-dark-soft bg-light-accent flex justify-center items-center rounded-sm"
          onClick={() => {
            delete_note(id);
            this.forceUpdate();
          }}
        >
          Delete
        </NavLink>
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
