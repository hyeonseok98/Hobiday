import type { Meta, StoryObj } from "@storybook/react";
import NavigationBar from "./index";

const meta: Meta<typeof NavigationBar> = {
  title: "Components/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <section style={{ width: "430px", height: "80px" }}>
        <Story />
      </section>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
  render: () => <NavigationBar />,
};
