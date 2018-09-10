import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductserviceService } from './productservice.service';
import { BsModalComponent } from 'ng2-bs3-modal';
import { FormControl, ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('modal_popup')
  modal_popup: BsModalComponent;
  page_number='';
  categoryArray:Array <any>=[];
  productArray:Array <any>=[];
  isCategory:boolean=false;
  isProdu:boolean=false;
  categoryData:FormGroup;
  productData:FormGroup;
  edit_category:boolean=false;
  edit_product:boolean=false;
  editCategoryData:any='';
  cat_image='';
  constructor(private pservice:ProductserviceService,private formbuilder:FormBuilder) {
    this.categoryData= this.formbuilder.group({
      'cat_name': ['', Validators.required],
      'cat_desc': ['', Validators.required],
    });
    this.productData= this.formbuilder.group({
      'prod_name': ['', Validators.required],
      'cat_id' :['0', Validators.required],
    });
    this.getAllData();
   }

  ngOnInit() {
  }
  getAllData(){
    this.pservice.get_all_data(this.page_number).subscribe(data =>{
        console.log(data.data_array.cat_list);
        this.categoryArray=data.data_array.cat_list;
        this.productArray=data.data_array.prod_list;
    });
  }
  openModel(modal_name){
    if(modal_name == 'cat'){
      this.isProdu=false;
      this.isCategory=true;
    }else{
      this.isCategory=false;
      this.isProdu=true;
    }
    // console.log(modal_name);
    this.modal_popup.open();
  }
  add_cat(formvalue){
    // console.log(formvalue);
    let array_data={
        "cat_id":"3",
        "cat_name" :formvalue.cat_name,
        "cat_desc" :formvalue.cat_desc,
        "cat_img":this.cat_image
    };
    this.categoryArray.push(array_data);
    console.log(this.categoryArray);
    // categoryArray
  }
  editCategory(id){
    // console.log();
    this.categoryArray.forEach(element =>{
      if(element.cat_id == id){
        this.editCategoryData=element;
      }
    })
    // console.log(this.editCategoryData);
    this.categoryData.controls['cat_name'].setValue(this.editCategoryData.cat_name);
    this.categoryData.controls['cat_desc'].setValue(this.editCategoryData.cat_desc);
    this.isProdu=false;
    this.isCategory=true;
    this.edit_category=true;
    this.modal_popup.open();


    // editCategoryData
  }
  update_cat(data){
    console.log(data);
  }
  add_product(data){
    console.log(data);
  }
  fileEvent($event){
    const fileSelected: File = $event.target.files[0];
   this.pservice.uploadFile(fileSelected)
   .subscribe( (response) => {
     this.cat_image=response.image_name;
      // console.log(response.image_name);
    },
     (error) => {
       console.log('set any error actions...');
     });
  }

}
