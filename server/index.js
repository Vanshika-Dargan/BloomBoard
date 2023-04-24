import express,{json, urlencoded} from 'express'
import mongoose from 'mongoose'
import postRoutes from './routes/post.js'
import userRoutes from './routes/auth.js'
import cors from 'cors'
import dotenv from 'dotenv'
import {OAuth2Client,UserRefreshClient} from 'google-auth-library'
const app=express();
dotenv.config();
//express parser
app.use(json({limit: "30mb", extended:true}));
app.use(urlencoded({limit: "30mb",extended: true}));
app.use(cors());



const oAuth2Client=new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage'
);

app.post('/auth/google', async (req, res) => {
  try {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    res.json(tokens);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid code" });
  }
});

app.post('/auth/google/refresh-token', async (req, res) => {
  try {
    const user = new UserRefreshClient({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: req.body.refresh_token,
    });

    const { credentials } = await user.refreshAccessToken(); // obtain new tokens
    res.json(credentials);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to refresh token" });
  }
});
app.use('/posts',postRoutes);
app.use('/user',userRoutes)





const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


