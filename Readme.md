# Server Setup Steps

Follow these steps to setup the environment


## Install the node using nvm

Use following to install node using nvm

```
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-with-nvm-node-version-manager-on-a-vps
```

Use node version as 6.3.1

## Add kafka to system

Download kafka 2.11-0.10.0.0 using any of the following links

* https://www.apache.org/dyn/closer.cgi?path=/kafka/0.10.0.0/kafka_2.10-0.10.0.0.tgz
* http://www-eu.apache.org/dist/kafka/0.10.0.0/kafka_2.10-0.10.0.0.tgz
* http://www-us.apache.org/dist/kafka/0.10.0.0/kafka_2.10-0.10.0.0.tgz

extract the downloaded tar or zip file and move to /home directory

```
cd ~/kafka_2.11-0.10.0.0/config
```

```
cp server.properties server-1.properties
```

```
cp server.properties server-2.properties
```

```
sudo vim server-1.properties
```

change broker id to 1

```
sudo vim server-2.properties
```

change broker id to 2

## Start the kafka

Go to the tagloy project and start the server

```
./tagloy.sh
```

Start the server until the message is shown as 'Created topic socialmedia.'

Once the kafka is started. Start the consumer and producer.

```
node social_media_consumer_server.js
```

```
node social_media_producer_server.js
```

## Install npm package pm2 globally

```
npm install -g pm2
```

This package helps to keep node server live once it is started. Start the server using following syntax

```
pm2 start server.js --name server-name
```

## Start the user management server

Once the tagloy main project's server is started start the user management server.

```
pm2 start server.js --name user
```