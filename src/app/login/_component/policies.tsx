import axios from "axios";

export default function Policies() {
  function saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem("accessToken", accessToken);
    document.cookie = `refreshToken=${refreshToken}; path=/; `;
  }

  // 관리자 계정으로 로그인
  async function adminAccess(nickname: string) {
    try {
      const apiUrl = `api/test/freepass/${nickname}`;
      const response = await axios.get(apiUrl);

      const { accessToken, refreshToken } = response.data.result;
      if (accessToken && refreshToken) {
        saveTokens(accessToken, refreshToken);
      }

      window.location.href = "/";
    } catch (error) {
      console.error("관리자 로그인 실패", error);
    }
  }

  return (
    // <h2 className="mt-6 mb-12 text-[10px] font-light leading-6">
    //   가입을 진행할 경우,{" "}
    //   <button onClick={() => adminAccess("account1")} className="font-normal underline">
    //     서비스 약관
    //   </button>{" "}
    //   및{" "}
    //   <button onClick={() => adminAccess("sample1")} className="font-normal underline">
    //     개인정보 처리방침
    //   </button>
    //   에 동의한 것으로 간주합니다.
    // </h2>
    <h2 className="mt-6 mb-12 text-xs font-light leading-6">
      <button onClick={() => adminAccess("sample1")} className="font-normal underline">
        이곳을 눌러 테스트를 진행해주세요!
      </button>
    </h2>
  );
}
