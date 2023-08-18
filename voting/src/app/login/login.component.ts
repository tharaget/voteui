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


  form : FormGroup = this.fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required],
    });

  user : Voter = {id: 0, studentNumber: '', password: '', roles: '', southAfrican:0};
  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private route: Router) {
  }

  onLogin() {

    let voter: Voter = {id: 0, studentNumber: this.user.studentNumber, password:this.user.password, roles: '', southAfrican:0};

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
