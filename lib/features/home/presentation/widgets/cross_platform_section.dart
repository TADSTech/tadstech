import 'package:flutter/material.dart';
import 'package:tadstech/core/theme/app_theme.dart';
import 'package:tadstech/core/widgets/responsive_layout.dart';

class CrossPlatformSection extends StatelessWidget {
  const CrossPlatformSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 60),
      color: AppTheme.secondaryColor.withOpacity(0.1),
      child: Column(
        children: [
          Text(
            'Built with Flutter',
            style: Theme.of(
              context,
            ).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          Text(
            'One codebase, all platforms',
            style: Theme.of(context).textTheme.bodyLarge,
          ),
          const SizedBox(height: 40),
          ResponsiveLayout(
            mobile: Column(
              children: [
                _buildPlatformIcon('assets/icons/android.png', 'Android'),
                const SizedBox(height: 24),
                _buildPlatformIcon('assets/icons/ios.png', 'iOS'),
                const SizedBox(height: 24),
                _buildPlatformIcon('assets/icons/web.png', 'Web'),
                const SizedBox(height: 24),
                _buildPlatformIcon('assets/icons/desktop.png', 'Desktop'),
              ],
            ),
            desktop: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildPlatformIcon('assets/icons/android.png', 'Android'),
                _buildPlatformIcon('assets/icons/ios.png', 'iOS'),
                _buildPlatformIcon('assets/icons/web.png', 'Web'),
                _buildPlatformIcon('assets/icons/desktop.png', 'Desktop'),
              ],
            ),
          ),
          const SizedBox(height: 40),
          Image.asset(
            'assets/images/multi_device.png',
            height: ResponsiveLayout.isMobile(context) ? 200 : 300,
            fit: BoxFit.contain,
          ),
        ],
      ),
    );
  }

  Widget _buildPlatformIcon(String assetPath, String label) {
    return Column(
      children: [
        Image.asset(assetPath, width: 60, height: 60),
        const SizedBox(height: 8),
        Text(
          label,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
        ),
      ],
    );
  }
}
