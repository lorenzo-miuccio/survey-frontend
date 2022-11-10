export interface Survey {
  id: number,
  id_mail: String,
  category: {
    id: number,
    name:String
  },
  name: String,
  description: string,
  publish_date: Date,
  ending_date: Date
}
