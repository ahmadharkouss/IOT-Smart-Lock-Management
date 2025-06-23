using System.Net;

namespace Episafe.Engine.Exceptions
{
    public interface IMiddlewareBaseException
    {
        public HttpStatusCode Status { get; }
        public string Description { get; set; }
    }

    public abstract class MiddlewareBaseException : Exception, IMiddlewareBaseException
    {
        public abstract HttpStatusCode Status { get; }
        public string Description { get; set; }

        public MiddlewareBaseException(string description)
        {
            Description = description;
        }
    }
}
