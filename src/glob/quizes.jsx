import { reduceMaterialSubmoduleData } from "./materials/main";
import { randomLength } from "./util";

// QUIZ TEMPLATE REGISTRY
const QUIZ_TEMPLATE_REGISTRY = [
    {
        id: 0,
        format: 0,
        display_format: 0,
        load: 0,
        type: 'reverse-definition',
        templates: ['apakah yang disebut sebagai $?','$ disebut sebagai..','$ pengertian dari..','$ sebutan dari..'],
    },
    {
        id: 1,
        format: 0,
        display_format: 0,
        load: 1,
        type: 'definition',
        templates: ['$ merupakan..','$ ialah sebutan dari..','$ adalah..','apakah definisi dari $?','penjelasan dari $ ialah..'],
    },
];


// QUIZ FORMAT ANSWER LOGICS
const QUIZ_FORMAT_PROCESSOR_REGISTRY = [
    {
        id: 0,
        type: "definitive_multiple_choice",
        options_generator: ({optionsRule, template, termData, submoduleData, materialData}) => {
            const optionsData = [];
            const correctOptionIndex = randomLength(3); // PROCESSING USING OPTIONSRULES TBD
            
            // Find unrelated distractor data
            const unrelatedSubmodules = [...materialData.submoduleData];
            unrelatedSubmodules.splice(submoduleData.submoduleId,1);

            const unrelatedSubmodule = unrelatedSubmodules[randomLength(unrelatedSubmodules.length)];

            const genCorrectAnswer = () => {
                const selectTerms = template.type === 'definition' ? termData.definition : termData.name;
                return selectTerms[randomLength(selectTerms.length)];
            };
            const genIncorrectAnswer = () => {
                const distractTermData = unrelatedSubmodule.terms[randomLength(unrelatedSubmodule.terms.length)];            
                const selectTerms = template.type === 'definition' ? distractTermData.definition : distractTermData.name;
                return selectTerms[randomLength(selectTerms.length)];
            };

            for (let i = 0; i < 3; i++) { // PROCESSING USING OPTIONSRULES TBD
                optionsData.push({
                    parent_format: 0,
                    desc: correctOptionIndex === i ? genCorrectAnswer() : genIncorrectAnswer(),
                    correct: correctOptionIndex === i,
                });                
            }
            return optionsData;
        },

        is_options_correct: (optionsData) => {
            return optionsData.correct;
        },

        question_template_processor: ({templateType, templates, termData}) => {
            const selectedTemplate = templates[randomLength(templates.length)];
            
            // Select random term based on question types
            let term = termData.name;
            if (templateType === 'reverse-definition')
                term = termData.definition;

            const selectedTerm = term[randomLength(term.length)];
            return replaceQuizTemplate(selectedTemplate, [selectedTerm])
        },
    },
];


// UNKNOWN QUIZ TBD
const UNKNOWN_QUIZ_TEMPLATE = {
    id: -1,
    load: -1,
    format: -1,
    type: 'unknown',
    templates: [''],
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


export function generateQuiz(data) { // data => {material,}

    // TRUE & FALSE, MATCHING QUESTION FORMAT TBD

    // RANDOMIZATION TBD
    const reducedMaterialSubmodules = reduceMaterialSubmoduleData(data.material)
    
    const selectedTemplate = getQuizTemplateByIndex(randomLength(getAllQuizTemplates().length));
    const selectedSubmoduleData = reducedMaterialSubmodules.terms[randomLength(reducedMaterialSubmodules.terms.length)];
    const selectedTermData = selectedSubmoduleData.data[randomLength(selectedSubmoduleData.data.length)];
    

    // Process selected question
    const processor = getQuizFormatProcessorByFormatIndex(selectedTemplate.format);

    const optionsData = processor.options_generator({
        template: selectedTemplate, 
        termData: selectedTermData,
        submoduleData: selectedSubmoduleData,
        materialData: data.material,
    });
    const questionString = processor.question_template_processor({
        templateType: selectedTemplate.type, 
        templates: selectedTemplate.templates, 
        termData: selectedTermData,
    });

    return {
        questionData: selectedTemplate,
        questionString: questionString,
        options: optionsData,
        processor: processor,
        material: selectedSubmoduleData,
    }
}