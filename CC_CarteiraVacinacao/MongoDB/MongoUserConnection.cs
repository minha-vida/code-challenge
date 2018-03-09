using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CC_CarteiraVacinacao.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace CC_CarteiraVacinacao.MongoDB
{
    public class MongoUserConnection : IMongoConnection<UsuarioModel>
    {
        private static IMongoClient _client = new MongoClient("mongodb://172.19.0.3:27017");
        private static IMongoDatabase _database = _client.GetDatabase("CarteiraVacinacao");

        public MongoUserConnection() { }

        public void SaveCollection(object doc, string collection)
        {
            var col = _database.GetCollection<object>(collection);
            col.InsertOne(doc);
        }

        public List<UsuarioModel> Search(FilterDefinition<UsuarioModel> filter, string collection)
        {
            var col = _database.GetCollection<UsuarioModel>(collection);
            return col.Find(filter).ToList();
        }

        public UsuarioModel Update(FilterDefinition<UsuarioModel> filter, string collection, UsuarioModel doc)
        {
            var col = _database.GetCollection<UsuarioModel>(collection);
            var result = BsonSerializer.Deserialize<UsuarioModel>(col.ReplaceOne(filter, doc).ToBsonDocument());
            return result;
            //return col.FindOneAndUpdate(filter, doc, options).ToBsonDocument();
        }

        public UsuarioModel Delete(FilterDefinition<UsuarioModel> filter, UpdateDefinition<UsuarioModel> up, string collection)
        {
            var col = _database.GetCollection<UsuarioModel>(collection);
            return BsonSerializer.Deserialize<UsuarioModel>(col.DeleteOne(filter).ToBsonDocument());
        }
    }
}
