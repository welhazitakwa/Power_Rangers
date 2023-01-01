class Adoption {
  final int idUser, idDog;
  final int age;
  double weight, price;
  String nameUser,
      municpalite,
      email,
      imageUser,
      gender,
      nameDog,
      color,
      imageDog,
      categoryID,
      status,
      password,
      description,
      state;

  Adoption(
      {required this.idUser,
      required this.idDog,
      required this.age,
      required this.weight,
      required this.nameUser,
      required this.municpalite,
      required this.email,
      required this.imageUser,
      required this.gender,
      required this.nameDog,
      required this.color,
      required this.imageDog,
      required this.categoryID,
      required this.status,
      required this.price,
      required this.password,
      required this.description,
      required this.state});

  factory Adoption.fromJson(Map<String, dynamic> json) {
    return Adoption(
      idUser: json['idUser'],
      email: json['email'],
      nameUser: json['nameUser'],
      password: json['password'],
      imageUser: json['imageUser'],
      municpalite: json['municpalite'],
      idDog: json['idDog'],
      gender: json['gender'],
      nameDog: json['nameDog'],
      color: json['color'],
      description: json['description'],
      weight: json['weight'],
      price: json['price'],
      state: json['state'],
      imageDog: json['imageDog'],
      age: json['age'],
      categoryID: json['categoryID'],
      status: json['status'],
    );
  }
}
