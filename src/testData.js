const response = {
  response_code:0,
  results:[
    {
      category:"Vehicles",
      type:"multiple",
      difficulty:"easy",
      question:"Which Italian city is home of the car manufacturer &#039;Fiat&#039;?",
      correct_answer:"Turin",
      incorrect_answers:["Maranello","Modena","Rome"]
    },
    {
      category:"Geography",
      type:"multiple",
      difficulty:"medium",
      question:"What event led to Liechenstein adding a crown to its flag?",
      correct_answer:"The 1936 Olympics",
      incorrect_answers:["Coronation of Prince Johann I Joseph in 1805","Charles VI&#039;s decree in 1719","Signing of the 1862 Constitution of Liechtenstein"]
    },
    {
      category:"Entertainment: Japanese Anime & Manga",
      type:"boolean",
      difficulty:"easy",
      question:"In the &quot;Toaru Kagaku no Railgun&quot; anime,  espers can only reach a maximum of level 6 in their abilities.",
      correct_answer:"False",
      incorrect_answers:["True"]
    }
  ]
}

export default response;