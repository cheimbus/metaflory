import { PickType } from '@nestjs/swagger';
import { Admin } from 'src/entitis/Admin';

export class AdminLoginDto extends PickType(Admin, [
  'email',
  'password',
] as const) {}
