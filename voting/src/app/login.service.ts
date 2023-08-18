import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Voter} from "./voter";
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userid:string='';
  protected voters: Voter[] = [];
  private urlLogin = "https://ictspring-vote.azuremicroservices.io/api/vote/login";


  constructor(private http: HttpClient) {}

  login( voter : Voter )
  {
    const headers = { 'Authorization': 'Basic '+this.getAuthorizationBase64(voter),'Content-Type':'application/json'};
    return this.http.post<any>( this.urlLogin, voter, {headers});
  }

  getAuthorizationBase64( voter : any )
  {
     let originalString = voter.studentNumber+":"+voter.password;
     let bufferObj = Buffer.from(originalString, "utf8");

     return bufferObj.toString("base64");
  }

}
