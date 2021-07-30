using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly PrimeContext Db;

        public QuestionController(PrimeContext db)
        {
            Db = db;
        }

    }
}
