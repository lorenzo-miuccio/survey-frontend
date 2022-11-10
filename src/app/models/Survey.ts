export interface Survey {
  id: number,
  idMail: String,
  category: {
    id: number,
    name:String
  },
  name: String,
  description: string,
  publishDate: Date,
  ending_date: Date
}
