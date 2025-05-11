import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tadstech/core/theme/app_theme.dart';
import 'package:tadstech/core/utils/router.dart';

void main() {
  runApp(const TADSApp());
}

class TADSApp extends StatelessWidget {
  const TADSApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'TADS - The Average Data Scientist',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      routerConfig: router,
    );
  }
}
