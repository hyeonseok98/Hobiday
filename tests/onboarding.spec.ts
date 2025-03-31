import { expect, test } from "@playwright/test";

test.use({ storageState: "./tests/storage/onboarding-storage.json" });

test.describe("온보딩 플로우 (온보딩 미진행 계정 사용)", () => {
  test("온보딩 - 성공 플로우", async ({ page }) => {
    await page.goto("/onboarding");

    // 1) 프로필 단계
    await page.getByPlaceholder("닉네임을 입력하세요").type("하비데이테스트계정");
    await page.waitForTimeout(700); // debounce 대기
    await expect(page.locator("text=사용 가능한 닉네임입니다.")).toBeVisible();
    await page.click('button:has-text("다음")');

    // 2) 카테고리 단계
    await page.click('button:has-text("대중무용")');
    // 완료 버튼 클릭 → 온보딩 완료 페이지 이동
    await page.click('button:has-text("완료")');

    // 3) 온보딩 완료
    await expect(page).toHaveURL(/\/onboarding\/complete$/);
    // !! 현재 백엔드 서버 이전으로 인한 api 수정 불가로 인해 complete 단계 검증 불가
    // await expect(page.locator("text=가입을 축하합니다!")).toBeVisible();
  });

  test("온보딩 - 서버 에러 발생으로 인한 시 실패 플로우", async ({ page }) => {
    // 백엔드 서버로 가는 API를 가로채서 500 응답을 주도록 Mocking
    await page.route("**/api/profile-registration", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요." }),
      });
    });

    await page.goto("/onboarding");

    // 1) 프로필 단계
    await page.getByPlaceholder("닉네임을 입력하세요").type("하비데이테스트계정");
    await page.waitForTimeout(700); // debounce 대기
    await expect(page.locator("text=사용 가능한 닉네임입니다.")).toBeVisible();
    await page.click('button:has-text("다음")');

    // 2) 카테고리 단계
    await page.click('button:has-text("대중무용")');
    await page.click('button:has-text("완료")');

    // 3) 서버 에러로 실패 화면 확인
    await expect(page.locator("text=프로필 등록에 실패했습니다.")).toBeVisible();
  });
});
