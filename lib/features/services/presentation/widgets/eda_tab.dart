import 'package:flutter/material.dart';
import 'package:tadstech/core/widgets/casestudy_card.dart';
import 'package:tadstech/core/widgets/responsive_layout.dart';
import 'package:tadstech/core/widgets/skill_chip.dart';
import 'package:tadstech/core/widgets/tool_card.dart';

class EDATab extends StatelessWidget {
  const EDATab({super.key});

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme.onBackground;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Exploratory Data Analysis',
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'We perform comprehensive exploratory analysis to uncover insights, identify patterns, and detect anomalies in your data. '
            'Our EDA process forms the foundation for all subsequent analysis and modeling.',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: color.withOpacity(0.9),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 32),
          Text(
            'EDA Techniques:',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: const [
              SkillChip(label: 'Descriptive Statistics'),
              SkillChip(label: 'Data Distributions'),
              SkillChip(label: 'Correlation Analysis'),
              SkillChip(label: 'Missing Data Analysis'),
              SkillChip(label: 'Outlier Detection'),
              SkillChip(label: 'Feature Engineering'),
            ],
          ),
          const SizedBox(height: 32),
          Text(
            'Primary Tools:',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
          const SizedBox(height: 16),
          ResponsiveLayout(
            mobile: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: const [
                ToolCard(
                  icon: Icons.table_chart,
                  name: 'Pandas Profiling',
                  description: 'Automated EDA reports',
                ),
                SizedBox(height: 16),
                ToolCard(
                  icon: Icons.insights,
                  name: 'Sweetviz',
                  description: 'Visual feature analysis',
                ),
                SizedBox(height: 16),
                ToolCard(
                  icon: Icons.auto_graph,
                  name: 'D-Tale',
                  description: 'Interactive EDA interface',
                ),
                SizedBox(height: 16),
                ToolCard(
                  icon: Icons.numbers,
                  name: 'Pandas',
                  description: 'Core data analysis',
                ),
              ],
            ),
            desktop: GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              mainAxisSpacing: 20,
              crossAxisSpacing: 20,
              childAspectRatio: 3.5,
              children: const [
                ToolCard(
                  icon: Icons.table_chart,
                  name: 'Pandas Profiling',
                  description: 'Automated EDA reports',
                ),
                ToolCard(
                  icon: Icons.insights,
                  name: 'Sweetviz',
                  description: 'Visual feature analysis',
                ),
                ToolCard(
                  icon: Icons.auto_graph,
                  name: 'D-Tale',
                  description: 'Interactive EDA interface',
                ),
                ToolCard(
                  icon: Icons.numbers,
                  name: 'Pandas',
                  description: 'Core data analysis',
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          Text(
            'Analysis Deliverables:',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
          const SizedBox(height: 16),
          ResponsiveLayout(
            mobile: Column(
              children: [
                _caseStudy(
                  title: 'Customer Churn Insights',
                  description:
                      'Explored churn indicators using correlation analysis and visual EDA techniques.',
                  tags: ['Churn Analysis', 'EDA', 'Sweetviz'],
                  icon: Icons.person_off,
                ),
                const SizedBox(height: 16),
                _caseStudy(
                  title: 'Financial Fraud Detection',
                  description:
                      'Performed outlier analysis and clustering to flag potential fraud patterns.',
                  tags: [
                    'Fraud Detection',
                    'Anomaly Detection',
                    'Pandas Profiling',
                  ],
                  icon: Icons.shield,
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
                  title: 'Customer Churn Insights',
                  description:
                      'Explored churn indicators using correlation analysis and visual EDA techniques.',
                  tags: ['Churn Analysis', 'EDA', 'Sweetviz'],
                  icon: Icons.person_off,
                ),
                _caseStudy(
                  title: 'Financial Fraud Detection',
                  description:
                      'Performed outlier analysis and clustering to flag potential fraud patterns.',
                  tags: [
                    'Fraud Detection',
                    'Anomaly Detection',
                    'Pandas Profiling',
                  ],
                  icon: Icons.shield,
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
