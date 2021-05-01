import {AfterViewChecked, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn} from '@angular/forms';


@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.css', './login-input.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoginInputComponent),
      multi: true
    }
  ]
})
export class LoginInputComponent implements OnInit {
  @Input('phone') isShowingPhone: boolean = false
  @Input('validators') validators: ValidatorFn[] = []
  value: string = ''
  inputForm: FormGroup = new FormGroup({})

  constructor() {
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      'input': new FormControl('', this.validators)
    })
  }

  update(): void {
    this.value = this.inputForm.value.input;
    this.onChange(this.value);
  }
}
