import 'package:flutter/material.dart';

class Chien {
   Object id;
   String nameChien, gender,color,image,description;
   int age,idchien;
   bool state;
  
    Chien(this.id, this.nameChien, this.gender,
    this.color,
     this.image,
    this.description,
    //this.isFavourite = false,
     this.age,
     this.idchien,
    this.state,
  );
 // final bool isFavourite, isPopular;
/*
  Product({
    required this.id,
    required this.images,
    required this.colors,
    this.rating = 0.0,
    this.isFavourite = false,
    this.isPopular = false,
    required this.title,
    required this.price,
    required this.description,
  });*/
factory Chien.fromJson(Map<String, dynamic> json) {
    return Chien (json["_id"], json["nameChien"], json["gender"], 
                 json["color"],json["image"],json["description"],json["age"],json["idchien"],
                 json["state"]);
  }
}

// Our demo Products
/*
List<Product> demoProducts = [
  Product(
    id: 1,
    images: [
      "assets/images/eva.jpg",
      "assets/images/eva1.jpg",
      "assets/images/eva2.jpg",
      "assets/images/eva3.jpg",
    ],
    colors: [
      Color(0xFFF6625E),
      Color(0xFF836DB8),
      Color(0xFFDECB9C),
      Colors.white,
    ],
    title: "Jacky",
    price: 64.99,
    description: description,
    rating: 4.8,
    isFavourite: true,
    isPopular: true,
  ),
  Product(
    id: 2,
    images: [
      "assets/images/chhien.jpg",
    ],
    colors: [
      Color(0xFFF6625E),
      Color(0xFF836DB8),
      Color(0xFFDECB9C),
      Colors.white,
    ],
    title: "Tommy",
    price: 50.5,
    description: description,
    rating: 4.1,
    isPopular: true,
  ),
  Product(
    id: 3,
    images: [
      "assets/images/sammy.jpg",
    ],
    colors: [
      Color(0xFFF6625E),
      Color(0xFF836DB8),
      Color(0xFFDECB9C),
      Colors.white,
    ],
    title: "Glow",
    price: 36.55,
    description: description,
    rating: 4.1,
    isFavourite: true,
    isPopular: true,
  ),
  Product(
    id: 4,
    images: [
      "assets/images/tommy.jpg",
    ],
    colors: [
      Color(0xFFF6625E),
      Color(0xFF836DB8),
      Color(0xFFDECB9C),
      Colors.white,
    ],
    title: "summer",
    price: 20.20,
    description: description,
    rating: 4.1,
    isFavourite: true,
  ),
];
*/
const String description =
    "This dog is very easy and lovely with children, he is is very very calm and protective of its owner …";
