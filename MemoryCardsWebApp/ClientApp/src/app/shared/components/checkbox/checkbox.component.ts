import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

  @Input('checked') isChecked: boolean = false

  constructor() {
  }


  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  writeValue(isChecked: boolean): void {
    this.isChecked = isChecked
    this.onChange(isChecked)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
    this.isChecked = !!this.isChecked
    this.onChange(this.isChecked)
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  ngOnInit(): void {
  }

  update(): void {
    this.isChecked = !this.isChecked
    this.onChange(this.isChecked)
  }

}
