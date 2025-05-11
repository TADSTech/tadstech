import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import 'package:tadstech/core/theme/app_theme.dart';
import 'package:tadstech/core/widgets/responsive_layout.dart';
import 'package:tadstech/features/home/presentation/widgets/cross_platform_section.dart';
import 'package:tadstech/features/home/presentation/widgets/flutter_benefits.dart';
import 'package:tadstech/features/home/presentation/widgets/hero_section.dart';
import 'package:tadstech/features/home/presentation/widgets/services_preview.dart';
import 'package:tadstech/features/shared/presentation/widgets/footer.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final ScrollController _scrollController = ScrollController();
  bool _isScrolled = false;

  final Map<String, GlobalKey> sectionKeys = {
    'home': GlobalKey(),
    'services': GlobalKey(),
    'features': GlobalKey(),
  };

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_handleScroll);
  }

  @override
  void dispose() {
    _scrollController.removeListener(_handleScroll);
    _scrollController.dispose();
    super.dispose();
  }

  void _handleScroll() {
    setState(() {
      _isScrolled = _scrollController.offset > 50;
    });
  }

  void _scrollToSection(String sectionKey) {
    final keyContext = sectionKeys[sectionKey]?.currentContext;
    if (keyContext != null) {
      Scrollable.ensureVisible(
        keyContext,
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeInOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: ResponsiveAppBar(
        isScrolled: _isScrolled,
        onScrollToSection: _scrollToSection,
      ),
      body: SingleChildScrollView(
        controller: _scrollController,
        child: Column(
          children: [
                KeyedSubtree(
                  key: sectionKeys['home'],
                  child: HeroSection(
                    onScrollToFlutter: () => _scrollToSection('features'),
                  ),
                ),
                KeyedSubtree(
                  key: sectionKeys['services'],
                  child: const ServicesPreview(),
                ),
                KeyedSubtree(
                  key: sectionKeys['features'],
                  child: const CrossPlatformSection(),
                ),
                const FlutterBenefitsSection(),
                const Footer(),
              ]
              .animate(interval: 100.ms)
              .fadeIn(duration: 500.ms)
              .slideY(begin: 0.1, end: 0),
        ),
      ),
    );
  }
}

class ResponsiveAppBar extends StatelessWidget implements PreferredSizeWidget {
  final bool isScrolled;
  final Function(String)? onScrollToSection;

  const ResponsiveAppBar({
    super.key,
    this.isScrolled = false,
    this.onScrollToSection,
  });

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Row(
        children: [
          Image.asset('assets/images/logo.png', height: 32, width: 32),
          const SizedBox(width: 12),
          Text(
            'TADSTech',
            style: TextStyle(
              color:
                  isScrolled
                      ? Theme.of(context).colorScheme.onBackground
                      : Colors.white,
              fontWeight: FontWeight.bold,
              fontSize: 24,
            ),
          ),
        ],
      ),
      backgroundColor:
          isScrolled
              ? Theme.of(context).scaffoldBackgroundColor.withOpacity(0.95)
              : Colors.transparent,
      elevation: isScrolled ? 4 : 0,
      centerTitle: false,
      actions:
          ResponsiveLayout.isMobile(context)
              ? [
                IconButton(
                  icon: Icon(
                    Icons.menu,
                    color:
                        isScrolled
                            ? Theme.of(context).colorScheme.onSurface
                            : Colors.white,
                  ),
                  onPressed: () => _showMobileMenu(context),
                ),
                _buildContactButton(context, isScrolled: isScrolled),
              ]
              : [
                _buildNavButton(context, 'Home', '/', sectionId: 'home'),
                _buildNavButton(
                  context,
                  'Services',
                  '/#services',
                  sectionId: 'services',
                ),
                _buildNavButton(
                  context,
                  'Features',
                  '/#features',
                  sectionId: 'features',
                ),
                _buildNavButton(context, 'GitHub', '/github'),
                _buildNavButton(context, 'About', '/about'),
                _buildContactButton(context, isScrolled: isScrolled),
                const SizedBox(width: 16),
              ],
    );
  }

  Widget _buildNavButton(
    BuildContext context,
    String text,
    String route, {
    String? sectionId,
  }) {
    return TextButton(
      onPressed: () {
        if (sectionId != null && onScrollToSection != null) {
          onScrollToSection!(sectionId);
        } else {
          context.go(route);
        }
      },
      child: Text(
        text,
        style: TextStyle(
          color:
              isScrolled
                  ? Theme.of(context).colorScheme.onBackground
                  : Colors.white,
          fontSize: 16,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }

  Widget _buildContactButton(BuildContext context, {required bool isScrolled}) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppTheme.primaryColor,
          foregroundColor: Colors.black,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        ),
        onPressed: () => context.go('/contact'),
        child: const Text('Contact Us'),
      ),
    );
  }

  void _showMobileMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder:
          (context) => Container(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                _buildMobileNavItem(context, 'Home', '/', 'home'),
                _buildMobileNavItem(
                  context,
                  'Services',
                  '/services',
                  'services',
                ),
                _buildMobileNavItem(
                  context,
                  'Features',
                  '/#features',
                  'features',
                ),
                _buildMobileNavItem(context, 'GitHub', '/github', null),
                _buildMobileNavItem(context, 'About', '/about', null),
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: _buildContactButton(context, isScrolled: true),
                ),
              ],
            ),
          ),
    );
  }

  Widget _buildMobileNavItem(
    BuildContext context,
    String text,
    String route,
    String? sectionId,
  ) {
    return ListTile(
      title: Text(
        text,
        style: TextStyle(
          fontSize: 18,
          color: Theme.of(context).colorScheme.onBackground,
        ),
      ),
      onTap: () {
        Navigator.pop(context);
        if (sectionId != null && onScrollToSection != null) {
          onScrollToSection!(sectionId);
        } else {
          context.go(route);
        }
      },
    );
  }
}
