import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { BasicInputComponent } from 'app/shared/components/basic-input/basic-input.component';
import { AuthMode } from '../../types/enums/AuthMode.enum';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PASSWORD_REGEXP } from '../../constants/passwordRegex';

@Component({
  selector: 'auth-login-panel',
  standalone: true,
  imports: [
    BasicInputComponent,
    NgClass,
    NgFor,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-panel.component.html',
  styleUrl: './login-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginPanelComponent implements OnInit {
  protected selectedAuthMode = signal(AuthMode.LOGIN);
  protected readonly authModes = AuthMode;
  protected readonly authTabsData = [
    { mode: AuthMode.LOGIN, title: 'Login' },
    { mode: AuthMode.REGISTER, title: 'Register' },
  ];

  protected authForm: FormGroup;

  protected switchMode(mode: AuthMode) {
    this.selectedAuthMode.set(mode);
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.authForm = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern(PASSWORD_REGEXP),
      ]),
    });
  }
}