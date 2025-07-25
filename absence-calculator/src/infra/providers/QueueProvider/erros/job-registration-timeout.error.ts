export class JogRegistrationTimeoutError extends Error {
  constructor(jobKey: string) {
    super(`${jobKey} registration failed by timeout`);
  }
}
