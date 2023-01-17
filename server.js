import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
// const PORT = 8000;

const configuration = new Configuration({
  apiKey: process.env.OpenAi_Api,
});
const OpenAi = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "PRINT HELLO wORLD",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await OpenAi.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

// app.post("/image", async (req, res) => {
//   try {
//     const prompt = req.body.prompt;

//     const response = await OpenAi.createImage({
//       prompt: `${prompt}`,
//       n: 1,
//       size: "1024x1024",
//     });
//     image_url = response.data.data[0].url;
//     res.status(200).send({
//       bot: image_url,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ error });
//   }
// });

app.listen(process.env.PORT || PORT, () =>
  console.log(`server is running on ${PORT}`)
);
