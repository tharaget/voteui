import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {VotingService} from "../voting.service";
import {LoginService} from "../login.service";
import {Portfolio} from "../portfolio";
import {CastedVote} from "../casted-vote";
import {LoginComponent} from "../login/login.component";
import {Candidate} from "../candidate";
import {Voter} from "../voter";



@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  portfolio : any | undefined;
  constructor(private votingService: VotingService,
              private loginService: LoginService,
              private route: Router) {
  }

  ngOnInit()
  {
        let text:any = localStorage.getItem("voter");
        let voter : any = JSON.parse(text);

      this.votingService.candidateHttp(voter).subscribe( portfolioData =>{

                this.portfolio = portfolioData;


                portfolioData.portfoliosUNISU.forEach(function(item:Portfolio)
                {
                    item.candidates.forEach(function(candidate:Candidate)
                    {
                        const found = portfolioData.votedCandidates.find((itemCandidate:any) => {
                          return itemCandidate.id === candidate.id;
                        });
                        if( found != null )
                        {
                            candidate.voted = 1;
                        }
                    });
                });

                portfolioData.portfoliosSASUF.forEach(function(item:Portfolio)
                {
                     item.candidates.forEach(function(candidate:Candidate)
                     {
                          const found = portfolioData.votedCandidates.find((itemCandidate:any) => {
                                return itemCandidate.id === candidate.id;
                          });
                          if( found != null )
                          {
                              candidate.voted = 1;
                          }
                     });
                });


            },
            error =>
            {
                alert( 'can not connect to API');
            }
      );
  }

  onVote( portf : Portfolio, cand : Candidate) {

      let text:any = localStorage.getItem("voter");
      let vo : Voter = JSON.parse(text);

      let dto : any = {voter:vo,portfolio:portf,candidate:cand}

      this.votingService.castVoteHttp(dto).subscribe( data =>{
                      window.location.reload()
                 },
                 error =>
                 {
                     alert( 'can not connect to API');
                 }
           );
  }

  logout()
  {
      localStorage.removeItem("voter");
      this.route.navigate(['/login'])
  }

}
