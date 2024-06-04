import { SetMetadata } from '@nestjs/common';

export const Verification = (...args: string[]) =>
  SetMetadata('verification', args);
