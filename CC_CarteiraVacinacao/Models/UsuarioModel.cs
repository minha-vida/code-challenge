using CC_CarteiraVacinacao.MongoDB;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CC_CarteiraVacinacao.Models
{
    public class UsuarioModel
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string ProfilePhoto { get; set; }
        public bool IsUserActive { get; set; }
        public IList<VacinaModel> Vaccines { get; set; }
        private string Collection;

        public UsuarioModel()
        {
            Collection = "carteira";
        }

        public bool Save()
        {
            try
            {
                IMongoConnection<UsuarioModel> conn = new MongoUserConnection();
                this.Id = ObjectId.GenerateNewId();
                conn.SaveCollection(this, Collection);
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        [Authorize]
        public UsuarioModel SearchWithoutPass(string email)
        {
            Email = email;
            Password = null;
            return Search();
        }

        public UsuarioModel Search()
        {
            try
            {
                IMongoConnection<UsuarioModel> conn = new MongoUserConnection();

                var builder = Builders<UsuarioModel>.Filter;
                FilterDefinition<UsuarioModel> filter;

                if (Password != null)
                    filter = builder.Eq("Email", Email) & builder.Eq("Password", Password);
                else
                    filter = builder.Eq("Email", Email); 

                IList<UsuarioModel> users = conn.Search(filter, Collection);

                if (users != null)
                {
                    if (users.Count > 0)
                        return users[0];
                    else
                        return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(string.Format("Erro durante busca de dados, {0}", ex.Message));
            }

            return null;
        }

        [Authorize]
        public UsuarioModel Update()
        {
            try
            {
                IMongoConnection<UsuarioModel> conn = new MongoUserConnection();
                FilterDefinition<UsuarioModel> filter = Builders<UsuarioModel>.Filter.Eq("_id", Id);
                return conn.Update(filter, Collection, this);
            }
            catch(Exception ex)
            {
                return null;
            }
        }
    }
}
