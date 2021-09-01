using Microsoft.AspNetCore.SignalR;
namespace server.Controllers
{
    public class GameHub: Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
            Console.WriteLine($"User connected. UserIdentifier: {Context.UserIdentifier} ConnectionId: {Context.ConnectionId} User: {Context.User.Identity.Name}");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
            Console.WriteLine($"User disconnected. UserIdentifier: {Context.UserIdentifier} ConnectionId: {Context.ConnectionId} User: {Context.User.Identity.Name}");
        }
    }
}

