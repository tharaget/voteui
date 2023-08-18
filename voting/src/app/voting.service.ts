import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Candidates} from "./ballotally";
import {VoteComponent} from "./vote/vote.component";
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private http: HttpClient) { }

  candidateHttp( voter : any )
  {
    const urlLogin = "https://ictspring-vote.azuremicroservices.io/api/candidates/portfolios";
    const headers = { 'Authorization': 'Basic '+this.getAuthorizationBase64(voter),'Content-Type':'application/json'};
    return this.http.post<any>( urlLogin,voter, {headers});
  }

  castVoteHttp(  castedVotedDTO : any )
  {
    let text:any = localStorage.getItem("voter");
    let voter : any = JSON.parse(text);

    const urlLogin = "https://ictspring-vote.azuremicroservices.io/api/vote/casting";
    const headers = { 'Authorization': 'Basic '+this.getAuthorizationBase64(voter),'Content-Type':'application/json'};
    return this.http.post<any>( urlLogin, castedVotedDTO ,{headers});
  }


  getAuthorizationBase64( voter : any )
  {
     let originalString = voter.studentNumber+":"+voter.password;
     let bufferObj = Buffer.from(originalString, "utf8");

     return bufferObj.toString("base64");;
  }


}
