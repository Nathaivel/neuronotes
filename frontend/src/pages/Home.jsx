import Dropdown from "../components/Dropdown.jsx";
import "./home.css";
export default function HomeView() {
  return (
    <div className="homepage">
      <div className="tdpick-outer">
        <div className="tdpick-container">
          <div className="tdpick-left">
            <div className="tdpick-title">
              <h1>Todays Pick</h1>
            </div>
            <div className="tdpick-content">
              <p>
                <span>Includes</span> chemistry, physics, maths, electronics,
                electrical, engineering graphicsj
              </p>
            </div>
          </div>
          <div className="tdpick-right">
            <div className="tdpick-goto">
              <button className="take-quiz-btn">
                Take Quiz
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M10 7L15 12L10 17"
                      stroke="currentcolor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            </div>
            <div className="tdpick-questions">
              <p>12 questions</p>
            </div>
          </div>
        </div>
      </div>
      <div className="home-headings">
        <h2>Revision Feed</h2>
      </div>
      <div className="home-feed">
        <div className="note-element note-urgent">
          <div className="note-text">
            <h2>Lorem Ipsum</h2>
            <p>this is a sample note</p>
            <p className="note-element-status">Urgent</p>
          </div>

          <div className="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div className="note-element note-weak">
          <div className="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
            <p className="note-element-status">Weak area</p>
          </div>
          <div className="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div className="note-element note-revise">
          <div className="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
            <p className="note-element-status">Revise</p>
          </div>
          <div className="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div className="note-element note-weak">
          <div className="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
            <p className="note-element-status">Weak area</p>
          </div>
          <div className="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="home-headings">
        <h2>Pinned Notes</h2>
      </div>
      <div className="home-feed">
        <div className="note-element">
          <div className="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
          </div>

          <div className="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div className="note-element">
          <div className="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
          </div>

          <div className="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div className="note-element">
          <div className="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
          </div>

          <div className="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div className="note-element">
          <div className="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
          </div>

          <div className="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div className="note-element">
          <div className="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
          </div>

          <div className="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div className="note-element">
          <div className="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
          </div>

          <div className="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="home-headings">
        <h2>Recent Notes</h2>
      </div>
      <div className="home-feed"></div>
    </div>
  );
}
