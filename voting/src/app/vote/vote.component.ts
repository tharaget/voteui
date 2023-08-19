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
  citizenship : any | undefined;
  isVotingOpen : boolean = false;
  isVotingClosed : boolean = false;
  constructor(private votingService: VotingService,
              private loginService: LoginService,
              private route: Router) {
  }

  ngOnInit()
  {
      let text:any = localStorage.getItem("voter");
      let voter : any = JSON.parse(text);

      if( voter.roles === "Admin" )
      {
          this.route.navigate(['/admin'])
      }

      this.citizenship = voter.southAfrican;

      this.votingService.candidateHttp(voter).subscribe( portfolioData =>{

                this.portfolio = portfolioData;

                this.updateVotedCandidates(portfolioData.portfoliosUNISU, portfolioData.votedCandidates, portfolioData.cycles);
                this.updateVotedCandidates(portfolioData.portfoliosSASUF, portfolioData.votedCandidates, portfolioData.cycles );
            },
            error =>
            {
                alert( 'can not connect to API');
            }
      );
  }

  updateVotedCandidates(portfolios : Portfolio[], candidates : Candidate[] , cycle : any )
  {
        this.isVotingOpen =  cycle === null ? true : false;
        this.isVotingClosed =  cycle === null ? false : true;

        portfolios.forEach(function(item:Portfolio) {
                     item.candidates.forEach(function(candidate:Candidate)
                     {
                          const found = candidates.find((itemCandidate:any) => {
                                return itemCandidate.id === candidate.id;
                          });
                          if( found != null )
                          {
                              candidate.voted = 1;
                          } else
                          {
                            candidate.voted = 0;
                          }
                     });
                });

  }


  onVote( portf : Portfolio, cand : Candidate) {

      let text:any = localStorage.getItem("voter");
      let vo : Voter = JSON.parse(text);

      let dto : any = {voter:vo,portfolio:portf,candidate:cand}

      this.votingService.castVoteHttp(dto).subscribe( data =>{

                this.updateVotedCandidates(this.portfolio.portfoliosUNISU,data.candidates, data.cycle);
                this.updateVotedCandidates(this.portfolio.portfoliosSASUF,data.candidates, data.cycle);

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
