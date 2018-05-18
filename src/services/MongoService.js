import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema({
  token: String,
});

const Token = mongoose.model('Token', tokenSchema);

export const connectMongo = async (success, failure) => {
  await mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test')
    .then(success)
    .catch(failure);
};

export const dropAllTokens = async () => {
  return Token.remove({});
};

export const insertToken = (token) => {
  const newToken = new Token({ token });
  return newToken.save();
};
