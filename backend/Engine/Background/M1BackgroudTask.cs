using Microsoft.Extensions.Hosting;
using System.Diagnostics;

namespace Episafe.Engine.Background
{
    public class M1BackgroudTask : BackgroundService
    {
        private readonly ILogger<M1BackgroudTask> _logger;
        internal static Supabase.Client Client { get; set; }

        public M1BackgroudTask(ILogger<M1BackgroudTask> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var current = DateTime.Now;
                var watch = new Stopwatch();
                watch.Start();
                watch.Stop();
                _logger.LogInformation($"> M1 // [END JOB] -> Took {watch.Elapsed.TotalSeconds.ToString()} seconds.");

                await Task.Delay(60 * 1000, stoppingToken);
            }
        }
    }
}
