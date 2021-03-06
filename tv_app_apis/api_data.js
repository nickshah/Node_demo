define({ "api": [
  {
    "type": "POST",
    "url": "v1/tv/login",
    "title": "Login",
    "name": "Login",
    "group": "Login",
    "permission": [
      {
        "name": "TvUser"
      }
    ],
    "description": "<p>Login api for tv application to authenticate the request and get necessary data</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>dummyuser@tagloy.com</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"is_success\": true,\n\t\"result\": {\n\t\t\"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFud2F5Lmt1bGthcm5pQGlhdXJvLmNvbSIsImlkIjo2NCwiaWF0IjoxNDg5NTUzOTQwLCJleHAiOjE0ODk2NDAzNDB9.d6fQlMvvzKsGkQyYcyh4TXyjsCEUnBbXmBLdntc_N6A\",\n\t\t\"venue_id\": 1434\n\t},\n\t\"status_code\": 200,\n\t\"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "tv_app/tv_api_doc.js",
    "groupTitle": "Login",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/tv/login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "v1/tv/banners",
    "title": "Banners",
    "name": "Banners",
    "group": "TvApp",
    "permission": [
      {
        "name": "TvUser"
      }
    ],
    "description": "<p>Get Banner media on timestamp</p>",
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
            "field": "timestamp",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"is_success\": true,\n    \"result\": [\n        {\n            \"id\": 1243,\n            \"media_url\": \"https://tagloyimages.s3.ap-south-1.amazonaws.com/b47065ce4f6177bc3ea8897b2728f4cd.jpg\",\n            \"type\": \"IMAGE\",\n            \"from_tagmin\": 1,\n            \"timestamp\": 1490598367\n        },\n        {\n            \"id\": 1243,\n            \"media_url\": \"https://tagloyimages.s3.ap-south-1.amazonaws.com/PFYIwnA.png\",\n            \"type\": \"VIDEO\",\n            \"from_tagmin\": 0,\n            \"timestamp\": 1490598367\n        }\n    ],\n    \"status_code\": 200,\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "tv_app/tv_api_doc.js",
    "groupTitle": "TvApp",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/tv/banners"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "v1/tv/fameusers",
    "title": "Get Fame users",
    "name": "Fame_users",
    "group": "TvApp",
    "permission": [
      {
        "name": "TvUser"
      }
    ],
    "description": "<p>Get fame users for venue on timestamp</p>",
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
            "field": "timestamp",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t \"is_success\": true,\n    \"result\": [\n        {\n            \"customer_id\": 67,\n            \"first_name\": \"Richard Branson\",\n            \"image\": \"https://pbs.twimg.com/profile_images/817027637466005505/IwRu9byQ.jpg\",\n            \"handle\": \"@richardbranson\",\n            \"is_superstar\": 1,\n            \"venue_published_feed_count\": 1000,\n            \"timestamp\": 1490598367\n        },\n        {\n            \"customer_id\": 68,\n            \"first_name\": \"Kajal Agarwal\",\n            \"image\": \"https://pbs.twimg.com/profile_images/727053878978449408/rHgoO6Za.jpg\",\n            \"handle\": \"@MsKajalAggarwal\",\n            \"is_superstar\": 0,\n            \"venue_published_feed_count\": 700,\n            \"timestamp\": 1490598367\n        },\n        {\n            \"customer_id\": 69,\n            \"first_name\": \"Tamannaah Bhatia\",\n            \"image\": \"https://pbs.twimg.com/profile_images/832897221620281344/Ef0XzER-.jpg\",\n            \"handle\": \"@tamannaahspeaks\",\n            \"is_superstar\": 0,\n            \"venue_published_feed_count\": 585,\n            \"timestamp\": 1490598367\n        }\n    ],\n    \"status_code\": 200,\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "tv_app/tv_api_doc.js",
    "groupTitle": "TvApp",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/tv/fameusers"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "v1/tv/feeds",
    "title": "Feeds",
    "name": "Feeds",
    "group": "TvApp",
    "permission": [
      {
        "name": "TvUser"
      }
    ],
    "description": "<p>Get current feeds on timestamp, In response source is the integer value with corresponding meaning - 1 - twitter 2 - instagram 3 - facebook</p>",
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
            "field": "timestamp",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"is_success\": true,\n    \"result\": [\n        {\n            \"feed_id\": 5,\n            \"feed_msg\": \"#TAGLOY #FUNKYKONA  One of the best, most energetic concerts ever: @mothermother’s No Culture Tour @theMassey Hall last night!! #concerts #MotherMother\",\n            \"feed_image\": \"https://pbs.twimg.com/media/C7tsLViXkAACdkT.jpg:large\",\n            \"cust_name\": \"Kajal Agarwal\",\n            \"cust_image\": \"https://pbs.twimg.com/profile_images/817027637466005505/IwRu9byQ.jpg\",\n            \"handle\": \"@MsKajalAggarwal\",\n            \"feed_count\": 120,\n            \"source\": 1,\n            \"published_feed_count\": 5,\n            \"twt_follower\": 6,\n            \"facebook_follower\": 3,\n            \"ig_follower\": 1,\n            \"is_celebration\": 1,\n            \"bookmark_feed\": 0,\n            \"feed_from_fame_user\": 0,\n            \"feed_from_favourite_user\": 0,\n            \"feed_recieved_at\": 1489233221143,\n            \"venue_id\": 176,\n            \"timestamp\": 1490598367\n        },\n        {\n            \"feed_id\": 14,\n            \"feed_msg\": \"#TAGLOY #FUNKYKONA  One of the best, most energetic concerts ever: @mothermother’s No Culture Tour @theMassey Hall last night!! #concerts #MotherMother\",\n            \"feed_image\": \"https://pbs.twimg.com/media/C7tsLViXkAACdkT.jpg:large\",\n            \"cust_name\": \"Tamannaah Bhatia\",\n            \"cust_image\": \"https://pbs.twimg.com/profile_images/832897221620281344/Ef0XzER-.jpg\",\n            \"handle\": \"@tamannaahspeaks\",\n            \"feed_count\": 120,\n            \"source\": 1,\n            \"published_feed_count\": 5,\n            \"twt_follower\": 6,\n            \"facebook_follower\": 3,\n            \"ig_follower\": 1,\n            \"is_celebration\": 1,\n            \"bookmark_feed\": 0,\n            \"feed_from_fame_user\": 0,\n            \"feed_from_favourite_user\": 0,\n            \"feed_recieved_at\": 1489233221143,\n            \"venue_id\": 176,\n            \"timestamp\": 1490598367\n        }\n    ],\n    \"status_code\": 200,\n    \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "tv_app/tv_api_doc.js",
    "groupTitle": "TvApp",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/tv/feeds"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "v1/tv/blackboard",
    "title": "Blackboard",
    "name": "Get_blackboard",
    "group": "TvApp",
    "permission": [
      {
        "name": "TvUser"
      }
    ],
    "description": "<p>Get Blackboard data for showcasing on TvApp</p>",
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
            "field": "timestamp",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        \"is_success\": true,\n        \"result\": {\n                \"color\": \"#FF0000\",\n                \"heading\": \"Chirtsmas party nights\",\n                \"content\": \"Coffee & Cake, Vodka and rum, Corona and Miller\",\n                \"footer\": \"FunkkyKona\"\n            },\n        \"status_code\": 200,\n        \"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "tv_app/tv_api_doc.js",
    "groupTitle": "TvApp",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/tv/blackboard"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "v1/tv/metadata",
    "title": "metadata",
    "name": "metadata",
    "group": "TvApp",
    "permission": [
      {
        "name": "TvUser"
      }
    ],
    "description": "<p>Get the metadata for tv app like venue image,tagloy image,venue tag,tagloy tag</p>",
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
            "field": "timestamp",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\t\"is_success\": true,\n\t\"result\": {\n\t\t\"venue_tag\" : \"#FUNKYKONA\",\n\t\t\"tagloy_tag\" : \"#TAGLOY\",\n\t\t\"venue_icon\" : \"https://bucket_name.s3.amazonaws.com/venue_icon.png\",\n\t\t\"tagloy_icon\" : \"https://bucket_name.s3.amazonaws.com/tagloy_icon.png\",\n\t\t\"timestamp\" : 1490598367\n\t},\n\t\"status_code\": 200,\n\t\"message\": \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "tv_app/tv_api_doc.js",
    "groupTitle": "TvApp",
    "sampleRequest": [
      {
        "url": "http://api.tagloy.com/v1/tv/metadata"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 BAD REQUEST\n{\n    \"is_success\": false,\n    \"result\": null,\n    \"message\": \"Error message\",\n    \"status_code\": 400\n}",
          "type": "json"
        }
      ]
    }
  }
] });
