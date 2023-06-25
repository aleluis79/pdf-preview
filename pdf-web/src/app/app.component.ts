import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { RouterOutlet } from '@angular/router';
import { PdfJsViewerComponent, PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PdfJsViewerModule, HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'pdf-web';

  @ViewChild('pdfViewer') pdfViewer!: PdfJsViewerComponent;

  private http = inject(HttpClient);

  ngAfterViewInit(): void {
    this.visualizarPDF()
  }

  public visualizarPDF(): void {
    let url = "http://localhost:5042/pdf";
    this.downloadFile(url).subscribe(
        (res: any) => {
            this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
            this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
        }
    );
  }

  private downloadFile(url: string): any {
      return this.http.get(url, { responseType: 'blob' })
          .pipe(
              map((result: any) => {
                  return result;
              })
          );
  }
}
