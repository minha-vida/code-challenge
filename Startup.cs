using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using challenge.Data;

namespace challenge
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
            // services.AddMiniProfiler(options =>
            // {
            //     options.SqlFormatter = new StackExchange.Profiling.SqlFormatters.InlineFormatter();
            //     options.TrackConnectionOpenClose = true;
            //     options.ResultsAuthorize = request => { return true; };
            //     options.RouteBasePath = "/profiler";
            // });

            // services.AddMediatR();
            services.AddDbContext<ApplicationDbContext>(options =>
                {
                    var connectionString = Configuration.GetSection("ConnectionStrings").GetValue<string>("DefaultConnection");

                    options.UseSqlServer(connectionString);
                });
        }

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
            // app.UseMiniProfiler();
            // app.UseAuthentication();
            app.UseMvc();
            app.UseWelcomePage();
        }
    }
}
