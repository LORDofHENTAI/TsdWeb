import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnakebarService {

    constructor(private snackBar: MatSnackBar) { }

    openSnackBar(message: string, action: string, className: string = 'standart-snackbar') {
        this.snackBar.open(message, action, {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: [className]
        });
    }
}
