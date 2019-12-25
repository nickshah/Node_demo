"use strict";

var Response = require('../Classes/Util/Response');
var Common = require('../util/excel');
var Moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v_customer_perk_details', {
    venue_perk_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    perk_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    perk_type: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    offer_type: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    expiry: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    tag_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    check_in_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    valid_on: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    f_start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    f_end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    s_start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    s_end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sponsorer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    terms: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    latitude: {
      type: 'DOUBLE',
      allowNull: true
    },
    longitude: {
      type: 'DOUBLE',
      allowNull: true
    },
    venue_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'v_customer_perk_details',
    underscored : true,
    classMethods : {

      getPerksForCustomer : function(  data , success , error  ) {

        try {

          var condition = {
            'customer_id' : data.customer_id
          };

          console.log(condition);

          var offset = config.util.limit * data.page;

          console.log(offset);

          this.findAll({
            where: condition,
            limit : config.util.limit,
            offset : offset,
            order : [['created_at','DESC']],
            attributes: config.return_fields.perk_details_for_customer
          }).then(function(success_data){

            success(Response.sendResponse(true,success_data,"",status_codes.OK));
          },function(error_data){

            error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
          })

        }catch (err) {

          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
      },


      getPerksForVenue : function(  data , success , error  ) {
        
                try {
        
                  var condition = {
                    'venue_id' : data.venue_id
                  };
        
                  console.log(condition);
        
                  var offset = config.util.limit * data.page;
        
                  console.log(offset);
        
                  this.findAll({
                    where: condition,
                    limit : config.util.limit,
                    offset : offset,
                    order : [['created_at','DESC']],
                    attributes: config.return_fields.perk_details_for_customer
                  }).then(function(success_data){
        
                    success(Response.sendResponse(true,success_data,"",status_codes.OK));
                  },function(error_data){
        
                    error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                  })
        
                }catch (err) {
        
                  error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
      },


      getPerkReports : function(  data , success , error  ) {
        
                try {
        
                  //var condition = {
                  //  'venue_id' : data.venue_id
                  //};

                  var instance = this;

                  var venue_customer_mapping = server._plugins['hapi-sequelize'].new_tagloy.models.venue_customer_mapping;

                  console.log(condition);

                  if(data.page <= 0)
                    data.page = 1;

                  var offset = data.limit * (data.page - 1);

                  console.log(data);

                  var condition = " `is_claimed` IN (" + data.is_claimed.join() + ") AND ";
                  var orderBy = "ORDER BY p.`created_at` DESC ";
                  var limit = "LIMIT " + offset +", " + data.limit;

                  if(data.starttime == null && data.endtime == null && data.month == null && data.year == null){
                    condition = condition + "p.venue_id = " + data.venue_id;
                  }else if(data.month != null && data.year != null){

                    if(data.month == null || data.year == null){
                      condition = condition + "p.venue_id = " + data.venue_id;
                    }else {
                      condition = condition + "p.venue_id = " + data.venue_id + " " +
                          "AND ((month(p.`assigned_timestamp`) = " + data.month + " AND year(p.`assigned_timestamp`) = " + data.year + ") " +
                          "OR (month(FROM_UNIXTIME(p.`claimed_timestamp`)) = " + data.month + " AND year(FROM_UNIXTIME(p.`claimed_timestamp`)) = " + data.year + ")) ";
                    }

                  }else if(data.starttime != null && data.endtime != null){
                    if(data.starttime == null || data.endtime == null){
                      condition = condition + "p.venue_id = " + data.venue_id;
                    }else {
                      condition = condition + "p.venue_id = " + data.venue_id + " " +
                          "AND ((UNIX_TIMESTAMP(p.`assigned_timestamp`) >= " + data.starttime + " AND UNIX_TIMESTAMP(p.`assigned_timestamp`) <= " + data.endtime + ") " +
                          "OR (UNIX_TIMESTAMP(p.`claimed_timestamp`) >= " + data.starttime + " AND UNIX_TIMESTAMP(p.`claimed_timestamp`) <= " + data.endtime + ")) ";
                    }
                  }else {
                    condition = condition + "p.venue_id = " + data.venue_id;
                  }

                  var queryWithoutCondition = "SELECT p.`venue_perk_id`, p.`customer_id`, p.`is_claimed`, p.`claimed_timestamp`, " +
                      "p.`perk_name`, p.`perk_type`, p.`offer_type`, p.`description`, p.`amount`, p.`expiry`, " +
                      "p.`tag_count`, p.`check_in_count`, p.`valid_on`, p.`f_start_time`, p.`f_end_time`, p.`s_start_time`, " +
                      "p.`s_end_time`, p.`message`, p.`sponsorer`, p.`terms`, p.`logo`, p.`address`, p.`banner`, " +
                      "p.`latitude`, p.`longitude`, p.`venue_name`, p.`tags`, p.`assigned_timestamp`, " +
                      "v.`venue_note` AS venue_note, c.`first_name` AS customer_name " +
                      "FROM `v_customer_perk_details` AS p " +
                      "INNER JOIN `venue_customer_mapping` as v " +
                      "ON p.customer_id = v.customer_id  AND v.`venue_id` = " + data.venue_id + " " +
                      "INNER JOIN `customer` as c " +
                      "ON p.customer_id = c.customer_id ";

                  var query = queryWithoutCondition + "WHERE " + condition + " " + orderBy + limit + ";";

                  sequelize.query(query, {raw : true, type: sequelize.QueryTypes.SELECT })
                      .then(function(success_data){
                        console.log(success_data.length);
                        let tempList = [];
                        tempList = success_data;
                        //if(data.month != null && data.year != null){
                        //  for(let i = 0; i < success_data.length; i++){
                        //    let claimedDateObject = new Date(success_data[i].claimed_timestamp);
                        //    let claimedMonth = claimedDateObject.getMonth() + 1;
                        //    let claimedYear = claimedDateObject.getFullYear();
                        //
                        //    let assignedDateObject = new Date(success_data[i].assigned_timestamp);
                        //    let assignedMonth = assignedDateObject.getMonth() + 1;
                        //    let assignedYear = assignedDateObject.getFullYear();
                        //
                        //    console.log("assignedMonth: ", assignedMonth);
                        //
                        //    if((claimedMonth == data.month && claimedYear == data.year) || (assignedMonth == data.month && assignedYear == data.year)){
                        //      tempList.push(success_data[i]);
                        //    }
                        //  }
                        //}else{
                        //  tempList = success_data;
                        //}

                        var queryForCount = queryWithoutCondition + "WHERE " + condition + " ;";

                        sequelize.query(queryForCount, {raw : true, type: sequelize.QueryTypes.SELECT })
                            .then(function(suc){
                              var res = {};
                              res.success_data = tempList;

                          //let tempListCount = [];
                          //if (data.month != null && data.year != null) {
                          //  for (let i = 0; i < suc.length; i++) {
                          //    let claimedDateObject = new Date(suc[i].dataValues.claimed_timestamp);
                          //    let claimedMonth = claimedDateObject.getMonth() + 1;
                          //    let claimedYear = claimedDateObject.getFullYear();
                          //
                          //    let assignedDateObject = new Date(suc[i].dataValues.assigned_timestamp);
                          //    let assignedMonth = assignedDateObject.getMonth() + 1;
                          //    let assignedYear = assignedDateObject.getFullYear();
                          //
                          //    if ((claimedMonth == data.month && claimedYear == data.year) || (assignedMonth == data.month && assignedYear == data.year)) {
                          //      tempListCount.push(success_data[i]);
                          //    }
                          //  }
                          //} else {
                          //  tempListCount = suc;
                          //}

                          res.count = suc.length;
                          success(Response.sendResponse(true, res, "", status_codes.OK));
                        }, function(er){
                          error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                        });

                      },function(error_data){

                        error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                      });
        
                  //this.findAll({
                  //  where: condition,
                  //  limit : data.limit,
                  //  offset : offset,
                  //  order : [['created_at','DESC']],
                  //  attributes: config.return_fields.perk_details_for_customer
                  //}).then(function(success_data){
                  //  let tempList = [];
                  //  if(data.month != null && data.year != null){
                  //    for(let i = 0; i < success_data.length; i++){
                  //      let claimedDateObject = new Date(success_data[i].dataValues.claimed_timestamp);
                  //      let claimedMonth = claimedDateObject.getMonth() + 1;
                  //      let claimedYear = claimedDateObject.getFullYear();
                  //
                  //      let assignedDateObject = new Date(success_data[i].dataValues.assigned_timestamp);
                  //      let assignedMonth = assignedDateObject.getMonth() + 1;
                  //      let assignedYear = assignedDateObject.getFullYear();
                  //
                  //      console.log("assignedMonth: ", assignedMonth);
                  //
                  //      if((claimedMonth == data.month && claimedYear == data.year) || (assignedMonth == data.month && assignedYear == data.year)){
                  //        tempList.push(success_data[i]);
                  //      }
                  //    }
                  //  }else{
                  //    tempList = success_data;
                  //  }
                  //
                  //  this.findAll({
                  //    where: condition,
                  //    attributes: config.return_fields.perk_details_for_customer
                  //  }).then(function(suc){
                  //    var res = {};
                  //    res.success_data = tempList;
                  //
                  //    let tempListCount = [];
                  //    if(data.month != null && data.year != null){
                  //      for(let i = 0; i < suc.length; i++){
                  //        let claimedDateObject = new Date(suc[i].dataValues.claimed_timestamp);
                  //        let claimedMonth = claimedDateObject.getMonth() + 1;
                  //        let claimedYear = claimedDateObject.getFullYear();
                  //
                  //        let assignedDateObject = new Date(suc[i].dataValues.assigned_timestamp);
                  //        let assignedMonth = assignedDateObject.getMonth() + 1;
                  //        let assignedYear = assignedDateObject.getFullYear();
                  //
                  //        console.log("assignedMonth: ", assignedMonth, " assignedYear: ", assignedYear);
                  //        console.log("data.month: ", data.month, " data.year: ", data.year);
                  //
                  //        if((claimedMonth == data.month && claimedYear == data.year) || (assignedMonth == data.month && assignedYear == data.year)){
                  //          tempListCount.push(success_data[i]);
                  //        }
                  //      }
                  //    }else{
                  //      tempListCount = suc;
                  //    }
                  //
                  //    res.count = tempListCount.length;
                  //    success(Response.sendResponse(true,res,"",status_codes.OK));
                  //  }, function(er){
                  //    error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                  //  });
                  //
                  //
                  //},function(error_data){
                  //
                  //  error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
                  //})

                }catch (err) {

                  error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
                }
      },


      getPerkReportExcel : function(  data , success , error  ) {

        try {

          var instance = this;

          var venue_customer_mapping = server._plugins['hapi-sequelize'].new_tagloy.models.venue_customer_mapping;

          console.log(condition);

          if(data.page <= 0)
            data.page = 1;

          var offset = data.limit * (data.page - 1);

          console.log(data);

          var condition = " `is_claimed` IN (" + data.is_claimed.join() + ") AND ";
          var orderBy = "ORDER BY p.`created_at` DESC ";
          var limit = "LIMIT " + offset +", " + data.limit;

          if(data.starttime == null && data.endtime == null && data.month == null && data.year == null){
            condition = condition + "p.venue_id = " + data.venue_id;
          }else if(data.month != null && data.year != null){

            if(data.month == null || data.year == null){
              condition = condition + "p.venue_id = " + data.venue_id;
            }else {
              condition = condition + "p.venue_id = " + data.venue_id + " " +
                  "AND ((month(p.`assigned_timestamp`) = " + data.month + " AND year(p.`assigned_timestamp`) = " + data.year + ") " +
                  "OR (month(FROM_UNIXTIME(p.`claimed_timestamp`)) = " + data.month + " AND year(FROM_UNIXTIME(p.`claimed_timestamp`)) = " + data.year + ")) ";
            }

          }else if(data.starttime != null && data.endtime != null){
            if(data.starttime == null || data.endtime == null){
              condition = condition + "p.venue_id = " + data.venue_id;
            }else {
              condition = condition + "p.venue_id = " + data.venue_id + " " +
                  "AND ((UNIX_TIMESTAMP(p.`assigned_timestamp`) >= " + data.starttime + " AND UNIX_TIMESTAMP(p.`assigned_timestamp`) <= " + data.endtime + ") " +
                  "OR (UNIX_TIMESTAMP(p.`claimed_timestamp`) >= " + data.starttime + " AND UNIX_TIMESTAMP(p.`claimed_timestamp`) <= " + data.endtime + ")) ";
            }
          }else {
            condition = condition + "p.venue_id = " + data.venue_id;
          }

          var queryWithoutCondition = "SELECT p.`venue_perk_id`, p.`customer_id`, p.`is_claimed`, p.`claimed_timestamp`, " +
              "p.`perk_name`, p.`perk_type`, p.`offer_type`, p.`description`, p.`amount`, p.`expiry`, " +
              "p.`tag_count`, p.`check_in_count`, p.`valid_on`, p.`f_start_time`, p.`f_end_time`, p.`s_start_time`, " +
              "p.`s_end_time`, p.`message`, p.`sponsorer`, p.`terms`, p.`logo`, p.`address`, p.`banner`, " +
              "p.`latitude`, p.`longitude`, p.`venue_name`, p.`tags`, p.`assigned_timestamp`, " +
              "v.`venue_note` AS venue_note, c.`first_name` AS customer_name " +
              "FROM `v_customer_perk_details` AS p " +
              "INNER JOIN `venue_customer_mapping` as v " +
              "ON p.customer_id = v.customer_id  AND v.`venue_id` = " + data.venue_id + " " +
              "INNER JOIN `customer` as c " +
              "ON p.customer_id = c.customer_id ";

          var query = queryWithoutCondition + "WHERE " + condition + " " + orderBy + ";";

          sequelize.query(query, {raw : true, type: sequelize.QueryTypes.SELECT })
              .then(function(success_data){
                console.log(success_data.length);

                instance.downloadExcelBookingsForOrganization(success_data, success, error);

              },function(error_data){

                error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
              });


        }catch (err) {

          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
      },

      getSinglePerkForCustomer : function(  data , success , error  ) {

        try {

          var condition = {
            'customer_id' : data.customer_id,
            'venue_perk_id' : data.perk_id,
            'venue_id' : data.venue_id
          };

          console.log(condition);


          //console.log(offset);

          this.findAll({
            where: condition,
            attributes: config.return_fields.perk_details_for_customer
          }).then(function(success_data){

            success(Response.sendResponse(true,success_data,"",status_codes.OK));
          },function(error_data){

            error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
          })

        }catch (err) {

          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
      },

      searchPerksForCustomer : function(  data , success , error  ) {

        try {

          var condition = {
            'customer_id' : data.customer_id,
            'venue_name' : { like: '%' + data. search_term + '%' }
          };

          var offset = config.util.limit * data.page;

          this.findAll({
            where: condition,
            limit : config.util.limit,
            offset : offset,
            attributes: config.return_fields.perk_details_for_customer
          }).then(function(success_data){

            success(Response.sendResponse(true,success_data,"",status_codes.OK));
          },function(error_data){

            error(Response.sendResponse(false,null,error_data.message,status_codes.BAD_REQUEST));
          })

        }catch (err) {

          error(Response.sendResponse(false,null,err.message,status_codes.INTERNAL_SERVER_ERROR));
        }
      },

      downloadExcelBookingsForOrganization(data, success, error) {
        var report_data = [];
        data.forEach(function (obj) {
          var record = {
            perk_name : null,
            customer_name : null,
            is_claimed : null,
            assignedTimestamp : null,
            claimed_timestamp : null,
            venue_note : null
          };

          record.perk_name = obj.perk_name;
          record.customer_name = obj.customer_name;
          record.perk_name = (obj.is_claimed == "1" || obj.is_claimed == 1) ? "Claimed" : "Not Claimed";
          record.assigned_timestamp = Moment.utc(obj.assigned_timestamp).format('dd MMM yy, hh:mm a');
          record.claimed_timestamp = Moment.utc(obj.claimed_timestamp).format('dd MMM yy, hh:mm a');
          record.venue_note = obj.venue_note;

          report_data.push(record);
        });

        var report_description = "Perk Report";

        const heading = [
          [{value: 'Report Description', style:Common.excelStyles.headerDark}],
          [report_description] // <-- It can be only values
        ];

        const specification = {
          user_name: { // <- the key should match the actual data key
            displayName: 'User Name', // <- Here you specify the column header
            headerStyle: Common.excelStyles.headerDark, // <- Header style
            width: 120 // <- width in pixels
          },
          booking_day: {
            displayName: 'Booking Day',
            headerStyle: Common.excelStyles.headerDark,
            width: 120 // <- width in chars (when the number is passed as string)
          },
          time_slot: {
            displayName: 'Time Slot',
            headerStyle: Common.excelStyles.headerDark,
            width: 120 // <- width in pixels
          },
          table_for: {
            displayName: 'Table For',
            headerStyle: Common.excelStyles.headerDark,
            width: 120 // <- width in pixels
          },
          status: {
            displayName: 'Booking Status',
            headerStyle: Common.excelStyles.headerDark,
            width: 120 // <- width in pixels
          },
          booked_at: {
            displayName: 'Booked At',
            headerStyle: Common.excelStyles.headerDark,
            width: 130 // <- width in pixels
          }
        };

        const merges = [
          { start: { row: 1, column: 1 }, end: { row: 1, column: 6 } },
          { start: { row: 2, column: 1 }, end: { row: 2, column: 6 } }
        ];

        success(Common.generateExcel(heading,merges, specification, report_data));
      }

    }
  });
};
