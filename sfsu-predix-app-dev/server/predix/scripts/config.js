/** Script ACLs do not delete
 read=nobody
write=nobody
execute=authenticated
  **/

 // configuration file for different services
// you can get the configuration by using cloud foundary
// > cf env <appname>
module.exports = {
  services: {
    parking:{
      endPoint:"ic-metadata-service.run.aws-usw02-pr.ice.predix.io",
      zoneId: "SDSIM-IE-PARKING"
    },
    traffic:{
      endPoint:"ic-metadata-service.run.aws-usw02-pr.ice.predix.io",
      zoneId:"SDSIM-IE-TRAFFIC"
    },
    pedestrian:{
      endPoint:"ic-metadata-service.run.aws-usw02-pr.ice.predix.io",
      zoneId:"SDSIM-IE-PEDESTRIAN"
    }
  },



// Possible modes when running your application
  modes: {
    SIMDATA: "SIMDATA",
    PRODUCTION: "NODE"
  },

// Modify the below to modes.PRODUCTION if you want production data
  mode: "SIMDATA"

}
