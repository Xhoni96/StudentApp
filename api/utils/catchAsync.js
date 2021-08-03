/**
 *  Used to catch errors in async functions
 * @param {*Callback} callback function
 * @returns {*Callback}
 */
module.exports = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// module.exports = (fn) => {
//   return (req, res, next) => {
//     return fn(req, res, next).catch(next);
//   };
// };

/*
 
 NOW. E kemi krijuar kete funksion qe te eleminojme try catch blocks ne async functions. Ajo qe ndodh eshte qe ky merr si callback nje middleware function
 i cili eshte funksioni qe do te therritej nga express kur ndodh nje thirrje psh getTour etj. Por ne te vertete tani express do te therrasi catchAsync dhe jo
  ate callback function qe ben manpulimin e databazes.Tani funksioni me siper catchAsync do te ktheje nje callbackfunction i cili do te ekzekutoje funksionin fn qe ne
  i kaluam si parameter, pra funksionin async qe ben manipulimin e DB. Ai callback eshte async qe dmthn kthen nje promise dhe duke qene se kthen nje promise kemi akses
   tek .catch si cdo promise dhe asaj .catch i kalojme si parameter funks next i cili do te therritet dhe do e coje errorin te funksioni jone qe kemi krijuar per 
   GLOBAL error handling dhe do te coje resp te klienti.  .catch(next) eshte shkurtim per .catch(err => next(err)) . Pra gjithe magjia ndodh tek funksioni fn qe therritet.
  
    Tani per pjesen qe pse kthejme nga ky funksion nje anonymous function qe ka fn() brenda. Sepse funksioni fn nuk ka akses tek res,req,next, keshtu qe ne i kthejme
    expressit nje anonymous function qe ai me pas e ekzekuton fn() function dhe aty ka aksses te ato variablat dhe ndodh e gjitha


    Kete funksion mund ta kishim vendos edhe direkt tek TourRoutes atje para route por duke qene se ky funks kap vetem async functions mund te kemi funksione qe sdo jene
    async ne te ardhmen dhe kjo do te sjelli bug
  */
