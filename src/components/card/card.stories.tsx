import { Meta, StoryObj } from "@storybook/react";
import { ReactNode } from "react";
import Chip from "../commons/chip";
import Card from "./index";

type CardStoryArgs = {
  className?: string;
  imageSrc: string;
  imageAlt: string;
  ImageWidth: string;
  ImageHeight: string;
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
    ImageWidth: {
      description: "이미지 width 값. w-[00px] 형태로 사용",
      control: { type: "text" },
    },
    ImageHeight: {
      description: "이미지의 height 값. h-[00px] 형태로 사용",
      control: { type: "text" },
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
        <Card.Image src={args.imageSrc} alt={args.imageAlt} width={args.ImageWidth} height={args.ImageHeight} />
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
    ImageWidth: "w-[88px]",
    ImageHeight: "h-[88px]",
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
- 사용 예제:
\`\`\`
<Card className="w-full">
  <Card.Image src="/img/sample.png" alt="이미지 설명" width="w-[88px]" height="h-[88px]" />
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
        <Card.Image src={args.imageSrc} alt={args.imageAlt} width={args.ImageWidth} height={args.ImageHeight} />
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
    ImageWidth: "w-[88px]",
    ImageHeight: "h-[88px]",
    category: "긴 텍스트 카테고리 hashtag",
    title: "매우 긴 제목이 들어가도 문제가 없는 카드 타이틀",
    info: "긴 텍스트가 입력되면 ...으로 문장이 끝납니다. 이를 통해 일관된 디자인을 얻습니다.",
    iconSrc: "/img/logo-image.png",
  },
  parameters: {
    docs: {
      description: {
        story: `
  - 이 스토리는 title과 info의 내용이 길어질 때의 Card 컴포넌트를 테스트합니다.
        `,
      },
    },
  },
};
