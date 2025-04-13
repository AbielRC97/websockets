import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../blocs/chat_bloc.dart';

class ChatScreen extends StatelessWidget {
  final TextEditingController userCtrl = TextEditingController();
  final TextEditingController msgCtrl = TextEditingController();

  ChatScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Chat")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: userCtrl,
              decoration: const InputDecoration(labelText: 'Tu nombre'),
            ),
            TextField(
              controller: msgCtrl,
              decoration: const InputDecoration(labelText: 'Mensaje'),
            ),
            const SizedBox(height: 8),
            ElevatedButton(
              onPressed: () {
                context.read<ChatBloc>().add(
                  SendMessageEvent(userCtrl.text, msgCtrl.text),
                );
                msgCtrl.clear();
              },
              child: const Text("Enviar"),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: BlocBuilder<ChatBloc, ChatState>(
                builder: (context, state) {
                  return ListView.builder(
                    itemCount: state.messages.length,
                    itemBuilder: (_, i) {
                      final msg = state.messages[i];
                      return ListTile(
                        title: Text(msg.user),
                        subtitle: Text(msg.message),
                      );
                    },
                  );
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
