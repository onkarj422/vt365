import { Component, OnInit, ViewChild, ElementRef, Inject, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ProgressHttp } from "angular-progress-http";
import * as $ from 'jquery';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SessionStorageService } from 'ngx-webstorage';
import { HttpApiService } from '../../http-service.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MediaComponent implements OnInit, AfterViewInit {

  @ViewChild('video') video_el: ElementRef;
  @ViewChild('progress') progress_el: ElementRef;
  @ViewChild('canvasel') canvas_elem: ElementRef;
  @ViewChild('videoel') videoel: ElementRef;
  @ViewChild('imageinput') imageel: ElementRef;
  @ViewChild('img') img: ElementRef;
  uploading: boolean = false;
  uploadProgress: number;
  isNoMedia: boolean;
  thumbnail;
  isImages: boolean = true;
  isVideos: boolean = true;
  openImg: boolean = false;
  mediaVideos;
  mediaImages;

  constructor(private httpp: ProgressHttp, private sessionStore: SessionStorageService, 
    private http: Http, private apiService: HttpApiService) { 
    let __this = this;
    apiService.createMediaTable();
    apiService.getAllVideos().subscribe(data => {
      if (data.length == 0) {
        this.isVideos = false;
      } else {
        this.mediaVideos = data;
        this.sessionStore.store('mediaVideos', data);
      }
    });
    apiService.getAllImages().subscribe(data => {
      if (data.length == 0) {
        this.isImages = false;
      } else {
        this.mediaImages = data;
        this.sessionStore.store('mediaImages', data);
      }
    });
  }

  onSubmitImage() {
    let __this = this;
    let imageFile = this.imageel.nativeElement.files[0];
    const formData = new FormData();
    formData.append('image',imageFile, imageFile.name);
    formData.append('trainerid', this.sessionStore.retrieve('currentUserData').trainerid);
    setTimeout(function() {
      __this.uploadImage(formData);
    }, 3000);
  }

  onSubmitVideo() {
    let videoFile = this.video_el.nativeElement.files[0];
  	/*let video = this.videoel.nativeElement as HTMLVideoElement;
  	let canvas = this.canvas_elem.nativeElement as HTMLCanvasElement;
  	let context: CanvasRenderingContext2D = canvas.getContext('2d');
	  let snapshotURL = { 'thumbnail64': [] };
    let vid;*/
    const formData = new FormData();
    let __this = this;
    /*for (var i = 0; i < videos.length; i++) {
      vid = videos[i];
      console.log(vid);
      formData.append('video'+i, vid, vid.name);
      video.src = URL.createObjectURL(vid);
      video.addEventListener('loadedmetadata', function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.addEventListener('loadeddata', function() {
          context.drawImage(video, 0, 0);
          //formData.append('thumbnail'+i, canvas.toDataURL('image/png'));
          context.clearRect(0, 0, canvas.width, canvas.height);
        });
      });
    }*/
    formData.append('video',videoFile, videoFile.name);
    formData.append('trainerid', this.sessionStore.retrieve('currentUserData').trainerid);
    setTimeout(function() {
      __this.uploadVideo(formData);
    }, 3000);
    /*dataURI = canvas.toDataURL('image/png');
      var binary = atob(dataURI.split(',')[1]);
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      snapshot = new Blob([new Uint8Array(array)], {type: 'image/png'});*/
  }

  uploadVideo(formData) {
    let url = "./api/upload_media_video.php";
    let headers: Headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    this.httpp
      .withUploadProgressListener(progress => { 
        this.uploading = true;
        this.uploadProgress = progress.percentage;
        if (progress.percentage == 100) {
          this.uploading = false;
        }
      })
      .post(url, formData, options)
      .subscribe((response) => {
        window.location.href = window.location.href;
        console.log(response);
      });
  }

  uploadImage(formData) {
    let url = "./api/upload_media_image.php";
    let headers: Headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    this.httpp
      .withUploadProgressListener(progress => { 
        this.uploading = true;
        this.uploadProgress = progress.percentage;
        if (progress.percentage == 100) {
          this.uploading = false;
        }
      })
      .post(url, formData, options)
      .subscribe((response) => {
        window.location.href = window.location.href;
        console.log(response);
      });
  }

  ngOnInit() {
    
  }

  playVideo(i) {
    var video = document.getElementById('modal-video') as HTMLVideoElement;
    var modal = document.getElementById('video-modal-container');
    modal.style.display = "block";
    video.src = this.mediaVideos[i].videourl;
  }

  openImage(i) {
    var modal = document.getElementById('modalcontainer');
    var modalimage = document.getElementById('modalimage') as HTMLImageElement;
    modal.style.display = "block";
    modalimage.src = this.mediaImages[i].imageurl;
  }

  hideModal() {
    var modal = document.getElementById('modalcontainer');
    modal.style.display = "none";
  }

  hideVideo() {
    var modal = document.getElementById('video-modal-container');
    modal.style.display = "none";
  }

  ngAfterViewInit() {
    
  }

}
