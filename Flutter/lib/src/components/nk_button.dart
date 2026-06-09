import 'package:flutter/material.dart';
import '../tokens/tokens.dart';

enum NKButtonType { primary, success, warning, danger, neutral }
enum NKButtonVariant { solid, outline, ghost, text }
enum NKButtonSize { sm, md, lg }

class NKButton extends StatelessWidget {
  final NKButtonType type;
  final NKButtonVariant variant;
  final NKButtonSize size;
  final bool loading;
  final bool disabled;
  final bool round;
  final bool block;
  final Widget child;
  final VoidCallback? onPressed;

  const NKButton({
    super.key,
    this.type = NKButtonType.primary,
    this.variant = NKButtonVariant.solid,
    this.size = NKButtonSize.md,
    this.loading = false,
    this.disabled = false,
    this.round = false,
    this.block = false,
    required this.child,
    this.onPressed,
  });

  Color _textColor(NKButtonType type, NKButtonVariant variant) {
    if (variant == NKButtonVariant.solid) return Colors.white;
    switch (type) {
      case NKButtonType.primary: return const Color(NKColors.primary500);
      case NKButtonType.success: return const Color(NKColors.success);
      case NKButtonType.warning: return const Color(NKColors.warning);
      case NKButtonType.danger: return const Color(NKColors.error);
      case NKButtonType.neutral: return const Color(NKColors.neutral800);
    }
  }

  Color _bgColor(NKButtonType type, NKButtonVariant variant) {
    if (variant == NKButtonVariant.solid) {
      switch (type) {
        case NKButtonType.primary: return const Color(NKColors.primary500);
        case NKButtonType.success: return const Color(NKColors.success);
        case NKButtonType.warning: return const Color(NKColors.warning);
        case NKButtonType.danger: return const Color(NKColors.error);
        case NKButtonType.neutral: return const Color(NKColors.neutral800);
      }
    }
    return Colors.transparent;
  }

  Color _borderColor(NKButtonType type, NKButtonVariant variant) {
    if (variant == NKButtonVariant.outline) return _textColor(type, variant);
    return Colors.transparent;
  }

  @override
  Widget build(BuildContext context) {
    final sizeMap = {
      NKButtonSize.sm: (h: 32.0, fs: NKTypography.fontSizeSm, px: 12.0),
      NKButtonSize.md: (h: 40.0, fs: NKTypography.fontSizeBase, px: 16.0),
      NKButtonSize.lg: (h: 48.0, fs: NKTypography.fontSizeLg, px: 20.0),
    };
    final dim = sizeMap[size]!;

    final textColor = _textColor(type, variant);
    final bgColor = _bgColor(type, variant);
    final borderColor = _borderColor(type, variant);

    final effectiveDisabled = disabled || loading;

    return SizedBox(
      width: block ? double.infinity : null,
      height: dim.h,
      child: ElevatedButton(
        onPressed: effectiveDisabled ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: bgColor,
          foregroundColor: textColor,
          disabledBackgroundColor: bgColor.withValues(alpha: 0.38),
          disabledForegroundColor: textColor.withValues(alpha: 0.38),
          side: borderColor != Colors.transparent ? BorderSide(color: borderColor) : null,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(round ? 9999 : NKRadius.md),
          ),
          padding: EdgeInsets.symmetric(horizontal: dim.px),
          minimumSize: Size(block ? double.infinity : 0, dim.h),
          textStyle: TextStyle(fontSize: dim.fs, fontWeight: FontWeight.w500),
          elevation: 0,
          shadowColor: Colors.transparent,
          surfaceTintColor: Colors.transparent,
        ),
        child: loading
            ? SizedBox(
                width: dim.fs,
                height: dim.fs,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  color: textColor,
                ),
              )
            : child,
      ),
    );
  }
}
