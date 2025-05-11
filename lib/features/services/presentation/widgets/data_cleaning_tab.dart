import 'package:flutter/material.dart';
import 'package:tadstech/core/widgets/casestudy_card.dart';
import 'package:tadstech/core/widgets/responsive_layout.dart';
import 'package:tadstech/core/widgets/skill_chip.dart';
import 'package:tadstech/core/widgets/tool_card.dart';

class DataCleaningTab extends StatelessWidget {
  const DataCleaningTab({super.key});

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme.onBackground;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Data Cleaning Services',
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
              color: color,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'We transform messy, incomplete, or inconsistent data into clean, analysis-ready datasets. '
            'Our data cleaning process ensures your data is accurate, consistent, and properly formatted '
            'for your specific analytical needs.',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: color.withOpacity(0.9),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 32),
          Text(
            'Common Data Issues We Handle:',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              color: color,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: const [
              SkillChip(label: 'Missing Values'),
              SkillChip(label: 'Inconsistent Formatting'),
              SkillChip(label: 'Duplicate Records'),
              SkillChip(label: 'Outlier Detection'),
              SkillChip(label: 'Data Type Conversion'),
              SkillChip(label: 'Text Normalization'),
              SkillChip(label: 'Date/Time Standardization'),
              SkillChip(label: 'Categorical Encoding'),
            ],
          ),
          const SizedBox(height: 32),
          Text(
            'Our Tool Stack:',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              color: color,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 16),
          ResponsiveLayout(
            mobile: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: const [
                ToolCard(
                  icon: Icons.table_chart,
                  name: 'Pandas',
                  description: 'Data manipulation and analysis',
                ),
                SizedBox(height: 16),
                ToolCard(
                  icon: Icons.functions,
                  name: 'NumPy',
                  description: 'Numerical computing',
                ),
                SizedBox(height: 16),
                ToolCard(
                  icon: Icons.cleaning_services,
                  name: 'OpenRefine',
                  description: 'Data cleaning tool',
                ),
              ],
            ),
            desktop: GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 3,
              childAspectRatio: 3.5,
              crossAxisSpacing: 20,
              mainAxisSpacing: 20,
              children: const [
                ToolCard(
                  icon: Icons.table_chart,
                  name: 'Pandas',
                  description: 'Data manipulation and analysis',
                ),
                ToolCard(
                  icon: Icons.functions,
                  name: 'NumPy',
                  description: 'Numerical computing',
                ),
                ToolCard(
                  icon: Icons.cleaning_services,
                  name: 'OpenRefine',
                  description: 'Data cleaning tool',
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          Text(
            'Case Studies',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              color: color,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 16),
          ResponsiveLayout(
            mobile: Column(
              children: [
                _caseStudy(
                  title: 'E-Commerce Order Cleanup',
                  description:
                      'Normalized and deduplicated 50k+ transaction records across multiple sales platforms.',
                  tags: ['Deduplication', 'Standardization', 'Pandas'],
                  icon: Icons.shopping_cart,
                ),
                const SizedBox(height: 16),
                _caseStudy(
                  title: 'Healthcare Records Harmonization',
                  description:
                      'Resolved schema conflicts and imputed missing medical data across 3 datasets.',
                  tags: ['Healthcare', 'Missing Data', 'Data Merging'],
                  icon: Icons.health_and_safety,
                ),
              ],
            ),
            desktop: GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              mainAxisSpacing: 20,
              crossAxisSpacing: 20,
              childAspectRatio: 1.8,
              children: [
                _caseStudy(
                  title: 'E-Commerce Order Cleanup',
                  description:
                      'Normalized and deduplicated 50k+ transaction records across multiple sales platforms.',
                  tags: ['Deduplication', 'Standardization', 'Pandas'],
                  icon: Icons.shopping_cart,
                ),
                _caseStudy(
                  title: 'Healthcare Records Harmonization',
                  description:
                      'Resolved schema conflicts and imputed missing medical data across 3 datasets.',
                  tags: ['Healthcare', 'Missing Data', 'Data Merging'],
                  icon: Icons.health_and_safety,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _caseStudy({
    required String title,
    required String description,
    required List<String> tags,
    required IconData icon,
  }) {
    return CaseStudyCard(
      title: title,
      description: description,
      tags: tags,
      icon: icon,
    );
  }
}
