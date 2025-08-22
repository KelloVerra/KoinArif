import { getMaterials, reduceMaterialSubmoduleData } from "./materials/main";
import { capitalizeFirstLetter, randomLength } from "./util";

// QUIZ TEMPLATE REGISTRY
const QUIZ_TEMPLATE_REGISTRY = [
    {
        id: 0,
        format: 0,
        display_format: 0,
        load: 0,
        type: 'reverse-definition',
        templates: [
            'apakah yang disebut sebagai $?',
            '$ disebut sebagai..',
            '$ pengertian dari..',
            '$ sebutan dari..'
        ],
    },
    {
        id: 1,
        format: 0,
        display_format: 0,
        load: 1,
        type: 'definition',
        templates: [
            '$ merupakan..',
            '$ ialah sebutan dari..',
            '$ adalah..',
            'apakah definisi dari $?',
            'penjelasan dari $ ialah..'
        ],
    },
    {
        id: 2,
        format: 1,
        display_format: 0,
        load: 3,
        type: 'reverse-factcheck',
        templates: [
            'klik pilihan yang $!',
            'manakah opsi yang $?',
            'menurutmu opsi apa yang $?',
            'pilih opsi yang menurutmu paling $',
            'pernyataan yang paling $ ialah..'
        ],
        template_displacement: {
            'true': [
                'Benar',
                'Tepat',
                'Betul',
            ],
            'false': [
                'Salah',
                'Tidak tepat',
                'Kurang tepat',
            ]
        },
    },
    {
        id: 3,
        format: 1,
        display_format: 0,
        load: 2,
        type: 'factcheck',
        templates: [
            '$',
            'apakah $?',
            '$, apakah pernyataan tersebut tepat?',
            'tepat-kah $?',
            'betul-kah $?',
            'benarkah $?',
        ],
        option_template: {
            'true': [
                'Benar',
                'Tepat',
                'Betul',
            ],
            'false': [
                'Salah',
                'Tidak tepat',
                'Kurang tepat'
            ]
        },
    },
];


