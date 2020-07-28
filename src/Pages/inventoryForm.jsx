import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../Components/inventoryInput";
import http from "../Services/httpService";
import config from "../config.json";
import UserContext from "../Context/UserContext";

class inventoryForm extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      inventory: [],
      amount: 0,
      team: [],
      errors: {},
      coffeeAmount: 0,
      appleAmount: 0,
      bananaAmount: 0,
      coffeePrice: 0,
      applePrice: 0,
      bananaPrice: 0,
      coffee: [],
      apple: [],
      banana: [],
    };
  }

  async componentDidMount() {
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        console.log(res);
      });
    http.get(config.apiEndpoint + "/products").then((res) => {
      this.setState({ products: res.data });
      console.log(res);
    });
    http
      .get(config.apiEndpoint + "/inventory/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ inventory: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/inventory/" +
          this.context.currentUser.teamID +
          "/1"
      )
      .then((res) => {
        this.setState({ coffee: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/inventory/" +
          this.context.currentUser.teamID +
          "/2"
      )
      .then((res) => {
        this.setState({ apple: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/inventory/" +
          this.context.currentUser.teamID +
          "/3"
      )
      .then((res) => {
        this.setState({ banana: res.data });
        console.log(res);
      });
  }
  validate = () => {
    const errors = {};

    const {
      coffeeAmount,
      appleAmount,
      bananaAmount,
      coffeePrice,
      applePrice,
      bananaPrice,
    } = this.state;
    if (coffeeAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (appleAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (bananaAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (coffeePrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (applePrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (bananaPrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  coffeeSubmit = async (coffee) => {
    const coffeeAmount = this.state.coffeeAmount;
    const plusThis = this.state.coffee.num_item;
    coffee.num_item = parseInt(coffeeAmount, 10) + parseInt(plusThis, 10);

    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/1",
      coffee
    );

    console.log(data);
  };
  appleSubmit = async (apple) => {
    const appleAmount = this.state.appleAmount;
    const plusThis = this.state.apple.num_item;
    apple.num_item = parseInt(appleAmount, 10) + parseInt(plusThis, 10);
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/2",
      apple
    );
    console.log(data);
  };
  bananaSubmit = async (banana) => {
    const bananaAmount = this.state.bananaAmount;
    const plusThis = this.state.banana.num_item;
    banana.num_item = parseInt(bananaAmount, 10) + parseInt(plusThis, 10);
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/3",
      banana
    );
    console.log(data);
  };

  coffeePriceSubmit = async (coffee) => {
    const coffeePrice = this.state.coffeePrice;
    coffee.selling_price = coffeePrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/1",
      coffee
    );
    console.log(data);
  };

  applePriceSubmit = async (apple) => {
    const applePrice = this.state.applePrice;
    apple.selling_price = applePrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/2",
      apple
    );
    console.log(data);
  };

  bananaPriceSubmit = async (banana) => {
    const bananaPrice = this.state.bananaPrice;
    banana.selling_price = bananaPrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/3",
      banana
    );
    console.log(data);
  };

  budgetUpdate = async (team) => {
    const { coffeeAmount } = this.state;
    const coffeeAmount1 = coffeeAmount;
    const appleAmount1 = this.state.appleAmount;
    const bananaAmount1 = this.state.bananaAmount;
    const budget = this.context.currentUser.budget; // used to set api team.budget

    team.budget =
      parseInt(budget, 10) -
      parseInt(coffeeAmount1, 10) -
      parseInt(appleAmount1, 10) -
      parseInt(bananaAmount1, 10);
    this.context.currentUser.budget = team.budget; //updates the context

    const { data } = await http.put(
      config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
      team
    );
    console.log(data);
  };

  handleInventoryOrderSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate(); //error checking if negative or if no dropdown selected
    this.setState({ errors: errors || {} });
    if (errors) return;

    if (this.state.coffeeAmount !== 0) {
      this.coffeeSubmit(this.state.coffee);
    }
    if (this.state.appleAmount !== 0) {
      this.appleSubmit(this.state.apple);
    }
    if (this.state.bananaAmount !== 0) {
      this.bananaSubmit(this.state.banana);
    }
    this.budgetUpdate(this.state.team);
  };
  handleSellingPriceSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(); //error checking if negative or if no dropdown selected
    this.setState({ errors: errors || {} });
    if (errors) return;

    if (this.state.coffeePrice !== 0) {
      this.coffeePriceSubmit(this.state.coffee);
    }
    if (this.state.applePrice !== 0) {
      this.applePriceSubmit(this.state.apple);
    }
    if (this.state.bananaPrice !== 0) {
      this.bananaPriceSubmit(this.state.banana);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { products, errors, coffee, apple, banana, team } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <nav className="navbar navbar-light bg-primary">
          Budget: {team.budget}{" "}
        </nav>

        <div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Wholesale Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((products) => (
                <tr key={products.id}>
                  <td>{products.name}</td>
                  <td>${products.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Amount Owned</th>
                <th>Selling Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{coffee.num_item}</td>
                <td>${coffee.selling_price}</td>
              </tr>
              <tr>
                <td>{apple.num_item}</td>
                <td>${apple.selling_price}</td>
              </tr>
              <tr>
                <td>{banana.num_item}</td>
                <td>${banana.selling_price}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="divider" />
        <h1>Order</h1>
        <form onSubmit={this.handleInventoryOrderSubmit}>
          <Input
            name="coffeeAmount"
            value={this.state.coffeeAmount}
            label="Coffee"
            onChange={this.handleChange}
            error={errors.amount}
          ></Input>
          <Input
            name="appleAmount"
            value={this.state.appleAmount}
            label="Apple     "
            onChange={this.handleChange}
            error={errors.amount}
          ></Input>
          <Input
            name="bananaAmount"
            value={this.state.bananaAmount}
            label="Banana"
            onChange={this.handleChange}
            error={errors.amount}
          ></Input>

          <button type="submit" margin-top=".5em">
            Submit
          </button>
        </form>
        <div className="divider" />
        <h1>Set Your Selling Prices</h1>
        <form onSubmit={this.handleSellingPriceSubmit}>
          <Input
            name="coffeePrice"
            value={this.state.coffeePrice}
            label="Coffee Price"
            onChange={this.handleChange}
            error={errors.amount}
          ></Input>
          <Input
            name="applePrice"
            value={this.state.applePrice}
            label="Apple Price"
            onChange={this.handleChange}
            error={errors.amount}
          ></Input>
          <Input
            name="bananaPrice"
            value={this.state.bananaPrice}
            label="Banana Price"
            onChange={this.handleChange}
            error={errors.amount}
          ></Input>
          <button type="submit" className="inv-btn" margin-top=".5em">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default inventoryForm;
/*{products.map((products) => (
  <tr key={products.id}>
    <td>{products.name}</td>
    <td>${products.price}</td>
  </tr>
))} */
