import { delete_note, log_note_review } from "../utils/api";
import { NavLink } from "react-router-dom";

// export default function NotePost({ id, title, description }) {
//   return (
//     <div className="dark:bg-dark-soft bg-light-soft rounded-2xl p-10 hover:scale-97 m-2.5 transition duration-50 cursor-pointer">
//       <NavLink to={`/note/${id}`} onClick={async () => log_note_review(id)}>
//         <h2 className="text-lg font-bold">{title}</h2>
//       </NavLink>
//       <div className="flex justify-between">
//         <p>{description.slice(0, 20)}...</p>

//         <NavLink
//           to="/notes"
//           className="p-2 dark:bg-dark-accent dark:text-dark-soft bg-light-accent flex justify-center items-center rounded-sm"
//           onClick={() => {
//             delete_note(id);
//             this.forceUpdate();
//           }}
//         >
//           Delete
//         </NavLink>
//       </div>
//     </div>
//   );
// }

// export function NoteFeed({ nlist }) {
//   let notes = nlist.map((note) => (
//     <NotePost
//       key={note.id}
//       id={note.id}
//       title={note.title}
//       description={note.content}
//     />
//   ));

//   return <>{notes}</>;
// }

export default function NotePost({ id, title, description, updated_at }) {
  function formatDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString([], {
      day: "2-digit",
      month: "short",
    });
  }

  return (
    <div className="note-card dark:bg-dark-soft bg-light-soft">
      
      {/* LEFT ACCENT STRIP */}
      <div className="note-accent"></div>

      {/* MAIN CONTENT */}
      <NavLink
        to={`/note/${id}`}
        onClick={async () => log_note_review(id)}
        className="note-main"
      >
        <span className="note-date">
          {formatDate(updated_at)}
        </span>
        <h2 className="note-title">{title}</h2>
        <p className="note-preview">
          {description.slice(0, 90)}...
        </p>
      </NavLink>

      {/* RIGHT SIDE META */}
      <div className="note-side">
        <button
          className="note-delete"
          onClick={() => delete_note(id)}
        >
          Delete
        </button>
      </div>
      <style>
        {
          `.note-card {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 18px;
            margin: 10px;
            border-radius: 14px;
            cursor: pointer;
            transition: 0.15s;
          }

          .note-card:hover {
            box-shadow:
              0 12px 30px rgba(0,0,0,0.45),
              0 0 25px rgba(177, 162, 255, 0.35);
          }
          /* Accent strip */
          .note-accent {
            width: 3px;
            height: 40px;
            background: #84aff0;
            border-radius: 3px;
          }

          /* Center content */
          .note-main {
            flex: 1;
            text-decoration: none;
          }

          .note-title {
            font-weight: bold;
            font-size: 16px;
          }

          .note-preview {
            font-size: 13px;
            opacity: 0.7;
            margin-top: 2px;
            display: -webkit-box;
            -webkit-line-clamp: 1;   /* number of lines to show */
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Right side */
          .note-side {
            display: flex;
            justify-content: center;
            gap: 6px;
          }

          .note-date {
            font-size: 12px;
            opacity: 0.6;
          }

          .note-delete {
            padding: 4px 8px;
            font-size: 12px;
            border-radius: 6px;
          }
        `}
      </style>
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
      updated_at={note.updated_at}
    />
  ));

  return <>{notes}</>;
}


