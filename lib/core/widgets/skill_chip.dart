import 'package:flutter/material.dart';
import 'package:tadstech/core/theme/app_theme.dart';

class SkillChip extends StatelessWidget {
  final String label;
  final Color? backgroundColor;
  final Color? textColor;
  final bool elevated;
  final VoidCallback? onTap;

  const SkillChip({
    super.key,
    required this.label,
    this.backgroundColor,
    this.textColor,
    this.elevated = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final colorScheme = theme.colorScheme;

    final bgColor =
        backgroundColor ??
        (isDark
            ? colorScheme.surfaceVariant.withOpacity(0.2)
            : AppTheme.primaryColor.withOpacity(0.1));

    final fgColor = textColor ?? (isDark ? Colors.white : Colors.black87);

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(16),
          boxShadow:
              elevated
                  ? [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.1),
                      blurRadius: 4,
                      offset: const Offset(0, 2),
                    ),
                  ]
                  : null,
        ),
        child: Text(
          label,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: fgColor,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
