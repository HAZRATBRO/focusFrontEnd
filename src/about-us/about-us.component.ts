import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
   
  public safeURL: SafeResourceUrl;
constructor(private _sanitizer: DomSanitizer) { 
this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/ROOzqAZGj_k');
}
  ngOnInit(): void {
  }

}
