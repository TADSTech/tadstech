import 'package:flutter/material.dart';
import 'package:tadstech/core/theme/app_theme.dart';

class CTAButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final bool primary;

  const CTAButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.primary = true,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: primary ? AppTheme.primaryColor : Colors.transparent,
        foregroundColor: primary ? Colors.black : AppTheme.primaryColor,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
          side: BorderSide(
            color: primary ? Colors.transparent : AppTheme.primaryColor,
          ),
        ),
      ),
      onPressed: onPressed,
      child: Text(
        text,
        style: const TextStyle(fontWeight: FontWeight.bold),
      ),
    );
  }
}