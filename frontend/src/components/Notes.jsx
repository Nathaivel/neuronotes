import { delete_note, log_note_review } from "../utils/api";
import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown.jsx";

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
        <span className="note-date">{formatDate(updated_at)}</span>
        <h2 className="note-title">{title}</h2>
        <p className="note-preview">{description.slice(0, 90)}...</p>
      </NavLink>

      {/* RIGHT SIDE META */}
      <div className="note-side">
        {/* TEST / REVIEW (test-tube icon) */}
        <button className="note-action">
          <svg viewBox="0 0 512 512" fill="currentColor">
            <g>
              <path
                d="M247.174,358.948c0.007-6.302-5.082-11.408-11.384-11.416c-6.31-0.017-11.424,5.098-11.432,11.391
              c0,6.31,5.098,11.424,11.391,11.424C242.06,370.364,247.174,365.258,247.174,358.948z"
              />
              <path
                d="M242.165,418.863c-4.815-0.008-8.702,3.894-8.717,8.693c0,4.799,3.894,8.694,8.693,8.694
              c4.798,0.008,8.692-3.886,8.692-8.677C250.841,422.765,246.964,418.879,242.165,418.863z"
              />
              <path
                d="M280.226,387.023c-5.123-0.008-9.292,4.136-9.292,9.258c0,5.123,4.153,9.275,9.268,9.275
              c5.122,0.008,9.266-4.136,9.266-9.258C289.476,391.168,285.339,387.023,280.226,387.023z"
              />
              <path
                d="M328.894,0H183.106c-19.026,0-34.49,15.472-34.49,34.498c0,12.288,6.48,23.098,16.19,29.206v3.126v353.98
              c0,50.276,40.905,91.19,91.19,91.19c50.284,0,91.197-40.914,91.197-91.19V66.83v-3.126c9.711-6.108,16.19-16.918,16.19-29.206
              C363.384,15.472,347.904,0,328.894,0z"
              />
            </g>
          </svg>
        </button>

        {/* QUIZ (rocket icon) */}
        <button className="note-action">
          <svg viewBox="0 0 1920 1920" fill="currentColor">
            <g fillRule="evenodd">
              <path
                d="m746.255 1466.764 80.484 80.712-248.748 248.634-80.484-80.598 248.748-248.748Zm-165.904-165.836
              80.598 80.598-331.626 331.626-80.598-80.598 331.626-331.626Zm-165.847-165.721
              80.598 80.598-414.504 414.504L0 1549.71l414.504-414.504ZM1119.32
              264.6c356.478-356.478 725.268-178.296 729.03-176.472l17.1 8.436 8.436
              17.1c1.824 3.648 180.006 372.438-176.586 729.03l-146.604
              146.604-2.622 665.874-222.642 222.642-331.626-331.512-578.094-578.094-331.626-331.74
              222.642-222.642 665.874-2.508Z"
              />
              <path
                d="M1534.987 372.558c-51.072-1.368-131.67 12.768-213.294
              94.392l-40.47 40.356 173.394 173.28 40.356-40.242c82.194-82.308
              96.9-161.31 94.848-213.18l-2.166-52.554-52.668-2.052Z"
              />
            </g>
          </svg>
        </button>

        {/* MORE MENU */}
        <Dropdown>
          <button className="note-action-more">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              className="size-6"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
            Edit
          </button>
          <button className="note-action-more">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clipRule="evenodd"
              />
            </svg>
            Delete
          </button>
        </Dropdown>
      </div>

      <style>
        {`.note-card {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 18px;
            margin: 10px;
            border-radius: 14px;
            cursor: pointer;
            transition: 0.15s;
            background-color: #121924;
          }

          .note-card:hover {
            box-shadow:
              0 2px 10px rgba(206, 100, 181, 0.45),
              0 -2px 15px rgba(177, 162, 255, 0.35);
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
            font-family: "IBM plex";
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
            align-items: center;
            gap: 8px;
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
          .note-action {
            width: 34px;
            height: 34px;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
            transition: 0.15s;
            cursor:pointer;
          }
          .note-action svg {
            width: 18px;
            height: 18px;
            color: inherit;
          }
          .note-action:hover{
            background-color: rgba(195, 203, 255, 0.51);
          }
          .note-action:active{
            scale: 0.95;
          }
          .note-action-more{

           align-items: left;
           display: flex;
           padding: 5px;
           border-radius: 5px

          }
          .note-action-more:hover{
            background-color: rgba(195, 203, 255, 0.51);
            transition: 0.15s;
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
