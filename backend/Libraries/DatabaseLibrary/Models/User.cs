using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DatabaseLibrary.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("email")]
    public string Email { get; set; } = string.Empty;

    public string AvatarUrl { get; set; } = string.Empty;
}