// QUIZ FORMAT ANSWER LOGICS
const QUIZ_FORMAT_PROCESSOR_REGISTRY = [
    {
        id: 0,
        type: "definitive_multiple_choice",
        options_generator: ({template, quizData, submoduleData, materialData}) => {
            const optionsData = [];
            const optionsLabel = new Set();
            const optionsCount = 3; // RANDOM OPTIONS COUNT USING QUIZDATA TBD
            const correctInd = randomLength(optionsCount);

            // Find unrelated distractor data
            const unrelatedSubmodules = [...materialData.submoduleData];
            unrelatedSubmodules.splice(submoduleData.id,1);


            const genCorrectAnswer = () => {
                const data = template.type === 'definition' ? quizData.selTermData.definition : quizData.selTermData.name;
                return capitalizeFirstLetter(data[randomLength(data.length)]);
            };
            const genIncorrectAnswer = () => {
                let unrelatedTerm = unrelatedSubmodules[randomLength(unrelatedSubmodules.length)].terms;
                unrelatedTerm = unrelatedTerm[randomLength(unrelatedTerm.length)];
                unrelatedTerm = template.type === 'definition' ? unrelatedTerm.definition : unrelatedTerm.name;
                for (let i = 0; i < unrelatedTerm.length; i++) {
                    let element = unrelatedTerm[i];
                    if (optionsLabel.has(element)) continue;
                    
                    optionsLabel.add(element);
                    return capitalizeFirstLetter(element);
                }
            };

            for (let i = 0; i < optionsCount; i++) {
                optionsData.push({
                    parent_format: 0,
                    desc: correctInd === i ? genCorrectAnswer() : genIncorrectAnswer(),
                    correct: correctInd === i,
                });                
            }
            return optionsData;
        },

        is_options_correct: (optionsData) => {
            return optionsData.correct;
        },

        question_template_processor: ({templateData, quizData}) => {
            const selectedTemplate = templateData.templates[randomLength(templateData.templates.length)];
            
            // Select random term based on question types
            let data = quizData.selTermData.name;
            if (templateData.type === 'reverse-definition')
                data = quizData.selTermData.definition;

            const selectedTerm = data[randomLength(data.length)];
            return replaceQuizTemplate(selectedTemplate, [selectedTerm])
        },
    },
    {
        id: 1,
        type: "factcheck_choice",
        options_generator: ({template, quizData, submoduleData, materialData}) => {
            const optionsData = [];
            const optionsLabel = new Set();
            const optionsCount = template.type === 'factcheck' ? 2 : 3;
            const correctInd = randomLength(optionsCount);
            const invert = quizData.selFactData.type === 'true' ? 'false' : 'true';

            // Find unrelated distractor data
            const unrelatedSubmodules = [...materialData.submoduleData];
            unrelatedSubmodules.splice(submoduleData.id,1);


            const genCorrectAnswer = () => {
                if (template.type === 'factcheck') {
                    const opt = template.option_template[quizData.selFactData.type]
                    return opt[randomLength(opt.length)]
                } else {
                    return capitalizeFirstLetter(quizData.selFactData.statement[randomLength(quizData.selFactData.statement.length)]);
                }
            };
            const genIncorrectAnswer = () => {
                if (template.type === 'factcheck') {
                    const opt = template.option_template[invert]
                    return opt[randomLength(opt.length)]
                } else {
                    const isChoosingUnrelated = randomLength(2);
                    
                    let unrelatedStatement = [''];
                    if (isChoosingUnrelated === 1) {
                        unrelatedStatement = unrelatedSubmodules[randomLength(unrelatedSubmodules.length)].facts;
                        unrelatedStatement = unrelatedStatement[invert];
                        unrelatedStatement = unrelatedStatement.sort(_=> Math.random() - 0.5);
                    } else {
                        unrelatedStatement = submoduleData.facts[invert];
                        unrelatedStatement = unrelatedStatement.sort(_=> Math.random() - 0.5);
                    }
                    for (let i = 0; i < unrelatedStatement.length; i++) {
                        let element = unrelatedStatement[i];
                        if (optionsLabel.has(element)) continue;
                        
                        optionsLabel.add(element);
                        return capitalizeFirstLetter(element);
                    }
                }
            };

            for (let i = 0; i < optionsCount; i++) {
                optionsData.push({
                    parent_format: 0,
                    desc: correctInd === i ? genCorrectAnswer() : genIncorrectAnswer(),
                    correct: correctInd === i,
                });
            }
            return optionsData;
        },

        is_options_correct: (optionsData) => {
            return optionsData.correct;
        },

        question_template_processor: ({templateData, quizData}) => {
            const selectedTemplate = templateData.templates[randomLength(templateData.templates.length)];
            
            // Select random term based on question types
            let data = ''
            if (templateData.type === 'factcheck')
                data = quizData.selFactData.statement[randomLength(quizData.selFactData.statement.length)];
            else {
                data = templateData.template_displacement[quizData.selFactData.type];
                data = data[randomLength(data.length)];
            }
            return replaceQuizTemplate(selectedTemplate, [data])
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
    if(!Object.keys(QUIZ_FORMAT_PROCESSOR_REGISTRY).includes(`${index}`)) return console.error(`ERROR WHILE OBTAINING QUIZ FORMAT PROCESSOR AT INDEX: ${index}`);

    return QUIZ_FORMAT_PROCESSOR_REGISTRY[index];
}


// UTILS
export function replaceQuizTemplate(template, replacement) {
    let val = template;
    for (let i = 0; i < replacement.length; i++)
        val = val.replace("$", replacement[i]);
    return capitalizeFirstLetter(val);
}


export function generateMaterialQuiz(material) {

    // TRUE & FALSE, MATCHING QUESTION FORMAT TBD

    // RANDOMIZATION TBD
    const reducedSubmodules = reduceMaterialSubmoduleData(material);
    
    const selectedTemplate = getQuizTemplateByIndex(randomLength(getAllQuizTemplates().length));

    const rng = randomLength(Number.MAX_SAFE_INTEGER-20);
    const selectedTerms = reducedSubmodules.terms[rng % reducedSubmodules.terms.length];
    const selectedFacts = reducedSubmodules.facts[rng % reducedSubmodules.facts.length];
    
    return generateQuiz({material:material, submodule: material.submoduleData[selectedFacts.submoduleId]}, selectedTemplate, {selTerms: selectedTerms, selFacts: selectedFacts});
}

export function generateSubmoduleQuiz(submodule) {

    // TRUE & FALSE, MATCHING QUESTION FORMAT TBD
    const selectedTemplate = getQuizTemplateByIndex(randomLength(getAllQuizTemplates().length));
    const selectedTerms = {data: submodule.terms};
    const selectedFacts = {data: submodule.facts};
    
    return generateQuiz({material:getMaterials()[submodule.materialId](), submodule: submodule}, selectedTemplate, {selTerms: selectedTerms, selFacts: selectedFacts});
}

export function generateQuiz(metadata, template, quizData) { // quizData => {selTerms, selFacts}

    const selTermData = quizData.selTerms.data[randomLength(quizData.selTerms.data.length)];

    const selFactType = randomLength(2) === 0 ? 'true' : 'false';
    const selFactData = {type: selFactType, statement: quizData.selFacts.data[selFactType]};


    const finalQuizData = {selTermData: selTermData, selFactData: selFactData};
    const processor = getQuizFormatProcessorByFormatIndex(template.format);


    const optionsData = processor.options_generator({
        template: template, 
        quizData: finalQuizData,
        submoduleData: metadata.submodule,
        materialData: metadata.material,
    });
    const questionString = processor.question_template_processor({
        templateData: template,
        quizData: finalQuizData,
    });

    return {
        questionData: template,
        questionString: questionString,
        options: optionsData,
        processor: processor,
        submodule: metadata.submodule,
    }
}