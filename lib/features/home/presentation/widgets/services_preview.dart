import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import 'package:tadstech/core/widgets/responsive_layout.dart';
import 'package:tadstech/core/widgets/service_card.dart';
import 'package:tadstech/features/services/data/models/service_model.dart';

class ServicesPreview extends StatelessWidget {
  const ServicesPreview({super.key});

  @override
  Widget build(BuildContext context) {
    final services = [
      ServiceModel(
        title: 'Data Cleaning',
        description: 'Transform messy data into analysis-ready datasets.',
        icon: Icons.cleaning_services,
        route: '/services?tab=data_cleaning',
      ),
      ServiceModel(
        title: 'Data Visualization',
        description: 'Create insightful and beautiful visualizations.',
        icon: Icons.insights,
        route: '/services?tab=data_viz',
      ),
      ServiceModel(
        title: 'Regression & Modeling',
        description: 'Build predictive models for your business needs.',
        icon: Icons.trending_up,
        route: '/services?tab=modeling',
      ),
      ServiceModel(
        title: 'EDA & Statistics',
        description: 'Comprehensive exploratory data analysis.',
        icon: Icons.query_stats,
        route: '/services?tab=eda',
      ),
    ];

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 60),
      color: Theme.of(context).colorScheme.background.withOpacity(0.95),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            'Our Services',
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: Theme.of(context).colorScheme.onBackground,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Comprehensive data science solutions tailored to your needs',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: Theme.of(context).colorScheme.onBackground,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 40),
          _buildServicesGrid(context, services),
        ],
      ),
    );
  }

  Widget _buildServicesGrid(BuildContext context, List<ServiceModel> services) {
    return ResponsiveLayout(
      mobile: _buildMobileGrid(context, services),
      desktop: _buildDesktopGrid(context, services),
    );
  }

  Widget _buildMobileGrid(BuildContext context, List<ServiceModel> services) {
    return SizedBox(
      height: 320, // Fixed height for mobile grid
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: services.length,
        itemBuilder: (context, index) {
          return Padding(
            padding: EdgeInsets.only(
              left: index == 0 ? 0 : 12,
              right: index == services.length - 1 ? 0 : 12,
            ),
            child: SizedBox(
              width: MediaQuery.of(context).size.width * 0.8,
              child: _buildServiceCard(context, services[index]),
            ),
          );
        },
      ),
    );
  }

  Widget _buildDesktopGrid(BuildContext context, List<ServiceModel> services) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: services.length.clamp(1, 4),
        mainAxisSpacing: 24,
        crossAxisSpacing: 24,
        childAspectRatio: 0.85,
      ),
      itemCount: services.length,
      itemBuilder:
          (context, index) => _buildServiceCard(context, services[index]),
    );
  }

  Widget _buildServiceCard(BuildContext context, ServiceModel service) {
    final uri = Uri.parse(service.route);
    return Material(
      borderRadius: BorderRadius.circular(12),
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () => context.go(uri.path, extra: uri.queryParameters),
        child: ServiceCard(
          service: service,
        ).animate().fadeIn(duration: 500.ms).slideY(begin: 0.1),
      ),
    );
  }
}
