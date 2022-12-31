import 'package:flutter/material.dart';
import 'package:shop_app/screens/splash/components/body.dart';
import 'package:shop_app/size_config.dart';
import '../../../helper/storage.dart';

class SplashScreen extends StatelessWidget {
  static String routeName = "/splash";
  @override
  Future<void> DeleteToken() async {
    await storage.write(key: 'jwt', value: '');
    String token = await storage.read(key: 'jwt') ?? '';
  }

  Widget build(BuildContext context) {
    // You have to call it on your starting screen
    SizeConfig().init(context);
    DeleteToken();
    return Scaffold(
      body: Body(),
    );
  }
}
