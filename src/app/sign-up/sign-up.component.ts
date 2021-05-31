import {Component, OnDestroy, OnInit} from '@angular/core';
import {SingUpService} from './sing-up.service';
import {SingUpRequestData, SingUpStatus} from './types';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [SingUpService]
})
export class SignUpComponent implements OnInit, OnDestroy {

  singUpStatus$: BehaviorSubject<SingUpStatus | undefined> = new BehaviorSubject<SingUpStatus | undefined>(undefined);

  singUpForm: FormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]
      ],
      lastName: ['', [Validators.required]
      ],
      email: ['', [Validators.required, Validators.email]
      ],
      password: ['', [
        Validators.minLength(8),
        this.validatePasswordCharacters(/(?=.*[a-z])(?=.*[A-Z]).*/),
      ]],
      passwordConfirm: ['', [
        Validators.required,
      ]]
    },
    {
      validators: [
        this.validateNameInPassword,
        this.validatePasswordConfirm
      ]
    }
  );

  readonly singUpStatus = SingUpStatus;

  private gc$ = new Subject();

  constructor(
    private singUpService: SingUpService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.gc$.next();
    this.gc$.complete();
  }

  singUp(): void {
    this.singUpStatus$.next(this.singUpStatus.PROCESSING);
    this.singUpService.singUp(this.singUpForm.value).pipe(
      takeUntil(this.gc$)
    ).subscribe(res => {
      if (res._id) {
        this.singUpStatus$.next(SingUpStatus.SUCCESS);
      } else {
        this.singUpStatus$.next(SingUpStatus.ERROR);
      }
    });
  }

  private validatePasswordCharacters(passRegExp: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isPasswordValid = passRegExp.test(control.value);
      return isPasswordValid
        ? null
        : {passwordCharacters: {value: control.value}};
    };
  }

  private validateNameInPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password').value.toUpperCase();
    const firstName = control.get('firstName').value.toUpperCase();
    const lastName = control.get('lastName').value.toUpperCase();
    if (firstName && password.includes(firstName)) {
      return {passwordHasNames: {value: firstName}};
    } else if (lastName && password.includes(lastName)) {
      return {passwordHasNames: {value: lastName}};
    }
    return null;
  }

  private validatePasswordConfirm(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password').value;
    const passwordConfirm = control.get('passwordConfirm').value;
    return password !== passwordConfirm
      ? {passwordIsDifferent: {value: passwordConfirm}}
      : null;
  }
}
