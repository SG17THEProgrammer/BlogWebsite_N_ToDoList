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

const generateAnswerUsingAi=async(req,res)=>{
    try {
        // console.log(req.body)
        const {title , purpose , tags , story} = req.body;
        const tagsString = tags.join(',');

        if(purpose =='forStory'){
            // msg = `Create a blog story in less than 500 characters(not words) where the title is '${title}' and the tags are '${tagsString}'. The answer should be in a clean paragraph format . The story should focus on using these tags appropriately.Also do not add title in the response. The paragraph should be professional.`;
            // msg = `Create a blog story in markdown between 200-500 characters with title '${title}' and keywords '${tagsString}'.Do not specify title and tagString in the response explicitly`
            msg = `Generate a blog story in simple text form between 200-500 characters on '${title}. Use h5 tag no greater than that and do not specify it`
        }

        else if(purpose == 'forDescription'){
            // msg = `Create a long blog description more than 1500 characters and less than 2000 characters where title is '${title}' ,  tags are '${tagsString}' and story is '${story} .  The description should focus on using these tags an story appropriately.Also to make it professional make the important things bold , italic use styles . Also can use indentation,bullets. Basically show creativity and make it look professional . Also make it like a blog where we have starting , main body and then conclusion . But do not mention then explicity. Make sure to change paragraphs (important) at every required position. Directly give answer without mentioning that here is the blog ` 
            // msg = `Create a blog description in markdown between 1500-2000 characters with title '${title}', tags '${tagsString}', and story '${story}'. Use these tags and story creatively, making key points bold or italic. Structure it professionally with paragraphs, bullets, and indentation where needed. Avoid mentioning the structure explicitly, and ensure the content flows naturally with a clear beginning, body, and conclusion. Do not write tags at last `;
            msg = `Generate a detailed blog in simple text form between 1500-2000 characters on '${title} and ${story}. Use h5 tag nothing greater than that and do not specify it`;

        }
        const chatSession = model.startChat({
            generationConfig,
            history: [
            ],
          });
        
          const response = await chatSession.sendMessage(msg);

          return res.status(200).json(response.response.text() )

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');

    }
}



module.exports = {generateAnswerUsingAi}