import { ApiError } from '@/types/notice';

export type MockFailureMode = 'AUTO' | 'ALWAYS' | 'NEVER';

export interface MockConfig {
  delayMs: number;
  failureMode: MockFailureMode;
  failureRate: number;
}

export const mockConfig: MockConfig = {
  delayMs: 600,
  failureMode: 'AUTO',
  failureRate: 5,
};

let requestCount = 0;

export async function simulateNetworkCall<T>(dataFetcher: () => T): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, mockConfig.delayMs));

  requestCount += 1;

  const shouldFail =
    mockConfig.failureMode === 'ALWAYS' ||
    (mockConfig.failureMode === 'AUTO' && requestCount % mockConfig.failureRate === 0);

  if (shouldFail) {
    const error: ApiError = {
      status: 500,
      message: 'Simulated backend error: service temporarily unavailable',
      code: 'SERVER_ERROR',
      timestamp: new Date().toISOString(),
    };
    throw error;
  }

  return dataFetcher();
}





// export function setMockFailureMode(mode: MockFailureMode) {
//   mockConfig.failureMode = mode;
// }

// export function setMockDelay(delayMs: number) {
//   mockConfig.delayMs = delayMs;
// }

// export function resetMockState() {
//   requestCount = 0;
// }
