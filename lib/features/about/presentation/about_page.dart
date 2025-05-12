import 'package:flutter/material.dart';
import 'package:tadstech/core/theme/app_theme.dart';
import 'package:tadstech/core/widgets/timeline_item.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : Colors.black87;

    return Scaffold(
      appBar: AppBar(
        title: const Text('About Tadstech'),
        backgroundColor: theme.primaryColor,
        foregroundColor: Colors.white,
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          final isWide = constraints.maxWidth > 600;
          return SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 1000),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    CircleAvatar(
                      radius: 80,
                      backgroundColor: AppTheme.primaryColor.withOpacity(0.1),
                      child: const Icon(
                        Icons.person,
                        size: 60,
                        color: AppTheme.primaryColor,
                      ),
                    ),
                    const SizedBox(height: 24),
                    Text(
                      'The Average Data Scientist',
                      style: theme.textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: textColor,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Tadstech is a budding tech initiative focused on building clean, efficient, and cross-platform applications for web and mobile. '
                      'With a foundation in mathematics and a growing passion for data science, we aim to bridge the gap between insights and implementation.',
                      textAlign: TextAlign.center,
                      style: theme.textTheme.bodyLarge?.copyWith(
                        color: textColor,
                        height: 1.5,
                      ),
                    ),

                    const SizedBox(height: 40),
                    Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        'Our Story',
                        style: theme.textTheme.headlineSmall?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: textColor,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Column(
                      children: [
                        TimelineItem(
                          year: '2024',
                          title: 'Started the Journey',
                          description:
                              'Began learning Python, Flutter, and the fundamentals of data science and software development.',
                        ),
                        TimelineItem(
                          year: '2024',
                          title: 'First Client Projects',
                          description:
                              'Delivered mobile and web app solutions for 3 local businesses using Flutter.',
                        ),
                        TimelineItem(
                          year: '2025',
                          title: 'Launched Tadstech',
                          description:
                              'Branded personal development and freelance work under the name Tadstech — offering simple, effective digital solutions.',
                        ),
                        TimelineItem(
                          year: '2025',
                          title: 'Looking Ahead',
                          description:
                              'Currently building real-world experience while preparing for open-source contributions in data science.',
                        ),
                      ],
                    ),

                    const SizedBox(height: 40),
                    Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        'Our Stack',
                        style: theme.textTheme.headlineSmall?.copyWith(
                          fontWeight: FontWeight.bold,
                          color: textColor,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Wrap(
                      spacing: 12,
                      runSpacing: 12,
                      children: const [
                        _TechChip(label: 'Flutter'),
                        _TechChip(label: 'Dart'),
                        _TechChip(label: 'Python'),
                        _TechChip(label: 'Git'),
                        _TechChip(label: 'SQL'),
                        _TechChip(label: 'Pandas'),
                        _TechChip(label: 'NumPy'),
                        _TechChip(label: 'Scikit-learn'),
                        _TechChip(label: 'TensorFlow'),
                        _TechChip(label: 'Docker'),
                      ],
                    ),

                    const SizedBox(height: 32),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

class _TechChip extends StatelessWidget {
  final String label;

  const _TechChip({required this.label});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Chip(
      label: Text(
        label,
        style: TextStyle(
          color:
              theme.brightness == Brightness.dark
                  ? Colors.white
                  : Colors.black87,
        ),
      ),
      backgroundColor: theme.colorScheme.secondary.withOpacity(0.1),
      side: BorderSide(color: theme.colorScheme.primary.withOpacity(0.2)),
    );
  }
}
