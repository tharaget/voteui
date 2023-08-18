import {Component, OnInit} from '@angular/core';
import {FormGroup,FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../login.service";
import {Router} from "@angular/router";
import {Voter} from "../voter";
import {VoteComponent} from "../vote/vote.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private sessionID:string='';

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],

  });


  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private route: Router) {
  }

  getsessionID(): string {
    return this.sessionID;
  }

  onLogin() {

    let usernameValue: any = this.loginForm.value.username;
    let passwordValue: any = this.loginForm.value.password;

    let voter: Voter = {id: 0, studentNumber: usernameValue, password: passwordValue, roles: ''};

    this.loginService.login(voter).subscribe(
      data => {
        voter = data as Voter;
        localStorage.setItem("voter", JSON.stringify(voter));
        if (voter.roles === 'Voter')
        {
          this.route.navigate(['/vote']);
        } else if (voter.roles === 'Admin')
        {
          this.route.navigate(['/admin'])
        }
      },
      error => {
        alert("Wrong username and password");
      });

  }

}
