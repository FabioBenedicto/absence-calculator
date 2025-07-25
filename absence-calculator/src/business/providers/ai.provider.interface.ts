export interface IAiProvider {
  extractClasses(
    buffer: Buffer,
    mime_type: string,
  ): Promise<Record<string, string>>;
  extractHolidays(
    buffer: Buffer,
    mime_type: string,
  ): Promise<Record<string, string>>;
}

export const AiProviderToken = Symbol.for('AiProviderToken');
