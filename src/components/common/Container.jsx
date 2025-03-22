// const Container = ({ children, className }) => {
//     const sizes = {
//       sm: "max-w-md",
//       md: "max-w-2xl",
//       lg: "max-w-4xl",
//       xl: "max-w-7xl",
//       full: "w-full"
//     };
  
//     return (
//       <div className={` px-[8rem] ${className || ""}`}>
//         {children}
//       </div>
//     );
//   };
  
//   export default Container;
  

import React from "react";

const Container = ({ className, children, ...props }) => {
  return (
    <section
      {...props}
      className={"max-w-7xl mx-auto px-[24px] w-full" + (className ? " " + className : "")}
    >
      {children}
    </section>
  );
};

export default Container;