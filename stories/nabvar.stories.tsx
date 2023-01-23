// Button.stories.tsx
import * as React from "react";
import Navbar from "../components/layout/navbar";

export default {
  title: "Navbar",
  component: Navbar,
};

const black = false;
export const Template = (args: any) => <Navbar black={!!black} {...args} />;
Template.args = {
  black: false,
};
