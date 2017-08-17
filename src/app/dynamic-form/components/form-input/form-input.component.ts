import { Component, ViewContainerRef, Output, EventEmitter, DoCheck, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { DynamicFormService } from '../../service/dynamic-form.service';

@Component({
  selector: 'form-input',
  styleUrls: ['form-input.component.css'],
  templateUrl: 'form-input.component.html'
})
export class FormInputComponent implements Field {
  errorMessage = false;
  config: FieldConfig;
  group: FormGroup;
  constructor(private dynamicFormService: DynamicFormService) {}
  onFocus() {
      console.log('OnFocus from Input component', this.group.get(this.config.name).value );
      this.dynamicFormService.inputEventValues.next(this.group.get(this.config.name).value);
  }
  onBlur(value) {
    console.log('OnBlur from Input component', this.group.get('name').value);
    console.log('OnBlur from input component VALID? ', this.group.get(this.config.name).valid
                                                       && this.group.get(this.config.name).touched);
    this.dynamicFormService.inputEventValues
      .next(this.group.get(this.config.name).value);
  }
}
