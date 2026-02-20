import { useState, useRef, useEffect } from "react";
export default function Dropdown({ children }) {
  const [open, setOpen] = useState(false);
  const reference = useRef(null);

  useEffect(() => {
    const getMouseClickPosition = (e) => {
      if (reference.current && !reference.current.contains(e.target)) {
        setOpen(false);
        console.log("out");
      }
    };
    document.addEventListener("mousedown", getMouseClickPosition);

    return () => {
      document.removeEventListener("mousedown", getMouseClickPosition);
    };
  }, []);

  let dropdownstyle = {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    padding: "12px",
    borderRadius: "8px",
    background: "var(--color-dark-softer)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    minWidth: "120px",
    zIndex: 1000,
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      ref={reference}
    >
      <button className="note-action" onClick={() => setOpen(!open)}>
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,16a2,2,0,1,1-2,2A2,2,0,0,1,12,16ZM10,6a2,2,0,1,0,2-2A2,2,0,0,0,10,6Zm0,6a2,2,0,1,0,2-2A2,2,0,0,0,10,12Z" />
        </svg>
      </button>
      <div style={open ? dropdownstyle : { display: "none" }}>{children}</div>
    </div>
  );
}
