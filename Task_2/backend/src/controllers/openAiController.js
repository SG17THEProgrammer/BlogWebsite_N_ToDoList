// const  {Configuration , OpenAIApi} = require( 'openai') ; 

// const configuration = new Configuration({apiKey:process.env.OPENAI_API})

// const openai = new OpenAIApi(configuration)

// const generateAnswerUsingAi=async(req,res)=>{
//     try {
//         // console.log(req.body) 
//         const {msg} = req.body.msg ; 
//         // const msg = 
//         const response = await openai.createCompletion({
//             model:'text-davinci-003' , 
//             prompt:msg,
//             temperature:0.7 , 
//             max_tokens:256,
//             top_p:1,
//             frequency_penalty:0,
//             presense_penalty:0,
//         })
//         console.log(response)

//         // return res.status(200).json(response.data.choices[0].text)

//     } catch (error) {
//         console.log(error)
//         res.status(500).send('Internal Server Error');
//     }
// }


const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const generateAnswerUsingAi = async (req, res) => {
  try {
    msg = `${title} Generate a blog content for this topic in simple text format`

    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });

    const response = await chatSession.sendMessage(msg);

    return res.status(200).json(response.response.text())

  }
  catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error');

  }
}



module.exports = { generateAnswerUsingAi }