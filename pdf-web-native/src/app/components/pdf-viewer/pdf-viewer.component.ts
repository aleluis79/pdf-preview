import { AfterViewInit, Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements AfterViewInit {

  @Input({ required: true })
  url!: string;

  @ViewChild('pdfViewer') pdfViewer!: ElementRef;

  private http = inject(HttpClient);

  data: any;

  ngAfterViewInit() {
    this.visualizarPDF();
  }

  private blobToBase64(blob: any) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  public visualizarPDF(): void {
    this.downloadFile(this.url).subscribe(
        (res: any) => {
          this.blobToBase64(res).then((base64: any) => {
            //console.log(base64)
            this.pdfViewer.nativeElement.src = base64;
          })
        }
    );
  }

  public downloadFile(url: string): any {
      return this.http.get(url, { responseType: 'blob' });
  }

}

