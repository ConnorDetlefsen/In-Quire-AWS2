import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import Joi from "joi-browser";
import http from "../Services/httpService";
import Input from "./Input";
import UserContext from "../Context/UserContext";
import logo from "./In-Quire.png";
import config from "../config.json";

const authEndpoint = "https://in-quire-api-cpqv4tv3zkthnqzu.com/user";

const teamEndpoint = "https://in-quire-api-cpqv4tv3zkthnqzu.com/team";
class LoginForm extends Component {
  static contextType = UserContext;

  state = {
    data: { email: "", password: "" },
    errors: {},
    userList: {},
    userLoggedIn: { email: "", password: "", id: 0, isManager: false },
    id: 1,
    // team: [],
    teams: [],
    roundEnd: [],
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    //submit button
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    //input fields
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  doSubmit = async () => {
    const { userList, data, teams } = this.state;
    const { history } = this.props;

    for (let x in userList) {
      if (
        data.email === userList[x].email &&
        data.password === userList[x].password
      ) {
        this.context.currentUser.name = userList[x].first_name;
        this.context.currentUser.teamID = userList[x].team_id; //using user id right now since the team ids are the same
        this.context.currentUser.isManager = userList[x].manager;
        this.context.currentUser.round = this.state.roundend.round_num;

        http
          .post(config.apiEndpoint + "/login/", {
            user_id: userList[x].user_id,
          })
          .then((res) => {
            console.log(res);
          });

        for (let x in teams) {
          if (this.context.currentUser.teamID === teams[x].team_id) {
            this.context.currentUser.isHighestBid = teams[x].ishighestbid;
            this.context.currentUser.budget = teams[x].budget;
            break;
          }
        }
        toast.success(
          `Logged in successfully, hi ${this.context.currentUser.name}!`
        );
        await this.sleep(2000);

        history.push("/overview");
      }
    }

    toast.error("Username and Password doesn't match");
  };
  async componentDidMount() {
    http.get(authEndpoint).then((res) => {
      this.setState({ userList: res.data });
      console.log(res);
    });
    http.get(teamEndpoint).then((res) => {
      this.setState({ teams: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "roundend/1").then((res) => {
      this.setState({ roundend: res.data });
    });
  }

  render() {
    return (
      <>
        <center>
          <img src={logo} width="200px" height="100px"></img>
        </center>
        <React.Fragment>
          <ToastContainer position="top-center" />
          <div className="login-body">
            <div className="login-page ">
              <div className="login-css">
                <div className="form">
                  <div className="login">
                    <div className="Login Header">
                      <h1>
                        <b>BAS User Login</b>
                      </h1>
                    </div>
                  </div>
                  <form className="login-form " onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </>
    );
  }
}
export default LoginForm;
