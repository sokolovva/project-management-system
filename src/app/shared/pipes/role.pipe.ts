import { Pipe, PipeTransform } from '@angular/core';
import {RoleEnum} from '@src/app/_models/role-enum';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case RoleEnum.User: value = 'User'; break;
      case RoleEnum.Admin: value = 'Admin'; break;
      default: value = '';
    }
    return value;
  }
}
