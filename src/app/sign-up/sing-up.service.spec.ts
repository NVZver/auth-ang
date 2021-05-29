import {TestBed} from '@angular/core/testing';

import {SingUpService} from './sing-up.service';
import {of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {API} from './constants';

const NEW_ACCOUNT = {
  email: 'jack.jonson@mymail.com',
  firstName: 'Jack',
  lastName: 'Jonson',
};
const POST_SUCCESS = {
  email: 'jack.jonson@mymail.com',
  firstName: 'Jack',
  lastName: 'Jonson',
  _id: '2e9d92ae-e7b1-4de2-b25e-ff0243d0e1d9'
};

const POST_ERROR = {
  status: 500
};

describe('SingUpService', () => {
  let service: SingUpService;
  let httpClientStub: Partial<HttpClient>;

  beforeEach(() => {
    httpClientStub = {
      post: jasmine.createSpy('post').and.returnValue(of(POST_SUCCESS))
    };
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientStub},

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(SingUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('singUp', () => {
    it('should send POST request and return SUCCESS', (done) => {
      service.singUp(NEW_ACCOUNT).subscribe(res => {
        expect(httpClientStub.post).toHaveBeenCalledWith(API.singUp, NEW_ACCOUNT);
        done();
      });
    });
    it('should handle API Errors', () => {
      httpClientStub.post = jasmine.createSpy('post').and.returnValue(throwError(POST_ERROR));
      service.singUp(NEW_ACCOUNT).subscribe(res => {
        expect(res).toBe(POST_ERROR);
      });
    });
  });

});
