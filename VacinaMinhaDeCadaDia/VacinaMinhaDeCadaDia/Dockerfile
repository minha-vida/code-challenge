FROM microsoft/aspnetcore-build:2.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./

# Build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /app
EXPOSE 5000/tcp
COPY --from=build-env /app/publish .
ENTRYPOINT ["dotnet", "VacinaMinhaDeCadaDia.dll"]
ENV TZ=Brazil/East
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone