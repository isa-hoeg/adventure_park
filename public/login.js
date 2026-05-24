class Login extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        #login-modal {
          background: rgba(0,0,0,0.8);
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999;
        }

        .loginmodal-container {
          padding: 30px;
          max-width: 350px;
          width: 100%;
          background-color: #F7F7F7;
          border-radius: 6px;
          box-shadow: 0px 2px 10px rgba(0,0,0,0.3);
          font-family: system-ui, sans-serif;
        }

        .loginmodal-container h1 {
          text-align: center;
          font-size: 1.8em;
        }

        input[type=password] {
          height: 44px;
          font-size: 16px;
          width: 100%;
          margin: 10px 0;
          background: #fff;
          border: 1px solid #ccc;
          padding: 0 10px;
          box-sizing: border-box;
        }

        .loginmodal-submit {
          width: 100%;
          border: 0;
          color: white;
          background-color: #4d90fe;
          padding: 14px;
          font-size: 14px;
          cursor: pointer;
        }

        .loginmodal-submit:hover {
          background-color: #357ae8;
        }
      </style>

      <div id="login-modal">
        <div class="loginmodal-container">
          <h1>Login</h1>
          <p>Code: <code>kea</code></p>

          <form>
            <input type="password" name="pass" placeholder="Password" />
            <input type="submit" value="Login" class="loginmodal-submit" />
          </form>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();

      const input = this.shadowRoot.querySelector("input[name='pass']").value;

      if (input === "kea") {
        localStorage.setItem("iform-totally-logged-in", "true");

        document.querySelector("#totally-delete-me")?.remove();
      } else {
        alert("Wrong password");
      }
    });
  }
}

customElements.define("iform-login", Login);

/* SHOW LOGIN ONLY IF NOT LOGGED IN */
window.addEventListener("DOMContentLoaded", () => {
  const loggedIn = localStorage.getItem("iform-totally-logged-in");

  if (!loggedIn) {
    const overlay = document.createElement("div");
    overlay.id = "totally-delete-me";

    overlay.style.cssText = `
      width: 100vw;
      height: 100vh;
      position: fixed;
      inset: 0;
      z-index: 9999;
    `;

    overlay.innerHTML = `<iform-login></iform-login>`;
    document.body.prepend(overlay);
  }
});
