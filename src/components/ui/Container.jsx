
import React from "react";

const Container = ({ className, children}) => {
  return (
    <div
      className={"max-w-7xl mx-auto px-[24px] w-full" + (className ? " " + className : "")}
    >
      {children}
    </div>
  );
};

export default Container;