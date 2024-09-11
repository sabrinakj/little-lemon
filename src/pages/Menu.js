import Card from "../components/Card";
import lemonDesertImg from "../assets/icons_assets/lemon dessert.jpg";


const cardsSides = [
  {
    id: 0,
    dishName: "Smoked eggplant tortelli",
    dishPrice: "$ 13.00",
    dishDescription:
      "Homemade with fresh tomatoes, smoked eggplants and eggplants scapece.",
    delivery: "Order a delivey",
    image:
      "https://plus.unsplash.com/premium_photo-1691837114852-52fe1faa2223?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 1,
    dishName: "Beetroot Gnocchi",
    dishPrice: "$ 14.00",
    dishDescription:
      "With Franciacorta sauce, a symbolic dish of our restaurant that has won over many customers.",
    delivery: "Order a delivey",
    image:
      "https://plus.unsplash.com/premium_photo-1667115593045-3a5aec9f4f4f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    dishName: "Fettuccine with Lamb and Lemon Ragù",
    dishPrice: "$ 15.00",
    dishDescription:
      "Homemade fettuccine with a rich ragù of naturally raised lamb and lemon.",
    image:
      "https://images.unsplash.com/photo-1664214649080-52c879182270?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const cardsMeal = [
  {
    id: 0,
    dishName: "Tricolore Eggplants",
    dishPrice: "$ 16.00",
    dishDescription:
      "A tribute to Italy, our vegetarian second course is served with garden eggplants and basil gel.",
    delivery: "Order a delivey",
    image:
      "https://images.unsplash.com/photo-1594576182733-ad4ec76e674f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 1,
    dishName: "Meat of the day",
    dishPrice: "$ 20.00",
    dishDescription:
      "Our meat comes from natural farms. The available cuts vary based on the availability of the fresh product",
    delivery: "Order a delivey",
    image:
      "https://plus.unsplash.com/premium_photo-1664297897697-b8ee713dbe65?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    dishName: "Catch of the day",
    dishPrice: "$ 23.00",
    dishDescription:
      "fish available based on the catch of the day",
    image:
      "https://images.unsplash.com/photo-1587913956756-4fcf4833241d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const cardsDessert = [
  {
    id: 0,
    dishName: "Tiramisù",
    dishPrice: "$ 10.00",
    dishDescription:
      "An icon of Italian pastry, our tiramisu is a unique sensory experience. Layers of ladyfingers soaked in espresso blend harmoniously with a velvety cream made with the highest quality mascarpone.",
    delivery: "Order a delivey",
    image: "https://plus.unsplash.com/premium_photo-1695028378225-97fbe39df62a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 1,
    dishName: "Neapolitan pastiera",
    dishPrice: "$ 12.00",
    dishDescription:
      "A classic of the Neapolitan confectionery tradition, Pastiera Napoletana is a delicious shortcrust pastry cake filled with a rich filling of ricotta, sugar, eggs and wheat boiled in milk. Flavoured with orange zest and orange blossom water",
    delivery: "Order a delivey",
    image:
      "https://images.unsplash.com/photo-1649931189158-489360fd46f8?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    dishName: "Lemon desert",
    dishPrice: "$ 11.00",
    dishDescription:
      "This comes straight from grama’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    delivery: "Order a delivey",
    image: lemonDesertImg,
  },
];


function Menu() {
  return (
    <div>
      <h1>Menu Page</h1>
      <p>This is the Menu page.</p>
    </div>
  );
}

export default Menu;
