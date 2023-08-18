
export interface Candidates{
  name: string,
  affiliation: string,
  photo: string,
  votes: number,
  studentNo: number,
}
export interface Ballotally {

  position: string,
  candidates: Candidates[],
}

