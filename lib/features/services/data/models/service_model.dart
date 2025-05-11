import 'package:flutter/material.dart';

class ServiceModel {
  final String title;
  final String description;
  final IconData icon;
  final String route;
  final List<String>? tools;
  final List<String>? features;

  ServiceModel({
    required this.title,
    required this.description,
    required this.icon,
    required this.route,
    this.tools,
    this.features,
  });

  factory ServiceModel.fromJson(Map<String, dynamic> json) {
    return ServiceModel(
      title: json['title'],
      description: json['description'],
      icon: json['icon'],
      route: json['route'],
      tools: json['tools'] != null ? List<String>.from(json['tools']) : null,
      features:
          json['features'] != null ? List<String>.from(json['features']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'description': description,
      'icon': icon,
      'route': route,
      'tools': tools,
      'features': features,
    };
  }
}
