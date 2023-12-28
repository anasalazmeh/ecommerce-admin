import React from "react";
import { Button } from "./button";

const LoadingButton = () => {
  return (
    <Button className="px-10 py-2 ">
      <div className=" animate-pulse loading w-4 h-4 rounded-full bg-white dark:bg-black " />

    </Button>
  );
};

export default LoadingButton;
