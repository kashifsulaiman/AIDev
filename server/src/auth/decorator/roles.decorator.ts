import { SetMetadata } from '@nestjs/common';

export const roles = (...args: string[]) => SetMetadata('roles', args);
