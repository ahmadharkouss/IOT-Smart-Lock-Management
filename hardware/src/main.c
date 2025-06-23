#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#include <MFRC522v2.h>
#include <MFRC522DriverSPI.h>
#include <MFRC522DriverPinSimple.h>

MFRC522DriverPinSimple ss_pin(5); // Define the SPI pin for MFRC522
SPIClass &spiClass = SPI; // Define the SPI class

const SPISettings spiSettings = SPISettings(SPI_CLOCK_DIV4, MSBFIRST, SPI_MODE0);
  
MFRC522DriverSPI driver{ss_pin, spiClass, spiSettings}; // SPI driver
MFRC522 mfrc522{driver}; // MFRC522 instance

// BLE
BLEServer *pServer;
BLECharacteristic *pCharacteristic;

byte uidBytes[10]; // Array to store UID bytes
byte uidSize = 0;  // Size of the UID array

void setup() {
  Serial.begin(115200);
  while (!Serial); // Wait for serial to initialize

  // Initialize BLE
  BLEDevice::init("RFID-ESP32"); // Initialize BLE with a name
  pServer = BLEDevice::createServer(); // Create BLE server
  BLEService *pService = pServer->createService(BLEUUID("4fafc201-1fb5-459e-8fcc-c5c9c331914b")); // Create BLE service

  pCharacteristic = pService->createCharacteristic(
                      BLEUUID("beb5483e-36e1-4688-b7f5-ea07361b26a8"),
                      BLECharacteristic::PROPERTY_READ |
                      BLECharacteristic::PROPERTY_NOTIFY
                    );

  pCharacteristic->addDescriptor(new BLE2902());

  pService->start();
  BLEAdvertising *pAdvertising = pServer->getAdvertising();
  pAdvertising->addServiceUUID(pService->getUUID());
  pAdvertising->start();

  // Initialize MFRC522
  mfrc522.PCD_Init();
  Serial.println("RFID reader initialized");
}

void loop() {
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  uidSize = mfrc522.uid.size;
  for (byte i = 0; i < uidSize; i++) {
    uidBytes[i] = mfrc522.uid.uidByte[i];
  }

  // Print UID
  Serial.print("Card UID:");
  for (byte i = 0; i < uidSize; i++) {
    Serial.print(uidBytes[i] < 0x10 ? " 0" : " ");
    Serial.print(uidBytes[i], HEX);
  }
  Serial.println();

  // Convert UID to string for display
  String uidString = "";
  for (byte i = 0; i < uidSize; i++) {
    uidString += String(uidBytes[i], HEX);
  }
  Serial.print("UID as String: ");
  Serial.println(uidString);

  // Send UID over BLE
  pCharacteristic->setValue(uidBytes, uidSize);
  pCharacteristic->notify();
  
  // Halt PICC to prevent reading multiple times
  mfrc522.PICC_HaltA();
}
