import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../models/project';
import { DialogData } from '../models/dialogData';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  projects!: Project[];
  taskForm!: FormGroup;

  private newCategorySubscription!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder) { 
  }

  private subscribeToCategory(): void {
    this.newCategorySubscription = this.taskForm.get('project_id')!
      .valueChanges
      .subscribe(value => this.toggleTitleValidators(value));
  }

  toggleTitleValidators(project_id: string): void {
    const title = this.taskForm.get('title');
    const titleValidators: ValidatorFn[] = [
      Validators.required,
      Validators.maxLength(20),
    ];
    if (project_id === '0') {
      title?.setValidators(titleValidators);
    } else {
      title?.clearValidators();
    }
    title?.updateValueAndValidity();
  }

  ngOnInit() {
    this.initForm();
    this.subscribeToCategory();
  }

  ngOnDestroy() {
    this.newCategorySubscription.unsubscribe();
  }

  initForm() {
    this.taskForm = this.fb.group({
      text: [null, [
        Validators.required,
        Validators.maxLength(40),
      ]
    ],
      project_id: [null, [
        Validators.required,
      ]
    ],
      title: [null],
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
