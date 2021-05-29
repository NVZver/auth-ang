import {Component, OnDestroy, OnInit} from '@angular/core';
import {SingUpService} from './sing-up.service';
import {SingUpRequestData} from './types/types';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [SingUpService]
})
export class SignUpComponent implements OnInit, OnDestroy {

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
    const singUpRequestData: SingUpRequestData = {
      firstName: 'Jack',
      lastName: 'Jonson',
      email: 'jack.jonson@mymail.com'
    };
    this.singUpService.singUp(singUpRequestData).pipe(
      takeUntil(this.gc$)
    ).subscribe(res => {
      console.log(res);
    });
  }

}
