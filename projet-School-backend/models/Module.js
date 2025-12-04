import  mongoose from 'mongoose';



const courseSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true,
        trim : true
    },
    code :{
        type : String,
        required : true,
        unique : true,
        uppercase : true
    },
     Teacher:{
        type : mongoose.schema.Types.ObjectId,
        ref : 'Teacher'
     },

     Students :[{
        type : mongoose.schema.Types.objectId,
        ref :'Student'
     }],
   Credits :{
    type : Number,
    required : true,
    min :1,
    max :10
   },
     
    Description : {
        type : String,
      
    }
},{
    timestamps : true
})
export default mongoose.model('Module', courseSchema);  