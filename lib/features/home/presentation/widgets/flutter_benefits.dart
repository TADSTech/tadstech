import 'package:flutter/material.dart';
import 'package:tadstech/core/theme/app_theme.dart';
import 'package:tadstech/core/widgets/responsive_layout.dart';

class FlutterBenefitsSection extends StatelessWidget {
  const FlutterBenefitsSection({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 60),
      color: AppTheme.primaryColor.withOpacity(0.05),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            'Why We Chose Flutter',
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: colorScheme.onBackground,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          Text(
            'The same principles we apply to data science - efficiency, performance, and beautiful results',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: colorScheme.onBackground.withOpacity(0.9),
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 40),
          ResponsiveLayout(
            mobile: Column(children: _buildBenefitItems(context)),
            desktop: Wrap(
              spacing: 32,
              runSpacing: 24,
              alignment: WrapAlignment.start,
              children:
                  _buildBenefitItems(context)
                      .map(
                        (item) => ConstrainedBox(
                          constraints: const BoxConstraints(maxWidth: 500),
                          child: item,
                        ),
                      )
                      .toList(),
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildBenefitItems(BuildContext context) {
    return [
      _buildBenefitItem(
        context,
        icon: Icons.developer_mode,
        title: 'Single Codebase',
        description:
            'Write once, deploy everywhere – just like reproducible data analysis.',
      ),
      _buildBenefitItem(
        context,
        icon: Icons.bolt,
        title: 'High Performance',
        description:
            'Native compilation for buttery smooth animations and fast load times.',
      ),
      _buildBenefitItem(
        context,
        icon: Icons.brush,
        title: 'Beautiful UI',
        description:
            'Build stunning UIs that match the polish of our visualizations.',
      ),
      _buildBenefitItem(
        context,
        icon: Icons.phone_android,
        title: 'Cross-Platform',
        description:
            'Deliver consistent experiences across every screen and device.',
      ),
    ];
  }

  Widget _buildBenefitItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String description,
  }) {
    final colorScheme = Theme.of(context).colorScheme;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 36, color: AppTheme.primaryColor),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: colorScheme.onBackground,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: colorScheme.onBackground.withOpacity(0.85),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
