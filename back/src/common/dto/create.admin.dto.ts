import { PickType } from '@nestjs/swagger';
import { Admin } from 'src/entitis/Admin';

export class CreateAdminDto extends PickType(Admin, [
  'email',
  'password',
] as const) {}
