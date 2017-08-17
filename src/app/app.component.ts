import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

import { FieldConfig } from './dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
import { DynamicFormService } from './dynamic-form/service/dynamic-form.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor() { }

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  nameErrorMesg = 'nameError';
  lnameErrorMesg = 'Last name not allowed';
  phoneNumber = 'phone';
  forbiddenUsernames = ['Chris', 'Anna'];
  // forbiddenLastNames = ['Chris','Anna']
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      class:'form-control',
      placeholder: 'Enter your name',
      validation: [Validators.required, this.forbiddenNames.bind(this)],
      errorMessage: this.nameErrorMesg
    },
    {
      type: 'input',
      label: 'Last name',
      name: 'last_Name',
      class:'form-control',
      placeholder: 'Enter your last name',
      validation: [Validators.required],
      asyncValidation: [this.forbiddenLastName],
      errorMessage: this.lnameErrorMesg
    },
    {
      type: 'input',
      label: 'Phone Number',
      name: 'phone',
      class:'form-control',
      placeholder: 'Enter your Phone Number',
      validation: [Validators.required, Validators.minLength(3)],
      errorMessage: this.phoneNumber
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
      class:'btn btn-primary',
    }
  ];

  ngAfterViewInit() {
    if (this.form) {
    // this.form.patchValue('phone', '$');
    console.log(this.form);
    let previousValid = this.form.valid;
    this.form.valueChanges
          .subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });
    this.form.setDisabled('submit', true);
    }

  }
  ngOnInit() {
    console.log('input from app', this.form.inputValues());
    this.lnameErrorMesg = 'last';
    this.nameErrorMesg = 'name';
    this.phoneNumber = 'phone';
    setTimeout(() => {
      this.phoneNumber = 'Again my last error mesg';
    }, 6000);
   }
  submit(value: {[name: string]: any}) {
    console.log(value);
  }
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenLastName(control: FormControl): Promise<any> | Observable<any>{
    console.log("Forbidden Last Names Validator Called", control.value);
    const promise = new Promise<any>((resolve, reject)=>{
        setTimeout(() => {
          if(control.value === 'Chris'){
            resolve({'Last Name is forbidden': true})
          } else {
            resolve(null);
          }
        },1500);
    });
    return promise;
  }
}
