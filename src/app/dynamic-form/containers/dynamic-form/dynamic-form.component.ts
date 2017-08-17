import { Component, EventEmitter, Input, OnChanges, OnInit, Output, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { DynamicFormService } from '../../service/dynamic-form.service';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  styleUrls: ['dynamic-form.component.css'],
  templateUrl: 'dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit, DoCheck {
  @Input()
  config: FieldConfig[] = [];
  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  constructor(private fb: FormBuilder,
              private dynamicFormService: DynamicFormService) {}
  get controls() { return this.config.filter(({type}) => type !== 'button'); }
  get valueChanges() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }
  // Function for onBlur, onSelect etc..,
  inputValues() {
    return this.dynamicFormService.inputEventValues
    .subscribe(value => {
      console.log('from dynamicomponent', value);
       });
  }
  ngOnInit() {
    this.form = this.createGroup();
    this.inputValues();
    this.defaultPatchValues();
  }
  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    const asyncValidation = config.asyncValidation;
    console.log("disabled, validation, value", validation);
    return this.fb.control({ disabled, value }, validation, asyncValidation);
  }


  defaultPatchValues() {
    this.controls.forEach( control => {
      switch (control.name) {
        case 'phone': {
          this.patchValue('phone', '$');
        }
      }
    });
  }
  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }
  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }
    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }
  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }
  patchValue(name: string, value: any) {
    this.form.controls[name].patchValue(value, {emitEvent: true});
  }
  ngDoCheck() {
  }
}
/*
TODO
Check two fields not should have same name
On select radio button on dropdown emit value
Apply styles dynamically for submit button.
Apply pipes and directived dynamically.
*/
