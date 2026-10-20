export interface SkillGroup {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming',
    items: ['Python', 'JavaScript', 'Basic Java'],
  },
  {
    title: 'Frontend & backend',
    items: ['HTML', 'CSS', 'React.js', 'Node.js', 'Express.js'],
  },
  {
    title: 'Testing & APIs',
    items: [
      'Functional testing',
      'Regression testing',
      'REST APIs',
      'Postman',
      'Debugging',
      'Issue reproduction',
      'Validation',
    ],
  },
  {
    title: 'Databases',
    items: ['SQL', 'DBMS', 'MongoDB'],
  },
  {
    title: 'Data tools',
    items: ['Microsoft Excel', 'Power BI'],
  },
  {
    title: 'Tools & systems',
    items: ['Git', 'GitHub', 'Basic Linux', 'Microsoft Office'],
  },
  {
    title: 'AI / ML',
    items: [
      'PyTorch',
      'Hugging Face Transformers',
      'Vision transformers',
      'RAG pipelines · LangChain, ChromaDB',
      'LLM training fundamentals',
    ],
  },
]
