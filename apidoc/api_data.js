define({ "api": [
  {
    "type": "POST",
    "url": "/feed/approve",
    "title": "Feeds  : Approve Feed",
    "name": "Approve_Feed",
    "group": "Feeds",
    "description": "<p>Approve feed</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": null,\n          \"status_code\": 201,\n          \"message\": \"Feed approved\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/feeds.js",
    "groupTitle": "Feeds",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/feed/approve"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/feed/celebration",
    "title": "Feeds  : Get Celebration feeds",
    "name": "Get_Celebration_feeds",
    "group": "Feeds",
    "description": "<p>Get Celebration feeds</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"feed_id\": 6,\n              \"feed_msg\": \"#tagloy #birthday #enjoy #masti Happppyyy Birthday #pune  #checking https://t.co/na5FOaQBba\",\n              \"feed_image\": \"http://pbs.twimg.com/media/C6p3uV8WcAEXkx3.jpg\",\n              \"cust_name\": \"Ava Diana\",\n              \"feed_count\": 0,\n              \"published_feed_count\": 0,\n              \"twt_follower\": 6,\n              \"facebook_follower\": 0,\n              \"ig_follower\": 0,\n              \"is_celebration\": 1,\n              \"bookmark_feed\": 0,\n              \"feed_from_fame_user\": 0,\n              \"feed_from_favourite_user\": 0,\n              \"cust_feeds_count\": 2,\n              \"feed_recieved_at\": 1489253456012,\n              \"venue_id\": 176,\n              \"feed_status\": \"REJECTED\",\n              \"rejected_reason\": \"Rejected\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/feeds.js",
    "groupTitle": "Feeds",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/feed/celebration"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/feed/historical",
    "title": "Feeds  : Get Historical feeds",
    "name": "Get_Historical_feeds",
    "group": "Feeds",
    "description": "<p>Get Historical feeds</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"feed_id\": 6,\n              \"feed_msg\": \"#tagloy #birthday #enjoy #masti Happppyyy Birthday #pune  #checking https://t.co/na5FOaQBba\",\n              \"feed_image\": \"http://pbs.twimg.com/media/C6p3uV8WcAEXkx3.jpg\",\n              \"cust_name\": \"Ava Diana\",\n              \"feed_count\": 0,\n              \"published_feed_count\": 0,\n              \"twt_follower\": 6,\n              \"facebook_follower\": 0,\n              \"ig_follower\": 0,\n              \"is_celebration\": 1,\n              \"bookmark_feed\": 0,\n              \"feed_from_fame_user\": 0,\n              \"feed_from_favourite_user\": 0,\n              \"cust_feeds_count\": 2,\n              \"feed_recieved_at\": 1489253456012,\n              \"venue_id\": 176,\n              \"feed_status\": \"REJECTED\",\n              \"rejected_reason\": \"Rejected\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/feeds.js",
    "groupTitle": "Feeds",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/feed/historical"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/feed/bookmarked",
    "title": "Feeds  : Get bookmarked feeds",
    "name": "Get_bookmarked_feeds",
    "group": "Feeds",
    "description": "<p>Get bookmarked feeds</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"feed_id\": 6,\n              \"feed_msg\": \"#tagloy #birthday #enjoy #masti Happppyyy Birthday #pune  #checking https://t.co/na5FOaQBba\",\n              \"feed_image\": \"http://pbs.twimg.com/media/C6p3uV8WcAEXkx3.jpg\",\n              \"cust_name\": \"Ava Diana\",\n              \"feed_count\": 0,\n              \"published_feed_count\": 0,\n              \"twt_follower\": 6,\n              \"facebook_follower\": 0,\n              \"ig_follower\": 0,\n              \"is_celebration\": 1,\n              \"bookmark_feed\": 1,\n              \"feed_from_fame_user\": 1,\n              \"feed_from_favourite_user\": 0,\n              \"cust_feeds_count\": 2,\n              \"feed_recieved_at\": 1489253456012,\n              \"venue_id\": 176,\n              \"feed_status\": \"REJECTED\",\n              \"rejected_reason\": \"Rejected\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/feeds.js",
    "groupTitle": "Feeds",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/feed/bookmarked"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/feed/fame",
    "title": "Feeds  : Get fame feeds",
    "name": "Get_fame_feeds",
    "group": "Feeds",
    "description": "<p>Get fame feeds</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"feed_id\": 6,\n              \"feed_msg\": \"#tagloy #birthday #enjoy #masti Happppyyy Birthday #pune  #checking https://t.co/na5FOaQBba\",\n              \"feed_image\": \"http://pbs.twimg.com/media/C6p3uV8WcAEXkx3.jpg\",\n              \"cust_name\": \"Ava Diana\",\n              \"feed_count\": 0,\n              \"published_feed_count\": 0,\n              \"twt_follower\": 6,\n              \"facebook_follower\": 0,\n              \"ig_follower\": 0,\n              \"is_celebration\": 1,\n              \"bookmark_feed\": 0,\n              \"feed_from_fame_user\": 1,\n              \"feed_from_favourite_user\": 0,\n              \"cust_feeds_count\": 2,\n              \"feed_recieved_at\": 1489253456012,\n              \"venue_id\": 176,\n              \"feed_status\": \"REJECTED\",\n              \"rejected_reason\": \"Rejected\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/feeds.js",
    "groupTitle": "Feeds",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/feed/fame"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/feed/pending",
    "title": "Feeds  : Get pending feeds",
    "name": "Get_pending_feeds",
    "group": "Feeds",
    "description": "<p>Get pending feeds</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"feed_id\": 5,\n              \"feed_msg\": \"#tagloy #birthday #enjoy #masti Happppyyy Birthday https://t.co/YRDztkHKOF\",\n              \"feed_image\": \"http://pbs.twimg.com/media/C6p5biPW0AA0TJq.jpg\",\n              \"cust_name\": \"Ava Diana\",\n              \"feed_count\": 0,\n              \"published_feed_count\": 0,\n              \"twt_follower\": 6,\n              \"facebook_follower\": 0,\n              \"ig_follower\": 0,\n              \"is_celebration\": 1,\n              \"bookmark_feed\": 0,\n              \"feed_from_fame_user\": 0,\n              \"feed_from_favourite_user\": 0,\n              \"cust_feeds_count\": 6,\n              \"feed_recieved_at\": 1489233221143,\n              \"venue_id\": 176\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/feeds.js",
    "groupTitle": "Feeds",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/feed/pending"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/feed/pending/trail",
    "title": "Feeds  : Get pending feeds trail",
    "name": "Get_pending_feeds_trail",
    "group": "Feeds",
    "description": "<p>Get pending feeds trail</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "customer_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"feed_id\": 5,\n              \"feed_msg\": \"#tagloy #birthday #enjoy #masti Happppyyy Birthday https://t.co/YRDztkHKOF\",\n              \"feed_image\": \"http://pbs.twimg.com/media/C6p5biPW0AA0TJq.jpg\",\n              \"cust_name\": \"Ava Diana\",\n              \"feed_count\": 0,\n              \"published_feed_count\": 0,\n              \"twt_follower\": 6,\n              \"facebook_follower\": 0,\n              \"ig_follower\": 0,\n              \"is_celebration\": 1,\n              \"bookmark_feed\": 0,\n              \"feed_from_fame_user\": 0,\n              \"feed_from_favourite_user\": 0,\n              \"cust_feeds_count\": 6,\n              \"feed_recieved_at\": 1489233221143,\n              \"venue_id\": 176\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/feeds.js",
    "groupTitle": "Feeds",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/feed/pending/trail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/feed/published",
    "title": "Feeds  : Get published feeds",
    "name": "Get_published_feeds",
    "group": "Feeds",
    "description": "<p>Get pending feeds</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"feed_id\": 5,\n              \"feed_msg\": \"#tagloy #birthday #enjoy #masti Happppyyy Birthday https://t.co/YRDztkHKOF\",\n              \"feed_image\": \"http://pbs.twimg.com/media/C6p5biPW0AA0TJq.jpg\",\n              \"cust_name\": \"Ava Diana\",\n              \"feed_count\": 0,\n              \"published_feed_count\": 0,\n              \"twt_follower\": 6,\n              \"facebook_follower\": 0,\n              \"ig_follower\": 0,\n              \"is_celebration\": 1,\n              \"bookmark_feed\": 0,\n              \"feed_from_fame_user\": 0,\n              \"feed_from_favourite_user\": 0,\n              \"cust_feeds_count\": 6,\n              \"feed_recieved_at\": 1489233221143,\n              \"venue_id\": 176\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/feeds.js",
    "groupTitle": "Feeds",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/feed/published"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/feed/markcelebration",
    "title": "Feeds  : Mark feed Celebration",
    "name": "Mark_Feed_Celebration",
    "group": "Feeds",
    "description": "<p>Mark feed Celebration</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": null,\n          \"status_code\": 201,\n          \"message\": \"Feed marked as celebration\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/feeds.js",
    "groupTitle": "Feeds",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/feed/markcelebration"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/feed/markbookmarked",
    "title": "Feeds  : Mark feed bookmarked",
    "name": "Mark_Feed_bookmarked",
    "group": "Feeds",
    "description": "<p>Mark feed bookmarked</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": null,\n          \"status_code\": 201,\n          \"message\": \"Feed bookmarked\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/feeds.js",
    "groupTitle": "Feeds",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/feed/markbookmarked"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/feed/reject",
    "title": "Feeds  : Reject Feed",
    "name": "Reject_Feed",
    "group": "Feeds",
    "description": "<p>Reject Feed</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": null,\n          \"status_code\": 201,\n          \"message\": \"Feed rejected\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/feeds.js",
    "groupTitle": "Feeds",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/feed/reject"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/perks",
    "title": "Perks  : Get Perks for venue",
    "name": "Get_Perks_for_venue",
    "group": "Perks",
    "description": "<p>Get Perks for venue</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/perks.js",
    "groupTitle": "Perks",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/perks"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/perk/update",
    "title": "Perks  : Update perk",
    "name": "Update_perk",
    "group": "Perks",
    "description": "<p>Update perk</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offer_type",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "expiry",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "check_in_count",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tag_count",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "f_start_time",
            "description": "<p>'01:00:00' in this format</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "f_end_time",
            "description": "<p>'01:00:00' in this format</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "s_start_time",
            "description": "<p>'01:00:00' in this format</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "s_end_time",
            "description": "<p>'01:00:00' in this format</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sponsorer",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "terms",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "is_enabled",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/perks.js",
    "groupTitle": "Perks",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/perk/update"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/rolefeature/create",
    "title": "RBAC  : Create rolefeature mapping",
    "name": "Create_rolefeature_mapping",
    "group": "Rbac",
    "description": "<p>Create mapping for roles for assessable features</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "organization_group",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "feature_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"role_feature_id\": 2,\n              \"role_id\": 4,\n              \"feature_id\": 1,\n              \"feature_name\": \"/venue/add\",\n              \"role_name\": \"SALES\",\n              \"organization_group\": \"OWNER\"\n            },\n            {\n              \"role_feature_id\": 3,\n              \"role_id\": 3,\n              \"feature_id\": 2,\n              \"feature_name\": \"/venue\",\n              \"role_name\": \"ADMIN\",\n              \"organization_group\": \"OWNER\"\n            },\n            {\n              \"role_feature_id\": 4,\n              \"role_id\": 3,\n              \"feature_id\": 1,\n              \"feature_name\": \"/venue/add\",\n              \"role_name\": \"ADMIN\",\n              \"organization_group\": \"OWNER\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"Role feature mapping created\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rbac.js",
    "groupTitle": "Rbac",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/rolefeature/create"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/v1/features",
    "title": "RBAC  : Get Features",
    "name": "Get_Features",
    "group": "Rbac",
    "description": "<p>Get Features</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"id\": 1,\n              \"name\": \"/venue/add\",\n              \"description\": null,\n              \"created_at\": \"2017-02-21T00:00:00.000Z\",\n              \"updated_at\": \"2017-02-21T00:00:00.000Z\"\n            },\n            {\n              \"id\": 2,\n              \"name\": \"/venue\",\n              \"description\": null,\n              \"created_at\": \"2017-03-13T06:02:59.000Z\",\n              \"updated_at\": \"2017-03-13T06:02:59.000Z\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rbac.js",
    "groupTitle": "Rbac",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/features"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/v1/rolefeature",
    "title": "RBAC  : Get Role Feature mapping",
    "name": "Get_role_feature_feature_mapping",
    "group": "Rbac",
    "description": "<p>Get role feature mapping</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"role_feature_id\": 2,\n              \"role_id\": 4,\n              \"feature_id\": 1,\n              \"feature_name\": \"/venue/add\",\n              \"role_name\": \"SALES\",\n              \"organization_group\": \"OWNER\"\n            },\n            {\n              \"role_feature_id\": 3,\n              \"role_id\": 3,\n              \"feature_id\": 2,\n              \"feature_name\": \"/venue\",\n              \"role_name\": \"ADMIN\",\n              \"organization_group\": \"OWNER\"\n            },\n            {\n              \"role_feature_id\": 4,\n              \"role_id\": 3,\n              \"feature_id\": 1,\n              \"feature_name\": \"/venue/add\",\n              \"role_name\": \"ADMIN\",\n              \"organization_group\": \"OWNER\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rbac.js",
    "groupTitle": "Rbac",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/rolefeature"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/v1/roles",
    "title": "RBAC  : Get roles",
    "name": "Get_roles",
    "group": "Rbac",
    "description": "<p>Get roles</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"id\": 2,\n              \"name\": \"SUPERADMIN\",\n              \"is_active\": 1,\n              \"created_at\": \"2017-02-17T09:06:27.000Z\",\n              \"updated_at\": \"2017-02-17T09:06:27.000Z\"\n            },\n            {\n              \"id\": 3,\n              \"name\": \"ADMIN\",\n              \"is_active\": 1,\n              \"created_at\": \"2017-02-17T09:06:27.000Z\",\n              \"updated_at\": \"2017-02-17T09:06:27.000Z\"\n            },\n            {\n              \"id\": 4,\n              \"name\": \"SALES\",\n              \"is_active\": 1,\n              \"created_at\": \"2017-02-17T09:06:27.000Z\",\n              \"updated_at\": \"2017-03-02T13:33:25.000Z\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rbac.js",
    "groupTitle": "Rbac",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/roles"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/feature/create",
    "title": "RBAC  : Create new feature",
    "name": "create_new_feature",
    "group": "Rbac",
    "description": "<p>create new feature</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"id\": 2,\n              \"name\": \"SUPERADMIN\",\n              \"is_active\": 1,\n              \"created_at\": \"2017-02-17T09:06:27.000Z\",\n              \"updated_at\": \"2017-02-17T09:06:27.000Z\"\n            },\n            {\n              \"id\": 3,\n              \"name\": \"ADMIN\",\n              \"is_active\": 1,\n              \"created_at\": \"2017-02-17T09:06:27.000Z\",\n              \"updated_at\": \"2017-02-17T09:06:27.000Z\"\n            },\n            {\n              \"id\": 4,\n              \"name\": \"SALES\",\n              \"is_active\": 1,\n              \"created_at\": \"2017-02-17T09:06:27.000Z\",\n              \"updated_at\": \"2017-03-02T13:33:25.000Z\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"Feature Created\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rbac.js",
    "groupTitle": "Rbac",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/feature/create"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/spotlight/approve",
    "title": "spotlight  : Approve spotlight",
    "name": "Approve_spotlight",
    "group": "Spotlight",
    "description": "<p>Approve spotlight</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": null,\n          \"status_code\": 200,\n          \"message\": \"Spotlight approved\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/spotlight.js",
    "groupTitle": "Spotlight",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/spotlight/approve"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/spotlight/historical",
    "title": "Spotlights  : Get Historical spotlights",
    "name": "Get_Historical_spotlights",
    "group": "Spotlight",
    "description": "<p>Get Historical spotlights</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"is_success\": true,\n  \"result\": [\n    {\n      \"spotlight_id\": 3,\n      \"title\": 0,\n      \"description\": null,\n      \"type\": \"CREATIVE\",\n      \"venue_id\": 176,\n      \"published_start_date_time\": 14500000000,\n      \"published_end_date_time\": 12324334343,\n      \"event_start_date\": null,\n      \"event_end_date\": null,\n      \"event_start_time\": null,\n      \"event_end_time\": null,\n      \"active_day_string\": null,\n      \"is_recurring\": null,\n      \"venue_user_creator_id\": null,\n      \"venue_user_moderator_id\": null,\n      \"fb\": 0,\n      \"twt\": 1,\n      \"ig\": 0,\n      \"image\": \"/var/www/html/tagloy_new/images/b47065ce4f6177bc3ea8897b2728f4cd.jpg\",\n      \"status\": \"REJECTED\",\n      \"rejected_reason\": \"chfajlfkds\",\n      \"parent_spotlight_id\": null\n    }\n  ],\n  \"status_code\": 200,\n  \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/spotlight.js",
    "groupTitle": "Spotlight",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/spotlight/historical"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/spotlight/creator/rejected",
    "title": "Spotlights  : Get Reject spotlights in creator",
    "name": "Get_Reject_spotlights_in_creator",
    "group": "Spotlight",
    "description": "<p>Get Reject spotlights in creator</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "creator_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"is_success\": true,\n  \"result\": [\n    {\n      \"spotlight_id\": 3,\n      \"title\": 0,\n      \"description\": null,\n      \"type\": \"CREATIVE\",\n      \"venue_id\": 176,\n      \"published_start_date_time\": 14500000000,\n      \"published_end_date_time\": 12324334343,\n      \"event_start_date\": null,\n      \"event_end_date\": null,\n      \"event_start_time\": null,\n      \"event_end_time\": null,\n      \"active_day_string\": null,\n      \"is_recurring\": null,\n      \"venue_user_creator_id\": 123,\n      \"venue_user_moderator_id\": null,\n      \"fb\": 0,\n      \"twt\": 1,\n      \"ig\": 0,\n      \"image\": \"/var/www/html/tagloy_new/images/b47065ce4f6177bc3ea8897b2728f4cd.jpg\",\n      \"status\": \"REJECTED\",\n      \"rejected_reason\": \"chfajlfkds\",\n      \"parent_spotlight_id\": null\n    }\n  ],\n  \"status_code\": 200,\n  \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/spotlight.js",
    "groupTitle": "Spotlight",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/spotlight/creator/rejected"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/spotlight/pending",
    "title": "Spotlights  : Get pending spotlights",
    "name": "Get_pending_spotlights",
    "group": "Spotlight",
    "description": "<p>Get pending spotlights</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"spotlight_id\": 5,\n              \"title\": 0,\n              \"description\": null,\n              \"type\": \"CREATIVE\",\n              \"venue_id\": 176,\n              \"published_start_date_time\": 14500000000,\n              \"published_end_date_time\": 12324334343,\n              \"event_start_date\": null,\n              \"event_end_date\": null,\n              \"event_start_time\": null,\n              \"event_end_time\": null,\n              \"active_day_string\": null,\n              \"is_recurring\": null,\n              \"venue_user_creator_id\": null,\n              \"venue_user_moderator_id\": null,\n              \"fb\": 0,\n              \"twt\": 1,\n              \"ig\": 0,\n              \"image\": \"/var/www/html/tagloy_new/images/binary_clouds_by_unrater-d6l9ti3.png\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/spotlight.js",
    "groupTitle": "Spotlight",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/spotlight/pending"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/spotlight/published",
    "title": "Spotlights  : Get published spotlights",
    "name": "Get_published_spotlights",
    "group": "Spotlight",
    "description": "<p>Get pending spotlights</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"spotlight_id\": 5,\n              \"title\": 0,\n              \"description\": null,\n              \"type\": \"CREATIVE\",\n              \"venue_id\": 176,\n              \"published_start_date_time\": 14500000000,\n              \"published_end_date_time\": 12324334343,\n              \"event_start_date\": null,\n              \"event_end_date\": null,\n              \"event_start_time\": null,\n              \"event_end_time\": null,\n              \"active_day_string\": null,\n              \"is_recurring\": null,\n              \"venue_user_creator_id\": null,\n              \"venue_user_moderator_id\": null,\n              \"fb\": 0,\n              \"twt\": 1,\n              \"ig\": 0,\n              \"image\": \"/var/www/html/tagloy_new/images/b47065ce4f6177bc3ea8897b2728f4cd.jpg\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/spotlight.js",
    "groupTitle": "Spotlight",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/spotlight/published"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/spotlight/creator/queued",
    "title": "Spotlights  : Get queued spotlights for creator",
    "name": "Get_queued_spotlights_for_creator",
    "group": "Spotlight",
    "description": "<p>Get queued spotlights for creator</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "creator_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"spotlight_id\": 5,\n              \"title\": 0,\n              \"description\": null,\n              \"type\": \"CREATIVE\",\n              \"venue_id\": 176,\n              \"published_start_date_time\": 14500000000,\n              \"published_end_date_time\": 12324334343,\n              \"event_start_date\": null,\n              \"event_end_date\": null,\n              \"event_start_time\": null,\n              \"event_end_time\": null,\n              \"active_day_string\": null,\n              \"is_recurring\": null,\n              \"venue_user_creator_id\": null,\n              \"venue_user_moderator_id\": null,\n              \"fb\": 0,\n              \"twt\": 1,\n              \"ig\": 0,\n              \"image\": \"/var/www/html/tagloy_new/images/binary_clouds_by_unrater-d6l9ti3.png\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/spotlight.js",
    "groupTitle": "Spotlight",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/spotlight/creator/queued"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/spotlight/creator/scheduled",
    "title": "Spotlights  : Get scheduled spotlights for creator",
    "name": "Get_scheduled_spotlights_for_creator",
    "group": "Spotlight",
    "description": "<p>Get scheduled spotlights for creator</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "creator_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"spotlight_id\": 5,\n              \"title\": 0,\n              \"description\": null,\n              \"type\": \"CREATIVE\",\n              \"venue_id\": 176,\n              \"published_start_date_time\": 14500000000,\n              \"published_end_date_time\": 12324334343,\n              \"event_start_date\": null,\n              \"event_end_date\": null,\n              \"event_start_time\": null,\n              \"event_end_time\": null,\n              \"active_day_string\": null,\n              \"is_recurring\": null,\n              \"venue_user_creator_id\": 123,\n              \"venue_user_moderator_id\": null,\n              \"fb\": 0,\n              \"twt\": 1,\n              \"ig\": 0,\n              \"image\": \"/var/www/html/tagloy_new/images/b47065ce4f6177bc3ea8897b2728f4cd.jpg\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/spotlight.js",
    "groupTitle": "Spotlight",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/spotlight/creator/scheduled"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/spotlight/request",
    "title": "Spotlights  : Initiate request",
    "name": "Initiate_request",
    "group": "Spotlight",
    "description": "<p>Initiate request for spotlight</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "requester_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "creator_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": null,\n          \"status_code\": 200,\n          \"message\": \"Spotlight requested\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/spotlight.js",
    "groupTitle": "Spotlight",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/spotlight/request"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/spotlight/reject",
    "title": "Spotlights  : Reject spotlight",
    "name": "Reject_spotlight",
    "group": "Spotlight",
    "description": "<p>Reject spotlight</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": null,\n          \"status_code\": 200,\n          \"message\": \"Spotlight rejected\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/spotlight.js",
    "groupTitle": "Spotlight",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/spotlight/reject"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/spotlight/requested",
    "title": "Spotlights  : Requested spotlight",
    "name": "Requested_spotlight",
    "group": "Spotlight",
    "description": "<p>Requested spotlight</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "creator_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/spotlight.js",
    "groupTitle": "Spotlight",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/spotlight/requested"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/spotlight/create",
    "title": "Spotlights  : create spotlights",
    "name": "create_spotlights",
    "group": "Spotlight",
    "description": "<p>create spotlight</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>'FLASH OFFER','CREATIVE','EVENT','SPECIAL'</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "published_start_date_time",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "published_end_date_time",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "event_start_date",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "event_end_date",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "event_start_time",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "event_end_time",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "active_day_string",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "is_recurring",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_user_creator_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fb",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "twt",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ig",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "image",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": null,\n          \"status_code\": 201,\n          \"message\": \"Spotlight created\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/spotlight.js",
    "groupTitle": "Spotlight",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/spotlight/create"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/tagtv/create",
    "title": "TagTv  : Create tag tv entry",
    "name": "Create_tag_tv_entry",
    "group": "TagTv",
    "description": "<p>TagTv  : Create tag tv entry</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "media",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "type",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n            \"is_success\": true,\n            \"result\": {\n            \"id\": 1,\n            \"venue_id\": 138,\n            \"type\": \"IMAGE\",\n            \"media_url\": \"https://testingnodeupload.s3.amazonaws.com/PFYIwnA.png\",\n            \"updated_at\": \"2017-03-23T08:06:46.000Z\",\n            \"created_at\": \"2017-03-23T08:06:46.000Z\"\n            },\n            \"status_code\": 200,\n            \"message\": \"Successfully added entry into database\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tagtv.js",
    "groupTitle": "TagTv",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/tagtv/create"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/tagtv",
    "title": "TagTv  : get tag tv entries for venue",
    "name": "Get_tag_tv_entries_for_venue",
    "group": "TagTv",
    "description": "<p>TagTv  : Get tag tv entries for venue</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"id\": 1,\n              \"venue_id\": 138,\n              \"media_url\": \"https://testingnodeupload.s3.amazonaws.com/PFYIwnA.png\",\n              \"type\": \"IMAGE\",\n              \"created_at\": \"2017-03-23T08:06:46.000Z\",\n              \"updated_at\": \"2017-03-23T08:06:46.000Z\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tagtv.js",
    "groupTitle": "TagTv",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/tagtv"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/tagtv/delete",
    "title": "TagTv  : delete tag tv entry for venue",
    "name": "delete_tag_tv_entry_for_venue",
    "group": "TagTv",
    "description": "<p>delete tag tv entry for venue</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"id\": 1,\n              \"venue_id\": 138,\n              \"media_url\": \"https://testingnodeupload.s3.amazonaws.com/PFYIwnA.png\",\n              \"type\": \"IMAGE\",\n              \"created_at\": \"2017-03-23T08:06:46.000Z\",\n              \"updated_at\": \"2017-03-23T08:06:46.000Z\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tagtv.js",
    "groupTitle": "TagTv",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/tagtv/delete"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/tagmin/create",
    "title": "TagMin  : Create tag Min entry",
    "name": "Create_tag_Min_entry",
    "group": "Tagmin",
    "description": "<p>Tagmin  : Create tag Min entry</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "media",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "type",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n            \"is_success\": true,\n            \"result\": {\n            \"id\": 1,\n            \"venue_id\": 138,\n            \"type\": \"IMAGE\",\n            \"media_url\": \"https://testingnodeupload.s3.amazonaws.com/PFYIwnA.png\",\n            \"updated_at\": \"2017-03-23T08:06:46.000Z\",\n            \"created_at\": \"2017-03-23T08:06:46.000Z\"\n            },\n            \"status_code\": 200,\n            \"message\": \"Successfully added entry into database\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tagmin.js",
    "groupTitle": "Tagmin",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/tagmin/create"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/tagmin",
    "title": "TagMin  : get tag Min entries for venue",
    "name": "Get_tag_Min_entries_for_venue",
    "group": "Tagmin",
    "description": "<p>Tagmin  : Get tag min entries for venue</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"id\": 1,\n              \"venue_id\": 138,\n              \"media_url\": \"https://testingnodeupload.s3.amazonaws.com/PFYIwnA.png\",\n              \"type\": \"IMAGE\",\n              \"created_at\": \"2017-03-23T08:06:46.000Z\",\n              \"updated_at\": \"2017-03-23T08:06:46.000Z\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tagmin.js",
    "groupTitle": "Tagmin",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/tagmin"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/tagmin/delete",
    "title": "TagMin  : delete tag min entry",
    "name": "delete_tag_min_entry",
    "group": "Tagmin",
    "description": "<p>delete tag min entry</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": [\n            {\n              \"id\": 1,\n              \"venue_id\": 138,\n              \"media_url\": \"https://testingnodeupload.s3.amazonaws.com/PFYIwnA.png\",\n              \"type\": \"IMAGE\",\n              \"created_at\": \"2017-03-23T08:06:46.000Z\",\n              \"updated_at\": \"2017-03-23T08:06:46.000Z\"\n            }\n          ],\n          \"status_code\": 200,\n          \"message\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/tagmin.js",
    "groupTitle": "Tagmin",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/tagmin/delete"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/venue/social_media/add",
    "title": "Venue  : Add social media mapping",
    "name": "Add_social_media_mapping",
    "group": "Venue",
    "description": "<p>Add social media mapping</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "social_media_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "consumer_key",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "secret_key",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": null,\n          \"status_code\": 200,\n          \"message\": \"Successfully added entry into database\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/venue.js",
    "groupTitle": "Venue",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/venue/social_media/add"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/venue/assign/user",
    "title": "Venue  : Assign user to venue",
    "name": "Assign_user_to_venue",
    "group": "Venue",
    "description": "<p>Venue on boarding</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "role_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": null,\n          \"status_code\": 200,\n          \"message\": \"Venue user assigned\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/venue.js",
    "groupTitle": "Venue",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/venue/assign/user"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/venue/ban/user",
    "title": "Venue  : Banned user for venue",
    "name": "Banned_user_for_venue",
    "group": "Venue",
    "description": "<p>Banned user for venue</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "customer_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": null,\n          \"status_code\": 200,\n          \"message\": \"requested user is banned for venue\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/venue.js",
    "groupTitle": "Venue",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/venue/ban/user"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/venue/customer",
    "title": "Venue  : Get Customers for venue",
    "name": "Get_Customers_for_venue",
    "group": "Venue",
    "description": "<p>Get Customers for venue</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/venue.js",
    "groupTitle": "Venue",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/venue/customer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/venue/customer/invenue",
    "title": "Venue  : Get In venue Customers for venue",
    "name": "Get_In_venue_Customers_for_venue",
    "group": "Venue",
    "description": "<p>Get In venue Customers for venue</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/venue.js",
    "groupTitle": "Venue",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/venue/customer/invenue"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/venue/social_media",
    "title": "Venue  : Get social media details for venue",
    "name": "Get_social_media_details_for_venue",
    "group": "Venue",
    "description": "<p>Get social media details for venue</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/venue.js",
    "groupTitle": "Venue",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/venue/social_media"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/venue/blackboard/update",
    "title": "Venue  : Update black board details",
    "name": "Update_black_board_details",
    "group": "Venue",
    "description": "<p>Update black board details</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "is_black_board",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "black_board_json",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/venue.js",
    "groupTitle": "Venue",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/venue/blackboard/update"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/venue/update",
    "title": "Venue  : Update venue details",
    "name": "Venue_On_boarding",
    "group": "Venue",
    "description": "<p>Venue on boarding</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "latitude",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "longitude",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "is_black_board",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "black_board_json",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "beacon_ids",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "FILE",
            "optional": true,
            "field": "logo_file",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": {\n            \"id\": 77,\n            \"venue_id\": 185,\n            \"name\": \"Iauro\",\n            \"hash_tag\": \"pune1\",\n            \"start_time\": null,\n            \"end_time\": null,\n            \"address\": null,\n            \"latitude\": null,\n            \"longitude\": null,\n            \"is_black_board\": 1,\n            \"black_board_json\": null,\n            \"auto_approval\": 0,\n            \"updated_at\": \"2017-03-15T09:45:38.000Z\",\n            \"created_at\": \"2017-03-15T09:45:38.000Z\"\n          },\n          \"status_code\": 201,\n          \"message\": \"Venue on boarded successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/venue.js",
    "groupTitle": "Venue",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/venue/update"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/venue/add",
    "title": "Venue  : On boarding",
    "name": "Venue_On_boarding",
    "group": "Venue",
    "description": "<p>Venue on boarding</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "latitude",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "longitude",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "is_black_board",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "black_board_json",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "beacon_ids",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "FILE",
            "optional": true,
            "field": "logo_file",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": {\n            \"id\": 77,\n            \"venue_id\": 185,\n            \"name\": \"Iauro\",\n            \"hash_tag\": \"pune1\",\n            \"start_time\": null,\n            \"end_time\": null,\n            \"address\": null,\n            \"latitude\": null,\n            \"longitude\": null,\n            \"is_black_board\": 1,\n            \"black_board_json\": null,\n            \"auto_approval\": 0,\n            \"updated_at\": \"2017-03-15T09:45:38.000Z\",\n            \"created_at\": \"2017-03-15T09:45:38.000Z\"\n          },\n          \"status_code\": 201,\n          \"message\": \"Venue on boarded successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/venue.js",
    "groupTitle": "Venue",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/venue/add"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/v1/forgotpassword",
    "title": "Venue User  : Forgot password",
    "name": "Forgot_password",
    "group": "Venue_User",
    "description": "<p>Forgot password</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"is_success\": true,\n   \"result\": {\n     \"id\": 64,\n     \"first_name\": \"Anway\",\n     \"last_name\": null,\n     \"email\": \"anway.kulkarni@iauro.com\",\n     \"alternate_email\": null,\n     \"password\": \"803c05dd3dd6ed81\",\n     \"is_email_verified\": 1,\n     \"is_first_time\": 1,\n     \"parent_id\": null,\n     \"is_active\": 1,\n     \"added_by\": null,\n     \"twitter_id\": \"\",\n     \"facebook_id\": \"\",\n     \"instagram_id\": \"\",\n     \"created_at\": \"2017-03-09T11:40:04.000Z\",\n     \"updated_at\": \"2017-03-09T11:42:23.000Z\",\n     \"forgot_password_email_data\": {\n       \"verification_token\": \"EpZQ2t5YYbvPLiL5LP4bUdjAAlzK1XiP\",\n       \"encrypted_user_id\": \"c669\"\n     }\n   },\n   \"message\": null,\n   \"status_code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/login.js",
    "groupTitle": "Venue_User",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/forgotpassword"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/updatepassword",
    "title": "Venue User  : Update password",
    "name": "Update_password",
    "group": "Venue_User",
    "description": "<p>Update password</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "encrypted_user_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"is_success\": true,\n      \"result\": {\n        \"id\": 64,\n        \"first_name\": \"Anway\",\n        \"last_name\": null,\n        \"email\": \"anway.kulkarni@iauro.com\",\n        \"alternate_email\": null,\n        \"is_email_verified\": 1,\n        \"is_first_time\": 1,\n        \"parent_id\": null,\n        \"is_active\": 1,\n        \"added_by\": null,\n        \"twitter_id\": \"\",\n        \"facebook_id\": \"\",\n        \"instagram_id\": \"\",\n        \"created_at\": \"2017-03-09T11:40:04.000Z\",\n        \"updated_at\": \"2017-03-09T11:42:23.000Z\"\n      },\n      \"message\": \"Password updated\",\n      \"status_code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/login.js",
    "groupTitle": "Venue_User",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/updatepassword"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/verifyemail",
    "title": "Venue User  : Verify Email",
    "name": "Verify_Email",
    "group": "Venue_User",
    "description": "<p>Verify Email with change password if needed</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "encrypted_user_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"is_success\": true,\n      \"result\": {\n        \"id\": 64,\n        \"first_name\": \"Anway\",\n        \"last_name\": null,\n        \"email\": \"anway.kulkarni@iauro.com\",\n        \"alternate_email\": null,\n        \"is_email_verified\": 1,\n        \"is_first_time\": 1,\n        \"parent_id\": null,\n        \"is_active\": 1,\n        \"added_by\": null,\n        \"twitter_id\": \"\",\n        \"facebook_id\": \"\",\n        \"instagram_id\": \"\",\n        \"created_at\": \"2017-03-09T11:40:04.000Z\",\n        \"updated_at\": \"2017-03-09T11:42:23.000Z\"\n      },\n      \"message\": \"Email verified successfully\",\n      \"status_code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/login.js",
    "groupTitle": "Venue_User",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/verifyemail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/login",
    "title": "Venue User : Login",
    "name": "login",
    "group": "Venue_User",
    "description": "<p>login</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "organization_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"is_success\": true,\n  \"result\": {\n    \"id\": 64,\n    \"first_name\": \"Anway\",\n    \"last_name\": null,\n    \"email\": \"anway.kulkarni@iauro.com\",\n    \"alternate_email\": null,\n    \"is_email_verified\": 1,\n    \"is_first_time\": 1,\n    \"parent_id\": null,\n    \"is_active\": 1,\n    \"added_by\": null,\n    \"twitter_id\": \"\",\n    \"facebook_id\": \"\",\n    \"instagram_id\": \"\",\n    \"created_at\": \"2017-03-09T11:40:04.000Z\",\n    \"updated_at\": \"2017-03-09T11:42:23.000Z\",\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFud2F5Lmt1bGthcm5pQGlhdXJvLmNvbSIsImlkIjo2NCwiaWF0IjoxNDg5NTUzOTQwLCJleHAiOjE0ODk2NDAzNDB9.d6fQlMvvzKsGkQyYcyh4TXyjsCEUnBbXmBLdntc_N6A\",\n    \"organization_id\": 177,\n    \"role_id\": 3,\n    \"organization_name\": \"Iauro\",\n    \"group\": \"CUSTOMER\"\n  },\n  \"message\": null,\n  \"status_code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n          \"is_success\": false,\n          \"result\": [\n            {\n              \"organization_id\": 176,\n              \"role_id\": 3,\n              \"group\": \"CUSTOMER\",\n              \"organization_name\": \"Iauro\"\n            },\n            {\n              \"organization_id\": 177,\n              \"role_id\": 3,\n              \"group\": \"CUSTOMER\",\n              \"organization_name\": \"Iauro\"\n            },\n            {\n              \"organization_id\": 178,\n              \"role_id\": 3,\n              \"group\": \"CUSTOMER\",\n              \"organization_name\": \"Iauro\"\n            }\n          ],\n          \"message\": \"Venue User associated with multiple organizations\",\n          \"status_code\": 400\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/login.js",
    "groupTitle": "Venue_User",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/login"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/v1/venue/blackboard",
    "title": "Venue  : get black board details",
    "name": "get_black_board_details",
    "group": "Venue",
    "description": "<p>get black board details</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/venue.js",
    "groupTitle": "Venue",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/venue/blackboard"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/favourite/ban/user",
    "title": "Venue  : Favourite user for venue",
    "name": "make_favourite_user_for_venue",
    "group": "Venue",
    "description": "<p>favourite user for venue</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "customer_id",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": null,\n          \"status_code\": 200,\n          \"message\": \"The requested customer is favourite for venue\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/venue.js",
    "groupTitle": "Venue",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/favourite/ban/user"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/v1/venue/social_media/update",
    "title": "Venue  : update social media mapping",
    "name": "update_social_media_mapping",
    "group": "Venue",
    "description": "<p>update social media mapping</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "venue_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "social_media_id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "consumer_key",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "secret_key",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n          \"is_success\": true,\n          \"result\": null,\n          \"status_code\": 200,\n          \"message\": \"Successfully added entry into database\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/venue.js",
    "groupTitle": "Venue",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/venue/social_media/update"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  }
] });
