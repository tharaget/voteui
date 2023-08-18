import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {VotingService} from "../voting.service";
import {Ballotally} from "../ballotally";
import {Portfolio} from "../portfolio";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  portfolio : any | undefined;

  ballotForm = this.fb.group({
    vote1: ['',Validators.required ],
    vote2: ['',Validators.required ]
  });

  constructor(private votingService: VotingService,
              private fb : FormBuilder,
              private route:Router) {

              }

  ngOnInit()
  {
      let text:any = localStorage.getItem("voter");
      let voter : any = JSON.parse(text);

      if( voter.roles === "Voter" )
      {
          this.route.navigate(['/vote'])
      }

      this.votingService.candidateHttp(voter).subscribe( portfolioData =>{
                      this.portfolio = portfolioData;
                  },
                  error =>
                  {
                      alert( 'can not connect to API');
                  }
            );
  }


  insertCycle()
  {
      this.votingService.createCycleHttp().
      subscribe( portfolioData =>{
               window.location.reload();
           },
           error =>
           {
               alert( 'can not connect to API');
           });
  }

  deleteCycle()
  {
        this.votingService.deleteCycleHttp().
        subscribe( portfolioData =>{
                 window.location.reload();
             },
             error =>
             {
                 alert( 'can not connect to API');
             });

  }


  logout()
  {
      localStorage.removeItem("voter");
      this.route.navigate(['/login']);
  }
}
