// import mongoose from 'mongoose';

// const MONGODB_URI ="mongodb+srv://khamars_db_user:VtUj32WLVTtztoZi@cluster0.uvao32s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// export async function dbConnect() {
//   if (mongoose.connection.readyState >= 1) return; 
//   await mongoose.connect(MONGODB_URI);
// }

import mongoose from 'mongoose';

const MONGODB_URI =
  'mongodb+srv://khamars_db_user:VtUj32WLVTtztoZi@cluster0.uvao32s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export async function dbConnect() {
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connection established');
  } catch (err) {
    console.error('MongoDB connection error:', err)
  }
}
