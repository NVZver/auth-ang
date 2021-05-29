import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import {SingUpService} from './sing-up.service';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    SignUpComponent
  ],
  providers: [
    SingUpService
  ]
})
export class SignUpModule { }
