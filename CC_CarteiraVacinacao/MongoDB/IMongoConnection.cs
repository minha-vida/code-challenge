using System;
using System.Collections.Generic;
using CC_CarteiraVacinacao.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace CC_CarteiraVacinacao.MongoDB
{
    interface IMongoConnection<T>
    {
        void SaveCollection(object doc, string collection);
        List<T> Search(FilterDefinition<T> filter, string collection);
        T Update(FilterDefinition<T> filter, string collection, T doc);
        T Delete(FilterDefinition<T> filter, UpdateDefinition<T> up, string collection);
    }
}
