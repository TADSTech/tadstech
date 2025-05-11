import 'package:flutter/material.dart';
import 'package:tadstech/core/theme/app_theme.dart';
import 'package:tadstech/core/widgets/timeline_item.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('About tadstech'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: CircleAvatar(
                radius: 80,
                backgroundColor: AppTheme.primaryColor.withOpacity(0.2),
                child: const Icon(
                  Icons.person,
                  size: 60,
                  color: AppTheme.primaryColor,
                ),
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'The Average Data Scientist',
              style: Theme.of(context).textTheme.headlineMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            const Text(
              'Our mission is to make data science accessible and practical for businesses of all sizes. '
              'We believe in clean code, reproducible research, and clear communication of insights.',
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            Text(
              'Our Story',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 16),
            const Column(
              children: [
                TimelineItem(
                  year: '2018',
                  title: 'Founded',
                  description: 'Started as a solo data science consultant',
                ),
                TimelineItem(
                  year: '2019',
                  title: 'First Major Project',
                  description: 'Built predictive models for retail client',
                ),
                TimelineItem(
                  year: '2020',
                  title: 'Team Expansion',
                  description: 'Added two more data scientists to the team',
                ),
                TimelineItem(
                  year: '2022',
                  title: 'Open Source',
                  description: 'Began releasing tools and templates on GitHub',
                ),
                TimelineItem(
                  year: '2023',
                  title: 'Current',
                  description: 'Serving clients across multiple industries',
                ),
              ],
            ),
            const SizedBox(height: 32),
            Text(
              'Our Stack',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: const [
                Chip(label: Text('Python')),
                Chip(label: Text('Pandas')),
                Chip(label: Text('NumPy')),
                Chip(label: Text('Scikit-learn')),
                Chip(label: Text('TensorFlow')),
                Chip(label: Text('Flutter')),
                Chip(label: Text('Dart')),
                Chip(label: Text('SQL')),
                Chip(label: Text('Git')),
                Chip(label: Text('Docker')),
              ],
            ),
          ],
        ),
      ),
    );
  }
}