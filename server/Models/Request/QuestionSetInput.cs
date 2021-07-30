using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Request
{
    public class QuestionSetInput
    {
        public List<QuestionInput> Questions {  get; set; }
        public string Title {  get; set; }
        public bool Private { get; set; }

    }
}
