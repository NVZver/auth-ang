import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';

import {SignUpComponent} from './sign-up.component';
import {SingUpService} from './sing-up.service';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {findImportSpecifier} from '@angular/core/schematics/migrations/renderer-to-renderer2/util';
import {DebugElement, ElementRef} from '@angular/core';
import {SingUpRequestData, SingUpStatus} from './types';

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

  describe('singUp', () => {
    it('should call "singUp" from "singUpService" with form values', () => {
      const {inputs} = LOCATORS;
      const requestData = {} as SingUpRequestData;
      Object.keys(inputs).forEach(key => {
        const newValue = key + ': Test Value';
        requestData[key] = newValue;
        component.singUpForm.controls[key].setValue(newValue);
      });
      component.singUp();
      expect(signUpServiceStub.singUp).toHaveBeenCalledWith(requestData);
    });
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
    describe('FirstName', () => {
      it('should display "required" error message', () => {
        const input = fixture.debugElement.query(By.css(LOCATORS.inputs.firstName));
        input.nativeElement.value = '';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css(LOCATORS.errors));
        expect(error.nativeElement).toBeTruthy();
        expect(error.nativeElement.innerText).toBe('First name is required');
      });
    });
    describe('LastName', () => {
      it('should display "required" error message', () => {
        const input = fixture.debugElement.query(By.css(LOCATORS.inputs.lastName));
        input.nativeElement.value = '';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css(LOCATORS.errors));
        expect(error.nativeElement).toBeTruthy();
        expect(error.nativeElement.innerText).toBe('Last name is required');
      });
    });
    describe('Email', () => {
      it('should display "required" error message', () => {
        const input = fixture.debugElement.query(By.css(LOCATORS.inputs.email));
        input.nativeElement.value = '';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css(LOCATORS.errors));
        expect(error.nativeElement).toBeTruthy();
        expect(error.nativeElement.innerText).toBe('Email is required');
      });
      it('should display "invalid" error message', () => {
        const input = fixture.debugElement.query(By.css(LOCATORS.inputs.email));
        input.nativeElement.value = 'test';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css(LOCATORS.errors));
        expect(error.nativeElement).toBeTruthy();
        expect(error.nativeElement.innerText).toBe('Email is invalid.');
      });
    });
    describe('Password', () => {
      it('should display "required" error message', () => {
        const input = fixture.debugElement.query(By.css(LOCATORS.inputs.password));
        input.nativeElement.value = '';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css(LOCATORS.errors));
        expect(error.nativeElement).toBeTruthy();
        expect(error.nativeElement.innerText).toBe('Password is required');
      });
      it('should display "min 8 characters" error message', () => {
        const input = fixture.debugElement.query(By.css(LOCATORS.inputs.password));
        input.nativeElement.value = 'test';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css(LOCATORS.errors));
        expect(error.nativeElement).toBeTruthy();
        expect(error.nativeElement.innerText).toBe('Password mast contain at least 8 characters');
      });
      it('should display "1 upper case letters" error message', () => {
        const input = fixture.debugElement.query(By.css(LOCATORS.inputs.password));
        input.nativeElement.value = 'test test';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css(LOCATORS.errors));
        expect(error.nativeElement).toBeTruthy();
        expect(error.nativeElement.innerText).toBe('Password mast contain at least 1 lower and 1 upper case letters');
      });
      it('should display "1 lower case letters" error message', () => {
        const input = fixture.debugElement.query(By.css(LOCATORS.inputs.password));
        input.nativeElement.value = 'TEST TEST';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css(LOCATORS.errors));
        expect(error.nativeElement).toBeTruthy();
        expect(error.nativeElement.innerText).toBe('Password mast contain at least 1 lower and 1 upper case letters');
      });
      it('should display "mast not contain First Name" error message', () => {
        const input = fixture.debugElement.query(By.css(LOCATORS.inputs.password));
        component.singUpForm.controls.firstName.setValue('Jack');
        input.nativeElement.value = 'Jack TEST';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css(LOCATORS.errors));
        expect(error.nativeElement).toBeTruthy();
        expect(error.nativeElement.innerText).toBe('Password should not contain first name or last name');
      });
      it('should display "mast not contain Last Name" error message', () => {
        const inputLastName = fixture.debugElement.query(By.css(LOCATORS.inputs.lastName));
        const input = fixture.debugElement.query(By.css(LOCATORS.inputs.password));
        component.singUpForm.controls.lastName.setValue('Jonson');
        input.nativeElement.value = 'Jonson TEST';
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css(LOCATORS.errors));
        expect(error.nativeElement).toBeTruthy();
        expect(error.nativeElement.innerText).toBe('Password should not contain first name or last name');
      });
    });
  });
});
