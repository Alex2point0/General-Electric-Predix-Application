/** Script ACLs do not delete
 read=nobody
write=nobody
execute=authenticated
  **/

var location = require("./location.js");
var mappings = require("../mappings.js");
var pedestrianasset = require("../pedestrianasset.js");

/**
 * Class that represents parking Crosswalk entities.
 * @class Crosswalk
 * @constructor Crosswalk
 * @param {Object} dto The  crosswalk location entity returned from predix within a json object.
 * @param {Object} client  the http client used to make authenticated http calls.
 */

function Crosswalk(dto,client){
  if(dto){
    var keys = Object.keys(dto);
   	for (var i=0; i< keys.length; i++) {
         this[keys[i]] = dto[keys[i]];
      }
   }
   this.client = client;
   this.serviceType = "pedestrian";
}
Crosswalk.prototype = new location();


/**
* @method listCrosswalkAssets
* @return {Array} an array of PedestrianAssets that are monitoring that crosswalk.
*/
Crosswalk.prototype.listCrosswalkAssets = function(){
  return new Promise((resolve, reject) => {
    var boundary = boundary1 + "," + boundary2;
    options['queryType'] = 'eventType';
    options['serviceType'] = "pedestrian";
    options['bbox'] = boundary;
    options['zoneId'] = predixconfig.services["pedestrian"].zoneId;

    if(!options['queryValue']  || options['queryValue'] == ""){
      options['queryValue'] = mappings.eventTypes.PEDEVT;
      //+ "," + mappings.eventTypes.PKIN;
    }
    this.listAssets(options).then((assets) =>{
      console.log("List crosswalk assets " + JSON.stringify(assets));
      var parsedAssets = [];;
      for(var i=0;i < assets.length ;i++){
        parsedAssets.push(new pedestrianasset(assets[i],this.client));
      }
      resolve(parsedAssets);
    })
  });
}
module.exports = Crosswalk;
