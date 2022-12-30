export class Dog {

  constructor
  (
    public id: number,
    public color: String,
    public description: String,
    public gender: String,
    public price: number,
    public state: String,
    public weight: number,
    public name: String,
    public image: String,
    public age: number,
    public categoryID: String
  ) {
  }
}

interface category {
  nomCategory: String
}
