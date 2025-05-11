import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import 'package:tadstech/core/theme/app_theme.dart';
import 'package:tadstech/core/widgets/cta_button.dart';
import 'package:tadstech/core/widgets/responsive_layout.dart';

class HeroSection extends StatelessWidget {
  final VoidCallback? onScrollToFlutter;

  const HeroSection({super.key, this.onScrollToFlutter});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 80),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [AppTheme.primaryColor.withOpacity(0.08), Colors.transparent],
        ),
      ),
      child: ResponsiveLayout(
        mobile: Column(
          children: [
            _buildContent(
              context,
            ).animate().fadeIn(duration: 500.ms).slideY(begin: 0.2),
            const SizedBox(height: 40),
            _buildMockup(
              context,
            ).animate().fadeIn(duration: 600.ms).slideY(begin: 0.3),
          ],
        ),
        desktop: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Expanded(
              child: _buildContent(
                context,
              ).animate().fadeIn(duration: 500.ms).slideX(begin: -0.2),
            ),
            const SizedBox(width: 40),
            Expanded(
              child: _buildMockup(
                context,
              ).animate().fadeIn(duration: 600.ms).slideX(begin: 0.2),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildContent(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'The Average Data Scientist',
          style: Theme.of(context).textTheme.headlineLarge?.copyWith(
            fontWeight: FontWeight.bold,
            color: Theme.of(context).colorScheme.onBackground,
          ),
        ),
        const SizedBox(height: 16),
        Text(
          'Turning raw data into meaningful insights with clean code and clear visualizations.',
          style: Theme.of(
            context,
          ).textTheme.bodyLarge?.copyWith(fontSize: 18, height: 1.6),
        ),
        const SizedBox(height: 32),
        Wrap(
          spacing: 16,
          runSpacing: 16,
          children: [
            CTAButton(
              text: 'Explore Services',
              onPressed: () => context.go('/services'),
              primary: true,
            ),
            CTAButton(
              text: 'Why Flutter?',
              onPressed:
                  onScrollToFlutter ?? () => _scrollToFlutterSection(context),
              primary: false,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildMockup(BuildContext context) {
    final isMobile = ResponsiveLayout.isMobile(context);
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        border: Border.all(
          color: AppTheme.primaryColor.withOpacity(0.2),
          width: 2,
        ),
        borderRadius: BorderRadius.circular(16),
        color: AppTheme.primaryColor.withOpacity(0.05),
        boxShadow: [
          BoxShadow(
            color: AppTheme.primaryColor.withOpacity(0.1),
            blurRadius: 12,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: Image.asset(
          'assets/images/data_analysis.png',
          height: isMobile ? 250 : 400,
          fit: BoxFit.contain,
        ),
      ),
    );
  }

  void _scrollToFlutterSection(BuildContext context) {
    Scrollable.ensureVisible(
      context,
      duration: const Duration(milliseconds: 500),
      curve: Curves.easeInOut,
      alignment: 0.2,
    );
  }
}
