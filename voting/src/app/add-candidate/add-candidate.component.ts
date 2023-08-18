import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Candidates} from "../ballotally";
import {Portfolio} from "../portfolio";
import {VoteComponent} from "../vote/vote.component";

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {

  candidatesPortfolio : Portfolio[]| undefined;

  addForm = this.fb.group({
    name: ['',Validators.required ],
    studentNo: ['',Validators.required ],
    affiliation: ['',Validators.required ],
    StudentNo: ['',Validators.required ],
    image: ['',Validators.required ],
    position: ['',Validators.required ],

  });
  constructor(private voteComponent: VoteComponent,
              private fb : FormBuilder,
              private route:Router) {
  }
  ngOnInit() {
    this.candidatesPortfolio=this.voteComponent.portfolio ;
  }
onAdd(){

  //Collect candidate's details
  let name : any = this.addForm.value.name;
  let studentNo : any = this.addForm.value.StudentNo;
  let affiliation : any = this.addForm.value.affiliation;
  let position : any = this.addForm.value.position;
  let photo : any = this.addForm.value.image;
  let votes: number=0;

  //create an object to store candidate's details

  //Add candidate to database
}
}
