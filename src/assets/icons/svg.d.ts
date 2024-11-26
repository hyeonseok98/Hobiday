declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

/** url 붙은 svg import 시 이미지 컴포넌트에서 src 값으로 사용 가능 */

declare module "*.svg?url" {
  import type { StaticImport } from "next/image";

  const defaultExport: StaticImport | string;
  export default defaultExport;
}
