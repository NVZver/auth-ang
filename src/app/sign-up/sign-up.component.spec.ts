import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {SignUpComponent} from './sign-up.component';
import {SingUpService} from './sing-up.service';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {findImportSpecifier} from '@angular/core/schematics/migrations/renderer-to-renderer2/util';
import {DebugElement, ElementRef} from '@angular/core';

const LOCATORS = {
  errors: '.sing-up__errors div',
  inputs: {
    firstName: '[data-role="sing-up.input.firstName"]',
    lastName: '[data-role="sing-up.input.lastName"]',
    email: '[data-role="sing-up.input.email"]',
    password: '[data-role="sing-up.input.password"]',
    passwordConfirm: '[data-role="sing-up.input.passwordConfirm"]',
  }
};

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let signUpServiceStub: Partial<SingUpService>;

  beforeEach(async () => {
    signUpServiceStub = {
      singUp: jasmine.createSpy('signUp').and.returnValue(of({}))
    };
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignUpComponent],
    })
      .compileComponents();
    TestBed.overrideProvider(SingUpService, {useValue: signUpServiceStub});
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('singUpForm', () => {
    const {inputs} = LOCATORS;
    it('should update value in the form controls', () => {
      Object.keys(inputs).forEach(key => {
        const inputEl: DebugElement = fixture.debugElement.query(By.css(inputs[key]));
        const newValue = key + ': Test Value';
        inputEl.nativeElement.value = newValue;
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        expect(component.singUpForm.controls[key].value).toBe(newValue);
      });
    });

    it('should update input values', () => {
      Object.keys(inputs).forEach(key => {
        const newValue = key + ': Test Value';
        component.singUpForm.controls[key].setValue(newValue);
        fixture.detectChanges();
        const inputEl: DebugElement = fixture.debugElement.query(By.css(inputs[key]));
        expect(inputEl.nativeElement.value).toBe(newValue);
      });
    });
  });

  describe('Errors', () => {
    it('should display errors for "First Name"', () => {
    });
  });
});
