import { Meta, StoryObj } from "@storybook/react";
import { ReactNode } from "react";
import Chip from "../commons/chip";
import Card from "./index";

type CardStoryArgs = {
  className?: string;
  imageSrc: string;
  imageAlt: string;
  size: "sm";
  title: string;
  category: string;
  info: string;
  iconSrc?: string;
  children: ReactNode;
};

const meta: Meta<CardStoryArgs> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  argTypes: {
    className: {
      description: "Card의 추가 스타일을 지정",
      control: { type: "text" },
    },
    children: {
      description: "Card 내부의 컨텐츠를 정의",
    },
    imageSrc: {
      description: "Card 왼쪽 메인 이미지의 경로",
      control: { type: "text" },
    },
    imageAlt: {
      description: "이미지의 대체 텍스트",
      control: { type: "text" },
    },
    size: {
      description: "Card.Image의 사이즈 (sm: 88px, 추후 추가)",
      control: {
        type: "select",
        options: ["sm"],
      },
    },
    title: {
      description: "Card의 제목 정의",
      control: { type: "text" },
    },
    category: {
      description: "카테고리 정보 제공",
      control: { type: "text" },
    },
    info: {
      description: "추가 정보 표시",
      control: { type: "text" },
    },
    iconSrc: {
      description: "정보 아이콘 이미지 경로",
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<CardStoryArgs>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[430px]">
      <Card className={args.className}>
        <Card.Image src={args.imageSrc} alt={args.imageAlt} size={args.size} />
        <Card.Content>
          <Card.Category>
            <Chip label={args.category} state="hashTag" />
          </Card.Category>
          <Card.Title>{args.title}</Card.Title>
          <Card.Info iconSrc={args.iconSrc ?? ""} info={args.info} />
        </Card.Content>
      </Card>
    </div>
  ),
  args: {
    className: "w-full",
    imageSrc: "/img/logo-image.png",
    imageAlt: "눈꽃 이미지",
    size: "sm",
    category: "서커스/마술",
    title: "매직쇼 더 라이브 [춘천]",
    info: "춘천교육문화관 공연장",
    iconSrc: "/img/logo-image.png",
  },
  parameters: {
    docs: {
      description: {
        story: `
- 이 스토리는 기본 Card 컴포넌트를 보여줍니다.
- Card 컴포넌트는 재사용 가능한 카드 UI를 생성하는 데 사용되며, Compound Pattern으로 구성되어 있습니다.
- \`size\` prop을 통해 이미지 크기를 설정할 수 있습니다.

\`\`\`tsx
<Card className="w-full">
  <Card.Image src="/img/sample.png" alt="이미지 설명" size="sm" />
  <Card.Content>
    <Card.Category>
      <Chip label="카테고리" state="hashTag" />
    </Card.Category>
    <Card.Title>카드 제목</Card.Title>
    <Card.Info iconSrc="/img/icon.png" info="추가 정보" />
  </Card.Content>
</Card>
\`\`\`
        `,
      },
    },
  },
};

export const WithLongText: Story = {
  render: (args) => (
    <div className="w-[430px]">
      <Card className={args.className}>
        <Card.Image src={args.imageSrc} alt={args.imageAlt} size={args.size} />
        <Card.Content>
          <Card.Category>
            <Chip label={args.category} state="hashTag" />
          </Card.Category>
          <Card.Title>{args.title}</Card.Title>
          <Card.Info iconSrc={args.iconSrc ?? ""} info={args.info} />
        </Card.Content>
      </Card>
    </div>
  ),
  args: {
    className: "w-full",
    imageSrc: "/img/logo-image.png",
    imageAlt: "긴 텍스트 이미지",
    size: "sm",
    category: "긴 텍스트 카테고리 hashtag",
    title: "매직쇼 더 라이브 [춘천]",
    info: "긴 텍스트가 입력되면 ...으로 문장이 끝납니다. 이를 통해 일관된 디자인을 얻습니다.",
    iconSrc: "/img/logo-image.png",
  },
  parameters: {
    docs: {
      description: {
        story: `
- 이 스토리는 title과 info의 내용이 길어질 때의 Card 컴포넌트를 테스트합니다.
- 내부 텍스트가 길어질 경우 text-ellipsis로 줄바꿈 없이 잘리는 스타일이 적용됩니다.
        `,
      },
    },
  },
};
