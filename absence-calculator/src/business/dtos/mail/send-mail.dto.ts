interface IMailContext {
  [key: string]: any;
}

export interface ISendMailDTO {
  to: string | string[];
  from?: string;
  subject: string;
  text: string;
  // context: IMailContext;
  attachments?: Array<{
    filename: string;
    content: Buffer;
  }>;
}
