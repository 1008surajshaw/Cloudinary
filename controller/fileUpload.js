//const { cloudinaryConnect } = require("../config/cloudinary");
const cloudinary =require("cloudinary").v2;
const File =require("../models/File");

exports.localFileUpload =async (req,res) =>{
    try{
    const file =req.files.file;
    console.log("FIle ayaga" ,file);

    let path = __dirname +"/files" +Date.now() + `.${file.name.split('.')[1]}`;//server ka path
    console.log("Path",path);

    file.mv(path ,(err) =>{
        console.log(err);
    })

    res.json({
        success:true,
        message:`Local file upload sucessfully`,
    });

    }
    catch(error){
    console.log(error);
    }
}


 function isFileTypeSupported(type,supportedType){
     return supportedType.includes(type);
 }

 async function uploadFileToCloudinary(file,folder){
    const options ={folder};

    console.log("temp file path",file.tempFilePath);

    if(quality) {

      options.quality =quality;

    }

    options.resource_type ="auto";
    
    return await cloudinary.uploader.upload(file.tempFilePath,options);
 }

exports.imageUpload =async (req,res) => {
    try{
    const {name,tags,email} =req.body;
    console.log(name,tags,email);

    const file =req.files.imagefile;
    console.log(file);

    const supportedType =["jpg" ,"jpeg" ,"png"];
    console.log("hello");
    const fileType =file.name.split('.')[1].toLowerCase();
    console.log(fileType);

    console.log("uploding to test01");
      if(!isFileTypeSupported(fileType,supportedType)) {
          return res.status(400).json({
              success:false,
              message:"file formate is not same"
          })
      }
    
    console.log("uploding to test02");
    const response = await uploadFileToCloudinary(file,"test01");
    console.log("response is ",response);
    console.log("uploding to test03");

      const fileData =await File.create({
       user,
       email,
       file,
       tags,
       imageUrl:response.secure_url,
     });
   res.json({
    success:true,
    imageUrl:response.secure_url,
    message:"image Succesfully Uploaded"
   })

    }
    catch(error){
      console.error(error);
      res.status(400).json({
        success:false,
        message:"come in catch block"
    });
    }
}

exports.videoUpload =async (req,res)=>{
    try{
      const {name,tags,email} =req.body;
      console.log(name,tags);

      const file =req.files.videofile;
      console.log(file);
      const supportedType =["mp4","mov"];
      const fileType =file.name.split('.')[1].toLowerCase();
      if(!isFileTypeSupported(fileType,supportedType)){
        return res.status(400).json({
            success:false,
            message:"video can not upload"
        })
      }

      const response =await uploadFileToCloudinary(file,"test01");
      const fileData =await File.create({
        name, 
        tags,
        email,
        videoUrl:response.secure_url,
      })
      res.json({
        success:true,
        videoUrl:response.secure_url,
        message:"vide upload sucessfully"
      })
    }
    catch(err){
       console.error(err);
       console.log(err);
       res.status(400).json({
        success:false,
        message:"come in catch block"
    });
    }
}

exports.imageSizeReducer =async (req,res) =>{
 try{
  const {name,tags,email} =req.body;
  console.log(name,tags,email);

  const file =req.files.imageFile;

  const supportedType =["jpg","png","jpeg"];
  const fileType =file.name.split('.')[1].toLowerCase();

  if(!isFileTypeSupported(fileType,supportedType)){
    return res.status(400).json({
      success:false,
      message:'File format not supported',
  })
  
  

}
console.log("uploading to cloudhelp");

  const response =await uploadFileToCloudinary(file,"test01",90);

  const filedata =await File.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url,
  });
  res.json({
    sucess:true,
    imageUrl:response.secure_url,
    message:"Image successfully added",
  })
 }
 catch(err){
   console.error(err);
   res.status(400).json({
    success:false,
    message:'something went wrong'
   })
 }
}