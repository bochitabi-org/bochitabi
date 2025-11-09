import { test, expect } from '@playwright/test';

test.describe("ヘルスチェックテスト",
  () => {
    test("ヘルスチェック",
      async ({ request }) => {
        const response = await request.get("/ping")
        expect(response.ok).toBeTruthy();
        
        const res = await response.json();
        expect(res.message).toBe("pong");
      }
    )
  }
)