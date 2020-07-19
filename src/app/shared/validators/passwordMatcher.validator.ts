import { AbstractControl } from '@angular/forms';

export function passwordMatcher(passwords: AbstractControl): { [key: string]: boolean } | null {
    const password = passwords.get('password1');
    const confPassword = passwords.get('password2');
    if (password.pristine || confPassword.pristine) {
      return null;
    }
    if (password.value === confPassword.value) {
      return null;
    }
    return { 'match': true };
  }
