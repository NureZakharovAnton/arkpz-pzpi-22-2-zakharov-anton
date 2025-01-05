#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <LiquidCrystal.h>

const int buttonPin = 15; 
const int buttonPrevPin = 4;

const int RS = 21;
const int EN = 19;
const int D4 = 18;
const int D5 = 5;
const int D6 = 17;
const int D7 = 16;

const int YELLOW_LED = 12;
const int RED_LED = 13;
const int GREEN_LED = 14;

LiquidCrystal lcd(RS, EN, D4, D5, D6, D7);

const char* ssid = "Wokwi-GUEST";
const char* password = "";
const char* serverUrl = "http://48a1-46-150-17-223.ngrok-free.app/api/v1/jobs";

int currentJobIndex = 0;

void setup() {
  Serial.begin(115200);

  pinMode(buttonPin, INPUT);
  pinMode(buttonPrevPin, INPUT);

  pinMode(YELLOW_LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  
  lcd.begin(16, 2);
  lcd.print("Name:");
  
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    http.begin(serverUrl);
    http.addHeader("Accept", "application/json");

    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {
      String payload = http.getString();
      Serial.println("HTTP Response code: " + String(httpResponseCode));
      Serial.println("Response data: " + payload);

      DynamicJsonDocument doc(200);
      DeserializationError error = deserializeJson(doc, payload);
      
      if (!error) {
        String status = doc[currentJobIndex]["status"].as<String>();
        String name = doc[currentJobIndex]["name"].as<String>();

          lcd.setCursor(0, 1);
          lcd.print("                ");
          lcd.setCursor(0, 1);
          lcd.print(name);

        Serial.println(status);
        updateStatus(status);

        int buttonState = digitalRead(buttonPin);
        int buttonPrevState = digitalRead(buttonPrevPin);

          if (buttonState == LOW && doc.size() > currentJobIndex + 1) {
            currentJobIndex += 1; 
            Serial.println(currentJobIndex);
            delay(500); 
          }

          if (buttonPrevState == HIGH && 0 < currentJobIndex) {
            currentJobIndex -= 1; 
            Serial.println(currentJobIndex);
            delay(500); 
          }
      }
    } else {
      Serial.println("Error on HTTP request");
    }

    http.end();
  }
}

void updateStatus(String status) {
  digitalWrite(YELLOW_LED, LOW);
  digitalWrite(RED_LED, LOW);
  digitalWrite(GREEN_LED, LOW);

  Serial.println("Status received: '" + status + "'");
  Serial.println("Status length: " + String(status.length()));

  if (status.equals("inProgress")) {
    Serial.println("Matching inProgress");
    digitalWrite(YELLOW_LED, HIGH);
    
  }
  else if (status.equals("failed")) {
    Serial.println("Matching failed");
    digitalWrite(RED_LED, HIGH);
  }
  else if (status.equals("completed")) {
    Serial.println("Matching completed");
    digitalWrite(GREEN_LED, HIGH);
  }
  else {
    Serial.println("No status match found");
    for(int i = 0; i < status.length(); i++) {
      Serial.print("Char at " + String(i) + ": ");
      Serial.println(status[i], DEC);
    }
  }
}
