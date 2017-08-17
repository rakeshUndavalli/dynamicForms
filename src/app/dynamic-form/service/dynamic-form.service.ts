import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DynamicFormService {

  constructor() { }
  public inputValue: string;
  inputEventValues: Subject<string>= new Subject<string>();

  inputEventMethod(): string {
    this.inputEventValues.subscribe(value => {
      this.inputValue = value;
    });
    console.log('I am called from service');
    return this.inputValue;
  }

}
