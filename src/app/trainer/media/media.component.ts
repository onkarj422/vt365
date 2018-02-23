import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProgressHttp } from "angular-progress-http";
import * as $ from 'jquery';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  @ViewChild('video') video_el: ElementRef;
  @ViewChild('progress') progress_el: ElementRef;
  @ViewChild('canvasel') canvas_elem: ElementRef;
  @ViewChild('videoel') videoel: ElementRef;
  @ViewChild('imageuri') imageur: ElementRef;
  public context: CanvasRenderingContext2D;
  uploading: boolean = false;
  uploadProgress: number;
  thumbnail;

  constructor(private http: ProgressHttp, private sessionStore: SessionStorageService) { }

  onSubmitVideo() {
  	console.log(this.video_el.nativeElement.files[0]);
  	let url = "http://localhost:4200/api/upload_video.php";
  	let video = this.videoel.nativeElement as HTMLVideoElement;
  	let canvas = this.canvas_elem.nativeElement as HTMLCanvasElement;
  	this.context = canvas.getContext('2d');
  	let _context = this.context;
	  let snapshot;
    let dataURI;
    const formData = new FormData();
	  video.src = URL.createObjectURL(this.video_el.nativeElement.files[0]);
    video.addEventListener('loadedmetadata', function() {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    });
	  video.onloadeddata = function() {
      _context.drawImage(video, 0, 0);
      dataURI = canvas.toDataURL('image/png');
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      snapshot = new Blob([new Uint8Array(array)], {type: 'image/png'});
      formData.append('thumbnail', snapshot );
      video.remove();
      canvas.remove();
	  }
  	formData.append('video', this.video_el.nativeElement.files[0], this.video_el.nativeElement.files[0].name);
    formData.append('trainerid', this.sessionStore.retrieve('currentUserData').trainerid);
    let headers: Headers = new Headers();
    let options = new RequestOptions({ headers: headers });
  	this.http
  		.withUploadProgressListener(progress => { 
  			this.uploading = true;
        this.uploadProgress = progress.percentage;
        if (progress.percentage == 100) {
          this.uploading = false;
        }
      })
  		.post(url, formData, options)
  		.subscribe((response) => {
  			console.log(response);
  		});
  }

  ngOnInit() {
  }

}
