import 'package:flutter_test/flutter_test.dart';
import 'package:nkui_flutter/main.dart';

void main() {
  testWidgets('NKUI app renders', (WidgetTester tester) async {
    await tester.pumpWidget(const NKUIApp());
    expect(find.text('NKUI Flutter'), findsOneWidget);
  });
}
