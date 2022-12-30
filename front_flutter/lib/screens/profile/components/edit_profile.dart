import 'package:flutter/material.dart';
import 'package:shop_app/screens/home/home_screen.dart';
import 'package:shop_app/screens/sign_up/components/user.dart';
import '../../../constants.dart';
import '../../../helper/storage.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
class SettingsUI extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: "Setting UI",
      home: EditProfilePage(),
    );
  }
}

class EditProfilePage extends StatefulWidget {
  @override
  _EditProfilePageState createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  bool showPassword = false;
  String _token = "";
  User u = User("", "", "", "", 0);
  @override
  void initState() {
    super.initState();
    fetchSecureStorageData();
  }

  Future<void> fetchSecureStorageData() async {
    _token = await storage.read(key: "jwt") ?? '';
     await fetUserData();
  }
  final TextEditingController emailController = TextEditingController();
  final TextEditingController nameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController muniController = TextEditingController();
  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    emailController.dispose();
    nameController.dispose();
    passwordController.dispose();
    muniController.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        elevation: 1,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back,
            color: kPrimaryColor, // Colors.green,
          ),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: Container(
        padding: EdgeInsets.only(left: 16, top: 25, right: 16),
        child: GestureDetector(
          onTap: () {
            FocusScope.of(context).unfocus();
          },
          child: ListView(
            children: [
              Text(
                "Edit Profile",
                style: TextStyle(fontSize: 25, fontWeight: FontWeight.w500),
              ),
              SizedBox(
                height: 15,
              ),
              Center(
                child: Stack(
                  children: [
                    Container(
                      width: 130,
                      height: 130,
                      decoration: BoxDecoration(
                          border: Border.all(
                              width: 4,
                              color: Theme.of(context).scaffoldBackgroundColor),
                          boxShadow: [
                            BoxShadow(
                                spreadRadius: 2,
                                blurRadius: 10,
                                color: Colors.black.withOpacity(0.1),
                                offset: Offset(0, 10))
                          ],
                          shape: BoxShape.circle,
                          image: DecorationImage(
                              fit: BoxFit.cover,
                              image: AssetImage("assets/icons/User Icon.svg"))),
                    ),
                    Positioned(
                        bottom: 0,
                        right: 0,
                        child: Container(
                          height: 40,
                          width: 40,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              width: 4,
                              color: Theme.of(context).scaffoldBackgroundColor,
                            ),
                            color:
                                kPrimaryColor, // Color.fromARGB(255, 240, 169, 37),
                          ),
                          child: Icon(
                            Icons.edit,
                            color: Colors.white,
                          ),
                        )),
                  ],
                ),
              ),
              SizedBox(
                height: 35,
              ),
              buildTextField("Full Name", u.name, false),
              buildTextField("E-mail", u.email, false),
              buildTextField("Password", "", true),
              buildTextField("Location", u.municipalite, false),
              SizedBox(
                height: 35,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  OutlinedButton(
                    style: ButtonStyle(
                        padding: MaterialStateProperty.all(EdgeInsets.symmetric(
                            vertical: 20.0, horizontal: 50.0))),
                    onPressed: () {
                      Navigator.pushNamed(context, HomeScreen.routeName);
                    },
                    child: Text("CANCEL",
                        style: TextStyle(
                            fontSize: 14,
                            letterSpacing: 2.2,
                            color: Colors.black)),
                  ),
                  ElevatedButton(
                    style: ButtonStyle(
                        //backgroundColor: Color.fromARGB(255, 240, 169, 37) ,
                        //colorSchemeSeed: kPrimaryColor, //Colors.green,
                        padding: MaterialStateProperty.all(EdgeInsets.symmetric(
                            vertical: 20.0, horizontal: 50.0))),
                    onPressed: () {
                      save(emailController, passwordController, nameController, muniController);
                    },
                    child: Text(
                      "SAVE",
                      style: TextStyle(
                          fontSize: 14,
                          letterSpacing: 2.2,
                          color: Colors.white),
                    ),
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget buildTextField(
      String labelText, String placeholder, bool isPasswordTextField) {
    print("we are in buildText and the placeholder is " + placeholder);
    return Padding(
      padding: const EdgeInsets.only(bottom: 35.0),
      child: TextField(
        obscureText: isPasswordTextField ? showPassword : false,
        controller: labelText == "E-mail" ? emailController : labelText == "Full Name" ? nameController : labelText == "Password" ? passwordController : muniController,
        // controller:  TextEditingController(
        //     text: placeholder,
        // ),
        decoration: InputDecoration(
            suffixIcon: isPasswordTextField
                ? IconButton(
                    onPressed: () {
                      setState(() {
                        showPassword = !showPassword;
                      });
                    },
                    icon: Icon(
                      Icons.remove_red_eye,
                      color: Colors.grey,
                    ),
                  )
                : null,
            contentPadding: EdgeInsets.only(bottom: 3),
            labelText: labelText,
            hintText: placeholder,

            floatingLabelBehavior: FloatingLabelBehavior.always,
            // hintStyle: TextStyle(
            //   fontSize: 16,
            //   fontWeight: FontWeight.bold,
            //   color: Colors.black,
            // )
        ),
      ),
    );
  }

  Future<void> fetUserData() async {
    print("the value of token fetching " + _token);
    var res = await http.get(Uri.parse("http://localhost:8084/auth/user"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + _token
        },
    );

    print("the value of body response " + res.body);
    final parsed = jsonDecode(res.body).cast<String, Object?>();
    setState(() {
      u.password = parsed['password'] as String;
      u.name = parsed['name'] as String;
      u.municipalite = parsed['municpalite'] as String;
      u.email = parsed['email'] as String;
      u.id = parsed['id'] as int;
      emailController.text = u.email;
      nameController.text = u.name;
      muniController.text = u.municipalite;
    });
  }

  Future<void> save(TextEditingController emailController, TextEditingController password, TextEditingController name, TextEditingController muni) async {
    print("the value of password " + password.text);
    var res = await http.put(
        Uri.parse("http://localhost:8084/auth/user"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + _token
      },
      body: jsonEncode(<String, String>{
        'id': u.id.toString(),
        'email': emailController.text,
        'password': password.text,
        'name': name.text,
        'municpalite': muni.text
      }),
    );
    Navigator.pushNamed(context, HomeScreen.routeName);
  }
}
