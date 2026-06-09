import 'package:flutter/material.dart';
import '../tokens/tokens.dart';

enum NKInputSize { sm, md, lg }

class NKInput extends StatefulWidget {
  final String value;
  final NKInputSize size;
  final String? placeholder;
  final bool disabled;
  final bool readonly;
  final bool clearable;
  final String? error;
  final String? label;
  final IconData? prefixIcon;
  final IconData? suffixIcon;
  final int? maxLength;
  final ValueChanged<String>? onChanged;

  const NKInput({
    super.key,
    this.value = '',
    this.size = NKInputSize.md,
    this.placeholder,
    this.disabled = false,
    this.readonly = false,
    this.clearable = false,
    this.error,
    this.label,
    this.prefixIcon,
    this.suffixIcon,
    this.maxLength,
    this.onChanged,
  });

  @override
  State<NKInput> createState() => _NKInputState();
}

class _NKInputState extends State<NKInput> {
  late TextEditingController _controller;
  bool _focused = false;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.value);
  }

  @override
  void didUpdateWidget(NKInput oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.value != oldWidget.value && widget.value != _controller.text) {
      _controller.text = widget.value;
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Color _borderColor() {
    if (widget.error != null && widget.error!.isNotEmpty) {
      return const Color(NKColors.error);
    }
    if (_focused) return const Color(NKColors.primary500);
    return const Color(NKColors.neutral300);
  }

  @override
  Widget build(BuildContext context) {
    final sizeMap = {
      NKInputSize.sm: (h: 56.0, fs: NKTypography.fontSizeSm, px: 16.0),
      NKInputSize.md: (h: 72.0, fs: NKTypography.fontSizeBase, px: 24.0),
      NKInputSize.lg: (h: 88.0, fs: NKTypography.fontSizeLg, px: 32.0),
    };
    final dim = sizeMap[widget.size]!;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (widget.label != null)
          Padding(
            padding: const EdgeInsets.only(bottom: NKSpacing.sm),
            child: Text(
              widget.label!,
              style: TextStyle(
                fontSize: NKTypography.fontSizeSm,
                color: const Color(NKColors.neutral700),
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        Container(
          height: dim.h,
          decoration: BoxDecoration(
            border: Border.all(color: _borderColor(), width: 1),
            borderRadius: BorderRadius.circular(NKRadius.sm),
            color: widget.disabled
                ? const Color(NKColors.neutral100)
                : Theme.of(context).colorScheme.surface,
          ),
          child: Row(
            children: [
              if (widget.prefixIcon != null)
                Padding(
                  padding: const EdgeInsets.only(left: NKSpacing.sm),
                  child: Icon(widget.prefixIcon, size: NKTypography.fontSizeLg, color: const Color(NKColors.neutral400)),
                ),
              Expanded(
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: dim.px - (widget.prefixIcon != null ? NKSpacing.sm : 0)),
                  child: TextField(
                    controller: _controller,
                    enabled: !widget.disabled,
                    readOnly: widget.readonly,
                    maxLength: widget.maxLength,
                    decoration: InputDecoration(
                      hintText: widget.placeholder,
                      hintStyle: TextStyle(
                        fontSize: dim.fs,
                        color: const Color(NKColors.neutral400),
                      ),
                      border: InputBorder.none,
                      isDense: true,
                      contentPadding: EdgeInsets.zero,
                      counterText: '',
                    ),
                    style: TextStyle(
                      fontSize: dim.fs,
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                    onChanged: (val) {
                      widget.onChanged?.call(val);
                    },
                    onTap: () => setState(() => _focused = true),
                    onEditingComplete: () => setState(() => _focused = false),
                  ),
                ),
              ),
              if (widget.clearable && _controller.text.isNotEmpty && !widget.disabled)
                GestureDetector(
                  onTap: () {
                    _controller.clear();
                    widget.onChanged?.call('');
                  },
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: NKSpacing.sm),
                    child: Icon(Icons.close, size: NKTypography.fontSizeSm, color: const Color(NKColors.neutral400)),
                  ),
                )
              else if (widget.suffixIcon != null)
                Padding(
                  padding: const EdgeInsets.only(right: NKSpacing.sm),
                  child: Icon(widget.suffixIcon, size: NKTypography.fontSizeLg, color: const Color(NKColors.neutral400)),
                ),
            ],
          ),
        ),
        if (widget.error != null && widget.error!.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: NKSpacing.xs),
            child: Text(
              widget.error!,
              style: TextStyle(
                fontSize: NKTypography.fontSizeXs,
                color: const Color(NKColors.error),
              ),
            ),
          ),
      ],
    );
  }
}
