import { MainLayout } from "@/components/layout";

export default function PrivacyPolicyPage() {
  const headerProps = {
    title: "개인정보처리방침",
    showBackButton: true,
  };

  return (
    <MainLayout headerProps={headerProps}>
      <div className="px-4">
        <section className="mb-6">
          <p>
            하비데이(Hobiday)는 「개인정보 보호법」 및 관련 법령에 따라 사용자의 개인정보를 보호하고, 관련된 권리를
            보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">1. 개인정보의 수집 및 이용 목적</h2>
          <p>서비스는 다음과 같은 목적으로 개인정보를 수집 및 이용합니다:</p>
          <ul className="list-disc pl-6">
            <li>회원관리: 회원가입, 본인 인증, 회원정보 관리.</li>
            <li>서비스 제공: 콘텐츠 추천, 맞춤형 서비스 제공.</li>
            <li>마케팅 및 광고 활용: 이벤트 및 프로모션 정보 제공.</li>
            <li>서비스 개선: 사용자 피드백 반영 및 신규 기능 개발.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">2. 수집하는 개인정보 항목</h2>
          <p>필수 정보:</p>
          <ul className="list-disc pl-6">
            <li>회원가입: 이름, 이메일, 비밀번호, 닉네임, 프로필 사진.</li>
            <li>소셜 로그인 시: 소셜 계정 식별자, 이메일 주소.</li>
          </ul>
          <p>선택 정보:</p>
          <ul className="list-disc pl-6">
            <li>관심사(예: 영화, 뮤지컬, 전시 등).</li>
            <li>사용자가 작성한 리뷰 및 콘텐츠.</li>
          </ul>
          <p>자동 수집 정보:</p>
          <ul className="list-disc pl-6">
            <li>IP 주소, 쿠키, 접속 기록, 기기 정보(OS, 브라우저 등).</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">3. 개인정보의 보유 및 이용 기간</h2>
          <p>
            서비스는 원칙적으로 개인정보의 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관련
            법령에 따라 다음과 같이 보관할 수 있습니다:
          </p>
          <ul className="list-disc pl-6">
            <li>회원 정보: 회원 탈퇴 후 30일까지 보관.</li>
            <li>서비스 이용 기록: 1년간 보관.</li>
            <li>
              법령에 따른 보관:
              <ul className="list-disc pl-6">
                <li>계약 또는 청약철회 기록: 5년 (전자상거래법)</li>
                <li>소비자 불만 또는 분쟁 처리 기록: 3년 (전자상거래법)</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">4. 개인정보의 제3자 제공</h2>
          <p>서비스는 원칙적으로 사용자의 개인정보를 제3자에게 제공하지 않습니다. 단, 다음의 경우에는 예외로 합니다:</p>
          <ul className="list-disc pl-6">
            <li>사용자가 사전 동의를 한 경우.</li>
            <li>법령에 따라 요구되는 경우.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">5. 개인정보의 처리 위탁</h2>
          <p>
            서비스는 원활한 운영을 위해 개인정보 처리를 외부 전문 업체에 위탁할 수 있습니다. 위탁 시, 관련 법령에 따라
            안전하게 관리됩니다.
          </p>
          <ul className="list-disc pl-6">
            <li>위탁 업체: [예시: Amazon Web Services (AWS)]</li>
            <li>위탁 내용: 데이터 저장 및 관리.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">6. 사용자의 권리와 행사 방법</h2>
          <p>사용자는 언제든지 다음 권리를 행사할 수 있습니다:</p>
          <ul className="list-disc pl-6">
            <li>개인정보 열람, 수정, 삭제 요청.</li>
            <li>개인정보 수집·이용·제공 동의 철회 요청.</li>
          </ul>
          <p>권리 행사는 서비스 내 설정 페이지 또는 고객센터를 통해 가능합니다.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">7. 개인정보의 보호를 위한 기술적·관리적 조치</h2>
          <p>서비스는 사용자의 개인정보를 보호하기 위해 다음과 같은 조치를 취합니다:</p>
          <p>기술적 조치:</p>
          <ul className="list-disc pl-6">
            <li>데이터 암호화.</li>
            <li>방화벽 및 보안 솔루션 도입.</li>
          </ul>
          <p>관리적 조치:</p>
          <ul className="list-disc pl-6">
            <li>개인정보 처리 담당자 교육.</li>
            <li>접근 권한 관리.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">8. 개인정보 보호책임자</h2>
          <p>개인정보 처리와 관련된 문의사항은 아래 개인정보보호책임자에게 문의하실 수 있습니다:</p>
          <ul className="list-disc pl-6">
            <li>이름: 000</li>
            <li>이메일: privacy@hobiday.com</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">9. 개인정보처리방침 변경</h2>
          <p>
            본 개인정보처리방침은 법령 및 서비스 변경사항에 따라 수정될 수 있습니다. 변경 시, 서비스 공지사항을 통해
            사전 안내드립니다.
          </p>
          <ul className="list-disc pl-6">
            <li>최초 공고일: 2024년 11월 29일</li>
            <li>시행일: 2024년 12월 15일</li>
          </ul>
        </section>
      </div>
    </MainLayout>
  );
}
