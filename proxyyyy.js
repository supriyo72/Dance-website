const{ connect }= require('http2')

const connectDB = async () =>{
    try{
        const conn=await mongoose.connect('mongodb+srv://supriyo:supu110136@cluster0.pvwm5.mongodb.net/test',{
            useNewUrlParser: true,
            // useCreateIndex:true,
            // useFindAndModify:false,
            useUnifiedTopology:true,
        })
        console.log(`MongoDB connected successfully: ${conn.connection.host}`)
    }catch(error){
        console.log(error)
    }
}

connectDB()