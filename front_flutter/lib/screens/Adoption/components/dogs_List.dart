// ignore_for_file: avoid_print

import 'dart:convert';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:shop_app/components/product_card.dart';
import 'package:shop_app/constants.dart';
import 'package:shop_app/models/Adoption.dart';
import 'package:shop_app/models/Chien.dart';
import 'package:http/http.dart' as http;
import 'package:shop_app/screens/home/components/section_title.dart';

import '../../../components/default_button.dart';
import '../../../components/rounded_icon_btn.dart';
import '../../../size_config.dart';
import '../../details/components/custom_app_bar.dart';

Future<List<Adoption>> fetchchiens() async {
  /*Response response =
      await Dio().get('http://localhost:8081/dogs/Adoption/List?idUser=13');

  return (response.data as List).map((x) => Adoption.fromJson(x)).toList();*/
  final response = await http
      .get(Uri.parse('http://localhost:8081/dogs/Adoption/List?idUser=13'));

  if (response.statusCode == 200) {
    // If the call to the server was successful, parse the JSON
    List<dynamic> jsonResponse = json.decode(response.body);
    return jsonResponse.map((adoption) => Adoption.fromJson(adoption)).toList();
  } else {
    // If that call was not successful, throw an error.
    throw Exception('Failed to load photos');
  }
}

class DogsList extends StatelessWidget {
  Future<List<Adoption>> adoption = fetchchiens();
  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Padding(
        padding:
            EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
        child: SectionTitle(title: "List of dogs requested", press: () {}),
      ),
      SizedBox(height: getProportionateScreenWidth(20)),
      SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child:
              //const Text("gggggggg"),
              //Text(chiens.toString()),
              FutureBuilder<List<Adoption>>(
            future: fetchchiens(),
            builder: (context, snapshort) {
              if (snapshort.connectionState == ConnectionState.waiting) {
                return const Center(
                  child: CircularProgressIndicator(),
                );
              } else if (snapshort.hasData) {
                return Container(
                    height: 600,
                    width: 600,
                    child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: snapshort.data!.length,
                      itemBuilder: (context, index) {
                        return Card(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20.0),
                          ),
                          margin: const EdgeInsets.all(10),
                          color: const Color.fromRGBO(250, 190, 88, 1),
                          shadowColor: Color.fromARGB(255, 49, 49, 49),
                          elevation: 10,
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: <Widget>[
                              ListTile(
                                  textColor: Color.fromARGB(255, 255, 254, 254),
                                  leading: Image.network(
                                      snapshort.data![index].imageDog,
                                      width: 200,
                                      height: 200),
                                  title: Text(snapshort.data![index].nameDog,
                                      style: const TextStyle()),
                                  subtitle: Text(
                                      "Age: ${snapshort.data![index].age}"),
                                  trailing: Text(
                                    snapshort.data![index].status,
                                    style: snapshort.data![index].status ==
                                            "ADOPTED"
                                        // ignore: prefer_const_constructors
                                        ? TextStyle(
                                            // ignore: prefer_const_constructors
                                            color:
                                                Color.fromARGB(255, 49, 155, 0),
                                            fontWeight: FontWeight.bold,
                                          )
                                        : snapshort.data![index].status ==
                                                "WAITING"
                                            ? const TextStyle(
                                                // ignore: unnecessary_const
                                                color: const Color.fromARGB(
                                                    255, 0, 17, 255),
                                                fontWeight: FontWeight.bold,
                                              )
                                            : const TextStyle(
                                                color: Colors.red),
                                  ),
                                  onTap: () {
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) =>
                                              SecondWidget(p1: index)),
                                    );
                                  }),
                            ],
                          ),
                        );
                      },
                    ));
              } else if (snapshort.hasError) {
                if (snapshort.error.runtimeType == DioErrorType) {
                  DioError _error = snapshort.error as DioError;
                  return const Text("Erreur on Snapshort Dogs_List.dart");
                }
              }
              return const Text("Nothing to show  0 Results");
            },
          ))
    ]);
  }
}

class SecondWidget extends StatelessWidget {
  int p1;

  SecondWidget({this.p1 = 0});

  //get index => 0;

  @override
  Widget build(BuildContext context) {
    return (MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
            body: Container(
                child: Container(
          margin: const EdgeInsets.all(16.0),
          padding: const EdgeInsets.all(16.0),
          decoration: BoxDecoration(
              color: const Color.fromARGB(255, 255, 255, 255),
              border: Border.all(),
              borderRadius: const BorderRadius.all(Radius.circular(3.0))),
          child: FutureBuilder<List<Adoption>>(
              future: fetchchiens(),
              builder: (context, snapshort) {
                return Container(
                  // ignore: sort_child_properties_last
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      Image.network(snapshort.data![p1].imageDog,
                          width: 400, height: 200, fit: BoxFit.contain),
                      Padding(
                        padding: EdgeInsets.symmetric(
                            horizontal: getProportionateScreenWidth(20)),
                        child: Text(
                          snapshort.data![p1].nameDog,
                          style: Theme.of(context).textTheme.headline6,
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.only(
                          left: getProportionateScreenWidth(20),
                          right: getProportionateScreenWidth(64),
                        ),
                        child: Text(
                          snapshort.data![p1].description,
                          maxLines: 11,
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(
                          horizontal: getProportionateScreenWidth(20),
                          vertical: 10,
                        ),
                        child: GestureDetector(
                          onTap: () {},
                          child: Row(
                            children: [
                              Text(
                                "Age: " + snapshort.data![p1].age.toString(),
                                // ignore: prefer_const_constructors
                                style: TextStyle(
                                    fontWeight: FontWeight.w600,
                                    color: const Color(0xFFFF7643)),
                              ),
                              SizedBox(width: 5),
                              // ignore: prefer_const_constructors
                              Icon(
                                Icons.arrow_forward_ios,
                                size: 12,
                                color: Color(0xFFFF7643),
                              ),
                            ],
                          ),
                        ),
                      ),
                      Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20.0),
                          child: GestureDetector(
                            onTap: () {},
                            child: Container(
                              padding: EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: Color(0xFFFF7643),
                                borderRadius: BorderRadius.circular(9),
                              ),
                              // ignore: prefer_const_constructors
                              child: Center(
                                // ignore: prefer_const_constructors
                                child: Text(
                                  'envoyer demande',
                                  // ignore: prefer_const_constructors
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 13),
                                ),
                              ),
                            ),
                          )),
                    ],
                  ),

                  padding: EdgeInsets.symmetric(
                      horizontal: getProportionateScreenWidth(20)),
                );
              }),
        )))));
  }
}
