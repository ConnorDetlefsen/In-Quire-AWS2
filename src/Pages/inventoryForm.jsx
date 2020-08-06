import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../Components/inventoryInput";
import http from "../Services/httpService";
import config from "../config.json";
import UserContext from "../Context/UserContext";
import SideBar from "../Components/sideBar";
import coffeeIMG from "../Inventory-Images/coffeecup.png";
import cokeIMG from "../Inventory-Images/coke.png";
import croissantIMG from "../Inventory-Images/croissant.png";
import fruitCupIMG from "../Inventory-Images/fruitcup.png";
import icedIMG from "../Inventory-Images/icedcoffee.png";
import juiceIMG from "../Inventory-Images/juice.png";
import latteIMG from "../Inventory-Images/latte.png";
import milkIMG from "../Inventory-Images/milkandcookies.png";
import barIMG from "../Inventory-Images/proteinbar.png";
import saladIMG from "../Inventory-Images/salad.png";
import sandwichIMG from "../Inventory-Images/sandwich.png";
import smoothieIMG from "../Inventory-Images/smoothie.png";
import { Link } from "react-router-dom";

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
      cokeAmount: 0,
      croissantAmount: 0,
      fruitCupAmount: 0,
      icedCoffeeAmount: 0,
      juiceAmount: 0,
      latteAmount: 0,
      milkAmount: 0,
      barAmount: 0,
      saladAmount: 0,
      sandwichAmount: 0,
      smoothieAmount: 0,

      coffeePrice: 0,
      cokePrice: 0,
      croissantPrice: 0,
      fruitCupPrice: 0,
      icedCoffeePrice: 0,
      juicePrice: 0,
      lattePrice: 0,
      milkPrice: 0,
      barPrice: 0,
      saladPrice: 0,
      sandwichPrice: 0,
      smoothiePrice: 0,

      coffee: [],
      coke: [],
      croissant: [],
      fruitCup: [],
      icedCoffee: [],
      juice: [],
      latte: [],
      milk: [],
      bar: [],
      salad: [],
      sandwich: [],
      smoothie: [],

      coffeeProduct: [],
      cokeProduct: [],
      croissantProduct: [],
      fruitCupProduct: [],
      icedCoffeeProduct: [],
      juiceProduct: [],
      latteProduct: [],
      milkProduct: [],
      barProduct: [],
      saladProduct: [],
      sandwichProduct: [],
      smoothieProduct: [],

      log: { category: "Inventory", amount: null, team_id: null, round_num: 1 },
      finances: [],
    };
  }

  async componentDidMount() {
    const { history } = this.props;

    if (this.context.currentUser.name === null) {
      history.push("/");
    }

    http
      .get(config.apiEndpoint + "/finances/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ finances: res.data });
        console.log(res);
      });
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
        this.setState({ coke: res.data });
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
        this.setState({ croissant: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/inventory/" +
          this.context.currentUser.teamID +
          "/4"
      )
      .then((res) => {
        this.setState({ fruitCup: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/inventory/" +
          this.context.currentUser.teamID +
          "/5"
      )
      .then((res) => {
        this.setState({ icedCoffee: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/inventory/" +
          this.context.currentUser.teamID +
          "/6"
      )
      .then((res) => {
        this.setState({ juice: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/inventory/" +
          this.context.currentUser.teamID +
          "/7"
      )
      .then((res) => {
        this.setState({ latte: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/inventory/" +
          this.context.currentUser.teamID +
          "/8"
      )
      .then((res) => {
        this.setState({ milk: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/inventory/" +
          this.context.currentUser.teamID +
          "/9"
      )
      .then((res) => {
        this.setState({ bar: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/inventory/" +
          this.context.currentUser.teamID +
          "/10"
      )
      .then((res) => {
        this.setState({ salad: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/inventory/" +
          this.context.currentUser.teamID +
          "/11"
      )
      .then((res) => {
        this.setState({ sandwich: res.data });
        console.log(res);
      });
    http
      .get(
        config.apiEndpoint +
          "/inventory/" +
          this.context.currentUser.teamID +
          "/12"
      )
      .then((res) => {
        this.setState({ smoothie: res.data });
        console.log(res);
      });
    http.get(config.apiEndpoint + "/products/1").then((res) => {
      this.setState({ coffeeProduct: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/products/2").then((res) => {
      this.setState({ cokeProduct: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/products/3").then((res) => {
      this.setState({ croissantProduct: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/products/4").then((res) => {
      this.setState({ fruitCupProduct: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/products/5").then((res) => {
      this.setState({ icedCoffeeProduct: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/products/6").then((res) => {
      this.setState({ juiceProduct: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/products/7").then((res) => {
      this.setState({ latteProduct: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/products/8").then((res) => {
      this.setState({ milkProduct: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/products/9").then((res) => {
      this.setState({ barProduct: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/products/10").then((res) => {
      this.setState({ saladProduct: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/products/11").then((res) => {
      this.setState({ sandwichProduct: res.data });
      console.log(res);
    });
    http.get(config.apiEndpoint + "/products/12").then((res) => {
      this.setState({ smoothieProduct: res.data });
      console.log(res);
    });
  }

  validate = () => {
    const errors = {};

    const {
      coffeeAmount,
      cokeAmount,
      croissantAmount,
      fruitCupAmount,
      icedCoffeeAmount,
      juiceAmount,
      latteAmount,
      milkAmount,
      barAmount,
      saladAmount,
      sandwichAmount,
      smoothieAmount,
      coffeePrice,
      cokePrice,
      croissantPrice,
      fruitCupPrice,
      icedCoffeePrice,
      juicePrice,
      lattePrice,
      milkPrice,
      barPrice,
      saladPrice,
      sandwichPrice,
      smoothiePrice,
    } = this.state;
    if (coffeeAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (cokeAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (croissantAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (coffeePrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (cokePrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (croissantPrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (fruitCupAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (fruitCupPrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (icedCoffeeAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (icedCoffeePrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (juiceAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (juicePrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (lattePrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (latteAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (milkAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (milkPrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (barAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (barPrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (saladAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (saladPrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (sandwichPrice < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (sandwichAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (smoothieAmount < 0) {
      errors.amount = "Amount cannot be negative!";
      toast.error(`${errors.amount}`);
    }
    if (smoothiePrice < 0) {
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
    this.setState({ coffeeAmount: 0 });
    console.log(data);
  };
  cokeSubmit = async (coke) => {
    const cokeAmount = this.state.cokeAmount;
    const plusThis = this.state.coke.num_item;
    coke.num_item = parseInt(cokeAmount, 10) + parseInt(plusThis, 10);
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/2",
      coke
    );
    this.setState({ cokeAmount: 0 });

    console.log(data);
  };
  croissantSubmit = async (croissant) => {
    const croissantAmount = this.state.croissantAmount;
    const plusThis = this.state.croissant.num_item;
    croissant.num_item = parseInt(croissantAmount, 10) + parseInt(plusThis, 10);
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/3",
      croissant
    );
    this.setState({ croissantAmount: 0 });

    console.log(data);
  };
  fruitCupSubmit = async (fruitCup) => {
    const fruitCupAmount = this.state.fruitCupAmount;
    const plusThis = this.state.fruitCup.num_item;
    fruitCup.num_item = parseInt(fruitCupAmount, 10) + parseInt(plusThis, 10);
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/4",
      fruitCup
    );
    this.setState({ fruitCupAmount: 0 });

    console.log(data);
  };
  icedCoffeeSubmit = async (icedCoffee) => {
    const icedCoffeeAmount = this.state.icedCoffeeAmount;
    const plusThis = this.state.icedCoffee.num_item;
    icedCoffee.num_item =
      parseInt(icedCoffeeAmount, 10) + parseInt(plusThis, 10);
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/5",
      icedCoffee
    );
    this.setState({ icedCoffeeAmount: 0 });
    console.log(data);
  };
  juiceSubmit = async (juice) => {
    const juiceAmount = this.state.juiceAmount;
    const plusThis = this.state.juice.num_item;
    juice.num_item = parseInt(juiceAmount, 10) + parseInt(plusThis, 10);
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/6",
      juice
    );
    this.setState({ juiceAmount: 0 });

    console.log(data);
  };
  latteSubmit = async (latte) => {
    const latteAmount = this.state.latteAmount;
    const plusThis = this.state.latte.num_item;
    latte.num_item = parseInt(latteAmount, 10) + parseInt(plusThis, 10);
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/7",
      latte
    );
    this.setState({ latteAmount: 0 });
    console.log(data);
  };
  milkSubmit = async (milk) => {
    const milkAmount = this.state.milkAmount;
    const plusThis = this.state.milk.num_item;
    milk.num_item = parseInt(milkAmount, 10) + parseInt(plusThis, 10);
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/8",
      milk
    );
    this.setState({ milkAmount: 0 });

    console.log(data);
  };
  barSubmit = async (bar) => {
    const barAmount = this.state.barAmount;
    const plusThis = this.state.bar.num_item;
    bar.num_item = parseInt(barAmount, 10) + parseInt(plusThis, 10);
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/9",
      bar
    );
    this.setState({ barAmount: 0 });

    console.log(data);
  };
  saladSubmit = async (salad) => {
    const saladAmount = this.state.saladAmount;
    const plusThis = this.state.salad.num_item;
    salad.num_item = parseInt(saladAmount, 10) + parseInt(plusThis, 10);
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/10",
      salad
    );
    this.setState({ saladAmount: 0 });

    console.log(data);
  };
  sandwichSubmit = async (sandwich) => {
    const sandwichAmount = this.state.sandwichAmount;
    const plusThis = this.state.sandwich.num_item;
    sandwich.num_item = parseInt(sandwichAmount, 10) + parseInt(plusThis, 10);
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/11",
      sandwich
    );
    this.setState({ sandwichAmount: 0 });

    console.log(data);
  };
  smoothieSubmit = async (smoothie) => {
    const smoothieAmount = this.state.smoothieAmount;
    const plusThis = this.state.smoothie.num_item;
    smoothie.num_item = parseInt(smoothieAmount, 10) + parseInt(plusThis, 10);
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/12",
      smoothie
    );
    this.setState({ smoothieAmount: 0 });

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
    this.setState({ coffeePrice: 0 });

    console.log(data);
  };

  cokePriceSubmit = async (coke) => {
    const cokePrice = this.state.cokePrice;
    coke.selling_price = cokePrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/2",
      coke
    );
    this.setState({ cokePrice: 0 });
    console.log(data);
  };

  croissantPriceSubmit = async (croissant) => {
    const croissantPrice = this.state.croissantPrice;
    croissant.selling_price = croissantPrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/3",
      croissant
    );
    this.setState({ croissantPrice: 0 });

    console.log(data);
  };
  fruitCupPriceSubmit = async (fruitCup) => {
    const fruitCupPrice = this.state.fruitCupPrice;
    fruitCup.selling_price = fruitCupPrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/4",
      fruitCup
    );
    this.setState({ fruitCupPrice: 0 });

    console.log(data);
  };
  icedCoffeePriceSubmit = async (icedCoffee) => {
    const icedCoffeePrice = this.state.icedCoffeePrice;
    icedCoffee.selling_price = icedCoffeePrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/5",
      icedCoffee
    );
    this.setState({ icedCoffeePrice: 0 });

    console.log(data);
  };
  juicePriceSubmit = async (juice) => {
    const juicePrice = this.state.juicePrice;
    juice.selling_price = juicePrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/6",
      juice
    );
    this.setState({ juicePrice: 0 });

    console.log(data);
  };
  lattePriceSubmit = async (latte) => {
    const lattePrice = this.state.lattePrice;
    latte.selling_price = lattePrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/7",
      latte
    );
    this.setState({ lattePrice: 0 });

    console.log(data);
  };
  milkPriceSubmit = async (milk) => {
    const milkPrice = this.state.milkPrice;
    milk.selling_price = milkPrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/8",
      milk
    );
    this.setState({ milkPrice: 0 });

    console.log(data);
  };
  barPriceSubmit = async (bar) => {
    const barPrice = this.state.barPrice;
    bar.selling_price = barPrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/9",
      bar
    );
    this.setState({ barPrice: 0 });

    console.log(data);
  };
  saladPriceSubmit = async (salad) => {
    const saladPrice = this.state.saladPrice;
    salad.selling_price = saladPrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/10",
      salad
    );
    this.setState({ saladPrice: 0 });

    console.log(data);
  };
  sandwichPriceSubmit = async (sandwich) => {
    const sandwichPrice = this.state.sandwichPrice;
    sandwich.selling_price = sandwichPrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/11",
      sandwich
    );
    this.setState({ sandwichPrice: 0 });

    console.log(data);
  };
  smoothiePriceSubmit = async (smoothie) => {
    const smoothiePrice = this.state.smoothiePrice;
    smoothie.selling_price = smoothiePrice;
    const { data } = await http.put(
      config.apiEndpoint +
        "/inventory/" +
        this.context.currentUser.teamID +
        "/12",
      smoothie
    );
    this.setState({ smoothiePrice: 0 });

    console.log(data);
  };

  budgetUpdate = async (team) => {
    const coffeeAmount1 =
      this.state.coffeeAmount * this.state.products[0].price;
    const cokeAmount1 = this.state.cokeAmount * this.state.products[1].price;
    const croissantAmount1 =
      this.state.croissantAmount * this.state.products[2].price;
    const fruitCupAmount1 =
      this.state.fruitCupAmount * this.state.products[3].price;
    const icedCoffeeAmount1 =
      this.state.icedCoffeeAmount * this.state.products[4].price;
    const juiceAmount1 = this.state.juiceAmount * this.state.products[5].price;
    const latteAmount1 = this.state.latteAmount * this.state.products[6].price;
    const milkAmount1 = this.state.milkAmount * this.state.products[7].price;
    const barAmount1 = this.state.barAmount * this.state.products[8].price;
    const saladAmount1 = this.state.saladAmount * this.state.products[9].price;
    const sandwichAmount1 =
      this.state.sandwichAmount * this.state.products[10].price;
    const smoothieAmount1 =
      this.state.smoothieAmount * this.state.products[11].price;

    const budget = team.budget; // used to set api team.budget

    team.budget =
      parseInt(budget, 10) -
      parseInt(coffeeAmount1, 10) -
      parseInt(cokeAmount1, 10) -
      parseInt(croissantAmount1, 10) -
      parseInt(fruitCupAmount1, 10) -
      parseInt(icedCoffeeAmount1, 10) -
      parseInt(juiceAmount1, 10) -
      parseInt(latteAmount1, 10) -
      parseInt(milkAmount1, 10) -
      parseInt(barAmount1, 10) -
      parseInt(saladAmount1, 10) -
      parseInt(sandwichAmount1, 10) -
      parseInt(smoothieAmount1, 10);
    this.context.currentUser.budget = team.budget; //updates the context

    const { data } = await http.put(
      config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
      team
    );
    console.log(data);
  };

  handleInventoryOrderSubmit = (e) => {
    e.preventDefault();
    const {
      coffeeAmount,
      cokeAmount,
      croissantAmount,
      fruitCupAmount,
      icedCoffeeAmount,
      juiceAmount,
      latteAmount,
      milkAmount,
      barAmount,
      saladAmount,
      sandwichAmount,
      smoothieAmount,
      products,
    } = this.state;
    //budget negative check here

    const coffeeAmount1 = coffeeAmount * products[0].price;
    const cokeAmount1 = cokeAmount * products[1].price;
    const croissantAmount1 = croissantAmount * products[2].price;
    const fruitCupAmount1 = fruitCupAmount * products[3].price;
    const icedCoffeeAmount1 = icedCoffeeAmount * products[4].price;
    const juiceAmount1 = juiceAmount * products[5].price;
    const latteAmount1 = latteAmount * products[6].price;
    const milkAmount1 = milkAmount * products[7].price;
    const barAmount1 = barAmount * products[8].price;
    const saladAmount1 = saladAmount * products[9].price;
    const sandwichAmount1 = sandwichAmount * products[10].price;
    const smoothieAmount1 = smoothieAmount * products[11].price;

    const budget = this.state.team.budget; // used to set api team.budget

    const purchaseTotal =
      parseInt(coffeeAmount1, 10) +
      parseInt(cokeAmount1, 10) +
      parseInt(croissantAmount1, 10) +
      parseInt(fruitCupAmount1, 10) +
      parseInt(icedCoffeeAmount1, 10) +
      parseInt(juiceAmount1, 10) +
      parseInt(latteAmount1, 10) +
      parseInt(milkAmount1, 10) +
      parseInt(barAmount1, 10) +
      parseInt(saladAmount1, 10) +
      parseInt(sandwichAmount1, 10) +
      parseInt(smoothieAmount1, 10);

    const isBudgetNotNegative =
      parseInt(budget, 10) - parseInt(purchaseTotal, 10);

    const numOfProducts =
      parseInt(coffeeAmount, 10) +
      parseInt(cokeAmount, 10) +
      parseInt(croissantAmount, 10) +
      parseInt(fruitCupAmount, 10) +
      parseInt(icedCoffeeAmount, 10) +
      parseInt(juiceAmount, 10) +
      parseInt(latteAmount, 10) +
      parseInt(milkAmount, 10) +
      parseInt(barAmount, 10) +
      parseInt(saladAmount, 10) +
      parseInt(sandwichAmount, 10) +
      parseInt(smoothieAmount, 10);

    const numOfProducts1 =
      coffeeAmount +
      cokeAmount +
      croissantAmount +
      fruitCupAmount +
      icedCoffeeAmount +
      juiceAmount +
      latteAmount +
      milkAmount +
      barAmount +
      saladAmount +
      sandwichAmount +
      smoothieAmount;

    if (isBudgetNotNegative < 0) {
      toast.error("You don't have enough money!");
      return;
    }

    if (numOfProducts1 % 1 === 0) {
      console.log("whole number");
    } else {
      toast.error("Please enter whole numbers only");
      return;
    }

    const errors = this.validate(); //error checking if negative or if no dropdown selected
    this.setState({ errors: errors || {} });
    if (errors) return;

    if (coffeeAmount > 1) {
      this.coffeeSubmit(this.state.coffee);
    }
    if (cokeAmount > 1) {
      this.cokeSubmit(this.state.coke);
    }
    if (croissantAmount > 1) {
      this.croissantSubmit(this.state.croissant);
    }
    if (fruitCupAmount > 1) {
      this.fruitCupSubmit(this.state.fruitCup);
    }
    if (icedCoffeeAmount > 1) {
      this.icedCoffeeSubmit(this.state.icedCoffee);
    }
    if (juiceAmount > 1) {
      this.juiceSubmit(this.state.juice);
    }
    if (latteAmount > 1) {
      this.latteSubmit(this.state.latte);
    }
    if (milkAmount > 1) {
      this.milkSubmit(this.state.milk);
    }
    if (barAmount > 1) {
      this.barSubmit(this.state.bar);
    }
    if (saladAmount > 1) {
      this.saladSubmit(this.state.salad);
    }
    if (sandwichAmount > 1) {
      this.sandwichSubmit(this.state.sandwich);
    }
    if (smoothieAmount > 1) {
      this.smoothieSubmit(this.state.smoothie);
    }
    this.budgetUpdate(this.state.team);

    const { amount, log } = this.state;
    http
      .post(config.apiEndpoint + "/log/", {
        amount: purchaseTotal,
        team_id: this.context.currentUser.teamID,
        round_num: log.round_num,
        category: log.category,
      })
      .then((res) => {
        console.log(res);
      });
    const prevFinance = this.state.finances.total_inventory;
    const putFinance = parseInt(purchaseTotal, 10) + parseInt(prevFinance, 10);
    this.state.finances.total_inventory = putFinance;
    http.put(
      config.apiEndpoint + "/finances/" + this.context.currentUser.teamID,
      this.state.finances
    );
    toast.success("Inventory Order Submitted!");
  };
  handleSellingPriceSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(); //error checking if negative or if no dropdown selected
    this.setState({ errors: errors || {} });
    if (errors) return;

    if (this.state.coffeePrice > 0) {
      this.coffeePriceSubmit(this.state.coffee);
    }
    if (this.state.cokePrice > 0) {
      this.cokePriceSubmit(this.state.coke);
    }
    if (this.state.croissantPrice > 0) {
      this.croissantPriceSubmit(this.state.croissant);
    }
    if (this.state.fruitCupPrice > 0) {
      this.fruitCupPriceSubmit(this.state.fruitCup);
    }
    if (this.state.icedCoffeePrice > 0) {
      this.icedCoffeePriceSubmit(this.state.icedCoffee);
    }
    if (this.state.juicePrice > 0) {
      this.juicePriceSubmit(this.state.juice);
    }
    if (this.state.lattePrice > 0) {
      this.lattePriceSubmit(this.state.latte);
    }
    if (this.state.milkPrice > 0) {
      this.milkPriceSubmit(this.state.milk);
    }
    if (this.state.barPrice > 0) {
      this.barPriceSubmit(this.state.bar);
    }
    if (this.state.saladPrice > 0) {
      this.saladPriceSubmit(this.state.salad);
    }
    if (this.state.sandwichPrice > 0) {
      this.sandwichPriceSubmit(this.state.sandwich);
    }
    if (this.state.smoothiePrice > 0) {
      this.smoothiePriceSubmit(this.state.smoothie);
    }
    toast.success("Selling Prices Set!");
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      errors,
      coffee,
      coke,
      croissant,
      team,
      fruitCup,
      icedCoffee,
      juice,
      latte,
      milk,
      bar,
      salad,
      sandwich,
      smoothie,
      coffeeProduct,
      cokeProduct,
      croissantProduct,
      fruitCupProduct,
      icedCoffeeProduct,
      juiceProduct,
      latteProduct,
      milkProduct,
      barProduct,
      saladProduct,
      sandwichProduct,
      smoothieProduct,
    } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <div class="d-flex" id="wrapper">
          <SideBar></SideBar>
          <div id="page-content-wrapper">
            <nav className="navbar navbar-dark bg-dark">
              <h1 class="whiteFont">Inventory</h1>
            </nav>
            <nav className="navbar background">
              Budget: {team.budget} <br />{" "}
              <button class="btn btn-warning">
                <Link class="blackFont" to="/refreshInv">
                  Refresh Page
                </Link>
              </button>
            </nav>

            <br />
            <div class="container">
              <table class="table table-sm">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Wholesale Purchase Product Price</th>
                    <th scope="col">Amount Owned</th>
                    <th scope="col">Your Selling Price</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <img src={coffeeIMG} height="40" width="40" />
                      {coffeeProduct.name}
                    </td>
                    <td>${coffeeProduct.price}</td>
                    <td>{coffee.num_item}</td>
                    <td>${coffee.selling_price}</td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <img src={cokeIMG} height="40" width="40" />
                      {cokeProduct.name}
                    </td>
                    <td>${cokeProduct.price}</td>
                    <td>{coke.num_item}</td>
                    <td>${coke.selling_price}</td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <img src={croissantIMG} height="40" width="40" />
                      {croissantProduct.name}
                    </td>
                    <td>${croissantProduct.price}</td>
                    <td>{croissant.num_item}</td>
                    <td>${croissant.selling_price}</td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <img src={fruitCupIMG} height="40" width="40" />
                      {fruitCupProduct.name}
                    </td>
                    <td>${fruitCupProduct.price}</td>
                    <td>{fruitCup.num_item}</td>
                    <td>${fruitCup.selling_price}</td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <img src={icedIMG} height="40" width="40" />
                      {icedCoffeeProduct.name}
                    </td>
                    <td>${icedCoffeeProduct.price}</td>
                    <td>{icedCoffee.num_item}</td>
                    <td>${icedCoffee.selling_price}</td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <img src={juiceIMG} height="40" width="40" />
                      {juiceProduct.name}
                    </td>
                    <td>${juiceProduct.price}</td>
                    <td>{juice.num_item}</td>
                    <td>${juice.selling_price}</td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <img src={latteIMG} height="40" width="40" />
                      {latteProduct.name}
                    </td>
                    <td>${latteProduct.price}</td>
                    <td>{latte.num_item}</td>
                    <td>${latte.selling_price}</td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <img src={milkIMG} height="40" width="40" />
                      {milkProduct.name}
                    </td>
                    <td>${milkProduct.price}</td>
                    <td>{milk.num_item}</td>
                    <td>${milk.selling_price}</td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <img src={barIMG} height="40" width="40" />
                      {barProduct.name}
                    </td>
                    <td>${barProduct.price}</td>
                    <td>{bar.num_item}</td>
                    <td>${bar.selling_price}</td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <img src={saladIMG} height="40" width="40" />
                      {saladProduct.name}
                    </td>
                    <td>${saladProduct.price}</td>
                    <td>{salad.num_item}</td>
                    <td>${salad.selling_price}</td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <img src={sandwichIMG} height="40" width="40" />
                      {sandwichProduct.name}
                    </td>
                    <td>${sandwichProduct.price}</td>
                    <td>{sandwich.num_item}</td>
                    <td>${sandwich.selling_price}</td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <img src={smoothieIMG} height="40" width="40" />
                      {smoothieProduct.name}
                    </td>
                    <td>${smoothieProduct.price}</td>
                    <td>{smoothie.num_item}</td>
                    <td>${smoothie.selling_price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="divider" />
            <div>
              <h1>
                {" "}
                &emsp;&emsp;&emsp;&emsp;&ensp; Order Form (in units)
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Selling Prices (in $)
              </h1>
              <br />
              <div class="wrapper">
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <div class="form-group quarter">
                  <center>
                    <form onSubmit={this.handleInventoryOrderSubmit}>
                      <div class="container-comp">
                        <Input
                          class="form-control"
                          name="coffeeAmount"
                          value={this.state.coffeeAmount}
                          label="Coffee"
                          onChange={this.handleChange}
                          error={errors.amount}
                        ></Input>
                        <Input
                          name="cokeAmount"
                          value={this.state.cokeAmount}
                          label="Coke     "
                          onChange={this.handleChange}
                          error={errors.amount}
                        ></Input>
                        <Input
                          name="croissantAmount"
                          value={this.state.croissantAmount}
                          label="Croissant"
                          onChange={this.handleChange}
                          error={errors.amount}
                        ></Input>
                        <Input
                          name="fruitCupAmount"
                          value={this.state.fruitCupAmount}
                          label="Fruit Cup"
                          onChange={this.handleChange}
                          error={errors.amount}
                        ></Input>
                        <Input
                          name="icedCoffeeAmount"
                          value={this.state.icedCoffeeAmount}
                          label="Iced Coffee"
                          onChange={this.handleChange}
                          error={errors.amount}
                        ></Input>
                        <Input
                          name="juiceAmount"
                          value={this.state.juiceAmount}
                          label="Juice"
                          onChange={this.handleChange}
                          error={errors.amount}
                        ></Input>
                      </div>
                    </form>
                  </center>
                </div>
                &emsp;&emsp;&emsp;&emsp;
                <div class="quarter">
                  <form onSubmit={this.handleInventoryOrderSubmit}>
                    <center>
                      <Input
                        name="latteAmount"
                        value={this.state.latteAmount}
                        label="Latte"
                        onChange={this.handleChange}
                        error={errors.amount}
                      ></Input>
                      <Input
                        name="milkAmount"
                        value={this.state.milkAmount}
                        label="Milk & Cookies"
                        onChange={this.handleChange}
                        error={errors.amount}
                      ></Input>
                      <Input
                        name="barAmount"
                        value={this.state.barAmount}
                        label="Protein Bar"
                        onChange={this.handleChange}
                        error={errors.amount}
                      ></Input>
                      <Input
                        name="saladAmount"
                        value={this.state.saladAmount}
                        label="Salad"
                        onChange={this.handleChange}
                        error={errors.amount}
                      ></Input>
                      <Input
                        name="sandwichAmount"
                        value={this.state.sandwichAmount}
                        label="Sandwich"
                        onChange={this.handleChange}
                        error={errors.amount}
                      ></Input>
                      <Input
                        name="smoothieAmount"
                        value={this.state.smoothieAmount}
                        label="Smoothie"
                        onChange={this.handleChange}
                        error={errors.amount}
                      ></Input>
                    </center>
                  </form>
                </div>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <div class="form-group quarter">
                  <center>
                    <form onSubmit={this.handleSellingPriceSubmit}>
                      <div class="container-comp">
                        <Input
                          name="coffeePrice"
                          value={this.state.coffeePrice}
                          label="Coffee Price"
                          onChange={this.handleChange}
                          error={errors.amount}
                        ></Input>
                        <Input
                          name="cokePrice"
                          value={this.state.cokePrice}
                          label="Coke Price"
                          onChange={this.handleChange}
                          error={errors.amount}
                        ></Input>
                        <Input
                          name="croissantPrice"
                          value={this.state.croissantPrice}
                          label="Croissant Price"
                          onChange={this.handleChange}
                          error={errors.amount}
                        ></Input>
                        <Input
                          name="fruitCupPrice"
                          value={this.state.fruitCupPrice}
                          label="Fruit Cup Price"
                          onChange={this.handleChange}
                          error={errors.amount}
                        ></Input>
                        <Input
                          name="icedCoffeePrice"
                          value={this.state.icedCoffeePrice}
                          label="Iced Coffee Price"
                          onChange={this.handleChange}
                          error={errors.amount}
                        ></Input>
                        <Input
                          name="juicePrice"
                          value={this.state.juicePrice}
                          label="Juice Price"
                          onChange={this.handleChange}
                          error={errors.amount}
                        ></Input>
                      </div>
                    </form>
                  </center>
                </div>
                &emsp;&emsp;&emsp;&emsp;
                <div class="quarter">
                  <form onSubmit={this.handleSellingPriceSubmit}>
                    <center>
                      <Input
                        name="lattePrice"
                        value={this.state.lattePrice}
                        label="Latte Price"
                        onChange={this.handleChange}
                        error={errors.amount}
                      ></Input>
                      <Input
                        name="milkPrice"
                        value={this.state.milkPrice}
                        label="Milk & Cookies Price"
                        onChange={this.handleChange}
                        error={errors.amount}
                      ></Input>
                      <Input
                        name="barPrice"
                        value={this.state.barPrice}
                        label="Protein Bar Price"
                        onChange={this.handleChange}
                        error={errors.amount}
                      ></Input>
                      <Input
                        name="saladPrice"
                        value={this.state.saladPrice}
                        label="Salad Price"
                        onChange={this.handleChange}
                        error={errors.amount}
                      ></Input>
                      <Input
                        name="sandwichPrice"
                        value={this.state.sandwichPrice}
                        label="Sandwich Price"
                        onChange={this.handleChange}
                        error={errors.amount}
                      ></Input>
                      <Input
                        name="smoothiePrice"
                        value={this.state.smoothiePrice}
                        label="Smoothie Price"
                        onChange={this.handleChange}
                        error={errors.amount}
                      ></Input>
                    </center>
                  </form>
                </div>
              </div>
              &emsp;&emsp;&emsp;&emsp;&ensp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&emsp;&emsp;&emsp;&emsp;&emsp;
              <button
                onClick={this.handleInventoryOrderSubmit}
                disabled={!this.context.currentUser.isManager}
                type="submit"
                margin-top=".5em"
                class="btn btn-primary"
              >
                Submit
              </button>
              &emsp;&emsp;&emsp;&emsp;&ensp;&emsp;&emsp;&emsp;&emsp;&emsp;
              &emsp;&emsp;&emsp;&emsp;&ensp;&emsp;&emsp;&emsp;&emsp;&emsp;
              &emsp;&emsp;&emsp;&emsp;&ensp;&emsp;&emsp;&emsp;&emsp;&emsp;
              &emsp;&emsp;&emsp;
              <button
                onClick={this.handleSellingPriceSubmit}
                disabled={!this.context.currentUser.isManager}
                type="submit"
                margin-top=".5em"
                class="btn btn-primary"
              >
                Submit
              </button>
            </div>
            <br />
          </div>
        </div>
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
