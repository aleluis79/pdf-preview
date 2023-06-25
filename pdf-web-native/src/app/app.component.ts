import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PdfViewerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'pdf-web-native'

  private urlBase = "http://localhost:5042/"

  pdf1 = `${this.urlBase}pdf`
  pdf2 = `${this.urlBase}pdf2`

}
