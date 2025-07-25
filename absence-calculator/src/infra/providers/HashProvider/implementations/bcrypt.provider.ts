import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { IHashProvider } from 'src/business/providers/hash.provider.interface';

@Injectable()
export class BcryptHashProvider implements IHashProvider {
  constructor() {}

  async generateHash(payload: string): Promise<string> {
    return await hash(payload, 10);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed);
  }
}
