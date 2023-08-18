import {Candidate} from "./candidate";
import {Voter} from "./voter";

export interface CastedVote {
  id:number,
  candidate: Candidate,
  voter: Voter
}
