import 'package:go_router/go_router.dart';
import 'package:tadstech/features/about/presentation/about_page.dart';
import 'package:tadstech/features/contact/presentation/contact_page.dart';
import 'package:tadstech/features/github/presentation/github_page.dart';
import 'package:tadstech/features/home/presentation/home_page.dart';
import 'package:tadstech/features/services/presentation/services_page.dart';

final router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomePage(),
      routes: [
        GoRoute(
          path: 'services',
          builder: (context, state) => const ServicesPage(),
        ),
        GoRoute(
          path: 'github',
          builder: (context, state) => const GitHubPage(),
        ),
        GoRoute(
          path: 'about',
          builder: (context, state) => const AboutPage(),
        ),
        GoRoute(
          path: 'contact',
          builder: (context, state) => const ContactPage(),
        ),
      ],
    ),
  ],
);