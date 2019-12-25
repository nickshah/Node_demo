#!/usr/bin/env bash

#for pid in `ps -ef | grep zookeeper | awk '{print $2}'` ;
#do
#kill $pid ;
#done
#
#
#for pid in `ps -ef | grep kafka | awk '{print $2}'` ;
#do
#echo $pid ;
#done
#
#echo "I am here to start the zookeeper server"
#
#nohup sh ~/kafka_2.11-0.10.0.0/bin/zookeeper-server-start.sh ~/kafka_2.11-0.10.0.0/config/zookeeper.properties &
#
#echo "Hello!!! Started Server process"
#for pid in `ps -ef | grep zookeeper | awk '{print $2}'` ;
#do
#echo  $pid  ;
#done
#
#echo "Zookeeper server started"
#
#echo "I am here to start kafka server"
#
#nohup sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server.properties &
#
#echo "Started Server process"
#for pid in `ps -ef | grep kafka | awk '{print $2}'` ;
#do
#echo "Kafka Server process"
#echo  $pid  ;
#done
#
#echo "Kafka server started"



echo "I am here to start the zookeeper server"
sh ~/kafka_2.11-0.10.0.0/bin/zookeeper-server-stop.sh
nohup sh ~/kafka_2.11-0.10.0.0/bin/zookeeper-server-start.sh ~/kafka_2.11-0.10.0.0/config/zookeeper.properties >> server.zookeeper.nohup.out  &

sleep 5

echo "Start the kafka server"
sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-stop.sh
nohup sudo sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server.properties >> server.kafka1.nohup.out &

nohup sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server-1.properties >> server.kafka2.nohup.out &
nohup sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server-2.properties >> server.kafka3.nohup.out &

#nohup sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server-3.properties >> server.kafka4.nohup.out &
#nohup sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server-4.properties >> server.kafka5.nohup.out &

sh ~/kafka_2.11-0.10.0.0/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic socialmedia --config retention.ms=7200000

#sh ~/kafka_2.11-0.10.0.0/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 2 --partitions 1 --topic instagramsocialmedia --config retention.ms=7200000

echo "I created topic now use kafka"

#
#
#echo "Topic createD"


#   Start the zookeeper
#ps -ef | grep zookeeper-server-start.sh | grep -v grep | awk '{print $2}' | xargs kill
#for pid in `ps -ef | grep zookeeper | awk '{print $2}'` ; do kill $pid ; done
#nohup sh ~/kafka_2.11-0.10.0.0/bin/zookeeper-server-start.sh ~/kafka_2.11-0.10.0.0/config/zookeeper.properties &

#   Start the kafka server
#ps -ef | grep kafka-server-start.sh | grep -v grep | awk '{print $2}' | xargs kill
#for pid in `ps -ef | grep kafka | awk '{print $2}'` ; do kill $pid ; done
#nohup sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server.properties &

#   Create the topic
#sh ~/kafka_2.11-0.10.0.0/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic social_media --config retention.ms=7200000

#$ bin/kafka-topics.sh --zookeeper zk.yoursite.com --alter --topic as-access --config retention.ms=86400000

#sh ~/kafka_2.11-0.10.0.0/bin/kafka-topics.sh --zookeeper localhost:2181 --alter --topic social_media --config retention.ms=1000


#ps -ef | grep kafka-console-producer.sh | grep -v grep | awk '{print $2}' | xargs kill
#./kafka_2.11-0.10.0.0/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic social_media
#
#Zookeeper
#./kafka_2.11-0.10.0.0/bin/zookeeper-server-start.sh ~/kafka_2.11-0.10.0.0/config/zookeeper.properties
#
#Start kafka server
#./kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server.properties
#
#Create Topic
#./kafka_2.11-0.10.0.0/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic social_media
#
#Producer
#./kafka_2.11-0.10.0.0/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic socialmedia
#
#Consumer
#./kafka_2.11-0.10.0.0/bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic socialmedia --from-beginning


#sh ~/kafka_2.11-0.10.0.0/kafka-topics.sh --zookeeper localhost:2181 --delete --topic social_media


