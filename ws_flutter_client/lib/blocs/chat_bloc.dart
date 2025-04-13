import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import '../models/chat_message.dart';
import '../repositories/chat_repository.dart';

// Eventos
abstract class ChatEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class SendMessageEvent extends ChatEvent {
  final String user;
  final String message;

  SendMessageEvent(this.user, this.message);

  @override
  List<Object?> get props => [user, message];
}

class ReceiveMessageEvent extends ChatEvent {
  final ChatMessage message;

  ReceiveMessageEvent(this.message);

  @override
  List<Object?> get props => [message];
}

// Estado
class ChatState extends Equatable {
  final List<ChatMessage> messages;

  const ChatState(this.messages);

  @override
  List<Object?> get props => [messages];
}

// BLoC
class ChatBloc extends Bloc<ChatEvent, ChatState> {
  final ChatRepository repository;

  ChatBloc(this.repository) : super(const ChatState([])) {
    on<SendMessageEvent>((event, emit) {
      repository.sendMessage(event.user, event.message);
    });

    on<ReceiveMessageEvent>((event, emit) {
      final updated = List<ChatMessage>.from(state.messages)..add(event.message);
      emit(ChatState(updated));
    });

    repository.connect((data) {
      add(ReceiveMessageEvent(ChatMessage.fromJson(data)));
    });
  }

  @override
  Future<void> close() {
    repository.disconnect();
    return super.close();
  }
}
