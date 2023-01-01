import 'package:flutter/material.dart';
import 'package:shop_app/screens/Adoption/components/adoption_banner.dart';
import 'package:shop_app/screens/Adoption/components/dogs_List.dart';

import '../../../size_config.dart';
//import 'categories.dart';
//import 'special_offers.dart';

class Body extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(height: getProportionateScreenWidth(10)),
            AdoptionBanner(),
            SizedBox(height: getProportionateScreenWidth(10)),
            DogsList(),
            SizedBox(height: getProportionateScreenWidth(20)),
          ],
        ),
      ),
    );
  }
}
