import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DailogComponent, {
      // Hiermit kann man die Daten an das Dialog-Komponent geben und die Eigenschaften von Dialog eingeben z. B. Width, height usw.
      width: '600px',
      //height: '800px'
    });
  }

}
