using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MediatR;
using server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;

namespace server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMemoryCache();

            services.AddMediatR();
            services.AddDbContext<ApplicationDbContext>(options =>
                {
                    var connectionString = Configuration.GetSection("ConnectionStrings").GetValue<string>("DefaultConnection");

                    options.UseSqlServer(connectionString);
                });

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(bearer =>
            {
                bearer.Authority = "https://accounts.google.com/";
                bearer.RequireHttpsMetadata = false;
                bearer.Audience = "820531171267-jeq714dtog6uivk8r0kvcoaid2t8o191.apps.googleusercontent.com";
                bearer.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters {
                    NameClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
                };
            });

            services
                .AddMvc()
                .AddFeatureFolders();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod()
            );

            app.UseAuthentication();
            app.UseMvc();
            app.UseWelcomePage();
        }
    }
}
