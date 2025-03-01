import React, { useEffect } from "react";
import { helix } from "ldrs";

const HelixLoader = ({ size = "45", speed = "2.5", color = "black" }) => {
  useEffect(() => {
    helix.register(); // Register the custom element once
  }, []);

  return <l-helix size={size} speed={speed} color={color}></l-helix>;
};

export default HelixLoader;
