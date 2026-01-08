import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export const rewriteBlog = async (userContent, competitors, title) => {

    const prompt = `
You are a senior SEO strategist and professional content writer with expertise in ranking long-form articles on Google.

PRIMARY TARGET TITLE:
"${title}"

USER'S ORIGINAL BLOG CONTENT (for improvement, not rewriting sentence-by-sentence):
${userContent.substring(0, 12000)}

COMPETITOR CONTENT (for gap analysis and inspiration only — DO NOT COPY OR PARAPHRASE):
${competitors.join("\n\n")}

CONTENT GOALS:
- Create a high-quality, authoritative, and professional blog post
- Improve topical depth, clarity, and usefulness
- Fully satisfy search intent for the target keyword


WRITING & STRUCTURE REQUIREMENTS:
- Use a clear, logical structure with proper headings (use h5 only if using heading tags)
- Include an engaging introduction and a strong conclusion
- Use short paragraphs, bullet points, and examples where helpful
- Maintain a confident, professional, and neutral tone
- Avoid fluff, filler, and generic statements

SEO REQUIREMENTS:
- Naturally include the target keyword and close semantic variations
- Optimize for featured snippets where possible
- Write a compelling meta title (50-60 chars)
- Write a persuasive meta description (140-160 chars)
- Generate an SEO-friendly slug
- Ensure content length is appropriate for ranking (generally 1,200-2,000 words unless unnecessary)

ORIGINALITY & QUALITY RULES:
- Do NOT copy or closely paraphrase competitor content
- Do NOT invent statistics or studies
- If mentioning trends or data, keep them high-level and credible
- Ensure the content is 100% original and plagiarism-safe

OUTPUT RULES (CRITICAL):
Return the response in this EXACT format.
===METADATA_JSON===
{
  "title": "",
  "metaTitle": "",
  "metaDescription": "",
  "slug": "",
}

===HTML_CONTENT===
Valid HTML only. No JSON here.

Sample output is given below:
" <p>Are you constantly juggling a hectic schedule and feel like you’re sacrificing your well-being for the sake of time? It's a common struggle in our fast-paced world, where grabbing whatever's convenient often takes precedence over what’s actually good for us. The good news is that you <em>don't</em> have to choose between speed and nourishment. There are ways to enjoy <em>delicious</em> and <em>healthy</em> food, even when you're pressed for time.</p><p>The key? Finding those <em>instant</em> options that are both satisfying and beneficial. Many of us imagine that quick meals are synonymous with processed junk, but that’s simply not true. <strong>Thinking beyond the usual suspects can lead to surprisingly delightful and wholesome choices.</strong> Let's be honest, convenience is king, and that's why exploring easy-to-make, nutritious meals is essential.</p><p>One such powerhouse of ease and nutrition is <strong>instant oatmeal with berries</strong>. Seriously, this is a game-changer for busy individuals. Forget lengthy meal prep sessions. This option allows you to be up and running in mere minutes. Think about it: a bowl filled with warm, hearty oatmeal, topped with the sweet burst of fresh or frozen berries. Not only is it a comforting and <em>delicious</em> start to the day (or a speedy mid-day boost), but it’s also packed with fiber, vitamins, and antioxidants. That’s a win-win!</p><p>Here’s why this simple yet mighty meal checks all the boxes:</p><ul><li><strong>Time-Saver:</strong> It truly lives up to the 'instant' label. Preparing it takes very little time, freeing up precious minutes in your day.</li><li><strong>Nutrient-Rich:</strong> Oatmeal is a fantastic source of soluble fiber, which promotes digestive health and helps you feel full longer, making it beneficial for weight management. The addition of berries introduces vital vitamins, minerals, and antioxidants, adding to the nutritional benefits and making the meal even more <strong>healthy.</strong></li><li><strong>Deliciously Satisfying:</strong> The warm, comforting texture of the oatmeal, combined with the sweetness of the berries, makes it a truly enjoyable meal that you'll look forward to. There is also an opportunity to mix it up with a variety of berries, nuts, and seeds for variation.</li><li><strong>Easy to Customize:</strong> You can easily adjust to your preference by selecting the type of oats, quantity, the liquid of choice, and toppings that suit your palate. You might consider a dash of cinnamon or a swirl of peanut butter to elevate it further.</li></ul><p>So, the next time you find yourself short on time and hungry, bypass the temptation of less-than-ideal convenience foods. Choose instead a bowl of <em>delicious</em>, <strong>healthy</strong>, and <em>instant</em> oatmeal with berries. It's the perfect way to fuel your body efficiently, without compromising on taste or nutrition. You <em>can</em> "eat to survive" - and thrive! This is a simple reminder that nourishing your body doesn't have to be complicated or time-consuming. It can actually be quite <em>delicious</em> and effortless.</p>"

`


    const response = await groq.chat.completions.create({
        model: process.env.GROQ_MODEL, // 🔥 best for writing + SEO
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2
    });

    let raw = response.choices[0].message.content;

    // 🧹 1. Normalize output
    raw = raw.replace(/```json|```/g, "").trim();

    // 🧠 2. Split sections
    const metaSection = raw.match(/===METADATA_JSON===([\s\S]*?)===HTML_CONTENT===/);
    const htmlSection = raw.split("===HTML_CONTENT===")[1];

    if (!metaSection || !htmlSection) {
        console.error("❌ FORMAT ERROR:\n", raw);
        throw new Error("AI response format invalid");
    }

    // 🧹 3. Clean metadata JSON
    let metaRaw = metaSection[1]
        .trim()
        .replace(/[“”]/g, '"')   // smart quotes
        .replace(/[‘’]/g, "'") // smart apostrophes
    .replace(/,\s*}/g, "}")   // 👈 FIX
    .replace(/,\s*]/g, "]");  // 👈 FIX

// 🧠 4. Extract JSON object ONLY
const jsonMatch = metaRaw.match(/\{[\s\S]*\}/);
if (!jsonMatch) {
    console.error("❌ METADATA BLOCK:\n", metaRaw);
    throw new Error("Metadata JSON not found");
}

let metadata;
try {
    metadata = JSON.parse(jsonMatch[0]);
} catch (err) {
    console.error("❌ INVALID METADATA JSON:\n", jsonMatch[0]);
    throw new Error("Metadata JSON invalid");
}

return {
    ...metadata,
    content: htmlSection.trim()
};

};
