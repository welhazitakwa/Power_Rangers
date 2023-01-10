import 'package:flutter/material.dart';

import 'components/body.dart';

class resetPassword extends StatelessWidget {
  static String routeName = "/reset-password";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Sign Up"),
      ),
      body: Body(),
    );
  }
}
