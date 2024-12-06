import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Chip from "./index";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Chip에 표시될 텍스트",
      control: "text",
      defaultValue: "Chip Label",
    },
    state: {
      description: "Chip의 상태.",
      control: "select",
      options: ["default", "preSelected", "selected", "hashTag"],
      defaultValue: "default",
    },
    isDelete: {
      description: "삭제 버튼을 표시할지 여부",
      control: "boolean",
      defaultValue: false,
    },
    onClose: {
      description: "삭제 버튼 클릭 시 실행되는 핸들러",
      action: "onClose",
    },
    onClick: {
      description: "Chip 클릭 시 실행되는 핸들러",
      action: "onClick",
    },
    className: {
      description: "추가적인 CSS 클래스를 지정",
      control: "text",
      defaultValue: "",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const StatefulChips: Story = {
  render: function RenderStatefulChips(args) {
    const [chips, setChips] = useState([
      { id: 1, label: "Chip 1", state: "default" },
      { id: 2, label: "Chip 2", state: "default" },
      { id: 3, label: "Chip 3", state: "default" },
    ]);

    const handleChipClick = (id: number) => {
      setChips((prevChips) =>
        prevChips.map((chip) => {
          if (chip.id === id) {
            if (chip.state === "default") {
              return { ...chip, state: "selected" };
            }
            if (chip.state === "selected" || chip.state === "preSelected") {
              return { ...chip, state: "default" };
            }
          } else if (chip.state === "selected") {
            return { ...chip, state: "preSelected" };
          }
          return chip;
        }),
      );
    };

    return (
      <div className="flex flex-wrap gap-4">
        {chips.map((chip) => (
          <Chip
            key={chip.id}
            {...args}
            label={chip.label}
            state={chip.state as "default" | "preSelected" | "selected"}
            onClick={() => handleChipClick(chip.id)}
          />
        ))}
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    label: "Default Chip",
    state: "default",
  },
};

export const PreSelected: Story = {
  args: {
    label: "PreSelected Chip",
    state: "preSelected",
  },
};

export const Selected: Story = {
  args: {
    label: "Selected Chip",
    state: "selected",
  },
};

export const HashTag: Story = {
  args: {
    label: "#HashTag",
    state: "hashTag",
  },
};
