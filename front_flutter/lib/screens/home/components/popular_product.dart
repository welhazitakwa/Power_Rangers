// ignore_for_file: avoid_print

import 'dart:convert';
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:shop_app/components/product_card.dart';
import 'package:shop_app/models/Chien.dart';
import 'package:http/http.dart' as http;
import 'package:shop_app/screens/home/components/section_title.dart';

import '../../../components/default_button.dart';
import '../../../components/rounded_icon_btn.dart';
import '../../../size_config.dart';
import '../../details/components/custom_app_bar.dart';

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
    Response response = await Dio().get('http://192.168.1.13:8090/chiens');
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
            child: SectionTitle(title: "List Of Dogs", press: () {}),
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
                              subtitle: Text("age: "+snapshort.data![index].age.toString()),
                               onTap: () {

                          
                          Navigator.push(context,MaterialPageRoute(builder: (context) => SecondWidget(p1 : snapshort.data![index].id)),);
                          
                        }
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

class SecondWidget extends StatelessWidget {
     Object p1;
     
    
     SecondWidget({this.p1= 0 });
     
       get index => 0;
     
     
  @override
  Widget build(BuildContext context) {
    return (MaterialApp(
      debugShowCheckedModeBanner: false,
      
        home: Scaffold(

            body: Container(
              child: Container(
                margin: EdgeInsets.all(16.0),
                    padding: EdgeInsets.all(16.0),
                    decoration: BoxDecoration(
                        color: Color.fromARGB(255, 255, 255, 255),
                        border: Border.all(),
                        borderRadius: BorderRadius.all(Radius.circular(3.0))),








                        
              
              /*child:Column(mainAxisSize: MainAxisSize.min,
        children: [Row(children: [
          Image.network(snapshort.data![p1].image, width: 220,height: 140,)
          //Image.asset("assets/${dogList[p1].image}", width: 220,height: 140,),
         /* Text(dogList[p1].name, style: TextStyle(color: Color.fromARGB(255, 44, 5, 182)),)*/],
          ),
          
            Padding(
                          padding: EdgeInsets.symmetric(
                            vertical: 16.0,
                            horizontal: 0,
                          ),
                         /* child: Text(dogList[p1].description,
                             
                              style: TextStyle(color: Color.fromARGB(255, 0, 0, 0)))*/),
                         
        ])*/

        child:
              FutureBuilder<List<Chien>>(
            future: fetchchiens(),
            builder: (context, snapshort) {
              return Container(
               // height: 40,
                     //margin: const EdgeInsets.all(10),
                      //color: const Color(0xFFF5F6F9),
                      //shadowColor: Colors.blueGrey,
                      //elevation: 10,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          
                          Text("    "),
                         Image.network(snapshort.data![index].image,width: 400,height: 200,fit: BoxFit.contain),
                         Text("    "),
Padding(
          padding:
              EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
          child: Text(
            snapshort.data![index].nameChien,
            style: Theme.of(context).textTheme.headline6,
          ),
        ),
        
        Padding(
          padding: EdgeInsets.only(
            left: getProportionateScreenWidth(20),
            right: getProportionateScreenWidth(64),
          ),
          child: Text(
            snapshort.data![index].description,
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
                  "Age: "+ snapshort.data![index].age.toString(),
                  style: TextStyle(
                      fontWeight: FontWeight.w600, color: Color(0xFFFF7643)),
                ),
                SizedBox(width: 5),
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
            child:GestureDetector(
              onTap: () {
                /*AlertDialog(title: Text("envoyer?"),content: Text("Do you accept?"),
                actions: [
                  CupertinoDialogAction(child: Text("no"),),
                  CupertinoDialogAction(child: Text("yes"),),
                ]
      
                );*/
              },
            child: Container(padding: EdgeInsets.all(10),
            decoration: BoxDecoration(color: Color(0xFFFF7643),
            borderRadius: BorderRadius.circular(9),
            ),
            child: Center(child: Text('envoyer demande',
            style: TextStyle(color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 13),
            ),
            ),
            ),
            )
            ),

                        ],
   
                      ),

      padding:  EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(20)),
      
      
      
      //width: getProportionateScreenWidth(5),
        
     /* decoration: BoxDecoration(
        color: Color.fromARGB(255, 0, 0, 0),
        border:
            Border.all(color: true ? Color(0xFFFF7643) : Colors.transparent),
        
        shape: BoxShape.circle,
        
        
      ),*/
      
      /*child: DecoratedBox(
        decoration: BoxDecoration(
          color: Color.fromARGB(255, 0, 0, 0),
          shape: BoxShape.circle,
        ),
      ),*/
                      
                    ); 
                      


                   /*  },
                )
                );*/

            }
              ),

             /* ),*/

                )
                
          )
        )
    )
      );
  }
  }

/*


  class ColorDot extends StatelessWidget {
  const ColorDot({
    Key? key,
    required this.color,
    this.isSelected = false,
  }) : super(key: key);

  final Color color;
  final bool isSelected;
  
  get kPrimaryColor => null;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(right: 2),
      padding: EdgeInsets.all(getProportionateScreenWidth(8)),
      height: getProportionateScreenWidth(40),
      width: getProportionateScreenWidth(40),
      decoration: BoxDecoration(
        color: Colors.transparent,
        border:
            Border.all(color: isSelected ? kPrimaryColor : Colors.transparent),
        shape: BoxShape.circle,
      ),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: color,
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}

*/

              


























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