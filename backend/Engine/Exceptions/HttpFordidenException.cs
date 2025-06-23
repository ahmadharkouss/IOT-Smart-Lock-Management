using System.Net;

namespace Episafe.Engine.Exceptions
{
    public class HttpFordidenException : MiddlewareBaseException
    {
        public override HttpStatusCode Status => HttpStatusCode.Forbidden;
        public HttpFordidenException(string description) : base(description) { }
    }
}
