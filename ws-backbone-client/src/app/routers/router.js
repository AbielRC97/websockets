const AppRouter = Backbone.Router.extend({
  routes: {
    '': 'onHome',
  },

  onHome: function () {
    const messageModel = new MessageModel({
      user: '',
      message: ''
    });

    const chatView = new ChatView({
      model: messageModel
    });
    $("#app").append(chatView.render().$el);
  },
});

const appRouter = new AppRouter();
