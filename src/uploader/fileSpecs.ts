import { Dimensions } from '../interfaces';
import mime from 'mime';
  export default class getFileSpecs{
   file:File;
   type:string;
   extension:string;
   imageDimensions:Dimensions ={
      height:0,
      width:0
   }
    constructor(file:File) {
      this.file = file 
    }

  getType:Function =():string =>{
     this.type = mime.getType(this.file.name) as string;
     return this.type;
  };
  getExtension:Function =():string =>{
      this.extension =  this.file.name.split('.').pop();
    return   this.extension;
 };
 getFileSize:Function = ():number =>{
  return this.file.size;
 }
 getDimensions =  (callbackFn:Function)=>{
   let type:string = this.getType();
   if(type.includes("image")){
      let fr = new FileReader;
   
      fr.onload = ()=> { // file is loaded
          let img = new Image; 
          img.onload = ()=> {
              this.imageDimensions.height= img.height;
              this.imageDimensions.width = img.width;
              callbackFn(  this.imageDimensions)
          };
      
          img.src = fr.result as string; // is the data URL because called with readAsDataURL
      };
      
       fr.readAsDataURL(this.file);
   }else{
      callbackFn(  this.imageDimensions) // return height 0 and width 0 if file is not an image
   }

  }
}
 
 