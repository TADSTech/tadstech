import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:tadstech/core/theme/app_theme.dart';
import 'package:tadstech/core/widgets/responsive_layout.dart';
import 'package:tadstech/features/services/presentation/widgets/data_cleaning_tab.dart';
import 'package:tadstech/features/services/presentation/widgets/data_viz_tab.dart';
import 'package:tadstech/features/services/presentation/widgets/eda_tab.dart';
import 'package:tadstech/features/services/presentation/widgets/modeling_tab.dart';

class ServicesPage extends StatefulWidget {
  const ServicesPage({super.key});

  @override
  State<ServicesPage> createState() => _ServicesPageState();
}

class _ServicesPageState extends State<ServicesPage>
    with TickerProviderStateMixin {
  static const tabMapping = {
    'data_cleaning': 0,
    'data_viz': 1,
    'modeling': 2,
    'eda': 3,
  };

  static const reverseMapping = [
    'data_cleaning',
    'data_viz',
    'modeling',
    'eda',
  ];

  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    final uri = Uri.base;
    final initialTab = uri.queryParameters['tab'] ?? 'data_cleaning';
    final initialIndex = tabMapping[initialTab] ?? 0;

    _tabController = TabController(
      length: 4,
      vsync: this,
      initialIndex: initialIndex,
    );

    _tabController.addListener(() {
      if (_tabController.indexIsChanging) return;
      final tabKey = reverseMapping[_tabController.index];
      final uri = Uri(path: '/services', queryParameters: {'tab': tabKey});
      context.go(uri.toString());
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isMobile = ResponsiveLayout.isMobile(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Our Services'),
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        elevation: isMobile ? 0 : 4,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(kToolbarHeight),
          child: Container(
            alignment: Alignment.centerLeft,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: TabBar(
              controller: _tabController,
              isScrollable: true,
              indicatorColor: AppTheme.primaryColor,
              labelColor: AppTheme.primaryColor,
              unselectedLabelColor: Colors.grey[600],
              tabs: const [
                Tab(text: 'Data Cleaning', icon: Icon(Icons.cleaning_services)),
                Tab(text: 'Data Viz', icon: Icon(Icons.insights)),
                Tab(text: 'Modeling', icon: Icon(Icons.trending_up)),
                Tab(text: 'EDA & Stats', icon: Icon(Icons.query_stats)),
              ],
            ),
          ),
        ),
      ),
      body: Container(
        padding:
            isMobile
                ? const EdgeInsets.symmetric(horizontal: 16, vertical: 12)
                : const EdgeInsets.all(32),
        child: TabBarView(
          controller: _tabController,
          children: const [
            DataCleaningTab(),
            DataVizTab(),
            ModelingTab(),
            EDATab(),
          ],
        ),
      ),
    );
  }
}
