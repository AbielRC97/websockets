const ChatView = Backbone.View.extend({
    el: '#app',

    template: Curso.Templates["chat"],

    initialize() {
        this.messages = new MessagesCollection();
        this.socket = io('http://localhost:3000/chat'); // Conexión al namespace /chat
        this.listenToSocket();
        this.render();
    },

    events: {
        'click #send-btn': 'sendMessage'
    },

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        const itemTemplate = Curso.Templates["item"];
        const html = itemTemplate(this.messages.toJSON());
        this.$('#chat-messages').html(html);
        return this;
    },

    listenToSocket() {
        this.socket.on('messageToClient', (data) => {
            this.addMessage(new MessageModel({
                ...data
            }));
        });
    },

    sendMessage() {
        const user = this.$('#user').val();
        const message = this.$('#message').val();

        if (user && message) {
            this.socket.emit('messageToServer', { user, message });
            this.$('#message').val('');
        }
    },

    addMessage(data) {
        this.messages.add(data);
        this.render();
    },
});
