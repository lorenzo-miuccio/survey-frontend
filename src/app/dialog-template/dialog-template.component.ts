import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.css']
})
export class DialogTemplateComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { surveyTitle:string }, public dialogRef: MatDialogRef<DialogTemplateComponent>) { }


  ngOnInit(): void {

  }

}
