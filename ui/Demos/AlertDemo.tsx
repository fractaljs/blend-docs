'use client'
import React from "react";
import Playground from "@/ui/Playground/Playground";
import ButtonCopy from "../libCopy/ButtonCopy";

const AlertDemo = () => {
  // we will define all controls here, code string here  and pass it to the playground
  return (
    <div>
      <Playground>
        <ButtonCopy text="Click me" />
      </Playground>
    </div>
  );
};

export default AlertDemo;
