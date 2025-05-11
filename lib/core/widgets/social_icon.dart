import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:url_launcher/url_launcher.dart';

class SocialIcon extends StatelessWidget {
  final IconData? icon;
  final String? svgAsset;
  final String url;
  final Color? color;
  final double size;

  const SocialIcon({
    super.key,
    this.icon,
    this.svgAsset,
    required this.url,
    this.color,
    this.size = 24,
  }) : assert(
         icon != null || svgAsset != null,
         'Either icon or svgAsset must be provided',
       );

  @override
  Widget build(BuildContext context) {
    final iconColor = color ?? Theme.of(context).colorScheme.onBackground;

    return InkWell(
      borderRadius: BorderRadius.circular(50),
      onTap: () => _launchUrl(url),
      child: Container(
        width: size + 16,
        height: size + 16,
        padding: const EdgeInsets.all(8),
        child: Center(child: _buildIcon(iconColor)),
      ),
    );
  }

  Widget _buildIcon(Color color) {
    if (svgAsset != null) {
      return SvgPicture.asset(
        svgAsset!,
        width: size,
        height: size,
        colorFilter: ColorFilter.mode(color, BlendMode.srcIn),
      );
    } else {
      return Icon(icon, size: size, color: color);
    }
  }

  Future<void> _launchUrl(String url) async {
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    } else {
      throw 'Could not launch $url';
    }
  }
}
