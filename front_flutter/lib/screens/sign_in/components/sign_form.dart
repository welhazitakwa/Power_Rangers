import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:shop_app/components/custom_surfix_icon.dart';
import 'package:shop_app/components/form_error.dart';
import 'package:shop_app/helper/keyboard.dart';
import 'package:shop_app/screens/forgot_password/forgot_password_screen.dart';
import 'package:shop_app/screens/home/components/home_header.dart';
import 'package:shop_app/screens/home/home_screen.dart';
import 'package:shop_app/screens/login_success/login_success_screen.dart';
import 'package:http/http.dart' as http;
import '../../../components/default_button.dart';
import '../../../constants.dart';
import '../../../size_config.dart';
import '../../sign_up/components/user.dart';
import '../../../helper/storage.dart';

class SignForm extends StatefulWidget {
  @override
  _SignFormState createState() => _SignFormState();
}

class _SignFormState extends State<SignForm> {
  final _formKey = GlobalKey<FormState>();
  String? email;
  String? password;
  bool? remember = false;

  @override
  void initState() {
    logout();
    super.initState();
  }

  Future<void> logout() async {
    final id = await googleSignIn.currentUser?.id;
    print("the value of id of user login with google is " + id.toString());
    if (id != null)
      await googleSignIn.signOut();

  }

  final List<String?> errors = [];
  User user = User("", "", "", "", 0);
  void addError({String? error}) {
    if (!errors.contains(error))
      setState(() {
        errors.add(error);
      });
  }

  void removeError({String? error}) {
    if (errors.contains(error))
      setState(() {
        errors.remove(error);
      });
  }

  String url = "http://localhost:8084/auth/login";

  Future save() async {
    print("the values are name " +
        user.name +
        " munic " +
        user.municipalite +
        " email " +
        user.email +
        " password " +
        user.password);
    try {
      var res = await http.post(Uri.parse(url),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(<String, String>{
            'email': user.email,
            'password': user.password
          }));
      if (res.statusCode == 200) {
        print("the value of token " + res.headers.toString());
        await saveToken(res);
        Navigator.pushNamed(context, LoginSuccessScreen.routeName);
      } else {
        final parsed = jsonDecode(res.body).cast<String, String>();
        addError(error: parsed['msg']);
        print("the errors ${parsed['msg']}");
      }
    } catch (e) {
      print("the errors ya m3allem " + e.toString());
    }
    // print("the errors " + res.toString());
    // if (res.body != null) {
    //   Navigator.pop(context);
    // }
  }

  Future<void> saveToken(http.Response res) async {
    await storage.write(key: 'jwt', value: res.headers['authorization']);
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          buildEmailFormField(),
          SizedBox(height: getProportionateScreenHeight(30)),
          buildPasswordFormField(),
          SizedBox(height: getProportionateScreenHeight(30)),
          Row(
            children: [
              Checkbox(
                value: remember,
                activeColor: kPrimaryColor,
                onChanged: (value) {
                  setState(() {
                    remember = value;
                  });
                },
              ),
              Text("Remember me"),
              TextButton(
                style: ButtonStyle(
                  foregroundColor: MaterialStateProperty.all<Color>(Colors.blue),
                ),
                onPressed: () async {
                  try {
                    final GoogleSignInAccount? googleUser = await googleSignIn.signIn();
                    print("the value of response is " + googleUser.toString());
                    final GoogleSignInAuthentication? googleAuth = await googleUser?.authentication;
                    print("the value of token is " + googleAuth!.idToken!.toString());
                    try {
                      var response = await http.post(
                        Uri.parse("http://localhost:8083/auth/login/google"),
                          headers: <String, String>{
                            'Content-Type': 'application/json; charset=UTF-8',
                          },
                          body: jsonEncode(<String, String>{
                            'token': googleAuth!.idToken!.toString(),
                          })
                      );
                      print("the value of response is " + response.body);
                      if (response.statusCode == 200) {
                        await saveToken(response);
                        Navigator.pushNamed(context, LoginSuccessScreen.routeName);
                      }
                    } catch(error) {
                      print("the value of error iss " + error.toString());
                    }
                  } catch(error) {
                    print("the error is " + error.toString());
                  }
                },
                child: Text('Login with google'),
              ),
              Spacer(),
              GestureDetector(
                onTap: () => Navigator.pushNamed(
                    context, ForgotPasswordScreen.routeName),
                child: Text(
                  "Forgot Password",
                  style: TextStyle(decoration: TextDecoration.underline),
                ),
              )
            ],
          ),
          FormError(errors: errors),
          SizedBox(height: getProportionateScreenHeight(20)),
          DefaultButton(
            text: "Continue",
            press: () {
              if (_formKey.currentState!.validate()) {
                save();
                // if all are valid then go to success screen
                // KeyboardUtil.hideKeyboard(context);
                // Navigator.pushNamed(context, LoginSuccessScreen.routeName);
              }
            },
          ),
        ],
      ),
    );
  }

  TextFormField buildPasswordFormField() {
    return TextFormField(
      obscureText: true,
      onSaved: (newValue) => password = newValue,
      onChanged: (value) {
        if (value.isNotEmpty) {
          removeError(error: kPassNullError);
        } else if (value.length >= 8) {
          removeError(error: kShortPassError);
        }
        user.password = value;
      },
      validator: (value) {
        if (value!.isEmpty) {
          addError(error: kPassNullError);
          return "";
        } else if (value.length < 8) {
          addError(error: kShortPassError);
          return "";
        }
        return null;
      },
      decoration: InputDecoration(
        labelText: "Password",
        hintText: "Enter your password",
        // If  you are using latest version of flutter then lable text and hint text shown like this
        // if you r using flutter less then 1.20.* then maybe this is not working properly
        floatingLabelBehavior: FloatingLabelBehavior.always,
        suffixIcon: CustomSurffixIcon(svgIcon: "assets/icons/Lock.svg"),
      ),
    );
  }

  TextFormField buildEmailFormField() {
    return TextFormField(
      keyboardType: TextInputType.emailAddress,
      onSaved: (newValue) => email = newValue,
      onChanged: (value) {
        if (value.isNotEmpty) {
          removeError(error: kEmailNullError);
        } else if (emailValidatorRegExp.hasMatch(value)) {
          removeError(error: kInvalidEmailError);
        }
        user.email = value;
      },
      validator: (value) {
        if (value!.isEmpty) {
          addError(error: kEmailNullError);
          return "";
        } else if (!emailValidatorRegExp.hasMatch(value)) {
          addError(error: kInvalidEmailError);
          return "";
        }
        return null;
      },
      decoration: InputDecoration(
        labelText: "Email",
        hintText: "Enter your email",
        // If  you are using latest version of flutter then lable text and hint text shown like this
        // if you r using flutter less then 1.20.* then maybe this is not working properly
        floatingLabelBehavior: FloatingLabelBehavior.always,
        suffixIcon: CustomSurffixIcon(svgIcon: "assets/icons/Mail.svg"),
      ),
    );
  }
}

class error {
  final String msg;
  const error({required this.msg});
  factory error.fromJson(Map<String, String> json) {
    print("the json is  " + json.toString());
    return error(
      msg: json['msg'] as String,
    );
  }
}
