export const validateNickname = (nickname: string): { isValid: boolean; message: string } => {
  const nickNameRegex = /^(?!.*[\s])[가-힣a-zA-Z0-9]{2,15}$/; // 한글, 영문, 숫자만 허용 (2~15자)
  const consonantRegex = /[ㄱ-ㅎㅏ-ㅣ]/; // 단독 자음/모음 금지

  if (!nickname.trim()) {
    return { isValid: false, message: "닉네임을 입력해주세요." };
  }

  if (!nickNameRegex.test(nickname)) {
    return { isValid: false, message: "닉네임은 2~15자 사이여야 하며, 공백과 특수문자는 사용할 수 없습니다." };
  }

  if (consonantRegex.test(nickname)) {
    return { isValid: false, message: "닉네임에 단독 자음 또는 모음은 사용할 수 없습니다." };
  }

  return { isValid: true, message: "" };
};
