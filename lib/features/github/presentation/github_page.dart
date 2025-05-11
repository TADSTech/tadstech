import 'package:flutter/material.dart';
import 'package:tadstech/core/widgets/github_repo_card.dart';
import 'package:tadstech/core/widgets/responsive_layout.dart';
import 'package:url_launcher/url_launcher.dart';

class GitHubPage extends StatefulWidget {
  const GitHubPage({super.key});

  @override
  State<GitHubPage> createState() => _GitHubPageState();
}

class _GitHubPageState extends State<GitHubPage> {
  final List<Map<String, dynamic>> repos = [
    {
      'name': 'Data-Cleaning-Pipeline',
      'description':
          'Automated pipeline for cleaning messy datasets with built-in validation and quality checks',
      'stars': 42,
      'forks': 8,
      'language': 'Python',
      'updated': 'Updated 2 weeks ago',
      'topics': ['data-cleaning', 'automation', 'pandas'],
    },
    {
      'name': 'EDA-Template',
      'description':
          'Comprehensive exploratory data analysis template with visualization presets',
      'stars': 35,
      'forks': 12,
      'language': 'Jupyter Notebook',
      'updated': 'Updated 1 month ago',
      'topics': ['eda', 'data-analysis', 'visualization'],
    },
    {
      'name': 'Regression-Models',
      'description':
          'Production-ready regression models with hyperparameter optimization',
      'stars': 28,
      'forks': 5,
      'language': 'Python',
      'updated': 'Updated 5 days ago',
      'topics': ['machine-learning', 'scikit-learn', 'feature-engineering'],
    },
    {
      'name': 'Data-Visualization',
      'description':
          'Interactive dashboards and visualization templates using Plotly and Seaborn',
      'stars': 56,
      'forks': 15,
      'language': 'Python',
      'updated': 'Updated 3 weeks ago',
      'topics': ['visualization', 'plotly', 'dashboard'],
    },
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final cardColor = isDark ? Colors.grey[800] : Colors.grey[50];
    final textColor = theme.colorScheme.onBackground;
    final screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Our GitHub Projects'),
        centerTitle: true,
        elevation: 0,
      ),
      body: Container(
        color: theme.colorScheme.background,
        child: SingleChildScrollView(
          padding: EdgeInsets.symmetric(
            horizontal: screenWidth > 600 ? 40 : 20,
            vertical: 24,
          ),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 1400),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Open Source Data Science Tools',
                          style: theme.textTheme.headlineMedium?.copyWith(
                            color: textColor,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          'Explore our collection of production-ready data science tools and templates. '
                          'All projects are MIT licensed and community-supported.',
                          style: theme.textTheme.bodyLarge?.copyWith(
                            color: textColor.withOpacity(0.9),
                            height: 1.6,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 32),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 12,
                    ),
                    margin: const EdgeInsets.symmetric(horizontal: 16),
                    decoration: BoxDecoration(
                      border: Border(
                        bottom: BorderSide(
                          color: theme.dividerColor.withOpacity(0.5),
                          width: 1,
                        ),
                      ),
                    ),
                    child: Row(
                      children: [
                        Text(
                          '${repos.length} repositories',
                          style: theme.textTheme.bodyMedium?.copyWith(
                            color: textColor.withOpacity(0.7),
                          ),
                        ),
                        const Spacer(),
                        if (screenWidth > 600)
                          Text(
                            'Tap any card to view on GitHub',
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: textColor.withOpacity(0.5),
                            ),
                          ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  _buildRepositoriesGrid(
                    context,
                    cardColor: cardColor,
                    textColor: textColor,
                  ),
                  const SizedBox(height: 48),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: _buildContributionSection(context),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildRepositoriesGrid(
    BuildContext context, {
    required Color? cardColor,
    required Color? textColor,
  }) {
    final screenWidth = MediaQuery.of(context).size.width;
    final isMobile = screenWidth < 600;

    if (isMobile) {
      return ListView.separated(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: repos.length,
        separatorBuilder: (_, __) => const SizedBox(height: 20),
        itemBuilder:
            (context, index) => GitHubRepoCard(
              repo: repos[index],
              cardColor: cardColor,
              textColor: textColor,
            ),
      );
    }

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 16),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: _calculateColumnCount(context),
        childAspectRatio: 1.6,
        mainAxisSpacing: 24,
        crossAxisSpacing: 24,
        mainAxisExtent: 220, // Fixed height for better alignment
      ),
      itemCount: repos.length,
      itemBuilder:
          (context, index) => GitHubRepoCard(
            repo: repos[index],
            cardColor: cardColor,
            textColor: textColor,
          ),
    );
  }

  int _calculateColumnCount(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    if (width > 1400) return 3;
    if (width > 900) return 2;
    return 1; // Fallback to single column
  }

  Widget _buildContributionSection(BuildContext context) {
    final theme = Theme.of(context);
    final textColor = theme.colorScheme.onBackground;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: theme.colorScheme.primary.withOpacity(0.08),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: theme.colorScheme.primary.withOpacity(0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.people_alt_outlined, color: theme.colorScheme.primary),
              const SizedBox(width: 12),
              Text(
                'Want to contribute?',
                style: theme.textTheme.titleLarge?.copyWith(
                  color: textColor,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            'We welcome contributions! All our projects are open source and '
            'community maintained. Check the README in each repository for '
            'contribution guidelines.',
            style: theme.textTheme.bodyLarge?.copyWith(
              color: textColor.withOpacity(0.9),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 20),
          Align(
            alignment: Alignment.centerRight,
            child: ElevatedButton.icon(
              icon: const Icon(Icons.open_in_new, size: 18),
              label: const Text('View on GitHub'),
              style: ElevatedButton.styleFrom(
                backgroundColor: theme.colorScheme.primary,
                foregroundColor: theme.colorScheme.onPrimary,
                padding: const EdgeInsets.symmetric(
                  horizontal: 24,
                  vertical: 14,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              onPressed: () => _launchUrl('https://github.com/tadstech'),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _launchUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }
}
