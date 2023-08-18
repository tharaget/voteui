import {Candidate} from "./candidate";

export interface Portfolio {
  id: number,
   name: String,
   description:String,
   type:string,
    candidates:Candidate[],
}
