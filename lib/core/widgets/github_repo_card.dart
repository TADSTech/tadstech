import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:url_launcher/url_launcher.dart';

class GitHubRepoCard extends StatelessWidget {
  final Map<String, dynamic> repo;
  final Color? cardColor;
  final Color? textColor;
  final bool showFullDescription;

  const GitHubRepoCard({
    super.key,
    required this.repo,
    this.cardColor,
    this.textColor,
    this.showFullDescription = false,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDarkMode = theme.brightness == Brightness.dark;
    final defaultCardColor = isDarkMode ? Colors.grey[900] : Colors.grey[50];
    final defaultTextColor = theme.colorScheme.onBackground;
    final languageColor = _getLanguageColor(repo['language'] ?? 'N/A');

    return Card(
      color: cardColor ?? defaultCardColor,
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      margin: const EdgeInsets.only(bottom: 1), // Prevents elevation overlap
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () => _launchUrl('https://github.com/tadstech/${repo['name']}'),
        child: Container(
          constraints: const BoxConstraints(
            minHeight: 180,
          ), // Minimum card height
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      SvgPicture.asset(
                        'assets/icons/github.svg',
                        width: 20,
                        height: 20,
                        colorFilter: ColorFilter.mode(
                          textColor ?? defaultTextColor,
                          BlendMode.srcIn,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          repo['name'] ?? 'Unnamed Repository',
                          style: theme.textTheme.titleLarge?.copyWith(
                            color: textColor ?? defaultTextColor,
                            fontWeight: FontWeight.bold,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    _getDescription(repo['description']),
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: (textColor ?? defaultTextColor).withOpacity(0.9),
                      height: 1.4,
                    ),
                    maxLines: showFullDescription ? 3 : 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  if (repo['topics'] != null &&
                      (repo['topics'] as List).isNotEmpty) ...[
                    const SizedBox(height: 12),
                    SizedBox(
                      height: 28, // Fixed height for topic chips
                      child: ListView(
                        scrollDirection: Axis.horizontal,
                        children:
                            (repo['topics'] as List<dynamic>)
                                .take(3)
                                .map(
                                  (topic) => Padding(
                                    padding: const EdgeInsets.only(right: 8),
                                    child: Chip(
                                      label: Text(
                                        topic.toString(),
                                        style: theme.textTheme.bodySmall
                                            ?.copyWith(
                                              color: (textColor ??
                                                      defaultTextColor)
                                                  .withOpacity(0.9),
                                            ),
                                      ),
                                      backgroundColor: (textColor ??
                                              defaultTextColor)
                                          .withOpacity(0.1),
                                      visualDensity: VisualDensity.compact,
                                      padding: EdgeInsets.zero,
                                      labelPadding: const EdgeInsets.symmetric(
                                        horizontal: 8,
                                      ),
                                    ),
                                  ),
                                )
                                .toList(),
                      ),
                    ),
                  ],
                ],
              ),
              const SizedBox(height: 12),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      _buildRepoStat(
                        Icons.star_rate_rounded,
                        _formatNumber(repo['stars'] ?? 0),
                        theme,
                        textColor: textColor ?? defaultTextColor,
                      ),
                      const SizedBox(width: 16),
                      _buildRepoStat(
                        Icons.call_split_rounded,
                        _formatNumber(repo['forks'] ?? 0),
                        theme,
                        textColor: textColor ?? defaultTextColor,
                      ),
                      const SizedBox(width: 16),
                      if (repo['language'] != null)
                        _buildLanguageIndicator(
                          language: repo['language'],
                          color: languageColor,
                          textColor: textColor ?? defaultTextColor,
                        ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    repo['updated'] ?? 'Unknown update date',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: (textColor ?? defaultTextColor).withOpacity(0.7),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildRepoStat(
    IconData icon,
    String text,
    ThemeData theme, {
    required Color textColor,
  }) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 18, color: textColor.withOpacity(0.8)),
        const SizedBox(width: 4),
        Text(
          text,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: textColor.withOpacity(0.9),
          ),
        ),
      ],
    );
  }

  Widget _buildLanguageIndicator({
    required String language,
    required Color color,
    required Color textColor,
  }) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(color: color, shape: BoxShape.circle),
        ),
        const SizedBox(width: 6),
        Text(
          language,
          style: TextStyle(
            color: textColor.withOpacity(0.9),
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }

  String _getDescription(String? description) {
    return description?.isNotEmpty == true
        ? description!
        : 'No description provided';
  }

  String _formatNumber(int number) {
    if (number >= 1000) {
      return '${(number / 1000).toStringAsFixed(1)}k';
    }
    return number.toString();
  }

  Color _getLanguageColor(String language) {
    const colors = {
      'Python': Colors.blue,
      'JavaScript': Color(0xFFF1E05A),
      'Dart': Color(0xFF00B4AB),
      'Java': Color(0xFFB07219),
      'HTML': Color(0xFFE34C26),
      'CSS': Color(0xFF563D7C),
      'TypeScript': Color(0xFF3178C6),
      'Jupyter Notebook': Color(0xFFDA5B0B),
      'R': Color(0xFF276DC3),
      'SQL': Color(0xFFE38C00),
      'Shell': Color(0xFF89E051),
    };
    return colors[language] ?? Colors.grey;
  }

  Future<void> _launchUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }
}
