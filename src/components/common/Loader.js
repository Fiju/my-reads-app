import React from "react";
import { ClipLoader } from "react-spinners";

export const Loader = () => (
  <ClipLoader
    size={150}
    loading={true}
    css={{
      display: "block",
      margin: "20% auto",
      borderColor: "#2e7c31"
    }}
  />
);
