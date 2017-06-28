/** Script ACLs do not delete
 read=nobody
write=nobody
execute=authenticated
  **/

var location = require("./location.js");
var mappings = require("../mappings.js");
var trafficasset = require("../trafficasset.js");
var predixconfig = require("./../config.js");
/**
/**
 * Class that represents parking assets entities.
 * @class TrafficLane
 * @constructor TrafficLane
 * @param {Object} dto The  traffic lane location entity returned from predix within a json object.
 * @param {Object} client  the http client used to make authenticated http calls.
 */

function TrafficLane(dto,client){
  if(dto){
    var keys = Object.keys(dto);
   	for (var i=0; i< keys.length; i++) {
         this[keys[i]] = dto[keys[i]];
      }
      console.log("device-id - "  + this["device-id"]);
   }
   this.client = client;
   this.serviceType = "traffic";
}
TrafficLane.prototype = new location();

/**
* @method listTrafficAssets
* @return {Object} an array of TrafficAsset objects that monitor the current lane.
**/
TrafficLane.prototype.listTrafficAssets = function(boundary1, boundary2, options){
  return new Promise((resolve, reject) => {
    var boundary = boundary1 + "," + boundary2;
    options['queryType'] = 'eventType';
    options['serviceType'] = "traffic";
    options['bbox'] = boundary;
    options['zoneId'] = predixconfig.services["traffic"].zoneId;

    if(!options['queryValue']  || options['queryValue'] == ""){
      options['queryValue'] = mappings.eventTypes.TFEVT;
      //+ "," + mappings.eventTypes.PKIN;
    }
    this.listAssets(options).then((assets) => {
      var parsedAssets = [];
      for (var i = 0; i < assets.length; i++) {
        parsedAssets.push(new trafficasset(assets[i], this.client));
      }
      resolve(parsedAssets);
    })
  });
};
module.exports = TrafficLane;
