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
    ]
  });

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
      console.log(res);
      if (res._id) {
        this.singUpStatus$.next(SingUpStatus.SUCCESS);
      } else {
        this.singUpStatus$.next(SingUpStatus.ERROR);
      }
    });
  }
}
