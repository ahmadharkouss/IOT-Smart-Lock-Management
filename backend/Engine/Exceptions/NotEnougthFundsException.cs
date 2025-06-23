using System.Net;

namespace Episafe.Engine.Exceptions
{
    public class NotEnougthFundsException : MiddlewareBaseException
    {
        public override HttpStatusCode Status => HttpStatusCode.NotAcceptable;
        public NotEnougthFundsException(int requested, int available_fund) : base($"You dot not have enougth fund within your account to perform the operation.\nYou have requested {requested} but you have {available_fund} available.") { }
    }
}
