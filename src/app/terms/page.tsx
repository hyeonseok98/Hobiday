import { MainLayout } from "@/components/layout";

export default function TermPage() {
  const headerProps = {
    title: "이용 약관",
    showBackButton: true,
  };

  return (
    <MainLayout headerProps={headerProps}>
      <div className="px-4">
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">제 1조 목적</h2>
          <p>
            본 약관은 하비데이(이하 "회사"라 합니다)가 제공하는 제반 서비스(이하 "서비스"라 합니다)의 이용과 관련하여
            회사와 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">제 2조 용어의 정의</h2>
          <div className="pl-4">
            <p>
              ① "서비스"란 회사가 운영하는 모바일 앱, 웹사이트, 기타 플랫폼을 통해 제공하는 모든 서비스와 콘텐츠를
              의미합니다.
            </p>
            <p>
              ② "회원"이란 본 약관에 따라 회사와 이용계약을 체결하고 서비스를 지속적으로 이용할 수 있는 자를 말합니다.
            </p>
            <p>③ "비회원"이란 회원으로 가입하지 않고 서비스를 이용하는 자를 의미합니다.</p>
            <p>
              ④ "콘텐츠"란 서비스에서 제공되거나 이용자가 게시한 모든 텍스트, 이미지, 동영상 등을 포함하는 자료를
              의미합니다.
            </p>
            <p>
              ⑤ "프로필"이란 회원이 서비스 이용 시 본인을 나타내기 위해 설정한 닉네임, 자기소개, 프로필 사진 등을
              말합니다.
            </p>
            <p>⑥ "피드"란 회원이 업로드한 문화 경험 리뷰, 사진, 해시태그 등의 게시물을 의미합니다.</p>
            <p>⑦ "위시리스트"란 회원이 관심 있는 문화 콘텐츠나 활동을 저장해두는 기능을 의미합니다.</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">제 3조 약관의 명시, 효력 및 변경</h2>
          <div className="pl-4">
            <p>① 본 약관은 회원이 서비스에 가입하거나 이용 시 동의 절차를 거침으로써 효력이 발생합니다.</p>
            <p>
              ② 회사는 약관을 개정할 수 있으며, 변경된 약관은 시행 7일 전 공지사항을 통해 공지합니다. 단, 회원에게
              불리한 변경일 경우 시행 30일 전 공지하며, 이 기간 내에 이의 제기가 없을 경우 변경에 동의한 것으로
              간주합니다.
            </p>
            <p>③ 회원은 변경된 약관에 동의하지 않을 경우, 서비스 이용을 중단하고 탈퇴할 수 있습니다.</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">제 4조 회원가입</h2>
          <div className="pl-4">
            <p>
              ① 회원으로 가입하고자 하는 자는 회사가 제공하는 가입 양식에 필수 정보를 입력하고, 본 약관 및 개인정보
              수집·이용에 동의해야 합니다.
            </p>
            <p>
              ② 회원은 가입 시 본인의 정보만을 제공해야 하며, 허위 정보를 입력할 경우 서비스 이용에 제한을 받을 수
              있습니다.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">제 5조 회원의 의무</h2>
          <div className="pl-4">
            <p>① 회원은 다음 행위를 하여서는 안 됩니다:</p>
            <ul className="list-disc pl-6">
              <li>타인의 정보 도용.</li>
              <li>부적절한 콘텐츠 업로드(예: 욕설, 폭력, 음란물).</li>
              <li>서비스를 비정상적인 방법으로 이용하거나 회사의 시스템을 손상시키는 행위.</li>
            </ul>
            <p>
              ② 회원이 본 약관을 위반할 경우, 회사는 해당 회원에 대해 서비스 이용 제한, 계정 정지 등의 조치를 취할 수
              있습니다.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">제 6조 서비스 이용 시간</h2>
          <div className="pl-4">
            <p>① 회사는 연중무휴, 24시간 서비스를 제공함을 원칙으로 합니다.</p>
            <p>
              ② 단, 시스템 점검, 서비스 개선, 기타 불가피한 사유로 인해 서비스가 일시 중단될 수 있으며, 이 경우 사전에
              공지합니다.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">제 7조 피드 및 콘텐츠</h2>
          <div className="pl-4">
            <p>① 회원은 서비스 내 피드 작성 시 다음 사항을 준수해야 합니다:</p>
            <ul className="list-disc pl-6">
              <li>피드 내용은 공백 포함 최소 10자~최대 2,200자까지 작성 가능합니다.</li>
              <li>최대 15개의 해시태그를 추가할 수 있으며, 각 태그는 2~20자로 제한됩니다.</li>
              <li>사진은 최대 3장까지 업로드 가능하며, 해상도 및 용량 제한은 서비스 정책에 따릅니다.</li>
            </ul>
            <p>② 부적절한 콘텐츠는 사전 통보 없이 삭제될 수 있으며, 이에 대한 책임은 회원 본인에게 있습니다.</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">제 8조 개인정보 보호</h2>
          <div className="pl-4">
            <p>① 회사는 회원의 개인정보를 보호하기 위해 개인정보처리방침을 운영하며, 관련 법령을 준수합니다.</p>
            <p>② 개인정보의 수집 및 이용 목적, 보유 기간, 파기 절차 등은 [개인정보처리방침]에서 확인할 수 있습니다.</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">제 9조 면책사항</h2>
          <div className="pl-4">
            <p>① 회사는 다음 사항에 대해 책임을 지지 않습니다:</p>
            <ul className="list-disc pl-6">
              <li>회원 간의 분쟁 및 거래.</li>
              <li>천재지변, 서버 장애 등 불가항력으로 인한 서비스 중단.</li>
            </ul>
            <p>② 회원이 본 약관 및 관련 법령을 위반하여 발생한 손해에 대한 책임은 회원 본인에게 있습니다.</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">제 10조 분쟁 해결</h2>
          <div className="pl-4">
            <p>① 회사는 이용자의 불만 및 피해 구제를 위해 고객센터를 운영합니다.</p>
            <p>
              ② 회사와 회원 간에 발생한 분쟁은 상호 협의하여 해결하며, 협의가 어려울 경우 관할법원에 소를 제기할 수
              있습니다.
            </p>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
