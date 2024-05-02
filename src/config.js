const mongoose=require('mongoose');
let connect = mongoose.connect("mongodb+srv://kunal:12345@cluster9.qtxbsfi.mongodb.net/ali");
connect.then(()=>{
    console.log("Database coneected");
})
.catch(()=>{
    console.log("Database not connected");
});
const LoginSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true

    }
});
const collection=new mongoose.model("users",LoginSchema);
module.exports=collection;

// const connectToMongoDB=async()=>{
//     try{
//         await mongoose.connect("mongodb+srv://alishaad9335:Ali@12345@cluster0.iarcazj.mongodb.net/?retryWrites=true&w=majority")
//         console.log("connected to monodb");
//     }catch(error){
//         console.log("error in mongodb");
//     }
// }
// export default connectToMongoDB



// const mongoose=require('mongoose');
// const connectToMongoDB =async()=>{
//     try{
//         await mongoose.connect("mongodb+srv://alishaad9335:Ali@12345@cluster0.3qshf2q.mongodb.net/?retryWrites=true&w=majority");
//         console.log("Connected");
//     }
//     catch(error){
//         console.log("Not Connected", error);
//     }
// }
// export default connectToMongoDB;
