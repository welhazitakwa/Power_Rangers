// ignore_for_file: avoid_print

import 'dart:convert';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:shop_app/components/product_card.dart';
import 'package:shop_app/models/Chien.dart';
import 'package:http/http.dart' as http;

import '../../../size_config.dart';

//import 'section_title.dart';
/*

  if (response.statusCode == 200) {
    Iterable photoList = jsonDecode(response.body);
    List<Photo> photos =
        photoList.map((photojson) => Photo.fromJson(photojson)).toList();
    return photos;
    // return Photo.fromJson(jsonDecode(Response.body));
  } else {
    throw Exception(" Failed to Load photo");
  }
*/
 // List<dynamic> _chiens = [];
//Future<void> async {
    Future<List<Chien>> fetchchiens() async {
    Response response = await Dio().get('http://192.168.1.18:8090/chiens');
    return (response.data as List).map((x) => Chien.fromJson(x)).toList();
  }



/*
  var response = await http.get(Uri.parse('http://localhost:8090/chiens'));

  if (response.statusCode == 200) {
    final parsedData = jsonDecode(response.body).cast<Map<String, dynamic>>();
    _chiens = parsedData.map<Chien>((json) => Chien.fromJson(json)).toList();
  
  } else {
    throw Exception(" Failed to Load photo");
  }*/
//}

class PopularProducts extends StatelessWidget {
   Future<List<Chien>> chiens = fetchchiens();
  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Padding(
        padding:
            EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
        //child: SectionTitle(title: "New Arrivals", press: () {}),
      ),
      SizedBox(height: getProportionateScreenWidth(20)),
      SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child:
              //const Text("gggggggg"),
              //Text(chiens.toString()),
              FutureBuilder<List<Chien>>(
            future: fetchchiens(),
            builder: (context, snapshort) {
             
              if (snapshort.connectionState == ConnectionState.waiting) {
                return const Center(
                  child: CircularProgressIndicator(),
                );
              } else if (snapshort.hasData) {
               
                return Container(
                      height:600,
                      width:400,
                      child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: snapshort.data!.length,
                      itemBuilder: (context, index) {
                      return Card(
                      margin: const EdgeInsets.all(10),
                      color: const Color.fromARGB(255, 228, 221, 230),
                      shadowColor: Colors.blueGrey,
                      elevation: 10,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          ListTile(
                            

                            leading: Image.network(snapshort.data![index].image),
                            //Text(snapshort.data![index].nameChien ),
                            //
                             title: Text(snapshort.data![index].nameChien ,
                                  //snapshort.data![index].nameChien,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                  )),
                              // ignore: prefer_interpolation_to_compose_strings
                              subtitle: Text("age: "+snapshort.data![index].age.toString())
                            // snapshort.data![index].age.toString()),
                          ),
                        ],
                      ),
                    );
                  },
                ));
              } else if (snapshort.hasError) {
                if (snapshort.error.runtimeType == DioErrorType) {
                  DioError _error = snapshort.error as DioError;
                  return Text("errrroorrrr");
                }
              }
              return Text("doooogs");
            },
          ))
    ]);
  }
}
/*
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late Future<List<Chien>> chiens;

  @override
  void initState() {
    super.initState();
    chiens = fetchChien();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: FutureBuilder(
          future: chiens,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return Text("Loading...");
            }

            if (snapshot.hasData) {
              return (ListView.builder(
                itemBuilder: (context, index) {
                  return Card(
                    margin: const EdgeInsets.all(10),
                    color: const Color.fromARGB(255, 228, 221, 230),
                    shadowColor: Colors.blueGrey,
                    elevation: 10,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: <Widget>[
                        ListTile(
                          //  leading:Image.network(snapshot['image']),

                          /*FadeInImage.assetNetwork (
                            placeholder: 'assets/loading.gif',
                            image: snapshot.data![index].url,
                          )*/

                          /*Image.network(
                              snapshot.data![index].url,
                              errorBuilder: (BuildContext context,
                                  Object exception, StackTrace? stackTrace) {
                           
                            return const Text('ð¢');
                          })*/

                          title: Text(snapshot.data!['nameChien'],
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              )),
                          subtitle: Text("Album Id : " +
                              snapshot.data![index].albumId.toString()),
                        ),
                      ],
                    ),
                  );
                },
                itemCount: snapshot.data!.length,
              ));
            } else if (snapshot.hasError) {
              return const Text("erreur");
            } else {
              return const CircularProgressIndicator();
            }
          },
        ),
      ),
    );
  }
}
*/