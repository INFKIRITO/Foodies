const mongoose = require('mongoose');
const mongoUri = 'mongodb+srv://Foodies:53spgujm3JaoX6K3@cluster0.dcopihc.mongodb.net/FooodieMern?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected successfully');

        const fetched_data = await mongoose.connection.db.collection('food-item');
        const data = await fetched_data.find({}).toArray();
        console.log();//not looging anything
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
