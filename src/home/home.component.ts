import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { PlayYoutubeVideoComponent } from './play-youtube-video/play-youtube-video.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides = [
    {
      url: '../assets/carousel_2.jpg'
    },
    {
      url: '../assets/carousel_1.JPG'
    },{
      url: '../assets/carousel_3.jpg'
    } 
    // },{
    //   url: '../assets/carousel_5.jpg'
    // },{
    //   url: '../assets/carousel_6.jpg'
    // },{
    //   url: '../assets/carousel_7.jpg'
    // },{
    //   url: '../assets/carousel_8.jpg'
    // },{
    //   url:'../assets/focus_img.jpg'
    // }
  ]
   
  public safeURL: SafeResourceUrl;
  innerWidth: number;
  deleteDialog: any;
  constructor(private _sanitizer: DomSanitizer , public dialog:MatDialog) { 
  this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/ROOzqAZGj_k');
  }
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  playYoutubeVideo() {
    const dialogConfig = this.dialog.open(PlayYoutubeVideoComponent)
    dialogConfig.disableClose = false;
    

    // let relativeWidth = (this.innerWidth * 80) / 100; // take up to 80% of the screen size
    // if (this.innerWidth > 1500) {
    //   relativeWidth = (1500 * 80 ) / 100;
    // } else {
    //   relativeWidth = (this.innerWidth * 80 ) / 100;
    // }

    // const relativeHeight = (relativeWidth * 9) / 16 + 120; // 16:9 to which we add 120 px for the dialog action buttons ("close")
    // dialogConfig. = relativeWidth + 'px';
    // dialogConfig.height = relativeHeight + 'px';

     

    dialogConfig.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });  }



}

 