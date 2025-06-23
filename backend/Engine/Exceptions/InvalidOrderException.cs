using System.Net;

namespace Episafe.Engine.Exceptions
{
    public class InvalidOrderException : MiddlewareBaseException
    {
        public override HttpStatusCode Status => HttpStatusCode.NotAcceptable;
        public InvalidOrderException(string desc) : base(desc) { }
    }
}
