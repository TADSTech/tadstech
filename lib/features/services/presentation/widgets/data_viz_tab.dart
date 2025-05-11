import 'package:flutter/material.dart';
import 'package:tadstech/core/widgets/casestudy_card.dart';
import 'package:tadstech/core/widgets/responsive_layout.dart';
import 'package:tadstech/core/widgets/skill_chip.dart';
import 'package:tadstech/core/widgets/tool_card.dart';

class DataVizTab extends StatelessWidget {
  const DataVizTab({super.key});

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme.onBackground;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Data Visualization Services',
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'We transform complex data into clear, insightful visualizations that tell compelling stories. '
            'Our visualizations help you understand patterns, trends, and outliers in your data.',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: color.withOpacity(0.9),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 32),
          Text(
            'Our Visualization Toolkit:',
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
              SkillChip(label: 'Interactive Dashboards'),
              SkillChip(label: 'Statistical Charts'),
              SkillChip(label: 'Geospatial Mapping'),
              SkillChip(label: 'Time Series Analysis'),
              SkillChip(label: 'Custom Styling'),
              SkillChip(label: 'Accessibility Focused'),
            ],
          ),
          const SizedBox(height: 32),
          Text(
            'Featured Tools:',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
          const SizedBox(height: 16),
          ResponsiveLayout(
            mobile: Column(
              children: const [
                ToolCard(
                  icon: Icons.bar_chart,
                  name: 'Matplotlib',
                  description: 'Comprehensive 2D plotting library',
                ),
                SizedBox(height: 16),
                ToolCard(
                  icon: Icons.pie_chart,
                  name: 'Seaborn',
                  description: 'Statistical data visualization',
                ),
                SizedBox(height: 16),
                ToolCard(
                  icon: Icons.auto_graph,
                  name: 'Plotly',
                  description: 'Interactive web-based visualizations',
                ),
                SizedBox(height: 16),
                ToolCard(
                  icon: Icons.map_outlined,
                  name: 'Geopandas',
                  description: 'Geospatial data visualization',
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
                  icon: Icons.bar_chart,
                  name: 'Matplotlib',
                  description: 'Comprehensive 2D plotting library',
                ),
                ToolCard(
                  icon: Icons.pie_chart,
                  name: 'Seaborn',
                  description: 'Statistical data visualization',
                ),
                ToolCard(
                  icon: Icons.auto_graph,
                  name: 'Plotly',
                  description: 'Interactive web-based visualizations',
                ),
                ToolCard(
                  icon: Icons.map_outlined,
                  name: 'Geopandas',
                  description: 'Geospatial data visualization',
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          Text(
            'Sample Projects:',
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
                  title: 'Sales Dashboard',
                  description:
                      'Built an interactive sales dashboard for a retail client using Plotly Dash.',
                  tags: ['Retail', 'Dashboards', 'Plotly'],
                  icon: Icons.dashboard_customize,
                ),
                const SizedBox(height: 16),
                _caseStudy(
                  title: 'COVID-19 Trends',
                  description:
                      'Developed time series animations of pandemic spread across regions.',
                  tags: ['Time Series', 'Public Health', 'Seaborn'],
                  icon: Icons.coronavirus,
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
                  title: 'Sales Dashboard',
                  description:
                      'Built an interactive sales dashboard for a retail client using Plotly Dash.',
                  tags: ['Retail', 'Dashboards', 'Plotly'],
                  icon: Icons.dashboard_customize,
                ),
                _caseStudy(
                  title: 'COVID-19 Trends',
                  description:
                      'Developed time series animations of pandemic spread across regions.',
                  tags: ['Time Series', 'Public Health', 'Seaborn'],
                  icon: Icons.coronavirus,
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
