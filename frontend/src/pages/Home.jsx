import Dropdown from "../components/Dropdown.jsx";
import "./home.css";
export default function HomeView() {
  return (
    <div class="homepage">
      <div class="tdpick-outer">
        <div class="tdpick-container">
          <div class="tdpick-left">
            <div class="tdpick-title">
              <h1>Todays Pick</h1>
            </div>
            <div class="tdpick-content">
              <p>
                <span>Includes</span> chemistry, physics, maths, electronics,
                electrical, engineering graphicsj
              </p>
            </div>
          </div>
          <div class="tdpick-right">
            <div class="tdpick-goto">
              <button class="take-quiz-btn">
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
            <div class="tdpick-questions">
              <p>12 questions</p>
            </div>
          </div>
        </div>
      </div>
      <div class="home-headings">
        <h2>Revision Feed</h2>
      </div>
      <div class="home-feed">
        <div class="note-element note-urgent">
          <div class="note-text">
            <h2>Lorem Ipsum</h2>
            <p>this is a sample note</p>
            <p class="note-element-status">Urgent</p>
          </div>

          <div class="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div class="note-element note-weak">
          <div class="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
            <p class="note-element-status">Weak area</p>
          </div>
          <div class="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div class="note-element note-revise">
          <div class="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
            <p class="note-element-status">Revise</p>
          </div>
          <div class="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div class="note-element note-weak">
          <div class="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
            <p class="note-element-status">Weak area</p>
          </div>
          <div class="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="home-headings">
        <h2>Pinned Notes</h2>
      </div>
      <div class="home-feed">
        <div class="note-element">
          <div class="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
          </div>

          <div class="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div class="note-element">
          <div class="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
          </div>

          <div class="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div class="note-element">
          <div class="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
          </div>

          <div class="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div class="note-element">
          <div class="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
          </div>

          <div class="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div class="note-element">
          <div class="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
          </div>

          <div class="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
        <div class="note-element">
          <div class="note-text">
            <h2>Lorem Ipsum</h2>
            <p>
              this is also a sample note but with more text for testing purposes
              and omg it works .
            </p>
          </div>

          <div class="note-arrow">
            <svg viewBox="0 0 1024 1024">
              <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" />
            </svg>
          </div>
        </div>
      </div>
      <div class="home-headings">
        <h2>Recent Notes</h2>
      </div>
      <div class="home-feed"></div>
    </div>
  );
}
