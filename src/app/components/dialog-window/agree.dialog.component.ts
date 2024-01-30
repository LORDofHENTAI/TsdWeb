import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-agree-dialog',
    templateUrl: './agree.dialog.component.html',
    styleUrls: ['./agree.dialog.component.scss']
})
export class AgreeDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<AgreeDialogComponent>,
    ) { }
    closeDialog(element: string) {
        this.dialogRef.close(element)
    }
}