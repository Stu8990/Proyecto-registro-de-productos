using CoreWCF;
using CoreWCF.Configuration;
using Microsoft.EntityFrameworkCore;
using ServicioProductosSOA.Data;
using ServicioProductosSOA.Services;

var builder = WebApplication.CreateBuilder(args);

// Entity Framework + PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        "Host=localhost;Port=5433;Database=postgres;Username=postgres;Password=admin"
    ));

// Registrar los servicios
builder.Services.AddScoped<TipoProductoService>();
builder.Services.AddScoped<ProductoService>();

// CoreWCF
builder.Services.AddServiceModelServices();
builder.Services.AddServiceModelMetadata();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        p => p.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Construir la aplicación DESPUÉS de configurar todos los servicios
var app = builder.Build();

app.UseCors("AllowAngular");

app.UseServiceModel(serviceBuilder =>
{
    serviceBuilder.AddService<TipoProductoService>();
    serviceBuilder.AddServiceEndpoint<TipoProductoService, ITipoProductoService>(
        new BasicHttpBinding(), "/TipoProductoService.svc");

    serviceBuilder.AddService<ProductoService>();
    serviceBuilder.AddServiceEndpoint<ProductoService, IProductoService>(
        new BasicHttpBinding(), "/ProductoService.svc");

    var serviceMetadataBehavior = app.Services.GetRequiredService<CoreWCF.Description.ServiceMetadataBehavior>();
    serviceMetadataBehavior.HttpGetEnabled = true;
});

app.Run();
