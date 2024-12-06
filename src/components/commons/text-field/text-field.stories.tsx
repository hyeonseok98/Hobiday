import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TextField from "./index";

type TextFieldProps = {
  className?: string;
  label?: string;
  inputPlaceholder?: string;
  helperText?: string;
  status?: "default" | "success" | "error";
  maxLength?: number;
  value?: string;
};

const meta: Meta<TextFieldProps> = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "TextField의 Label 텍스트를 지정",
      control: "text",
      defaultValue: "Label",
    },
    inputPlaceholder: {
      description: "Input의 Placeholder 텍스트를 지정",
      control: "text",
      defaultValue: "Enter text",
    },
    helperText: {
      description: "HelperText의 내용을 지정",
      control: "text",
      defaultValue: "Helper text goes here.",
    },
    status: {
      description: "Label, Input, HelperText의 상태를 지정",
      control: "select",
      options: ["default", "success", "error"],
      defaultValue: "default",
    },
    maxLength: {
      description: "Input의 최대 길이를 지정",
      control: "number",
      defaultValue: 15,
    },
    value: {
      description: "Input의 값을 지정",
      control: "text",
      defaultValue: "",
    },
    className: {
      description: "추가적인 CSS 클래스를 지정",
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<TextFieldProps>;

export const Default: Story = {
  args: {
    className: "",
    label: "Default Label",
    inputPlaceholder: "Enter text",
    helperText: "Default helper text.",
    status: "default",
    maxLength: 15,
    value: "",
  },
  render: function renderDefault(args) {
    const [value, setValue] = useState(args.value || "");

    return (
      <TextField className={args.className}>
        <TextField.Label status={args.status}>{args.label}</TextField.Label>
        <TextField.Input
          status={args.status}
          placeholder={args.inputPlaceholder}
          maxLength={args.maxLength}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <TextField.HelperText status={args.status}>{args.helperText}</TextField.HelperText>
      </TextField>
    );
  },
};

export const Success: Story = {
  args: {
    className: "",
    label: "Success Label",
    inputPlaceholder: "Enter success text",
    helperText: "Success helper text.",
    status: "success",
    maxLength: 15,
    value: "",
  },
  render: function renderSuccess(args) {
    const [value, setValue] = useState(args.value || "");

    return (
      <TextField className={args.className}>
        <TextField.Label status={args.status}>{args.label}</TextField.Label>
        <TextField.Input
          status={args.status}
          placeholder={args.inputPlaceholder}
          maxLength={args.maxLength}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <TextField.HelperText status={args.status}>{args.helperText}</TextField.HelperText>
      </TextField>
    );
  },
};

export const Error: Story = {
  args: {
    className: "",
    label: "Error Label",
    inputPlaceholder: "Enter error text",
    helperText: "Error helper text.",
    status: "error",
    maxLength: 15,
    value: "",
  },
  render: function renderError(args) {
    const [value, setValue] = useState(args.value || "");

    return (
      <TextField className={args.className}>
        <TextField.Label status={args.status}>{args.label}</TextField.Label>
        <TextField.Input
          status={args.status}
          placeholder={args.inputPlaceholder}
          maxLength={args.maxLength}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <TextField.HelperText status={args.status}>{args.helperText}</TextField.HelperText>
      </TextField>
    );
  },
};
