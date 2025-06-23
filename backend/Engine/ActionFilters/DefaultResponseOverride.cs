using Episafe.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using static System.Net.Mime.MediaTypeNames;

namespace Episafe.Engine.ActionFilters
{
    public class DefaultResponseOverride : IAsyncResultFilter
    {
        public async Task OnResultExecutionAsync(ResultExecutingContext context, ResultExecutionDelegate next)
        {
            var result = context.Result as ObjectResult;
            if (result != null)
                context.Result = new JsonResult(new GenericAPIResponse<object>(result.Value, ""));
            else
                context.Result = new JsonResult(new GenericAPIResponse<object>(null, ""));

            var ctx = await next();
        }
    }
}
