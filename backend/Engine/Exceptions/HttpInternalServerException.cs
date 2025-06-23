using System.Net;

namespace Episafe.Engine.Exceptions
{
    public class HttpInternalServerException : MiddlewareBaseException
    {
        public override HttpStatusCode Status => HttpStatusCode.InternalServerError;
        public HttpInternalServerException(string description) : base(description) { }
    }
}
