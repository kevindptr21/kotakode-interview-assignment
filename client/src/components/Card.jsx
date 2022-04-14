import React from "react";

const Card = ({ className, children }) => (
  <div
    className={`max-w-sm rounded-lg overflow-hidden shadow-lg bg-white ${className}`}
    style={{ height: "fit-content" }}
  >
    {children}
  </div>
);

export default Card;
