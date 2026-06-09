import 'package:flutter/material.dart';
import '../tokens/tokens.dart';

class NKTheme {
  static ThemeData get light => ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        scaffoldBackgroundColor: const Color(NKColors.neutral50),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(NKColors.primary500),
          brightness: Brightness.light,
        ),
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif',
        appBarTheme: const AppBarTheme(elevation: 0, centerTitle: true),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            minimumSize: const Size.fromHeight(NKSpacing.xl + NKSpacing.sm),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(NKRadius.md)),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(NKRadius.sm)),
          contentPadding: const EdgeInsets.symmetric(horizontal: NKSpacing.md, vertical: NKSpacing.sm),
        ),
      );

  static ThemeData get dark => ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(NKColors.neutral0),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(NKColors.primary500),
          brightness: Brightness.dark,
        ),
        fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif',
        appBarTheme: const AppBarTheme(elevation: 0, centerTitle: true),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            minimumSize: const Size.fromHeight(NKSpacing.xl + NKSpacing.sm),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(NKRadius.md)),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(NKRadius.sm)),
          contentPadding: const EdgeInsets.symmetric(horizontal: NKSpacing.md, vertical: NKSpacing.sm),
        ),
      );
}
