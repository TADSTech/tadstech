import 'package:flutter/material.dart';
import 'package:tadstech/core/widgets/responsive_layout.dart';
import 'package:tadstech/core/widgets/skill_chip.dart';

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
              children: [
                _caseStudy(
                  title: 'Local Store Sales Cleanup',
                  description:
                      'Cleaned weekly Excel files and standardized sales records for a small retail shop.',
                  tags: ['Excel', 'Missing Values', 'Pandas'],
                  icon: Icons.storefront,
                  ctaLabel: 'Demo Available on Request',
                ),
                const SizedBox(height: 16),
                _caseStudy(
                  title: 'Student Survey Data Formatting',
                  description:
                      'Processed raw Google Forms data into anonymized, structured CSVs for departmental analysis.',
                  tags: ['Survey Data', 'Data Formatting', 'CSV'],
                  icon: Icons.school,
                ),
                const SizedBox(height: 16),
                _caseStudy(
                  title: 'Bank CSV Cleanup Tool',
                  description:
                      'Built a script to parse and clean messy bank statements for personal budgeting.',
                  tags: ['CSV', 'Text Cleaning', 'Python'],
                  icon: Icons.account_balance,
                  ctaLabel: 'Open Notebook',
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
                  title: 'Local Store Sales Cleanup',
                  description:
                      'Cleaned weekly Excel files and standardized sales records for a small retail shop.',
                  tags: ['Excel', 'Missing Values', 'Pandas'],
                  icon: Icons.storefront,
                  ctaLabel: 'Demo Available on Request',
                ),
                _caseStudy(
                  title: 'Student Survey Data Formatting',
                  description:
                      'Processed raw Google Forms data into anonymized, structured CSVs for departmental analysis.',
                  tags: ['Survey Data', 'Data Formatting', 'CSV'],
                  icon: Icons.school,
                ),
                _caseStudy(
                  title: 'Bank CSV Cleanup Tool',
                  description:
                      'Built a script to parse and clean messy bank statements for personal budgeting.',
                  tags: ['CSV', 'Text Cleaning', 'Python'],
                  icon: Icons.account_balance,
                  ctaLabel: 'Open Notebook',
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
                  ctaLabel: 'Demo Available on Request',
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
                  ctaLabel: 'Demo Available on Request',
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
    String? ctaLabel,
  }) {
    return CaseStudyCard(
      title: title,
      description: description,
      tags: tags,
      icon: icon,
      ctaLabel: ctaLabel,
    );
  }
}

class CaseStudyCard extends StatelessWidget {
  final String title;
  final String description;
  final List<String> tags;
  final IconData icon;
  final String? ctaLabel;

  const CaseStudyCard({
    super.key,
    required this.title,
    required this.description,
    required this.tags,
    required this.icon,
    this.ctaLabel,
  });

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme.onSurface;
    final border = Theme.of(context).dividerColor;

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        border: Border.all(color: border),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 32, color: color),
          const SizedBox(height: 12),
          Text(
            title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            description,
            style: Theme.of(
              context,
            ).textTheme.bodyMedium?.copyWith(color: color.withOpacity(0.85)),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children:
                tags
                    .map(
                      (tag) => Chip(
                        label: Text(tag),
                        backgroundColor:
                            Theme.of(context).colorScheme.surfaceVariant,
                      ),
                    )
                    .toList(),
          ),
          if (ctaLabel != null) ...[
            const SizedBox(height: 16),
            Align(
              alignment: Alignment.bottomRight,
              child: TextButton.icon(
                onPressed: () {
                  // Later: Add link to demo or notebook
                },
                icon: const Icon(Icons.open_in_new),
                label: Text(ctaLabel!),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
