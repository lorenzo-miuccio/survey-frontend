export interface Question {
  id: number,
  question: string,
  categoryId: number,
  category: {
    id: number,
    name:String
  },
  answers: Answer[]
}

interface Answer {
  id: number,
  answer: string
}
