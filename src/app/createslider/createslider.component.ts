import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Slider } from '../models/slider';
import { UploadService } from '../services/upload.service';
import { SliderService } from '../services/slider.service';

@Component({
  selector: 'app-createslider',
  templateUrl: './createslider.component.html',
  styleUrls: ['./createslider.component.css'],
  providers: [UploadService, SliderService]
})
export class CreatesliderComponent implements OnInit {

  public sliderForm: FormGroup;
  public slider: Slider;
  public url;
  public filesToUpload1: Array<File>;
  public filesToUpload2: Array<File>;
  public response: any;
  public success: boolean;
  public error: boolean;
  public idSlider: string;

  constructor(public fb: FormBuilder,
              private route: ActivatedRoute,
              private uploadService: UploadService,
              private sliderService: SliderService) {
      this.sliderForm = this.fb.group({
        title: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.required])],
        status: ['', Validators.compose([Validators.required])]
      });
      this.url = environment.apiBase;
      this.success = false;
      this.error = false;
  }

  ngOnInit() {
      this.idSlider = this.route.snapshot.paramMap.get('id');
      if (this.idSlider != null) {
        this.getSlider(this.idSlider);
      } else {
        this.slider = new Slider(0, '', '', '', '', false);
      }
  }

  getSlider (id) {
      this.sliderService.getSlider(id).subscribe(
            response => {
               this.response = response;
               console.log(this.response);
               if (this.response.success) {
                this.slider = this.response.data;
                this.sliderForm = this.fb.group({
                    title: [this.slider.title, Validators.compose([Validators.required])],
                    description: [this.slider.description, Validators.compose([Validators.required])],
                    status: [this.slider.status, Validators.compose([Validators.required])]
                });
               }
            },
            error => {
                console.log(error);
            }
        );
  }

  onSubmit() {
      this.success = false;
      this.error = false;
      this.slider.title = this.sliderForm.get('title').value;
      this.slider.description = this.sliderForm.get('description').value;
      this.slider.status = this.sliderForm.get('status').value;

      this.sliderService.sendFormSlider(this.slider).subscribe(
            response => {
               this.response = response;
               console.log(this.response);
               if (this.response.success) {
                this.slider = this.response.data;
                this.success = true;
               } else {
                   this.error = true;
               }
            },
            error => {
                console.log(error);
            }
        );
  }

  fileChangeEventImage(fileInput: any) {
    this.filesToUpload1 = <Array<File>>fileInput.target.files;

    if (this.slider.id > 0) {
        this.uploadService.makeFileSliderRequest('slider/saveImageSlider/', this.slider.id, 1, this.filesToUpload1, 'picture').then(
            (response: any) => {
                this.response = response;
                this.slider = this.response.data;
                console.log('Resultado --> ' + this.slider);
            },
            (error) => {
                console.log('Error');
                console.log(error);
            }
        );
    }
  }

  fileChangeEventImagePrecio(fileInput: any) {
    this.filesToUpload2 = <Array<File>>fileInput.target.files;
    if (this.slider.id > 0) {
        this.uploadService.makeFileSliderRequest('slider/saveImageSlider/', this.slider.id, 2, this.filesToUpload2, 'picture').then(
            (response: any) => {
                this.response = response;
                this.slider = this.response.data;
                console.log('Resultado --> ' + this.slider);
            },
            (error) => {
                console.log('Error');
                console.log(error);
            }
        );
    }
  }

}
