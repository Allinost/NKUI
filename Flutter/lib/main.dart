import 'package:flutter/material.dart';
import 'nkui_flutter.dart';

void main() {
  runApp(const NKUIApp());
}

class NKUIApp extends StatefulWidget {
  const NKUIApp({super.key});

  @override
  State<NKUIApp> createState() => _NKUIAppState();
}

class _NKUIAppState extends State<NKUIApp> {
  bool _darkMode = false;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NKUI Flutter',
      theme: NKTheme.light,
      darkTheme: NKTheme.dark,
      themeMode: _darkMode ? ThemeMode.dark : ThemeMode.light,
      home: NKUIHome(onToggleTheme: () => setState(() => _darkMode = !_darkMode)),
    );
  }
}

class NKUIHome extends StatelessWidget {
  final VoidCallback onToggleTheme;

  const NKUIHome({super.key, required this.onToggleTheme});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('NKUI Flutter'),
        actions: [
          IconButton(
            icon: Icon(Theme.of(context).brightness == Brightness.dark ? Icons.light_mode : Icons.dark_mode),
            onPressed: onToggleTheme,
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(NKSpacing.xl),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Button', style: TextStyle(fontSize: NKTypography.fontSizeXl, fontWeight: FontWeight.w600)),
            const SizedBox(height: NKSpacing.md),
            Wrap(spacing: NKSpacing.sm, runSpacing: NKSpacing.sm, children: [
              NKButton(type: NKButtonType.primary, child: const Text('Primary'), onPressed: () {}),
              NKButton(type: NKButtonType.success, child: const Text('Success'), onPressed: () {}),
              NKButton(type: NKButtonType.warning, child: const Text('Warning'), onPressed: () {}),
              NKButton(type: NKButtonType.danger, child: const Text('Danger'), onPressed: () {}),
              NKButton(type: NKButtonType.neutral, child: const Text('Neutral'), onPressed: () {}),
            ]),
            const SizedBox(height: NKSpacing.md),
            Wrap(spacing: NKSpacing.sm, runSpacing: NKSpacing.sm, children: [
              NKButton(variant: NKButtonVariant.outline, child: const Text('Outline'), onPressed: () {}),
              NKButton(variant: NKButtonVariant.ghost, child: const Text('Ghost'), onPressed: () {}),
              NKButton(variant: NKButtonVariant.text, child: const Text('Text'), onPressed: () {}),
            ]),
            const SizedBox(height: NKSpacing.md),
            Wrap(spacing: NKSpacing.sm, runSpacing: NKSpacing.sm, children: [
              NKButton(size: NKButtonSize.sm, child: const Text('Small'), onPressed: () {}),
              NKButton(size: NKButtonSize.md, child: const Text('Medium'), onPressed: () {}),
              NKButton(size: NKButtonSize.lg, child: const Text('Large'), onPressed: () {}),
            ]),
            const SizedBox(height: NKSpacing.md),
            Wrap(spacing: NKSpacing.sm, runSpacing: NKSpacing.sm, children: [
              NKButton(loading: true, child: const Text('Loading'), onPressed: () {}),
              NKButton(disabled: true, child: const Text('Disabled'), onPressed: () {}),
              NKButton(round: true, child: const Text('Round'), onPressed: () {}),
              NKButton(block: true, child: const Text('Block'), onPressed: () {}),
            ]),
            const SizedBox(height: NKSpacing.xxl),
            const Text('Input', style: TextStyle(fontSize: NKTypography.fontSizeXl, fontWeight: FontWeight.w600)),
            const SizedBox(height: NKSpacing.md),
            const NKInput(placeholder: 'Basic input'),
            const SizedBox(height: NKSpacing.md),
            const NKInput(placeholder: 'With clear', clearable: true),
            const SizedBox(height: NKSpacing.md),
            const NKInput(label: 'Username', placeholder: 'With label'),
            const SizedBox(height: NKSpacing.md),
            const NKInput(placeholder: 'With error', error: 'Please enter valid content'),
            const SizedBox(height: NKSpacing.md),
            const NKInput(placeholder: 'Disabled', disabled: true),
            const SizedBox(height: NKSpacing.md),
            const NKInput(placeholder: 'With prefix', prefixIcon: Icons.search),
          ],
        ),
      ),
    );
  }
}
