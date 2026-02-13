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

        {/* TEST / REVIEW (test-tube icon) */}
        <button className="note-action">
          <svg viewBox="0 0 512 512" fill="currentColor">
            <g>
              <path d="M247.174,358.948c0.007-6.302-5.082-11.408-11.384-11.416c-6.31-0.017-11.424,5.098-11.432,11.391
              c0,6.31,5.098,11.424,11.391,11.424C242.06,370.364,247.174,365.258,247.174,358.948z"/>
              <path d="M242.165,418.863c-4.815-0.008-8.702,3.894-8.717,8.693c0,4.799,3.894,8.694,8.693,8.694
              c4.798,0.008,8.692-3.886,8.692-8.677C250.841,422.765,246.964,418.879,242.165,418.863z"/>
              <path d="M280.226,387.023c-5.123-0.008-9.292,4.136-9.292,9.258c0,5.123,4.153,9.275,9.268,9.275
              c5.122,0.008,9.266-4.136,9.266-9.258C289.476,391.168,285.339,387.023,280.226,387.023z"/>
              <path d="M328.894,0H183.106c-19.026,0-34.49,15.472-34.49,34.498c0,12.288,6.48,23.098,16.19,29.206v3.126v353.98
              c0,50.276,40.905,91.19,91.19,91.19c50.284,0,91.197-40.914,91.197-91.19V66.83v-3.126c9.711-6.108,16.19-16.918,16.19-29.206
              C363.384,15.472,347.904,0,328.894,0z"/>
            </g>
          </svg>
        </button>

        {/* QUIZ (rocket icon) */}
        <button className="note-action">
          <svg viewBox="0 0 1920 1920" fill="currentColor">
            <g fillRule="evenodd">
              <path d="m746.255 1466.764 80.484 80.712-248.748 248.634-80.484-80.598 248.748-248.748Zm-165.904-165.836 
              80.598 80.598-331.626 331.626-80.598-80.598 331.626-331.626Zm-165.847-165.721 
              80.598 80.598-414.504 414.504L0 1549.71l414.504-414.504ZM1119.32 
              264.6c356.478-356.478 725.268-178.296 729.03-176.472l17.1 8.436 8.436 
              17.1c1.824 3.648 180.006 372.438-176.586 729.03l-146.604 
              146.604-2.622 665.874-222.642 222.642-331.626-331.512-578.094-578.094-331.626-331.74 
              222.642-222.642 665.874-2.508Z"/>
              <path d="M1534.987 372.558c-51.072-1.368-131.67 12.768-213.294 
              94.392l-40.47 40.356 173.394 173.28 40.356-40.242c82.194-82.308 
              96.9-161.31 94.848-213.18l-2.166-52.554-52.668-2.052Z"/>
            </g>
          </svg>
        </button>

        {/* MORE MENU */}
        <button className="note-action">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,16a2,2,0,1,1-2,2A2,2,0,0,1,12,16ZM10,6a2,2,0,1,0,2-2A2,2,0,0,0,10,6Zm0,6a2,2,0,1,0,2-2A2,2,0,0,0,10,12Z"/>
          </svg>
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


