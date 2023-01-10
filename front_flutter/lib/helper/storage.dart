import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:google_sign_in/google_sign_in.dart';

// Create storage
final storage = new FlutterSecureStorage();

GoogleSignIn googleSignIn = GoogleSignIn(
  scopes: [
    'email',
    'https://www.googleapis.com/auth/contacts.readonly',
  ],
  clientId: '1061907909311-djld50fmcubp3l2jm752pl2dk6fac7n4.apps.googleusercontent.com',
);
