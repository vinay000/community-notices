import { ApiError } from '@/types/notice';

const DELAY_MS = 600;
const FAILURE_RATE = 5;

let requestCount = 0;

export async function simulateNetworkCall<T>(dataFetcher: () => T): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  requestCount += 1;

  if (requestCount % FAILURE_RATE === 0) {
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
