
echo "I am here to start the zookeeper server"

sudo sh ~/kafka_2.11-0.10.0.0/bin/zookeeper-server-stop.sh

nohup sudo sh ~/kafka_2.11-0.10.0.0/bin/zookeeper-server-start.sh ~/kafka_2.11-0.10.0.0/config/zookeeper.properties >> server.zookeeper.nohup.out  &

sleep 5

echo "Start the kafka server"

sudo sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-stop.sh

nohup sudo sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server.properties >> server.kafka.nohup.out &

#nohup sudo sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server-1.properties >> server.kafka1.nohup.out &
#nohup sudo sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server-2.properties >> server.kafka2.nohup.out &

#nohup sudo sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server-3.properties >> server.kafka3.nohup.out &
#nohup sudo sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server-4.properties >> server.kafka4.nohup.out &

#nohup sudo sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server-5.properties >> server.kafka5.nohup.out &
#nohup sudo sh ~/kafka_2.11-0.10.0.0/bin/kafka-server-start.sh ~/kafka_2.11-0.10.0.0/config/server-6.properties >> server.kafka6.nohup.out &


#sudo sh ~/kafka_2.11-0.10.0.0/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic socialmedia --config retention.ms=7200000

sudo sh ~/kafka_2.11-0.10.0.0/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic instagramsocialmedia --config retention.ms=7200000

echo "I created topic now use kafka"

