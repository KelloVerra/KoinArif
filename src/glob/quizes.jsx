// QUIZ TEMPLATE REGISTRY
const QUIZ_TEMPLATE_REGISTRY = [
    {
        id: 0,
        format: 0,
        load: 0,
        type: 'reverse-definition',
        templates: ['apakah yang disebut sebagai $..','$ disebut juga sebagai..'],
    },
    {
        id: 1,
        format: 0,
        load: 1,
        type: 'definition',
        templates: ['$ merupakan..','$ sebutan dari..','$ adalah..'],
    },
];


// QUIZ FORMAT ANSWER LOGICS
const QUIZ_FORMAT_PROCESSOR_REGISTRY = [
    {
        id: 0,
        type: "multiple_choice",
        options_generator: ({optionsRule, questionData, termData, familiarTermData}) => {
            const optionsData = [];
            const correctOptionIndex = Math.round(Math.random() * 2); // PROCESSING USING OPTIONSRULES TBD
            
            // Remove selected & PROCESSING USING OPTIONSRULES TBD
            let distractTermData = [...familiarTermData];
            const remInd = distractTermData.indexOf(termData);
            if (remInd !== -1) 
                distractTermData.splice(remInd, 1);

            const genCorrectAnswer = () => { // PROCESSING USING OPTIONSRULES TBD
                const selectTerms = questionData.type === 'definition' ? termData.definition : termData.name;
                const rand = Math.round(Math.random() * (selectTerms.length - 1))
                return selectTerms[rand];
            };
            const genIncorrectAnswer = () => { // PROCESSING USING OPTIONSRULES TBD
                const selectTerms = questionData.type === 'definition' ? distractTermData[0].definition : distractTermData[0].name;
                const rand = Math.round(Math.random() * (selectTerms.length - 1))
                return selectTerms[rand];
            };

            optionsData.push({
                parent_format: 0,
                option: 'A',
                desc: correctOptionIndex === 0 ? genCorrectAnswer() : genIncorrectAnswer(),
                correct: correctOptionIndex === 0,
            });
            optionsData.push({
                parent_format: 0,
                option: 'B',
                desc: correctOptionIndex === 1 ? genCorrectAnswer() : genIncorrectAnswer(),
                correct: correctOptionIndex === 1,
            });
            optionsData.push({
                parent_format: 0,
                option: 'C',
                desc: correctOptionIndex === 2 ? genCorrectAnswer() : genIncorrectAnswer(),
                correct: correctOptionIndex === 2,
            });
            return optionsData;
        },
        is_options_correct: (optionsData) => {
            return optionsData.correct;
        },
        question_template_processor: ({questionType, templates, materialTermsData}) => {
            // Select random template text
            const randomTemplateIndex = Math.round(Math.random() * (templates.length-1));
            const template = templates[randomTemplateIndex];
            
            // Select random term based on question types
            let termsData = materialTermsData.name;
            if (questionType === 'reverse-definition') {
                termsData = materialTermsData.definition;
            }
            const randomTermIndex = Math.round(Math.random() * (termsData.length-1));
            const term = termsData[randomTermIndex];


            return replaceQuizTemplate(template, [term])
        },
    },
];


// UNKNOWN QUIZ TBD
const UNKNOWN_QUIZ_TEMPLATE = {
    id: -1,
    load: -1,
    format: -1,
    type: 'unknown',
    templates: ['rusak'],
};


// GET
export function getAllQuizTemplates() {
    return QUIZ_TEMPLATE_REGISTRY;
}
export function getQuizTemplateByIndex(index) {
    // Gatekeep unknown materials
    if(!Object.keys(QUIZ_TEMPLATE_REGISTRY).includes(`${index}`)) return UNKNOWN_QUIZ_TEMPLATE;

    return QUIZ_TEMPLATE_REGISTRY[index];
}
export function getQuizFormatProcessorByFormatIndex(index) {
    // Gatekeep unknown materials
    if(!Object.keys(QUIZ_FORMAT_PROCESSOR_REGISTRY).includes(`${index}`)) return console.log(`ERROR WHILE OBTAINING QUIZ FORMAT PROCESSOR AT INDEX: ${index}`);

    return QUIZ_FORMAT_PROCESSOR_REGISTRY[index];
}


// UTILS
export function replaceQuizTemplate(template, replacement) {
    let val = template;
    for (let i = 0; i < replacement.length; i++)
        val = val.replace("$", replacement[i]);
    console.log(val)
    return val;
}