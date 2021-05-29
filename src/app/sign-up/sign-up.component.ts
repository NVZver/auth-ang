import {Component, OnDestroy, OnInit} from '@angular/core';
import {SingUpService} from './sing-up.service';
import {SingUpRequestData, SingUpStatus} from './types';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [SingUpService]
})
export class SignUpComponent implements OnInit, OnDestroy {

  singUpStatus$: BehaviorSubject<SingUpStatus|undefined> = new BehaviorSubject<SingUpStatus|undefined>(undefined);
  readonly singUpStatus = SingUpStatus;
  private gc$ = new Subject();

  constructor(
    private singUpService: SingUpService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.gc$.next();
    this.gc$.complete();
  }

  singUp(): void {
    this.singUpStatus$.next(this.singUpStatus.PROCESSING);
    const singUpRequestData: SingUpRequestData = {
      firstName: 'Jack',
      lastName: 'Jonson',
      email: 'jack.jonson@mymail.com'
    };
    this.singUpService.singUp(singUpRequestData).pipe(
      takeUntil(this.gc$)
    ).subscribe(res => {
      console.log(res);
      if (res._id){
        this.singUpStatus$.next(SingUpStatus.SUCCESS);
      } else {
        this.singUpStatus$.next(SingUpStatus.ERROR);
      }
    });
  }

}
