
#include <SimpleDHT.h>
#include <WiFi.h>
#include <FirebaseESP32.h>

#define pinDHT11 4
SimpleDHT11 dht11(pinDHT11);
byte temp=0, hum=0;

#define WIFI_SSID "LAI THE DAN" // your wifi SSID
#define WIFI_PASSWORD "12345678" //your wifi PASSWORD

#define FIREBASE_HOST "tt-iot-eeb9d-default-rtdb.firebaseio.com/" // change here
#define FIREBASE_AUTH "L7Qrox9EybEwlZm4ghc7D4HkodqBgcGvrrS8ALPe"  // your private key

FirebaseData fbdb;

//#define led 2
void setup()
{
    Serial.begin(9600);
    pinMode(LED_BUILTIN, OUTPUT);

//    pinMode(led,OUTPUT);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("connecting");
    while (WiFi.status() != WL_CONNECTED) 
        {
            Serial.print(".");
            delay(300);
        }
    Serial.println();
    Serial.print("connected: ") ;
    Serial.println(WiFi.localIP());
    Serial.println();

    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
//    Firebase.reconnectWiFi(true);  

//    Firebase.setReadTimeout(fbdb,1000 * 60);
//    Firebase.setwriteSizeLimit(fbdb, "tiny");   
}


void loop ()
{
    if (dht11.read(&temp, &hum, NULL) != SimpleDHTErrSuccess)
        Serial.println("Read DHT11 Failed");
    else
    {
    Serial.println("DHT11: ");
    Serial.println(temp);
    Serial.println(hum);
    
    Firebase.setInt(fbdb, "/Nhiet do",temp);
    Firebase.setInt(fbdb, "/Do am",hum);
    }

    if(Firebase.getInt(fbdb, "DK/den")==true)
    {
        String st = fbdb.to<String>();//fbdb.intData();
        if (st == "ON")
            digitalWrite(LED_BUILTIN,HIGH);
        else if (st == "OFF")
            digitalWrite(LED_BUILTIN,LOW);
    }
    delay(1000);
}
