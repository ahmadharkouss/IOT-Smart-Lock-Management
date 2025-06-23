
using Episafe.Data;
using Episafe.Engine.ActionFilters;
using Episafe.Engine.Background;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Supabase;
using System.Text;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;

namespace Episafe
{
    public class Program
    {
        public static void Main(string[] args)
        {
            bool auth_enabled = true;

            var url = Environment.GetEnvironmentVariable("SUPABASE_URL");
            var key = Environment.GetEnvironmentVariable("SUPABASE_SERVICE_KEY");
            
            var auth_env = Environment.GetEnvironmentVariable("AUTH_ENABLED");
            var jwt_issuer = Environment.GetEnvironmentVariable("AUTH_JWT_KEY_ISSUER");
            var jwt = Environment.GetEnvironmentVariable("AUTH_JWT_KEY");

            if (string.IsNullOrEmpty(url))
                throw new Exception("You need to specify a 'SUPABASE_URL' environement variable, when developping, please update `Properties/launchSettings.json`");
            
            if (string.IsNullOrEmpty(key))
                throw new Exception("You need to specify a 'SUPABASE_SERVICE_KEY' environement variable, when developping, please update `Properties/launchSettings.json`");

            if (string.IsNullOrEmpty(jwt_issuer))
                throw new Exception("You need to specify a 'AUTH_JWT_KEY_ISSUER' environement variable, when developping, please update `Properties/launchSettings.json`");

            if (string.IsNullOrEmpty(jwt))
                throw new Exception("You need to specify a 'AUTH_JWT_KEY' environement variable, when developping, please update `Properties/launchSettings.json`");

            if (!string.IsNullOrEmpty(auth_env))
                bool.TryParse(auth_env, out auth_enabled);

            var options = new Supabase.SupabaseOptions
            {
                AutoConnectRealtime = true
            };

            var supabase = new Supabase.Client(url, key, options);
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var client = new Supabase.Client(url, key, options);
            client.InitializeAsync().Wait();
            M1BackgroudTask.Client = client;

            // Note the creation of the supabase client as a singleton.
            builder.Services.AddSingleton(provider => client);
            builder.Services.AddHostedService<M1BackgroudTask>();

            builder.Services.AddControllers(o =>
            {
                o.Filters.Add(typeof(DefaultResponseOverride));
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Episafe (API)", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "",
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });

            });

            if (auth_enabled)
            {
                builder.Services.AddAuthorization();
                builder.Services.AddAuthentication((options) =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

                }).AddJwtBearer(o =>
                {
                    o.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = ctx => {
                            if (ctx.Request.Headers.ContainsKey("Authorization"))
                            {
                                var bearerToken = ctx.Request.Headers["Authorization"].ElementAt(0);
                                var token = bearerToken;
                                ctx.Token = token;
                            }
                            return Task.CompletedTask;
                        }
                    };

                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt)),
                        // ValidAudiences = new List<string>() { "authenticated" },
                        // ValidIssuer = jwt_issuer
                    };
                });
            }

            var app = builder.Build();

            // Register our custom global exception middleware system
            // app.RegisterGloabalExceptionMiddleware();           

            app.UseMiddleware<GlobalExceptionMiddleware>();

            if (auth_enabled)
            {
                app.UseAuthentication();
                app.UseAuthorization();
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger((x) => { });
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.UseCors(builder =>
            {
                builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            });

            app.Run();
        }
    }
}
