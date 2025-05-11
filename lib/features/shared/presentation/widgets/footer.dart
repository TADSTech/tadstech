import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:tadstech/core/theme/app_theme.dart';
import 'package:tadstech/core/widgets/responsive_layout.dart';
import 'package:tadstech/core/widgets/social_icon.dart';

class Footer extends StatelessWidget {
  const Footer({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 24),
      color: Colors.grey[900],
      width: double.infinity,
      child: ResponsiveLayout(
        mobile: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildLogo(context),
            const SizedBox(height: 32),
            _buildLinksColumn(context),
            const SizedBox(height: 32),
            _buildSocialIcons(),
            const SizedBox(height: 32),
            _buildCopyright(),
          ],
        ),
        desktop: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Wrap(
              alignment: WrapAlignment.spaceBetween,
              runSpacing: 24,
              spacing: 48,
              children: [
                _buildLogo(context),
                _buildLinksColumn(context),
                _buildSocialIcons(),
              ],
            ),
            const SizedBox(height: 40),
            Align(alignment: Alignment.center, child: _buildCopyright()),
          ],
        ),
      ),
    );
  }

  Widget _buildLogo(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'TADSTech',
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'The Average Data Scientist',
          style: Theme.of(
            context,
          ).textTheme.bodyMedium?.copyWith(color: Colors.white70),
        ),
      ],
    );
  }

  Widget _buildLinksColumn(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Quick Links',
          style: TextStyle(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        ...[
          ['Home', '/'],
          ['Services', '/services'],
          ['GitHub', '/github'],
          ['About', '/about'],
          ['Contact', '/contact'],
        ].map(
          (item) => Padding(
            padding: const EdgeInsets.symmetric(vertical: 6),
            child: InkWell(
              onTap: () => context.go(item[1]),
              child: Text(
                item[0],
                style: const TextStyle(color: Colors.white70, fontSize: 16),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSocialIcons() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Connect With Us',
          style: TextStyle(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: const [
            SocialIcon(
              icon: Icons.code,
              url: 'https://github.com/tadstech',
              color: Colors.white,
            ),
            SizedBox(width: 16),
            SocialIcon(
              icon: Icons.work,
              url: 'https://linkedin.com/company/tadstech',
              color: Colors.white,
            ),
            SizedBox(width: 16),
            SocialIcon(
              icon: Icons.chat,
              url: 'https://twitter.com/tadstech',
              color: Colors.white,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildCopyright() {
    return Text(
      '© ${DateTime.now().year} TADSTech. All rights reserved.',
      style: const TextStyle(color: Colors.white54, fontSize: 14),
      textAlign: TextAlign.center,
    );
  }
}
