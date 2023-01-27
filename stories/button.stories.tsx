// Button.stories.tsx
import * as React from "react";
import Button, { buttonTypes } from "../components/button";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    typeButton: {
      control: { type: "select", options: ["primary", "secondary", "disable"] },
    },
    children: { name: "label" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "button label",
  typeButton: buttonTypes.secondary,
  withIcon: false,
};

export const withIcon = Template.bind({});
withIcon.args = {
  children: "Primary with icon",
  typeButton: buttonTypes.primary,
  withIcon: true,
};
