import {Portfolio} from "./portfolio";

export interface Candidate{
  id: number,
  studentNumber: string,
  firstName: string,
  lastName: string,
  photo: object,
  votes: Candidate[],
  portfolio: Portfolio,
  voted:number,
}
