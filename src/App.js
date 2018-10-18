import React, { Component } from "react";
import Calendar from "./components/Calendar";
import "./index.css";
const events = [
  {
    id: 1,
    time: 1539854335,
    title: "빵먹고싶빵"
  },
  {
    id: 2,
    time: 1538956800,
    title: "하하하 "
  }
];
class App extends Component {
  render() {
    return <Calendar events={events} />;
  }
}

export default App;
