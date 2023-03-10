import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{
  validateForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
      gender: [null, [Validators.required]],
    });
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.validateForm.value.confirmPassword = this.validateForm.value.password
      this.apiService.createUser(this.validateForm.value).subscribe((res : any) => {
        this.router.navigate(["users/list"]).then(r => {})
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
