import React, { Component } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  // navigate = useNavigate();

  onLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        global.window.location.reload(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <>
        <main>
          <section>
            <div>
              <form>
                <div>
                  <label htmlFor="email-address">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </div>

                <div>
                  <button onClick={this.onLogin}>Login</button>
                </div>
              </form>

              <p className="text-sm text-white text-center">
                No account yet? <a href="/signup">SignUp</a>
              </p>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default Login;
