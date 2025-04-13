import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'screens/chat_screen.dart';
import 'repositories/chat_repository.dart';
import 'blocs/chat_bloc.dart';

void main() {
  runApp(
    BlocProvider(
      create: (_) => ChatBloc(ChatRepository()),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Socket Chat',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: ChatScreen(),
    );
  }
}
