import { PureComponent } from "react";
// import shallowCompare from "react-addons-shallow-compare"; // ES6

type Props = {
  counter: number;
};

type State = {};

export default class Child extends PureComponent<Props, State> {
  state = {};

  //   shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
  //     return shallowCompare(this, nextProps, nextState);
  //   }

  mouseMove = () => {
    console.log("Mouse move");
  };

  componentDidMount() {
    document.addEventListener("mousemove", this.mouseMove);
    this.interval = setInterval(() => {
      console.log("interval");
    }, 1000);
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.mouseMove);
    clearInterval(this.interval);
  }

  render() {
    console.log("Child Render");
    const { counter } = this.props;
    if (counter > 3) {
      throw new Error("somethign went wrong...");
    }

    return <div>{`child ${counter}`}</div>;
  }
}
