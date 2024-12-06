import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Button from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "버튼 테마",
      control: "select",
      options: ["primary"],
    },
    size: {
      description: "버튼 사이즈",
      control: "select",
      options: ["sm", "md", "lg"],
    },
    fullWidth: {
      description: "버튼 사이즈를 w-full로 사용할 때 true 값을 넣어 사용",
      control: "boolean",
    },
    disabled: {
      description: "버튼 disabled 상태로 할 때 true 값을 넣어 사용",
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
  args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Default Button",
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Small Button",
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Large Button",
  },
};

export const FullWidth: Story = {
  args: {
    variant: "primary",
    size: "md",
    fullWidth: true,
    children: "Full Width Button",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: true,
    children: "Disabled Button",
  },
};
