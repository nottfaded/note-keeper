FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5002

FROM mcr.microsoft.com/dotnet/sdk:9.0-windowsservercore-ltsc2022 AS build
WORKDIR /src

COPY ["Services/NotesService/NotesService.csproj", "NotesService/"]
COPY ["Libraries/JwtLibrary/JwtLibrary.csproj", "JwtLibrary/"]
COPY ["Libraries/DatabaseLibrary/DatabaseLibrary.csproj", "DatabaseLibrary/"]

RUN dotnet restore "NotesService/NotesService.csproj"

COPY . .
WORKDIR "/src/NotesService"
RUN dotnet build "NotesService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NotesService.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NotesService.dll"]
