import 'package:flutter/material.dart';
import 'package:tadstech/core/widgets/casestudy_card.dart';
import 'package:tadstech/core/widgets/responsive_layout.dart';
import 'package:tadstech/core/widgets/skill_chip.dart';
import 'package:tadstech/core/widgets/tool_card.dart';

class ModelingTab extends StatelessWidget {
  const ModelingTab({super.key});

  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme.onBackground;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Predictive Modeling',
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'We build robust predictive models tailored to your specific business needs. '
            'From regression to classification, our models are rigorously tested and optimized for performance.',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: color.withOpacity(0.9),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 32),
          Text(
            'Modeling Approaches:',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: const [
              SkillChip(label: 'Linear Regression'),
              SkillChip(label: 'Logistic Regression'),
              SkillChip(label: 'Decision Trees'),
              SkillChip(label: 'Random Forests'),
              SkillChip(label: 'Neural Networks'),
              SkillChip(label: 'Time Series Forecasting'),
            ],
          ),
          const SizedBox(height: 32),
          Text(
            'Modeling Stack:',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
          const SizedBox(height: 16),
          ResponsiveLayout(
            mobile: Column(
              children: const [
                ToolCard(
                  icon: Icons.science,
                  name: 'Scikit-learn',
                  description: 'Traditional ML algorithms',
                ),
                SizedBox(height: 16),
                ToolCard(
                  icon: Icons.linear_scale,
                  name: 'Statsmodels',
                  description: 'Statistical modeling',
                ),
                SizedBox(height: 16),
                ToolCard(
                  icon: Icons.connecting_airports,
                  name: 'TensorFlow',
                  description: 'Deep learning framework',
                ),
                SizedBox(height: 16),
                ToolCard(
                  icon: Icons.auto_awesome,
                  name: 'XGBoost',
                  description: 'Gradient boosting',
                ),
              ],
            ),
            desktop: GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              mainAxisSpacing: 20,
              crossAxisSpacing: 20,
              childAspectRatio: 3.5,
              children: const [
                ToolCard(
                  icon: Icons.science,
                  name: 'Scikit-learn',
                  description: 'Traditional ML algorithms',
                ),
                ToolCard(
                  icon: Icons.linear_scale,
                  name: 'Statsmodels',
                  description: 'Statistical modeling',
                ),
                ToolCard(
                  icon: Icons.connecting_airports,
                  name: 'TensorFlow',
                  description: 'Deep learning framework',
                ),
                ToolCard(
                  icon: Icons.auto_awesome,
                  name: 'XGBoost',
                  description: 'Gradient boosting',
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          Text(
            'Recent Projects:',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
          const SizedBox(height: 16),
          ResponsiveLayout(
            mobile: Column(
              children: [
                _caseStudy(
                  title: 'Customer Lifetime Value Model',
                  description:
                      'Built a regression model to predict the lifetime value of e-commerce users.',
                  tags: ['Regression', 'CLV', 'Scikit-learn'],
                  icon: Icons.trending_up,
                ),
                const SizedBox(height: 16),
                _caseStudy(
                  title: 'Loan Default Prediction',
                  description:
                      'Classified high-risk borrowers using logistic regression and XGBoost.',
                  tags: ['Classification', 'Finance', 'XGBoost'],
                  icon: Icons.account_balance,
                ),
              ],
            ),
            desktop: GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              mainAxisSpacing: 20,
              crossAxisSpacing: 20,
              childAspectRatio: 1.8,
              children: [
                _caseStudy(
                  title: 'Customer Lifetime Value Model',
                  description:
                      'Built a regression model to predict the lifetime value of e-commerce users.',
                  tags: ['Regression', 'CLV', 'Scikit-learn'],
                  icon: Icons.trending_up,
                ),
                _caseStudy(
                  title: 'Loan Default Prediction',
                  description:
                      'Classified high-risk borrowers using logistic regression and XGBoost.',
                  tags: ['Classification', 'Finance', 'XGBoost'],
                  icon: Icons.account_balance,
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          Text(
            'Model Evaluation Metrics:',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: color,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'We use metrics like RMSE, AUC-ROC, precision, recall, and F1 score depending on the model type.',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
              color: color.withOpacity(0.9),
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }

  Widget _caseStudy({
    required String title,
    required String description,
    required List<String> tags,
    required IconData icon,
  }) {
    return CaseStudyCard(
      title: title,
      description: description,
      tags: tags,
      icon: icon,
    );
  }
}
