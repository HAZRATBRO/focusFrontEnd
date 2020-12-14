import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-play-youtube-video',
  templateUrl: './play-youtube-video.component.html',
  styleUrls: ['./play-youtube-video.component.css']
})
export class PlayYoutubeVideoComponent implements OnInit {
   
  
  safeUrl: SafeResourceUrl = 'https://www.youtube.com/embed/ROOzqAZGj_k';
  
  constructor(private _sanitizer: DomSanitizer , public dialog:MatDialog) { 
    this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/ROOzqAZGj_k');
    }

  ngOnInit() {
  }
   

}
