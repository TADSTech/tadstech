import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:tadstech/core/widgets/social_icon.dart';
import 'package:url_launcher/url_launcher.dart';

class ContactPage extends StatefulWidget {
  const ContactPage({super.key});

  @override
  State<ContactPage> createState() => _ContactPageState();
}

class _ContactPageState extends State<ContactPage> {
  final _formKey = GlobalKey<FormBuilderState>();
  bool _isSubmitting = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : Colors.black87;
    final backgroundColor = isDark ? Colors.black : Colors.white;

    return Scaffold(
      backgroundColor: backgroundColor,
      appBar: AppBar(
        title: const Text('Contact Us'),
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
                constraints: const BoxConstraints(maxWidth: 800),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      'Get in Touch',
                      style: theme.textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: textColor,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Have questions about our services or want to discuss a project? Fill out the form below and we\'ll get back to you soon.',
                      textAlign: TextAlign.center,
                      style: theme.textTheme.bodyLarge?.copyWith(
                        color: textColor,
                      ),
                    ),
                    const SizedBox(height: 40),
                    Card(
                      elevation: 4,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(24),
                        child: FormBuilder(
                          key: _formKey,
                          child: Column(
                            children: [
                              FormBuilderTextField(
                                name: 'name',
                                decoration: const InputDecoration(
                                  labelText: 'Your Name',
                                  prefixIcon: Icon(Icons.person),
                                ),
                                validator: FormBuilderValidators.required(),
                              ),
                              const SizedBox(height: 20),
                              FormBuilderTextField(
                                name: 'email',
                                decoration: const InputDecoration(
                                  labelText: 'Email Address',
                                  prefixIcon: Icon(Icons.email),
                                ),
                                validator: FormBuilderValidators.compose([
                                  FormBuilderValidators.required(),
                                  FormBuilderValidators.email(),
                                ]),
                              ),
                              const SizedBox(height: 20),
                              FormBuilderTextField(
                                name: 'subject',
                                decoration: const InputDecoration(
                                  labelText: 'Subject',
                                  prefixIcon: Icon(Icons.subject),
                                ),
                                validator: FormBuilderValidators.required(),
                              ),
                              const SizedBox(height: 20),
                              FormBuilderTextField(
                                name: 'message',
                                decoration: const InputDecoration(
                                  labelText: 'Message',
                                  prefixIcon: Icon(Icons.message),
                                ),
                                maxLines: 5,
                                validator: FormBuilderValidators.required(),
                              ),
                              const SizedBox(height: 30),
                              SizedBox(
                                width: double.infinity,
                                child: ElevatedButton(
                                  onPressed: _isSubmitting ? null : _submitForm,
                                  style: ElevatedButton.styleFrom(
                                    padding: const EdgeInsets.symmetric(
                                      vertical: 16,
                                    ),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                  ),
                                  child:
                                      _isSubmitting
                                          ? const CircularProgressIndicator(
                                            valueColor: AlwaysStoppedAnimation(
                                              Colors.white,
                                            ),
                                          )
                                          : const Text(
                                            'Send Message',
                                            style: TextStyle(fontSize: 16),
                                          ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 40),
                    Text(
                      'Or reach out directly',
                      style: theme.textTheme.titleLarge?.copyWith(
                        color: textColor,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 20),
                    Wrap(
                      spacing: 20,
                      runSpacing: 20,
                      alignment: WrapAlignment.center,
                      children: const [
                        ContactInfoCard(
                          icon: Icons.email,
                          title: 'Email Us',
                          value: 'motrenewed@gmail.com',
                        ),
                      ],
                    ),
                    const SizedBox(height: 40),
                    Text(
                      'Follow Us',
                      style: theme.textTheme.titleLarge?.copyWith(
                        color: textColor,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        SocialIcon(
                          icon: Icons.code,
                          url: 'https://github.com/tadstechtech',
                        ),
                        SizedBox(width: 20),
                        SocialIcon(
                          icon: Icons.work,
                          url: 'https://linkedin.com/company/tadstechtech',
                        ),
                        SizedBox(width: 20),
                        SocialIcon(
                          icon: Icons.chat,
                          url: 'https://twitter.com/tadstechtech',
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Future<void> _submitForm() async {
    if (_formKey.currentState?.saveAndValidate() ?? false) {
      final data = _formKey.currentState!.value;
      final name = Uri.encodeComponent(data['name']);
      final email = Uri.encodeComponent(data['email']);
      final subject = Uri.encodeComponent(data['subject']);
      final message = Uri.encodeComponent(data['message']);

      final uri = Uri(
        scheme: 'mailto',
        path: 'motrenewed@gmail.com',
        query: 'subject=$subject&body=Name: $name\nEmail: $email\n\n$message',
      );

      if (await canLaunchUrl(uri)) {
        await launchUrl(uri);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Could not launch email client.'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }
}

class ContactInfoCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String value;

  const ContactInfoCard({
    super.key,
    required this.icon,
    required this.title,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : Colors.black87;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 32, color: theme.primaryColor),
            const SizedBox(width: 16),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: textColor,
                  ),
                ),
                Text(value, style: TextStyle(fontSize: 14, color: textColor)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
