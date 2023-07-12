import React, { useState, useEffect } from "react";

type Props = {};

const Test = ({ user }: Props) => {
  const [counter, setCounter] = useState(0);
  const [info, setInfo] = useState({ ...user, greet: `Hello ${user.name}` });

  useEffect(() => {
    console.log("component Did Mount");

    const mouseMove = () => {
      console.log("mouse Move");
    };

    document.addEventListener("mousemove", mouseMove);

    // componentWillUnmount
    return () => {
      document.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  useEffect(() => {
    console.log("component did mount + update + counter");

    return () => {};
  }, [counter]);

  useEffect(() => {
    setInfo((val) => ({ ...val, ...user }));

    return () => {};
  }, [user]);

  return (
    <div>
      <button
        onClick={() => {
          setCounter((val) => val + 1);
        }}
      >
        +
      </button>
      <p>{counter}</p>
      <button
        onClick={() => {
          setCounter((val) => val - 1);
        }}
      >
        -
      </button>
      <div>
        <p>{info.greet}</p>
        <p>{info.age}</p>
      </div>
    </div>
  );
};

export default Test;
