import 'package:flutter/material.dart';
import 'nkui_flutter.dart';

void main() {
  runApp(const NKUIApp());
}

class NKUIApp extends StatelessWidget {
  const NKUIApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NKUI Flutter',
      theme: NKTheme.light,
      home: const NKUIHome(),
    );
  }
}

class NKUIHome extends StatelessWidget {
  const NKUIHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('NKUI Flutter')),
      body: const Center(
        child: Text('Component library in development'),
      ),
    );
  }
}
