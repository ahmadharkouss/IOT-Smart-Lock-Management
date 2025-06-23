using Episafe.Data;
using Episafe.Engine.Exceptions;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;

namespace Episafe
{
    public  class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        public async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = Text.Plain;

            var exceptionHandlerPathFeature = exception as IMiddlewareBaseException;
            if (exceptionHandlerPathFeature != null)
            {
                var resp = new GenericAPIResponse<string>("", exceptionHandlerPathFeature.Description, (int)exceptionHandlerPathFeature.Status);
                context.Response.StatusCode = resp.Code;

                await context.Response.WriteAsync(JsonSerializer.Serialize(resp));
            }
            else
            {
                if (exception != null)
                {
                    var resp = new GenericAPIResponse<object>("", exception.Message, 500);
                    context.Response.StatusCode = resp.Code;
                    await context.Response.WriteAsync(JsonSerializer.Serialize(resp));
                }               
            }
        }
    }
}
