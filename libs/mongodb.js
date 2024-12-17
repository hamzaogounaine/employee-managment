import mongoose from 'mongoose';


const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(process.env.MONGO_URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.log('MongoDB connection failed', error)
    }
}

export default connectMongoDb