import React, { Component } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import window from "global";
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      phoneNumber: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    // const navigate = this.props.navigate;

    createUserWithEmailAndPassword(
      auth,
      this.state.email,
      this.state.password,

      this.state.phoneNumber
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user.email));
        global.window.location.reload(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  render() {
    return (
      <main>
        <section>
          <div>
            <div>
              <form>
                <div>
                  <label htmlFor="email-address">Email address</label>
                  <input
                    type="email"
                    label="Email address"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    required
                    placeholder="Email address"
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    label="Create password"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    required
                    placeholder="Password"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber">phoneNumber</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    value={this.state.phoneNumber}
                    onChange={(e) =>
                      this.setState({ phoneNumber: e.target.value })
                    }
                    required
                  />
                </div>

                <button type="submit" onClick={this.onSubmit}>
                  Sign up
                </button>
              </form>

              <p>
                Already have an account?<a href="/login">Sign in</a>
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Signup;
