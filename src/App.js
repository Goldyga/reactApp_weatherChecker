import React from "react";
import Title from "./components/Titles";
import Widget from "./components/Widget";
import Footer from "./components/Footer";


class App extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <Title />
          <Widget />
        <Footer />
      </div>
    );
  }
}

export default App
